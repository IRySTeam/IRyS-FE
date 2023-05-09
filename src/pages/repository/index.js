import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { Container, Button, Typography, Box, OutlinedInput, Link, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import CustomAlert from '@/component/custom-alert';
import NavBar from '@/component/navbar';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dropdown from '@/component/dropdown';
import DocumentCard from '@/component/document-card';
import { sortOption } from '@/constants/option';
import { getSingleRepoSuccess } from '@/state/actions/singleRepositoryActions';
import { getRepoCollaboratorListFailed, getRepoCollaboratorListSuccess, getRepoDetailFailed, getRepoDetailSuccess } from '@/state/actions/repositoryActions';
import { getSearchDocumentFailed, getSearchDocumentSuccess } from '@/state/actions/searchDocumentActions';
import { removeEmptyFilters } from '@/utils/array';

export default function Repository() {
  const theme = useTheme();
  const router = useRouter();
  const { id, search, sort } = router.query;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  const [searchQuery, setSearchQuery] = useState(search? search : '');
  const [sortQuery, setSortQuery] = useState(sort? sort : '');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertLabel, setAlertLabel] = useState('Repository successfully created!');
  const singleRepositoryData = useSelector(state => state.singleRepository);
  const searchDocumentData = useSelector(state => state.searchDocument);
  const repositoryData = useSelector(state => state.repository);
  const filterDocument = useSelector(state => state.filter);

  const handleChangeSortQuery = (event) => {
    setSortQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    const { id } = router.query;
    router.push({ pathname: '/repository', query: { id: id,} })
  }

  const handleClickShowAlert= () => setShowAlert((show) => !show);

  const goToSetting = () => {
    const { id } = router.query;
    router.push({ pathname: '/repository/setting/general', query: { id: id} })
  }

  const goToCollaboratorSetting = () => {
    const { id } = router.query;
    router.push({ pathname: '/repository/setting/collaborators', query: { id: id} })
  }

  const goToManageDocuments = () => {
    const { id } = router.query;
    router.push({ pathname: '/repository/manage-documents/databases', query: { id: id} })
  }

  const goToUploadDocuments = () => {
    const { id } = router.query;
    router.push({ pathname: '/repository/manage-documents/upload', query: { id: id} })
  }

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

      const fetchRepoCollaborator = async () =>  {
        const token =  Cookies.get('access_token');
        try {
          const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/members`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          dispatch(getRepoCollaboratorListSuccess(response.data))
        } catch (error){
          dispatch(getRepoCollaboratorListFailed(error.response.data))
          setAlertSeverity('error');
          setAlertLabel(`Network Error, Please try again`);
          setShowAlert(true);
        }
      }

      // const fetchDocument = async () =>  {
      //   const token =  Cookies.get('access_token');
      //   try {
      //     const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/documents`, {
      //       headers: {
      //         Authorization: `Bearer ${token}`
      //       }
      //     })
      //     dispatch(getSingleRepoSuccess(response.data))
      //   } catch (error){
      //     // TODO CHANGE TO NEW ENDPOINT
      //     // dispatch(getSingleRepoFailed(error.response.data))
      //     dispatch(getSingleRepoSuccess([{file: 1}, {file:2}, {file:3}]))
      //     setAlertSeverity('error');
      //     setAlertLabel(`Network Error, Please try again`);
      //     setShowAlert(true);
      //   }
      // }
      
      if(!repositoryData.id || repositoryData.id !== id){
        fetchDetailRepo()
        fetchRepoCollaborator()
        // fetchDocument()
      }

      setIsLoading(false);
    }
  }, [dispatch, router, repositoryData.id]);

  useEffect(() => {
    setIsLoadingDocs(true);
    const { id } = router.query;
    if(!id){
      router.replace({ pathname: '/', query: { search : '', type: '', sort:'', page: 1} })
    }else{
      const token =  Cookies.get('access_token');
      const fetchSearchDocumentBasic = async () =>  {
        const data = {
          query: filterDocument.keyword,
          domain: filterDocument.domain === '' ? 'general' : filterDocument.domain,
          advanced_filter: {
            match: removeEmptyFilters(filterDocument.filters)
          }
        }
        try {
          const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/search/repository/${id}`, data, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          dispatch(getSearchDocumentSuccess(response.data))
          dispatch(getSingleRepoSuccess([{file: 1}, {file:2}, {file:3}]))
          setIsLoadingDocs(false);
        } catch (error){
          console.log(error)
          dispatch(getSearchDocumentFailed(error.response.data))
          setAlertSeverity('error');
          setAlertLabel(`Network Error, Please try again`);
          setShowAlert(true);
          setIsLoadingDocs(false);
        }
      }

      const fetchSearchDocumentCli = async () =>  {
        const data = JSON.parse(filterDocument.cliQuery)
        try {
          const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/search/repository/${id}`, data, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          dispatch(getSearchDocumentSuccess(response.data))
          dispatch(getSingleRepoSuccess([{file: 1}, {file:2}, {file:3}]))
          setIsLoadingDocs(false);
        } catch (error){
          console.log(error)
          dispatch(getSearchDocumentFailed(error.response.data))
          setAlertSeverity('error');
          setAlertLabel(`Network Error, Please try again`);
          setShowAlert(true);
          setIsLoadingDocs(false);
        }
      }

      const fetchSearchDocumentFile = async () =>  {
        const data = new FormData();
        data.append('file', filterDocument.file)
        const params = {
          domain: filterDocument.domain === '' ? 'general' : filterDocument.domain
        }
        try {
          const response = await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/search/repository/${id}/file`, data, {
            params: params,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            }
          })
          dispatch(getSearchDocumentSuccess(response.data))
          setIsLoadingDocs(false);
        } catch (error){
          console.log(error)
          dispatch(getSearchDocumentFailed(error.response.data))
          setAlertSeverity('error');
          setAlertLabel(`Network Error, Please try again`);
          setShowAlert(true);
          setIsLoadingDocs(false);
        }
      }

      if(filterDocument.mode === 'basic' ){
        fetchSearchDocumentBasic()
      } else if (filterDocument.mode === 'cli' ){
        fetchSearchDocumentCli()
      } else if (filterDocument.mode === 'file' ) {
        fetchSearchDocumentFile()
      }
    }
  }, [dispatch, router, repositoryData.id, filterDocument]);

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
              [theme.breakpoints.down('tablet')]: {
                gap: '16px'
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
              display: 'flex',
              flexDirection: {mobile: 'column', laptop: 'row'},
              justifyContent: {mobile: 'flex-start', laptop: 'space-between'},
              alignItems: 'flex-start',
              width: '100%',
              gap: '40px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: {mobile: '100%', laptop: 'calc(100% - 360px)'},
                gap: '16px'
              }}
            >
              <Box
                sx={{
                  width:'100%',
                  display: 'flex',
                  flexDirection: { mobile: 'column-reverse', tablet: 'row' }, 
                  gap: '16px',
                  alignItems: 'flex-start',
                  justifyContent: { mobile: 'flex-start', tablet: 'space-between' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { mobile: 'column', tablet: 'row' }, 
                    gap: '16px',
                    alignItems: 'flex-start',
                    justifyContent: { mobile: 'flex-start', tablet: 'space-between', small: 'flex-start' },
                    [theme.breakpoints.down('small')]: {
                      width:'100%', 
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row', 
                      gap: '16px',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      [theme.breakpoints.down('small')]: {
                        width:'100%', 
                      },
                    }}
                  >
                    <OutlinedInput
                      id='own'
                      name='own'
                      placeholder='Find a document...'
                      value={searchQuery}
                      onChange={(e)=>setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      sx={{
                        width: '720px',
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
                        [theme.breakpoints.down('large')]: {
                          width: '560px',
                        },
                        [theme.breakpoints.down('desktop')]: {
                          width: '320px',
                        },
                        [theme.breakpoints.down('small')]: {
                          width: '280px',
                        },
                        [theme.breakpoints.down('tablet')]: {
                          width: 'calc(100% - 56px)',
                        },
                        
                      }}
                    />
                    <Button
                      variant='contained'
                      color='primary'
                      sx={{
                        minWidth: '32px',
                        width: '32px',
                        maxHeight: '32px',
                        padding: '8px 8px',
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '5px'
                      }}
                      onClick={() => handleSearch()}
                    >
                      <SearchIcon />
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: {mobile: 'column', mobile_l: 'row'}, 
                      gap: '16px',
                      alignItems: 'flex-start',
                      justifyContent: {mobile: 'space-between', small: 'flex-start'},
                      [theme.breakpoints.down('tablet')]: {
                        width:'100%', 
                      },
                    }}
                  >
                    <Button 
                      color='primary' 
                      variant='contained' 
                      sx={{ 
                        height: '32px',
                        width: {mobile: '100%', tablet:'180px'},
                        typography: theme.typography.heading_h6,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: {mobile: 'center', tablet:'space-between'},
                        alignItems: 'center',
                      }}
                      onClick={() => router.push({ pathname: '/search/advanced',  query: { from: router.asPath, origin: router.pathname } })}
                    >
                      <Typography
                        sx={{ 
                          color: 'white.main', 
                          typography: 'heading_h6',
                        }}
                      >
                        Advanced Search
                      </Typography>
                      <KeyboardDoubleArrowDownOutlinedIcon 
                        sx={{
                          width: '18px',
                          height: '18px',
                          color: theme.palette.white.main
                        }}
                      />
                    </Button>
                    <Dropdown
                      label={'Order'} 
                      placeholder={'Sort'} 
                      value={sortQuery}
                      handleChange={handleChangeSortQuery}
                      options={sortOption}
                      defaultValue={''}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{flexGrow:1, width: '100%', maxWidth:'large'}}>
                { isLoadingDocs &&
                  <Loading transparent={true} centered={false}/>
                }
                { !isLoadingDocs && (singleRepositoryData.isEmpty || singleRepositoryData.documents.length === 0 || (searchDocumentData.count === 0) ) &&
                  <Box
                    sx={{
                      width: '100%', 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItem: 'center'
                    }}
                  >
                    <Typography variant='paragraph_h2' color='dark_gray.main' sx={{textAlign: 'center'}}>{singleRepositoryData.isEmpty ? 'No document.' : 'No documents found.'}</Typography>
                    <Typography variant='paragraph_h4' color='dark_gray.main' sx={{textAlign: 'center'}}>
                      {singleRepositoryData.isEmpty ? 
                      <>
                      This repository is empty. Please&nbsp;
                      <Link
                        variant='paragraph_h4'
                        underline='none'
                        href={'/repository/upload'}
                        color={'primary.main'}
                      >
                        upload a document&nbsp;
                      </Link>
                      to continue
                      </>
                      : 
                      'Please check for typos, or use fewer terms or fields.'}
                    </Typography>
                  </Box>
                }
                { !isLoadingDocs && !singleRepositoryData.isEmpty && singleRepositoryData.documents.length > 0 && searchDocumentData.count > 0 && 
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      width: '100%'
                    }}
                  >
                    { searchDocumentData.documents.map((docs, index) => (
                      <DocumentCard
                        key={index}
                        item={docs}
                        query={search}
                      />
                    ))}
                  </Box> 
                }
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: {mobile: '100%', laptop: '300px'}
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 0 24px 0',
                  borderBottom: '1px solid',
                  borderBottomColor: theme.palette.light_gray.main,
                  [theme.breakpoints.down('laptop')]:{
                    padding: '24px 0',
                    borderTop: '1px solid',
                    borderTopColor: theme.palette.light_gray.main,
                  }
                }}
              >
                <Typography sx={{ color: 'black.main', typography: 'heading_h4' }}>Setting</Typography>
                <IconButton 
                  sx={{ padding: 0 }}
                  onClick={() => goToSetting()}
                >
                  <SettingsIcon
                    sx={{
                      width: '24px',
                      height: '24px',
                      color: theme.palette.primary.main,
                    }}
                  />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '24px 0',
                  gap: '16px',
                  borderBottom: '1px solid',
                  borderBottomColor: theme.palette.light_gray.main,
                }}
              >
                <Typography sx={{ color: 'black.main', typography: 'heading_h4' }}>About</Typography>
                <Typography sx={{ color: 'dark_gray.main', typography: 'paragraph_h6' }}>{repositoryData.description ?? 'No description provided.'}</Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '24px 0',
                  gap: '16px',
                  borderBottom: '1px solid',
                  borderBottomColor: theme.palette.light_gray.main,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ color: 'black.main', typography: 'heading_h4' }}>Documents</Typography>
                  <IconButton 
                    sx={{ padding: 0 }}
                    onClick={() => goToUploadDocuments()}
                  >
                    <AddIcon
                      sx={{
                        width: '24px',
                        height: '24px',
                        color: theme.palette.primary.main,
                      }}
                    />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '4px'
                  }}
                >
                  <InsertDriveFileOutlinedIcon
                    sx={{
                      width: '20px',
                      height: '20px',
                      color: theme.palette.primary.main,
                    }}
                  />
                  <Typography sx={{ color: 'black.main', typography: 'paragraph_h6_bold', marginLeft: '12px' }}>{singleRepositoryData.documents.length}</Typography>
                  <Typography sx={{ color: 'black.main', typography: 'paragraph_h6' }}>Document{singleRepositoryData.documents.length > 1? 's':''}</Typography>
                </Box>
                <Button 
                  color='primary' 
                  variant='contained' 
                  sx={{ 
                    height: '32px',
                    width: '100%',
                    typography: theme.typography.heading_h6,
                  }}
                  onClick={() => goToManageDocuments()}
                >
                  <Typography sx={{ color: 'white.main', typography: 'heading_h6',}}> Manage Documents </Typography>
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '24px 0',
                  gap: '16px',
                  borderBottom: '1px solid',
                  borderBottomColor: theme.palette.light_gray.main,
                }}
              >
                <Typography sx={{ color: 'black.main', typography: 'heading_h4' }}>Collaborators</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    gap: '8px',
                  }}
                >
                  { repositoryData.collaborators &&
                   repositoryData.collaborators.map((person, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '16px',
                      }}
                    >
                      <AccountCircleIcon
                        sx={{
                          width: '20px',
                          height: '20px',
                          color: theme.palette.primary.main
                        }}
                      />
                      <Typography sx={{ color: 'black.main', typography: 'paragraph_h6',}}>{`${person.first_name} ${person.last_name}`}</Typography>
                    </Box>
                   ))
                  }
                </Box>
                <Button 
                  color='primary' 
                  variant='contained' 
                  sx={{ 
                    height: '32px',
                    width: '100%',
                    typography: theme.typography.heading_h6,
                  }}
                  onClick={() => goToCollaboratorSetting()}
                >
                  <Typography sx={{ color: 'white.main', typography: 'heading_h6',}}> Manage Collaborators </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
          </Container>
        </> 
      }
    </>
  )
}
