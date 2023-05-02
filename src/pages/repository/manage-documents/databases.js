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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from '@/component/navbar';
import Loading from '@/component/loading';
import CustomAlert from '@/component/custom-alert';
import ManageDocumentsTabs from '@/component/tabs/manage-documents';
import Dropdown from '@/component/dropdown';
import { statusOption } from '@/constants/option';
import { getDatabasesDataSuccess } from '@/state/actions/databasesActions';

export default function ManageDocumentsDatabases() {
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
  const databasesData = useSelector(state => state.databases);
  const [search, setSearch] = useState('')

  const CustomNoRowsOverlay = () => (
    <div style={{ width: '100%', padding: '20px' }} />
  );

  const rows = [
    {
      id: 1,
      title: "document 1",
      category: "Scientific",
      is_public: true,
    },
    {
      id: 2,
      title: "document 2",
      category: "General",
      is_public: true,
    },
    {
      id: 3,
      title: "document 3",
      category: "Recruitment",
      is_public: true,
    },
    {
      id: 4,
      title: "document 4",
      category: "Scientific",
      is_public: false,
    },
    {
      id: 5,
      title: "document 5",
      category: "General",
      is_public: false,
    },
    {
      id: 6,
      title: "document 6",
      category: "Recruitment",
      is_public: true,
    },
    {
      id: 7,
      title: "document 7",
      category: "Scientific",
      is_public: true,
    },
    {
      id: 8,
      title: "document 8",
      category: "General",
      is_public: true,
    },
    {
      id: 9,
      title: "document 9",
      category: "Recruitment",
      is_public: true,
    },
    {
      id: 10,
      title: "document 10",
      category: "Scientific",
      is_public: false,
    },
    {
      id: 11,
      title: "document 11",
      category: "General",
      is_public: false,
    },
    {
      id: 12,
      title: "document 12",
      category: "Recruitment",
      is_public: true,
    }
  ]

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
            onClick={() => console.log('edit', params.row.id, params.row.title)}
          >
            <EditIcon
              sx={{
                width: '16px',
                height: '16px',
                color: theme.palette.white.main
              }}
            />
          </Button>
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
            onClick={() => console.log('delete', params.row.id, params.row.title)}
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
    }
    fetchDatabases()
    setIsLoading(false);
  }, [dispatch, id, search]);


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
        </>
      }
    </>
  )
}
