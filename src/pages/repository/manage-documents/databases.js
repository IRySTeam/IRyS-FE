import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { Container, Box, Typography, Button, OutlinedInput, Dialog, DialogTitle, IconButton, DialogContent, CircularProgress} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';
import NavBar from '@/component/navbar';
import Loading from '@/component/loading';
import CustomAlert from '@/component/custom-alert';
import ManageDocumentsTabs from '@/component/tabs/manage-documents';
import { getDatabasesDataSuccess } from '@/state/actions/databasesActions';
import { deleteDocumentValidation } from '@/schema/delete-document';
import { refresh } from '@/utils/token';
import FormInputDialog from '@/component/form-input-dialog';
import { editDocumentValidation } from '@/schema/edit-document';
import FormInput from '@/component/form-input';
import Dropdown from '@/component/dropdown';
import { categoryOption } from '@/constants/option';
import DocCollaboratorCard from '@/component/doc-collaborator-card';
import SearchableSelect from '@/component/searchable-select';
import NewDocCollaboratorCard from '@/component/new-doc-collaborator-card';

export default function ManageDocumentsDatabases() {
  const theme = useTheme();
  const router = useRouter();
  const small = useMediaQuery(theme.breakpoints.down('laptop'));
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const dispatch = useDispatch();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [isUpdateDatabase, setIsUpdateDatabase] = useState(false);
  const [isRemoveAccessModalOpen, setIsRemoveAccessModalOpen] = useState(false);
  const [currentRemoveAccessId, setCurrentRemoveAccessId] = useState(0);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [settingModalMode, setSettingModalMode] = useState('general');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertLabel, setAlertLabel] = useState('Your documents has been successfully uploaded');
  const [selectedDoc, setSelectedDoc] = useState({});
  const [selectedDocCollaborator, setSelectedDocCollaborator] = useState([
    {
      id: -1,
      first_name: "",
      last_name: "",
      email: "",
      role: "Owner"
    },
  ]);
  const [isLoadingDocCollaborator, setIsLoadingDocCollaborator] = useState(false);
  const [newCollaborator, setNewCollaborator] = useState(null);
  const [newCollaboratorRole, setNewCollaboratorRole] = useState('Viewer');
  const [searchUsers, setSearchUsers] = useState('');
  const repositoryData = useSelector(state => state.repository);
  const databasesData = useSelector(state => state.databases);
  const [search, setSearch] = useState('')

  const CustomNoRowsOverlay = () => (
    <div style={{ width: '100%', padding: '20px' }} />
  );

  const columns = [
    { 
      field: 'id', 
      headerName: 'Index',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 120,
    },
    {
      field: 'title',
      headerName: 'Document Name',
      headerClassName: 'super-app-theme--header', 
      headerAlign: 'center',
      width: 350,
      flex: small? 0 : 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header', 
      width: 150,
    },
    {
      field: 'confidentiality',
      headerName: 'Confidentiality',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center', 
      width: 150,
      valueGetter: (params) => {
        return params.row.is_public? 'Public' : 'Private';
      },
    },
    { 
      field: 'button',
      headerName: 'Action', 
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center', 
      width: 140, 
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row', 
            gap: '8px',
          }}
        >
          { params.row.category !== 'Determining....' && 
            <Button 
              color='warning' 
              variant='contained' 
              sx={{ 
                height: '25px',
                minWidth: '25px',
                width: '25px',
                display: 'flex',
                padding: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => handleClickOpenSetting(params.row)}
            >
              <EditIcon
                sx={{
                  width: '16px',
                  height: '16px',
                  color: theme.palette.white.main
                }}
              />
            </Button>
          }
          <Button 
            color='error' 
            variant='contained' 
            sx={{ 
              height: '25px',
              minWidth: '25px',
              width: '25px',
              display: 'flex',
              padding: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => handleClickOpenDelete(params.row)}
          >
            <DeleteIcon
              sx={{
                width: '16px',
                height: '16px',
                color: theme.palette.white.main
              }}
            />
          </Button>
        </Box>

      ),
    }
  ];

  const goToUploadDocuments = () => {
    const { id } = router.query;
    router.push({ pathname: '/repository/manage-documents/upload', query: { id: id} })
  }
  
  useEffect(() => {
    setIsLoading(true);
    const fetchDatabases = async () =>  {
      const token =  Cookies.get('access_token');
      const data = {
        page_no: 1,
        page_size: 100,
        find_document: search,
      }
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/documents/database`, {
          params : data,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch(getDatabasesDataSuccess(response.data))
      } catch (error){
        setAlertSeverity('error');
        setAlertLabel(`Network Error, Please try again`);
        setShowAlert(true);
      }
      if(isUpdateDatabase) setIsUpdateDatabase(false)
    }
    fetchDatabases()
    setIsLoading(false);
  }, [dispatch, id, isUpdateDatabase, search]);

  const formikDialog = useFormik({
    initialValues: {
      name: '',
      real_name: '',
    },
    validationSchema: deleteDocumentValidation,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const token = Cookies.get('access_token');
        await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/documents/${selectedDoc.id}/delete`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setIsUpdateDatabase(true)
        setAlertSeverity('success')
        setAlertLabel(`${values.name} has been successfully deleted.`);
        setShowAlert(true);
        setIsLoading(false);
        setIsDeleteModalOpen(false);
      } catch (error) {
        setAlertSeverity('error')
        if(error.response){
          switch (error.response.data.error_code){
            case 401:
              refresh('access_token', 'refresh_token', router)
              setAlertLabel('Your session has been restored. Please Try Again.');
              setShowAlert(true);
              break;
            case 'USER__NOT_ALLOWED':
              setAlertLabel('You are not allowed to perform this action');
              setShowAlert(true);
              break;
            case 'DOCUMENT__NOT_FOUND':
              setAlertLabel('Document not found');
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

  const formik = useFormik({
    initialValues: {
      name: '',
      category: 'General',
      is_public: '',
    },
    validationSchema: editDocumentValidation,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const { id } = router.query;
        const token = Cookies.get('access_token');
        await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/documents/${selectedDoc.id}/edit`, values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setIsUpdateDatabase(true)
        setIsSettingModalOpen(false)
        setAlertSeverity('success')
        setAlertLabel(`${values.name} has been successfully changed`);
        setShowAlert(true);
        setIsLoading(false);
      } catch (error) {
        setAlertSeverity('error')
        if(error.response){
          switch (error.response.data.error_code){
            case 401:
              refresh('access_token', 'refresh_token', router)
              setAlertLabel('Your session has been restored. Please Try Again.');
              setShowAlert(true);
              break;
            case 'USER__EMAIL_NOT_VERIFIED':
              setAlertLabel('Email is not verified');
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

  const hasFormChanged = (currentValues, initialValues ) => {
    return Object.keys(initialValues).some(fieldName => {
      if (fieldName === 'id') {
        return false;
      }
      return initialValues[fieldName] !== currentValues[fieldName];
    });
  };

  const handleChangeTab = (event, newValue) => {
    setSettingModalMode(newValue);
  };

  const handleClickShowAlert= () => setShowAlert((show) => !show);
  
  const handleClickOpenDelete = (doc) => {
    setSelectedDoc(doc);
    formikDialog.setFieldValue('real_name', doc.title)
    setIsDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setSelectedDoc({});
    setIsDeleteModalOpen(false);
  };

  const handleNewCollaboratorRoleChange = (event, id) => {
    setNewCollaboratorRole(event.target.value)
  }

  const handleRemoveNewCollaborator = () => {
    setNewCollaborator(null)
    setNewCollaboratorRole('viewer')
  }

  const addToDocs = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('access_token')
      const data = {
        collaborator_id : newCollaborator.id,
        role : newCollaboratorRole
      }
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/documents/${selectedDoc.id}/collaborators/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
    handleCloseSetting()
  }

  const handleClickOpenSetting = async (doc) => {
    setSelectedDoc(doc);
    formik.setFieldValue('name', doc.title)
    formik.setFieldValue('category', doc.category)
    formik.setFieldValue('is_public', doc.is_public)
    setIsSettingModalOpen(true);
    setIsLoadingDocCollaborator(true);
    try {
      const { id } = router.query;
      const token = Cookies.get('access_token');
      const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/documents/${doc.id}/collaborators`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSelectedDocCollaborator(response.data)
      setIsLoadingDocCollaborator(false);
    } catch (error) {
      setAlertSeverity('error')
      if(error.response){
        switch (error.response.data.error_code){
          case 401:
            refresh('access_token', 'refresh_token', router)
            setAlertLabel('Your session has been restored. Please Try Again.');
            setShowAlert(true);
            break;
          case 'USER__NOT_ALLOWED':
            setAlertLabel('You are not allowed to perform this action');
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
      setIsLoadingDocCollaborator(true);
    }
  };

  const handleRoleChanged = async (event, index) => {
    setIsLoading(true);
    try {
      const token = Cookies.get('access_token')
      const data = {
        collaborator_id : selectedDocCollaborator[index].id,
        role : event.target.value
      }
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/documents/${selectedDoc.id}/collaborators/edit`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAlertSeverity('success')
      setAlertLabel('Role updated successfully')
      setShowAlert(true)
      handleCloseSetting()
    } catch (error){
      setAlertSeverity('error')
      if(error.response){
        switch (error.response.data.error_code){
          case 401:
            refresh('access_token', 'refresh_token', router)
            setAlertLabel('Your session has been restored. Please Try Again.');
            setShowAlert(true);
            break;
          case 'USER__NOT_ALLOWED':
            setAlertLabel('You are not allowed to perform this action');
            setShowAlert(true);
            break;
          default :
            setAlertLabel('Network Error, Please Try Again.');
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

  const handleClickOpenRemoveAccess = (index) => {
    setCurrentRemoveAccessId(index);
    setIsRemoveAccessModalOpen(true);
  };

  const handleRemoveAccess = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('access_token')
      const data = {
        collaborator_id : selectedDocCollaborator[currentRemoveAccessId].id,
      }
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/documents/${selectedDoc.id}/collaborators/remove`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCurrentRemoveAccessId(0);
      setAlertSeverity('success')
      setAlertLabel(`${selectedDocCollaborator[currentRemoveAccessId].first_name} ${selectedDocCollaborator[currentRemoveAccessId].last_name} has been removed`)
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
    handleClickOpenSetting(selectedDoc)
    handleCloseRemoveAccess();
  }

  const handleCloseRemoveAccess = () => {
    setIsRemoveAccessModalOpen(false);
  }

  const handleCloseSetting = () => {
    setSelectedDoc({});
    setIsSettingModalOpen(false);
    setIsLoadingDocCollaborator(false);
    setSelectedDocCollaborator([
      {
        id: -1,
        first_name: "",
        last_name: "",
        email: "",
        role: "Owner"
      },
    ]);
    setNewCollaborator(null);
    setNewCollaboratorRole('Viewer');
    setSettingModalMode('general');
  };

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
                Manage Documents
                </Typography>
                <ManageDocumentsTabs
                  id={id} 
                  type={'databases'}
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
                    gap: '16px',
                  }} 
                >
                  <Box
                    sx={{
                      width:'100%',
                      display: 'flex',
                      flexDirection: 'row', 
                      alignItems: 'center',
                      justifyContent:'space-between',
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
                      Databases
                    </Typography>
                    <Button 
                      color='primary' 
                      variant='contained' 
                      sx={{ 
                        height: '32px', 
                        padding: '0 12px',
                        width: '150px',
                        typography: theme.typography.heading_h6,
                      }}
                      onClick={()=> goToUploadDocuments()}
                    >
                      New Document                    
                    </Button> 
                  </Box>
                  <Box sx={{ backgroundColor: 'light_gray.main', width: '100%', height: '1px',}}/>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '16px',
                      width:'100%',
                      flexDirection: {mobile: 'column', laptop: 'row'}, 
                      alignItems: {mobile: 'flex-start', laptop: 'center'},
                      justifyContent: {mobile: 'flex-start', laptop: 'space-between'},
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: {mobile: 'column', tablet: 'row'}, 
                        alignItems: {mobile: 'flex-start', tablet: 'center'},
                        justifyContent: 'flex-start',
                        gap: '16px',
                        [theme.breakpoints.down('laptop')]: {
                          width:'100%', 
                        },
                      }}
                    >
                      <OutlinedInput
                        id='monitor'
                        name='monitor'
                        placeholder='Find documents'
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        sx={{
                          width: '480px',
                          '& .MuiInputBase-input': {
                            height: '30px',
                            maxHeight: '30px',
                            padding: '0 16px',
                            display: 'flex',
                            justifyContent: 'center',
                            typography: theme.typography.paragraph_h6,
                            backgroundColor: theme.palette.white.main,
                            border: '1px solid',
                            borderColor: theme.palette.light_gray.main,
                            borderRadius: '5px',
                          },
                          '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            border: '0 !important',
                          },
                          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '0 !important',
                          },
                          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            border: '0 !important',
                          },
                          [theme.breakpoints.down('laptop')]: {
                            width: 'calc(100% - 48px)',
                          },
                          [theme.breakpoints.down('tablet')]: {
                            width: '100%',
                          },
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row', 
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '16px'
                      }}
                    >
                    </Box>
                  </Box>
                  <Box 
                    sx={{ 
                      width: '100%',
                      '& .super-app-theme--header': {
                        backgroundColor: theme.palette.primary.main,
                        typography: theme.typography.heading_h6,
                        color: theme.palette.white.main,
                        border: 0,
                      },
                      '& .nowrap': {
                        typography: theme.typography.paragraph_h6,
                        color: theme.palette.black.main,
                        whiteSpace: 'normal !important',
                        padding: '8px 0',
                        borderBottom: '0'
                      },
                      '& .center': {
                        typography: theme.typography.paragraph_h6,
                        color: theme.palette.black.main,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '0'
                      }, 
                    }}
                  >
                    <DataGrid
                      rows={databasesData.results}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      getCellClassName={(params) => {
                        if (!(params.field === 'title')) {
                          return 'center';
                        }
                        return 'nowrap';
                      }}
                      slots={{
                        noRowsOverlay: CustomNoRowsOverlay
                      }}
                      rowHeight={48}
                      columnHeaderHeight={50}
                      pageSizeOptions={[5, 10, 25]}
                      rowSelection={false}
                      disableColumnMenu={true}
                      sx={{
                        '& .nowrap': {
                          typography: theme.typography.paragraph_h6,
                          color: theme.palette.black.main,
                          whiteSpace: 'normal !important',
                          padding: '8px 0',
                          borderBottom: '0'
                        },
                        '& .center': {
                          typography: theme.typography.paragraph_h6,
                          color: theme.palette.black.main,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: '0'
                        }, 
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
          <Dialog
            open={isDeleteModalOpen}
            onClose={handleCloseDelete}
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "516px",
                  borderRadius: "16px"
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
              <Typography variant='popup_heading' color='black.main'>Delete this document</Typography>
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
              <Typography variant='form_label_small' color='black.main' textAlign='center'>{`Delete ${formikDialog.values.real_name}`}</Typography>
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
                This action <span className='bold'>cannot</span> be undone. This will permanently delete this <span className='bold'>document</span> and remove all <span className='bold'>collaborator associations.</span>
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
                  label={["Please type ", <span key={1} className='bold'>{formikDialog.values.real_name}</span>,  " to confirm."]}
                  placeholder={formikDialog.values.real_name}
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
                  I understand, delete this document
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog
            open={isSettingModalOpen}
            onClose={handleCloseSetting}
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "768px",
                  borderRadius: "16px"
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
              <Typography variant='popup_heading' color='black.main'>Edit Documents</Typography>
              <IconButton sx={{ padding: 0, }} onClick={handleCloseSetting}>
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
                padding: '16px 24px 40px 24px',
                gap: '12px',
              }}
            >
              <Tabs
                value={settingModalMode}
                onChange={handleChangeTab}
                variant="fullWidth"
                sx={{
                  width: "100%",
                  [theme.breakpoints.up('tablet')]: {
                    borderBottomColor: 'theme.palette.light_gray.main',
                    borderBottom: '1px solid'
                  },
                  [theme.breakpoints.down('tablet')]: {
                    borderRightColor: 'theme.palette.main',
                    borderRight: '1px solid'
                  },

                }}
                orientation={ mobile? "vertical" : "horizontal" }
              >
                <Tab
                  value="general"
                  label="General"
                />
                <Tab 
                  value="collaborator" 
                  label="Collaborator" 
                />
              </Tabs>
              { settingModalMode==='general' &&
                <form
                  onSubmit={formik.handleSubmit} 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '24px',
                    marginTop: '12px',
                  }}
                >
                  <FormInput 
                    id='name'            
                    name='name'
                    label='Document Name'
                    placeholder='Enter a repository name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helpertext={formik.touched.name && formik.errors.name}
                    required={true}
                    small={true}
                  />
                  <Box
                    sx={{
                      width:'100%',
                      display: 'flex',
                      flexDirection: {mobile:'column', tablet:'row'},
                      alignItems: {mobile:'flex-start', tablet:'center'},
                      justifyContent: {mobile:'flex-start', tablet:'space-between'},
                      gap: '8px',
                    }} 
                  >
                    <Box
                      sx={{
                        width:{mobile: '100%', tablet: 'calc(100% - 176px)'},
                        display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'flex-start',
                        justifyContent:'space-between',
                        gap: '8px',
                      }} 
                    >
                      <Typography sx={{ color: 'black.main', typography: 'form_label_small',}}>Change document category</Typography>
                      <Typography sx={{ color: 'black.main', typography: 'form_sublabel_small',}}>{`This document is currently ${formik.values.category} document.`}</Typography>
                    </Box>
                    <Dropdown
                      label={'Category'}
                      placeholder={'Category'} 
                      value={formik.values.category}
                      id={formik.values.category}
                      handleChange={(event) => formik.setFieldValue('category', event.target.value)}
                      options={categoryOption}
                      width={mobile ? '100%' : '150px'}
                      backgroundColor={theme.palette.white.main}
                    />
                  </Box>
                  <Box
                    sx={{
                      width:'100%',
                      display: 'flex',
                      flexDirection: {mobile:'column', tablet:'row'},
                      alignItems: {mobile:'flex-start', tablet:'center'},
                      justifyContent: {mobile:'flex-start', tablet:'space-between'},
                      gap: '8px',
                    }} 
                  >
                    <Box
                      sx={{
                        width:{mobile: '100%', tablet: 'calc(100% - 176px)'},
                        display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'flex-start',
                        justifyContent:'space-between',
                        gap: '8px',
                      }} 
                    >
                      <Typography sx={{ color: 'black.main', typography: 'form_label_small',}}>Change document visibility</Typography>
                      <Typography sx={{ color: 'black.main', typography: 'form_sublabel_small',}}>{`This document is currently ${formik.values.is_public ? 'public' : 'private'}.`}</Typography>
                    </Box>
                    <Button 
                      color='danger_button' 
                      variant='contained' 
                      sx={{ 
                        height: '32px', 
                        padding: '0 10px',
                        width: {mobile: '100%', tablet: '150px'},
                        typography: theme.typography.heading_h6,
                        color: theme.palette.white.main,
                      }}
                      onClick={() => formik.setFieldValue('is_public', !formik.values.is_public)}
                    >
                      {formik.values.is_public? 'Change to Private' : 'Change to Public'}
                    </Button> 
                  </Box>
                  <Button 
                    color='primary' 
                    variant='contained' 
                    sx={{ 
                      height: '32px', 
                      padding: '0 12px',
                      width: {mobile: '100%', tablet: '150px'},
                      typography: theme.typography.heading_h6,
                      alignSelf: 'flex-end',
                      '&.Mui-disabled': {
                        backgroundColor: theme.palette.dark_gray.light,
                        color: theme.palette.light_gray.light,
                      },}}
                    type='submit'
                    disabled={!(hasFormChanged(formik.values, selectedDoc))}
                  >
                    Save Changes 
                  </Button> 
                </form>
              }
              { settingModalMode==='collaborator' && isLoadingDocCollaborator &&
                <Box 
                sx={{
                    backgroundColor: 'transparent',
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CircularProgress
                    size={60}
                    thickness={4}
                  />
                </Box>
              }
              { settingModalMode==='collaborator' && !isLoadingDocCollaborator &&
                <>
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
                  <>
                    <NewDocCollaboratorCard
                      item={newCollaborator}
                      role={newCollaboratorRole}
                      new={true}
                      onRoleChange={handleNewCollaboratorRoleChange}
                      onRemoveNewCollaborator={handleRemoveNewCollaborator}
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
                      onClick={addToDocs}
                    >
                      Add to this documents
                    </Button>
                  </>
                }
                { !newCollaborator && 
                  <Box
                    sx={{
                      width:'100%',
                      height: '300px',
                      display: 'flex',
                      flexDirection: 'column', 
                      alignItems: 'flex-start',
                      justifyContent:'flex-start',
                      gap: '16px',
                      paddingLeft: '24px',
                      [theme.breakpoints.down('small')]: {
                        paddingLeft: '0px',
                      },
                      overflowY: 'scroll'
                    }}
                  >
                    {selectedDocCollaborator.map((collaborator, index) => (
                      <DocCollaboratorCard
                        key={index}
                        order={index}
                        item={collaborator}
                        onRoleChange={handleRoleChanged}
                        onRemoveAccess={() => handleClickOpenRemoveAccess(index)}
                      />
                    ))}
                  </Box>
                }
                </>
              }
            </DialogContent>
          </Dialog>
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
                <IconButton 
                  sx={{ padding: 0, }} 
                  onClick={handleCloseRemoveAccess}
                >
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
              <Typography variant='form_label_small' color='black.main' textAlign='center'>Remove {`${selectedDocCollaborator[currentRemoveAccessId].first_name} ${selectedDocCollaborator[currentRemoveAccessId].last_name}`} from <span className='bold'>{selectedDoc.title}</span></Typography>
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
                Once removed, <span className='bold'>{`${selectedDocCollaborator[currentRemoveAccessId].first_name} ${selectedDocCollaborator[currentRemoveAccessId].last_name}`}</span> will no longer have direct access to <span className='bold'>{selectedDoc.title}</span>.
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
                onClick={handleRemoveAccess}
              >
                Remove Access
              </Button> 
            </DialogContent>
          </Dialog>
        </>
      }
    </>
  )
}
