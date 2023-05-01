import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { Container, Box, Typography,} from '@mui/material';
import NavBar from '@/component/navbar';
import Loading from '@/component/loading';
import CustomAlert from '@/component/custom-alert';
import ManageDocumentsTabs from '@/component/tabs/manage-documents';
import { getMonitorDataSuccess } from '@/state/actions/monitorActions';
import { formatDateTable } from '@/utils/date';

export default function ManageDocumentsMonitor() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertLabel, setAlertLabel] = useState('Your documents has been successfully uploaded');
  const repositoryData = useSelector(state => state.repository);
  const monitorData = useSelector(state => state.monitor);
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState(10)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('ALL')

  const columns = [
    { 
      field: 'id', 
      headerName: 'Index', 
      width: 100
    },
    {
      field: 'title',
      headerName: 'Document Name',
      width: 350,
    },
    {
      field: 'updated_at',
      headerName: 'Updated At',
      width: 150,
      valueGetter: (params) => {
        return formatDateTable(params.row.updated_at);
      },
    },
    {
      field: 'index',
      headerName: 'Status',
      width: 120,
      valueGetter: (params) => {
        return params.row.index.status;
      },
    },
    { 
      field: 'button',
      headerName: 'Action', 
      width: 120, 
      renderCell: (params) => (
        <button onClick={() => console.log(`Clicked row ${params.row.id}`)}>Click me</button>
      )
    }
  ];
  
  useEffect(() => {
    setIsLoading(true);
    const fetchMonitor = async () =>  {
      const token =  Cookies.get('access_token');
      const data = {
        status: status,
        page_no: page? page : 1,
        page_size: rows,
      }
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/monitor`, {
          params : data,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response.data);
        dispatch(getMonitorDataSuccess(response.data))
      } catch (error){
        setAlertSeverity('error');
        setAlertLabel(`Network Error, Please try again`);
        setShowAlert(true);
      }
    }
    fetchMonitor()
    setIsLoading(false);
  }, [dispatch, id, page, rows, search, status]);

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
                    Monitor Documents
                  </Typography>
                  <Box sx={{ backgroundColor: 'light_gray.main', width: '100%', height: '1px',}}/>
                  <Box sx={{ width: '100%' }}>
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
                      pageSizeOptions={[10]}
                      columnBuffer={24}
                      disableRowSelectionOnClick
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
