import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { Container, Box, Typography, Button, IconButton} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import NavBar from '@/component/navbar';
import Loading from '@/component/loading';
import SettingRepositoryTabs from '@/component/tabs/setting-repository';
import FormInput from '@/component/form-input';
import { editRepositoryValidation } from '@/schema/edit-repository';
import { deleteRepositoryValidation } from '@/schema/delete-repository';
import FormInputDialog from '@/component/form-input-dialog';
import CustomAlert from '@/component/custom-alert';
import { changeRepoDetailSuccess, changeRepoVisibilitySuccess, getRepoDetailFailed, getRepoDetailSuccess } from '@/state/actions/repositoryActions';

export default function GeneralSettingRepository() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertLabel, setAlertLabel] = useState('Your changes to the repository settings have been successfully saved');
  const repositoryData = useSelector(state => state.repository);

  const hasFormChanged = (currentValues, initialValues) => Object.keys(initialValues).some(fieldName => initialValues[fieldName] !== currentValues[fieldName]);
  
  useEffect(() => {
    setIsLoading(true);
    const { id } = router.query;
    if(!id){
      router.replace({ pathname: '/', query: { search : '', type: '', sort:'', page: 1} })
    }else{
      const fetchDetailRepo = async () =>  {
        const token =  Cookies.get('access_token');
        try {
          const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          dispatch(getRepoDetailSuccess(response.data))
        } catch (error){
          dispatch(getRepoDetailFailed(error.response.data))
          setAlertSeverity('error');
          setAlertLabel(`Network Error, Please try again`);
          setShowAlert(true);
        }
      }

      if(!repositoryData.id || repositoryData.id !== id){
        fetchDetailRepo()
      }

      setIsLoading(false);
    }
  }, [dispatch, router, repositoryData.id]);

  const formik = useFormik({
    initialValues: {
      name: repositoryData.name,
      description: repositoryData.description,
    },
    validationSchema: editRepositoryValidation,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const token = Cookies.get('access_token');
        await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${repositoryData.id}/edit`, values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setAlertSeverity('success');
        setAlertLabel('Your changes to the repository settings have been successfully saved');
        setShowAlert(true);
        dispatch(changeRepoDetailSuccess(values));
        setIsLoading(false);
      } catch (error) {
        setAlertSeverity('error')
        if(error.response){
          switch (error.response.data.error_code){
            case 401:
              refresh('access_token', 'refresh_token', router)
              setAlertLabel('Your session has been restored. Please Try Again.');
              setShowAlert(true);
              setIsLoading(false);
              break;
            case 'USER__NOT_ALLOWED':
              setAlertLabel('You are not allowed to perform this action.');
              setShowAlert(true);
              break;
            default :
              setAlertLabel('Network Error, Please Try Again.');
              setShowAlert(true);
              break;
          }
        } else{
          setAlertLabel('Network Error, Please Try Again.');
          setShowAlert(true);
        }
        setIsLoading(false);
      }
    } ,
  });

  const formikDialog = useFormik({
    initialValues: {
      name: '',
      real_name: repositoryData.name,
    },
    validationSchema: deleteRepositoryValidation,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const token = Cookies.get('access_token');
        await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${repositoryData.id}/delete`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        router.push({ pathname: '/', query: { deleteRepository : values.name }})
      } catch (error) {
        setAlertSeverity('error')
        if(error.response){
          switch (error.response.data.error_code){
            case 401:
              refresh('access_token', 'refresh_token', router)
              setAlertLabel('Your session has been restored. Please Try Again.');
              setShowAlert(true);
              setIsLoading(false);
              break;
            case 'USER__EMAIL_NOT_VERIFIED':
              setAlertLabel('Email is not verified.');
              setShowAlert(true);
              break;
            default :
              setAlertLabel('Network Error, Please Try Again.');
              setShowAlert(true);
              break;
          }
        } else{
          setAlertLabel('Network Error, Please Try Again.');
          setShowAlert(true);
        }
        setIsLoading(false);
      }
    } ,
  });

  const handleClickOpenVisibility = () => {setIsVisibilityModalOpen(true);};
  const handleCloseVisibility = () => {setIsVisibilityModalOpen(false);};
  const handleClickOpenDelete = () => {setIsDeleteModalOpen(true);};
  const handleCloseDelete = () => {setIsDeleteModalOpen(false);};
  const handleChangeVisibility = async (visibility) => { 
    setIsLoading(true)
    const data = {
      is_public: visibility,
    }
    try {
      const token = Cookies.get('access_token');
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${repositoryData.id}/edit`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAlertSeverity('success');
      setAlertLabel('Your changes to the repository settings have been successfully saved');
      setShowAlert(true);
      dispatch(changeRepoVisibilitySuccess(data));
      setIsLoading(false);
    } catch (error) {
      setAlertSeverity('error')
      if(error.response){
        switch (error.response.data.error_code){
          case 401:
            refresh('access_token', 'refresh_token', router)
            setAlertLabel('Your session has been restored. Please Try Again.');
            setShowAlert(true);
            setIsLoading(false);
            break;
          case 'USER__NOT_ALLOWED':
            setAlertLabel('You are not allowed to perform this action.');
            setShowAlert(true);
            break;
          default :
            setAlertLabel('Network Error, Please Try Again.');
            setShowAlert(true);
            break;
        }
      } else{
        setAlertLabel('Network Error, Please Try Again.');
        setShowAlert(true);
      }
      setIsLoading(false);
    }
    handleCloseVisibility();
  }

  const handleClickShowAlert= () => setShowAlert((show) => !show);

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {!isLoading &&
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
          { !isLoading && showAlert &&
            <CustomAlert
              severity={alertSeverity}
              label={alertLabel}
              onClose={handleClickShowAlert}
            /> 
          }
          <Container 
            sx={{
              padding: '40px', 
              minHeight:'100vh',
              maxWidth:'large',
              display: 'flex',
              flexDirection: 'column', 
              gap: '40px',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              [theme.breakpoints.down('small')]: {
                padding: '40px 16px',
              }, 
            }} 
          >
            <Typography 
              sx={{ 
                color: 'black.main', 
                typography: 'heading_h1',
                [theme.breakpoints.down('tablet')]: {
                  typography: 'heading_h3',
                }, 
              }}
            >
              {repositoryData.name}
            </Typography>
            <Box
              sx={{
                width:'100%',
                display: 'flex',
                flexDirection: { mobile: 'column', small:'row' }, 
                gap: '40px',
                alignItems: 'flex-start',
                justifyContent:{ mobile: 'flex-start', small:'space-between' },
              }} 
            >
              <Box
                sx={{
                  width:{ mobile: '100%', small:'250px' },
                  display: 'flex',
                  gap: '18px',
                  flexDirection: 'column', 
                  alignItems: 'flex-start',
                  justifyContent:'flex-start',
                }} 
              >
                <Typography 
                  sx={{ 
                    color: 'black.main', 
                    typography: 'heading_h3',
                    [theme.breakpoints.down('small')]: {
                      typography: 'heading_h4',
                    }, 
                  }}
                >
                Setting
                </Typography>
                <SettingRepositoryTabs
                  id={id} 
                  type={'general'}
                />
              </Box>
              <Box
                sx={{
                  width:{ mobile: '100%', small:'calc(100% - 350px)'},
                  display: 'flex',
                  flexDirection: 'column', 
                  alignItems: 'flex-start',
                  justifyContent:'flex-start',
                  [theme.breakpoints.down('small')]: {
                    gap: '16px',
                  }, 
                }}  
              >
                <Box
                  sx={{
                    width:{ mobile: '100%'},
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    justifyContent:'flex-start',
                    gap: '16px'
                  }} 
                >
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'heading_h2',
                      [theme.breakpoints.down('small')]: {
                        typography: 'heading_h3',
                      },
                      marginLeft: '16px', 
                    }}
                  >
                    General
                  </Typography>
                  <Box sx={{ backgroundColor: 'light_gray.main', width: '100%', height: '1px',}}/>
                  <form 
                    onSubmit={formik.handleSubmit} 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      gap: '16px',
                      paddingLeft: '24px',
                    }}
                  >
                    <FormInput 
                      id='name'            
                      name='name'
                      label='Repository Name'
                      placeholder='Enter a repository name'
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helpertext={formik.touched.name && formik.errors.name}
                      required={true}
                      small={true}
                    />
                    <FormInput 
                      id='description'            
                      name='description'
                      label='Description'
                      placeholder='Enter repository description'
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helpertext={formik.touched.description && formik.errors.description}
                      small={true}
                      multiline={true}
                      optional={true}
                    />
                    <Button 
                      color='primary' 
                      variant='contained' 
                      sx={{ 
                        height: '32px', 
                        padding: '0 12px',
                        width: '150px',
                        typography: theme.typography.heading_h6,
                        alignSelf: 'flex-end',
                        '&.Mui-disabled': {
                          backgroundColor: theme.palette.dark_gray.light,
                          color: theme.palette.light_gray.light,
                        },}}
                      type='submit'
                      disabled={!(hasFormChanged(formik.values, formik.initialValues))}
                    >
                      Save Changes 
                    </Button> 
                  </form>
                </Box>
                <Box
                  sx={{
                    width:'100%',
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    justifyContent:'flex-start',
                    gap: '16px'
                  }} 
                >
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'heading_h2',
                      [theme.breakpoints.down('small')]: {
                        typography: 'heading_h3',
                      },
                      marginLeft: '16px', 
                    }}
                  >
                    Danger Zone
                  </Typography>
                  <Box sx={{ backgroundColor: 'light_gray.main', width: '100%', height: '1px',}}/>
                  <Box
                    sx={{
                      width:'100%',
                      display: 'flex',
                      flexDirection: 'row', 
                      alignItems: 'center',
                      justifyContent:'space-between',
                    }} 
                  >
                    <Box
                      sx={{
                        width:'calc(100% - 176px)',
                        display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'flex-start',
                        justifyContent:'space-between',
                        gap: '8px',
                        paddingLeft: '24px',
                      }} 
                    >
                      <Typography sx={{ color: 'black.main', typography: 'form_label_small',}}>Change repository visibility</Typography>
                      <Typography sx={{ color: 'black.main', typography: 'form_sublabel_small',}}>{`This repository is currently ${repositoryData.is_public ? 'public' : 'private'}.`}</Typography>
                    </Box>
                    <Button 
                      color='danger_button' 
                      variant='contained' 
                      sx={{ 
                        height: '32px', 
                        padding: '0 10px',
                        width: '150px',
                        typography: theme.typography.heading_h6,
                        color: theme.palette.white.main,
                      }}
                      onClick={handleClickOpenVisibility}
                    >
                      {repositoryData.is_public? 'Change to Private' : 'Change to Public'}
                    </Button> 
                  </Box>
                  <Box
                    sx={{
                      width:'100%',
                      display: 'flex',
                      flexDirection: 'row', 
                      alignItems: 'center',
                      justifyContent:'space-between',
                    }} 
                  >
                    <Box
                      sx={{
                        width:'calc(100% - 176px)',
                        display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'flex-start',
                        justifyContent:'space-between',
                        gap: '8px',
                        paddingLeft: '24px',
                      }} 
                    >
                      <Typography sx={{ color: 'black.main', typography: 'form_label_small',}}>Delete this repository</Typography>
                      <Typography sx={{ color: 'black.main', typography: 'form_sublabel_small',}}>Deleting a repository is permanent and irreversible, so please be certain before proceeding.</Typography>
                    </Box>
                    <Button 
                      color='danger_button' 
                      variant='contained' 
                      sx={{ 
                        height: '32px', 
                        padding: '0 12px',
                        width: '150px',
                        typography: theme.typography.heading_h6,
                        color: theme.palette.white.main,
                      }}
                      onClick={handleClickOpenDelete}
                    >
                      Delete
                    </Button> 
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
          <Dialog
            open={isVisibilityModalOpen}
            onClose={handleCloseVisibility}
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "516px",
                },
              },
            }}
          >
            <DialogTitle id="alert-dialog-title"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '24px 24px 40px 24px'
              }}
            >
                <Typography variant='popup_heading' color='black.main'>Change Visibility</Typography>
                <IconButton sx={{ padding: 0, }} onClick={handleCloseVisibility}>
                  <CloseIcon
                    sx={{
                      width: '36px',
                      height: '36px',
                      color: theme.palette.dark_gray.main,
                    }}
                  />
                </IconButton>
            </DialogTitle>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '16px 24px 24px 24px',
                gap: '12px',
              }}
            >
              { 
                repositoryData.is_public ?
                <LockOutlinedIcon
                  sx={{
                    width: '64px',
                    height: '64px',
                    color: theme.palette.dark_gray.main
                  }}
                /> :
                <FolderSharedOutlinedIcon 
                  sx={{
                    width: '64px',
                    height: '64px',
                    color: theme.palette.dark_gray.main
                  }}
                />  
              }
              <Typography variant='form_label_small' color='black.main' textAlign='center'>{`Make My Repository as a ${repositoryData.is_public? 'private' : 'public' } repository`}</Typography>
              <Typography variant='form_sublabel_small' color='black.main'  textAlign='center'>{repositoryData.is_public? 'Private repositories are only visible to you and selected collaborators' : 'Public repositories are visible to everyone' }</Typography>
              <Button 
                color='danger_button' 
                variant='contained' 
                sx={{ 
                  height: '32px', 
                  padding: '0 12px',
                  width: '100%',
                  marginTop: '4px',
                  typography: theme.typography.heading_h6,
                  color: theme.palette.white.main,
                }}
                onClick={() => handleChangeVisibility(!repositoryData.is_public)}
              >
                {repositoryData.is_public? 'Make this repository private' : 'Make this repository public'}
              </Button> 
            </DialogContent>
          </Dialog>
          <Dialog
            open={isDeleteModalOpen}
            onClose={handleCloseDelete}
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "516px",
                },
              },
            }}
          >
            <DialogTitle id="alert-dialog-title"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '24px 24px 40px 24px'
              }}
            >
              <Typography variant='popup_heading' color='black.main'>Delete this repository</Typography>
              <IconButton sx={{ padding: 0, }} onClick={handleCloseDelete}>
                <CloseIcon
                  sx={{
                    width: '36px',
                    height: '36px',
                    color: theme.palette.dark_gray.main,
                  }}
                />
              </IconButton>
            </DialogTitle>
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '16px 24px 24px 24px',
                gap: '12px',
              }}
            >
              <DeleteOutlinedIcon
                sx={{
                  width: '64px',
                  height: '64px',
                  color: theme.palette.dark_gray.main
                }}
              /> 
              <Typography variant='form_label_small' color='black.main' textAlign='center'>{`Delete ${repositoryData.name}`}</Typography>
              <Typography 
                variant='form_sublabel_small' 
                color='black.main'
                textAlign='center'
                sx={{
                  "& .bold": {
                    typography: theme.typography.form_sublabel_small_bold
                  }
                }}
              >
                This action <span className='bold'>cannot</span> be undone. This will permanently delete the <span className='bold'>{repositoryData.name}</span>, delete all <span className='bold'>documents</span> inside and remove all <span className='bold'>collaborator associations.</span>
              </Typography>
              <form 
                onSubmit={formikDialog.handleSubmit} 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '24px',
                  marginTop: '12px',
                }}
              >
                <FormInputDialog
                  id='name'            
                  name='name'
                  label={["Please type ", <span key={1} className='bold'>{repositoryData.name}</span>,  " to confirm."]}
                  placeholder={repositoryData.name}
                  value={formikDialog.values.name}
                  onChange={formikDialog.handleChange}
                  onBlur={formikDialog.handleBlur}
                  error={formikDialog.touched.name && Boolean(formikDialog.errors.name)}
                  helpertext={formikDialog.touched.name && formikDialog.errors.name}
                />
                <Button 
                  color='danger_button' 
                  variant='contained' 
                  sx={{ 
                    height: '32px', 
                    padding: '0 12px',
                    width: '100%',
                    marginTop: '4px',
                    typography: theme.typography.heading_h6,
                    color: theme.palette.white.main,
                    '&.Mui-disabled': {
                      backgroundColor: theme.palette.dark_gray.light,
                      color: theme.palette.white.main,
                    },
                  }}
                  type="submit"
                  disabled={!formikDialog.touched.name || Boolean(formikDialog.errors.name)}
                >
                  I understand, delete this repository
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      }
    </>
  )
}
