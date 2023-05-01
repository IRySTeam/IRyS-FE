import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { useSelector, useDispatch } from 'react-redux';
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
import CollaboratorCard from '@/component/collaborator-card';
import SearchableSelect from '@/component/searchable-select';
import NewCollaboratorCard from '@/component/new-collaborator-card';
import Cookies from 'js-cookie';
import { addNewCollaboratorToRepo, changeCollaboratorRoleInRepo, removeCollaboratorInRepo } from '@/state/actions/repositoryActions';

export default function CollaboratorsSettingRepository() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [isRemoveAccessModalOpen, setIsRemoveAccessModalOpen] = useState(false);
  const [isAddCollaboratorModalOpen, setIsAddCollaboratorModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertLabel, setAlertLabel] = useState('Role updated successfully');
  const [currentRemoveAccessId, setCurrentRemoveAccessId] = useState(0);
  const repositoryName = 'Repository XYZ'
  const [newCollaborator, setNewCollaborator] = useState(null);
  const [newCollaboratorRole, setNewCollaboratorRole] = useState('Viewer');
  const [searchUsers, setSearchUsers] = useState('');
  const repositoryData = useSelector(state => state.repository);
  
  useEffect(() => {
    setIsLoading(true);
    const { id } = router.query;
    if(id) setIsLoading(false);
  }, [router]);

  const handleClickOpenRemoveAccess = (index) => {
    setCurrentRemoveAccessId(index);
    setIsRemoveAccessModalOpen(true);
  };
  const handleCloseRemoveAccess = () => {setIsRemoveAccessModalOpen(false);};
  const handleClickOpenAddCollaborator = () => {setIsAddCollaboratorModalOpen(true);};
  const handleCloseAddCollaborator = () => {setIsAddCollaboratorModalOpen(false);};
  const handleChangeRemoveAccess = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('access_token')
      const data = {
        collaborator_id : repositoryData.collaborators[currentRemoveAccessId].id,
      }
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/members/remove`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const newData = {
        index: currentRemoveAccessId,
      }
      dispatch(removeCollaboratorInRepo(newData));
      setCurrentRemoveAccessId(0);
      setAlertSeverity('success')
      setAlertLabel(`${repositoryData.collaborators[currentRemoveAccessId].first_name} ${repositoryData.collaborators[currentRemoveAccessId].last_name} has been removed`)
      setShowAlert(true)
    } catch (error){
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
            setAlertLabel('You are not allowed to perform this action');
            setShowAlert(true);
            break;
          case 'REPOSITORY__NOT_FOUND':
            setAlertLabel('Repository not found. Please try again.');
            setShowAlert(true);
            break;
          default :
            setAlertLabel('Failed to remove collaborator');
            setShowAlert(true);
            break;
        }
      } else{
        setAlertLabel('Failed to remove collaborator');
        setShowAlert(true);
      }
    }
    setIsLoading(false);
    handleCloseRemoveAccess();
  }

  const handleClickShowAlert= () => setShowAlert((show) => !show);

  const handleRoleChanged = async (event, index) => {
    setIsLoading(true);
    try {
      const token = Cookies.get('access_token')
      const data = {
        collaborator_id : repositoryData.collaborators[index].id,
        role : event.target.value
      }
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/members/edit`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const newData = {
        order: index,
        newCollaborator: repositoryData.collaborators[index],
        role: event.target.value,
      }
      dispatch(changeCollaboratorRoleInRepo(newData));
      setAlertSeverity('success')
      setAlertLabel('Role updated successfully')
      setShowAlert(true)
      setShowAlert(true)
    } catch (error){
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
            setAlertLabel('You are not allowed to perform this action');
            setShowAlert(true);
            break;
          case 'REPOSITORY__NOT_FOUND':
            setAlertLabel('Repository not found. Please try again.');
            setShowAlert(true);
            break;
          case 'REPOSITORY__INVALID_COLLABORATOR':
            setAlertLabel('Invalid collaborator.');
            setShowAlert(true);
            break;
          default :
            setAlertLabel('Failed to update role');
            setShowAlert(true);
            break;
        }
      } else{
        setAlertLabel('Failed to update role');
        setShowAlert(true);
      }
    }
    setIsLoading(false);
  }

  const handleNewCollaboratorRoleChange = (event, id) => {
    setNewCollaboratorRole(event.target.value)
  }

  const handleRemoveNewCollaborator = () => {
    setNewCollaborator(null)
    setNewCollaboratorRole('viewer')
  }

  const addToRepo = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('access_token')
      const data = {
        collaborator_id : newCollaborator.id,
        role : newCollaboratorRole
      }
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/members/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const newData = {
        newCollaborator: newCollaborator,
        role: newCollaboratorRole,
      }
      dispatch(addNewCollaboratorToRepo(newData));
      setNewCollaborator(null)
      setNewCollaboratorRole('Viewer')
      setAlertSeverity('success')
      setAlertLabel('A new collaborator has been successfully added')
      setShowAlert(true)
    } catch (error){
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
            setAlertLabel('You are not allowed to perform this action');
            setShowAlert(true);
            break;
          case 'REPOSITORY__NOT_FOUND':
            setAlertLabel('Repository not found. Please try again.');
            setShowAlert(true);
            break;
          case 'REPOSITORY__DUPLICATE_COLLABORATOR':
            setAlertLabel('User is already a collaborator of this repository');
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
    }
    setIsLoading(false);
    handleCloseAddCollaborator()
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
                    {repositoryData.collaborators.map((collaborator, index) => (
                      <CollaboratorCard 
                        key={index}
                        order={index}
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
              <Typography variant='form_label_small' color='black.main' textAlign='center'>Remove {`${repositoryData.collaborators[currentRemoveAccessId].first_name} ${repositoryData.collaborators[currentRemoveAccessId].last_name}`} from this repository</Typography>
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
                Once removed, <span className='bold'>{`${repositoryData.collaborators[currentRemoveAccessId].first_name} ${repositoryData.collaborators[currentRemoveAccessId].last_name}`}</span> will no longer have direct access to this repository.
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
                  maxWidth: "640px",
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
                repoId={id}
                value={newCollaborator}
                onChange={(event, newValue) => {
                  setNewCollaborator(newValue);
                }}
                inputValue={searchUsers}
                onInputChange={(event, newInputValue) => {
                  setSearchUsers(newInputValue);
                }}
              />
              { newCollaborator &&
                <NewCollaboratorCard
                  item={newCollaborator}
                  role={newCollaboratorRole}
                  new={true}
                  onRoleChange={handleNewCollaboratorRoleChange}
                  onRemoveNewCollaborator={handleRemoveNewCollaborator}
                />
              }

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
                disabled={!newCollaborator}
                onClick={addToRepo}
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
