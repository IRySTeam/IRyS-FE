import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
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
import { deleteRepositoryValidation } from '@/schema/delete-repository';
import FormInputDialog from '@/component/form-input-dialog';
import CustomAlert from '@/component/custom-alert';
import { collaborators } from '@/data/collaborators';
import CollaboratorCard from '@/component/collaborator-card';

export default function CollaboratorsSettingRepository() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [visibility, setVisibility] = useState('public');
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const repositoryName = 'Repository XYZ'
  
  useEffect(() => {
    setIsLoading(true);
    const { id } = router.query;
    if(!id){
      // router.replace({ pathname: '/', query: { search : '', type: '', sort:'', page: 1} })
    }else{
      setIsLoading(false);
    }
  }, [router]);

  const formikDialog = useFormik({
    initialValues: {
      name: '',
      real_name: repositoryName,
    },
    validationSchema: deleteRepositoryValidation,
    onSubmit: (values) => {
      setIsLoading(true);
      router.push({ pathname: '/', query: { deleteRepository : values.name }})
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
              severity={'success'}
              label={'Your changes to the repository settings have been successfully saved'}
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
                Setting
                </Typography>
                <SettingRepositoryTabs
                  id={id} 
                  type={'collaborators'}
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
                    width:'100%',
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    justifyContent:'flex-start',
                    gap: '16px'
                  }} 
                >
                  <Box
                    sx={{
                      width:'100%',
                      display: 'flex',
                      flexDirection: 'row', 
                      alignItems: 'flex-start',
                      justifyContent:'space-between',
                    }} 
                  >
                    <Typography 
                      sx={{ 
                        color: 'black.main', 
                        typography: 'heading_h2',
                        marginLeft: '16px', 
                        [theme.breakpoints.down('small')]: {
                          typography: 'heading_h3',
                          marginLeft: 0,
                        },
                        [theme.breakpoints.down('mobile_l')]: {
                          typography: 'heading_h4',
                        },
                        maxWidth: 'calc(100% - 150px)',
                      }}
                    >
                      Manage Access
                    </Typography>
                    <Button 
                      color='primary' 
                      variant='contained' 
                      sx={{ 
                        height: '32px', 
                        padding: '0 12px',
                        width: '150px',
                        typography: theme.typography.heading_h6,
                        alignSelf: 'flex-end',
                      }}
                    >
                      Add Collaborator
                    </Button> 
                  </Box>
                  <Box sx={{ backgroundColor: 'light_gray.main', width: '100%', height: '1px',}}/>
                  <Box
                    sx={{
                      width:'100%',
                      display: 'flex',
                      flexDirection: 'column', 
                      alignItems: 'flex-start',
                      justifyContent:'flex-start',
                      gap: '16px',
                      paddingLeft: '24px',
                      [theme.breakpoints.down('small')]: {
                        paddingLeft: '0px',
                      }, 
                    }}
                  >
                    {collaborators.map((collaborator, index) => (
                      <CollaboratorCard 
                        key={index}
                        item={collaborator}
                      />
                    ))}
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
              <Typography variant='form_label_small' color='black.main' textAlign='center'>{`Delete ${repositoryName}`}</Typography>
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
                This action <span className='bold'>cannot</span> be undone. This will permanently delete the <span className='bold'>{repositoryName}</span>, delete all <span className='bold'>documents</span> inside and remove all <span className='bold'>collaborator associations.</span>
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
                  label={["Please type ", <span key={1} className='bold'>{repositoryName}</span>,  " to confirm."]}
                  placeholder={repositoryName}
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
