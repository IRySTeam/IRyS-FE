import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { Container, Box, Typography, Button, IconButton} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import NavBar from '@/component/navbar';
import Loading from '@/component/loading';
import SettingRepositoryTabs from '@/component/tabs/setting-repository';
import CustomAlert from '@/component/custom-alert';
import { collaborators } from '@/data/collaborators';
import CollaboratorCard from '@/component/collaborator-card';
import SearchableSelect from '@/component/searchable-select';

export default function CollaboratorsSettingRepository() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [isRemoveAccessModalOpen, setIsRemoveAccessModalOpen] = useState(false);
  const [isAddCollaboratorModalOpen, setIsAddCollaboratorModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertLabel, setAlertLabel] = useState('Role updated successfully');
  const [currentRemoveAccessId, setCurrentRemoveAccessId] = useState(1);
  const repositoryName = 'Repository XYZ'
  const [newCollaborator, setNewCollaborator] = useState(null);
  const [newCollaboratorRole, setNewCollaboratorRole] = useState('viewer');
  const [searchUsers, setSearchUsers] = useState('');
  
  useEffect(() => {
    setIsLoading(true);
    const { id } = router.query;
    if(!id){
      // router.replace({ pathname: '/', query: { search : '', type: '', sort:'', page: 1} })
    }else{
      setIsLoading(false);
    }
  }, [router]);

  const handleClickOpenRemoveAccess = (id) => {
    setCurrentRemoveAccessId(id);
    setIsRemoveAccessModalOpen(true);
  };
  const handleCloseRemoveAccess = () => {setIsRemoveAccessModalOpen(false);};
  const handleClickOpenAddCollaborator = () => {setIsAddCollaboratorModalOpen(true);};
  const handleCloseAddCollaborator = () => {setIsAddCollaboratorModalOpen(false);};
  const handleChangeRemoveAccess = () => {
    setAlertSeverity('success')
    setAlertLabel(`${collaborators[currentRemoveAccessId].first_name} ${collaborators[currentRemoveAccessId].last_name} has been removed`)
    setShowAlert(true)
    handleCloseRemoveAccess();
  }

  const handleClickShowAlert= () => setShowAlert((show) => !show);

  const handleRoleChanged = (event, id) => {
    if(id !== 3){
      console.log(`Change collaborators with id ${id} role to ${event.target.value}`)
      setAlertSeverity('success')
      setAlertLabel('Role updated successfully')
      setShowAlert(true)
    } else {
      console.log(`Failed to change collaborators with id ${id}`)
      setAlertSeverity('error')
      setAlertLabel('Failed to update role')
      setShowAlert(true)
    }
  }

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
                      onClick={handleClickOpenAddCollaborator}
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
                        onRoleChange={handleRoleChanged}
                        onRemoveAccess={() => handleClickOpenRemoveAccess(index)}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
          <Dialog
            open={isRemoveAccessModalOpen}
            onClose={handleCloseRemoveAccess}
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
                <Typography variant='popup_heading' color='black.main'>Confirm Remove Access</Typography>
                <IconButton sx={{ padding: 0, }} onClick={handleCloseRemoveAccess}>
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
              <RemoveCircleIcon
                sx={{
                  width: '64px',
                  height: '64px',
                  color: theme.palette.dark_gray.main
                }}
              />  
              <Typography variant='form_label_small' color='black.main' textAlign='center'>Remove {`${collaborators[currentRemoveAccessId].first_name} ${collaborators[currentRemoveAccessId].last_name}`} from this repository</Typography>
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
                Once removed, <span className='bold'>{`${collaborators[currentRemoveAccessId].first_name} ${collaborators[currentRemoveAccessId].last_name}`}</span> will no longer have direct access to this repository.
              </Typography>
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
                onClick={handleChangeRemoveAccess}
              >
                Remove Access
              </Button> 
            </DialogContent>
          </Dialog>
          <Dialog
            open={isAddCollaboratorModalOpen}
            onClose={handleCloseAddCollaborator}
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
              <Typography variant='popup_heading' color='black.main'>Add Collaborator</Typography>
              <IconButton sx={{ padding: 0, }} onClick={handleCloseAddCollaborator}>
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
              <GroupsIcon
                sx={{
                  width: '64px',
                  height: '64px',
                  color: theme.palette.dark_gray.main
                }}
              /> 
              <Typography variant='form_label_small' color='black.main' textAlign='center'>{`Add a collaborator to ${repositoryName}`}</Typography>
              <SearchableSelect 
                value={newCollaborator}
                onChange={(event, newValue) => {
                  setNewCollaborator(newValue);
                }}
                inputValue={searchUsers}
                onInputChange={(event, newInputValue) => {
                  setSearchUsers(newInputValue);
                }}
              />
              <Button 
                color='primary' 
                variant='contained' 
                sx={{ 
                  height: '32px', 
                  padding: '0 12px',
                  width: '100%',
                  marginTop: '4px',
                  typography: theme.typography.heading_h6,
                  '&.Mui-disabled': {
                    backgroundColor: theme.palette.dark_gray.light,
                    color: theme.palette.white.main,
                  },
                }}
                disabled
              >
                Add to this repository
              </Button>
            </DialogContent>
          </Dialog>
        </>
      }
    </>
  )
}
