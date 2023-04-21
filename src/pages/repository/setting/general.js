import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Typography, Button, IconButton} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import NavBar from '@/component/navbar';
import Loading from '@/component/loading';
import SettingRepositoryTabs from '@/component/tabs/setting-repository';
import FormInput from '@/component/form-input';
import { editRepositoryValidation } from '@/schema/edit-repository';

export default function GeneralSettingRepository() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [visibility, setVisibility] = useState('public');
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const hasFormChanged = (currentValues, initialValues) => Object.keys(initialValues).some(fieldName => initialValues[fieldName] !== currentValues[fieldName]);
  
  useEffect(() => {
    setIsLoading(true);
    const { id } = router.query;
    if(!id){
      router.replace({ pathname: '/', query: { search : '', type: '', sort:'', page: 1} })
    }else{
      setIsLoading(false);
    }
  }, [router]);

  const formik = useFormik({
    initialValues: {
      name: 'Repository XYZ',
      description: '',
    },
    validationSchema: editRepositoryValidation,
    onSubmit: (values) => {
      setIsLoading(true);
      console.log(values);
      setIsLoading(false);
    } ,
  });

  const handleClickOpenVisibility = () => {setIsVisibilityModalOpen(true);};
  const handleCloseVisibility = () => {setIsVisibilityModalOpen(false);};
  const handleClickOpenDelete = () => {setIsDeleteModalOpen(true);};
  const handleCloseDelete = () => {setIsDeleteModalOpen(false);};
  const handleChangeVisibility = () => { 
    if(visibility === 'public'){
      setVisibility('private')
    } else {
      setVisibility('public')
    }
    handleCloseVisibility();
  }

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {!isLoading &&
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
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
              Repository XYZ
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
                Category
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
                        width: '160px',
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
                        width:'calc(100% - 200px)',
                        display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'flex-start',
                        justifyContent:'space-between',
                        gap: '8px',
                        paddingLeft: '24px',
                      }} 
                    >
                      <Typography sx={{ color: 'black.main', typography: 'form_label_small',}}>Change repository visibility</Typography>
                      <Typography sx={{ color: 'black.main', typography: 'form_sublabel_small',}}>{`This repository is currently ${visibility}.`}</Typography>
                    </Box>
                    <Button 
                      color='danger_button' 
                      variant='contained' 
                      sx={{ 
                        height: '32px', 
                        padding: '0 12px',
                        width: '160px',
                        typography: theme.typography.heading_h6,
                        color: theme.palette.white.main,
                      }}
                      onClick={handleClickOpenVisibility}
                    >
                      {visibility === 'public'? 'Change to Private' : 'Change to Public'}
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
                        width:'calc(100% - 240px)',
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
                        width: '200px',
                        typography: theme.typography.heading_h6,
                        color: theme.palette.white.main,
                      }}
                    >
                      Delete This Repository
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
                visibility === 'public' ?
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
              <Typography variant='form_label_small' color='black.main' textAlign='center'>{`Make My Repository as a ${visibility === 'public'? 'private' : 'public' } repository`}</Typography>
              <Typography variant='form_sublabel_small' color='black.main'  textAlign='center'>{visibility === 'public'? 'Private repositories are only visible to you and selected collaborators' : 'Public repositories are visible to everyone' }</Typography>
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
                onClick={handleChangeVisibility}
              >
                {visibility === 'public'? 'Make this repository private' : 'Make this repository public'}
              </Button> 
            </DialogContent>
          </Dialog>
        </>
      }
    </>
  )
}
