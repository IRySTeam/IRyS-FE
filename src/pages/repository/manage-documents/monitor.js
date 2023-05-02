import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { Container, Box, Typography, Button, OutlinedInput} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import NavBar from '@/component/navbar';
import Loading from '@/component/loading';
import CustomAlert from '@/component/custom-alert';
import ManageDocumentsTabs from '@/component/tabs/manage-documents';
import { getMonitorDataSuccess } from '@/state/actions/monitorActions';
import { formatDateTable } from '@/utils/date';
import Dropdown from '@/component/dropdown';
import { statusOption } from '@/constants/option';
import { refresh } from '@/utils/token';

export default function ManageDocumentsMonitor() {
  const theme = useTheme();
  const router = useRouter();
  const small = useMediaQuery(theme.breakpoints.down('laptop'));
  const dispatch = useDispatch();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertLabel, setAlertLabel] = useState('Your documents has been successfully uploaded');
  const repositoryData = useSelector(state => state.repository);
  const monitorData = useSelector(state => state.monitor);
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('ALL')

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const CustomNoRowsOverlay = () => (
    <div style={{ width: '100%', padding: '20px' }} />
  );

  const getStatusColor = (status) => {
    switch(status){
      case 'READY':
        return theme.palette.status.ready
      case 'PARSING':
        return theme.palette.status.parsing
      case 'EXTRACTING':
        return theme.palette.status.extracting
      case 'INDEXING':
        return theme.palette.status.indexing
      case 'SUCCESS':
        return theme.palette.status.success
      case 'FAILED':
        return theme.palette.status.failed
    }
  }

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
      field: 'updated_at',
      headerName: 'Updated At',
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header', 
      width: 150,
      valueGetter: (params) => {
        return formatDateTable(params.row.updated_at);
      },
    },
    {
      field: 'index',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center', 
      width: 140,
      renderCell: (params) => {
        return (<Box 
          sx={{ 
            height: '25px',
            width: '120px',
            typography: theme.typography.heading_h6,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            backgroundColor: getStatusColor(params.row.index.status),
          }}
        >
          <Typography
            sx={{ 
              color: 'white.main', 
              typography: 'heading_h6',
            }}
          >
            {params.row.index.status}
          </Typography>
        </Box>)
      },
    },
    { 
      field: 'button',
      headerName: 'Action', 
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center', 
      width: 140, 
      renderCell: (params) => (
        <Button 
          color='primary' 
          variant='contained' 
          sx={{ 
            height: '25px',
            width: '120px',
            typography: theme.typography.heading_h6,
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => reindexDocument(params.row.id, params.row.title)}
        >
          <Typography
            sx={{ 
              color: 'white.main', 
              typography: 'heading_h6',
            }}
          >
            Reindex
          </Typography>
          <RefreshIcon
            sx={{
              width: '20px',
              height: '20px',
              color: theme.palette.white.main
            }}
          />
        </Button>
      ),
    }
  ];
  
  useEffect(() => {
    setIsLoading(true);
    const fetchMonitor = async () =>  {
      const token =  Cookies.get('access_token');
      const data = {
        status: status,
        page_no: 1,
        page_size: 100,
        find_document: search
      }
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/monitor`, {
          params : data,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch(getMonitorDataSuccess(response.data))
      } catch (error){
        setAlertSeverity('error');
        setAlertLabel(`Network Error, Please try again`);
        setShowAlert(true);
      }
    }
    fetchMonitor()
    setIsLoading(false);
  }, [dispatch, id, search, status]);

  const fetchMonitor = async () =>  {
    const token =  Cookies.get('access_token');
    const data = {
      status: status,
      page_no: 1,
      page_size: 100,
      find_document: search
    }
    try {
      const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/monitor`, {
        params : data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(getMonitorDataSuccess(response.data))
    } catch (error){
      setAlertSeverity('error');
      setAlertLabel(`Network Error, Please try again`);
      setShowAlert(true);
    }
  }

  const reindexAll = async () =>  {
    const token =  Cookies.get('access_token');
    try {
      await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/documents/reindex`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAlertSeverity('success');
      setAlertLabel('All of your documents has been started to reindex');
      setShowAlert(true);
      fetchMonitor()
    } catch (error){
      if(error.response){
        setAlertSeverity('error');
        switch (error.response.data.error_code){
          case 401:
            refresh('access_token', 'refresh_token', router);
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
  }

  const reindexDocument = async (docId) =>  {
    const token =  Cookies.get('access_token');
    try {
      await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/documents/${docId}/reindex`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAlertSeverity('success');
      setAlertLabel('Your document has been started to reindex');
      setShowAlert(true);
      fetchMonitor()
    } catch (error){
      if(error.response){
        setAlertSeverity('error');
        switch (error.response.data.error_code){
          case 401:
            refresh('access_token', 'refresh_token', router);
            setIsLoading(false);
            break;
          case 'USER__NOT_ALLOWED':
            setAlertLabel('You are not allowed to perform this action');
            setShowAlert(true);
            break;
          case 404:
            setAlertLabel('Document not found. Please try again.');
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
                Manage Documents
                </Typography>
                <ManageDocumentsTabs
                  id={id} 
                  type={'monitor'}
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
                      Monitor Documents
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
                      onClick={()=> reindexAll()}
                    >
                      Reindex All
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
                      <Dropdown
                        label={'Status'}
                        placeholder={'Status'} 
                        value={status}
                        handleChange={handleChangeStatus}
                        options={statusOption}
                        defaultValue={'ALL'}
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
                      rows={monitorData.results}
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
        </>
      }
    </>
  )
}
