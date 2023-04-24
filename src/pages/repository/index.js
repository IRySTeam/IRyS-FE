import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { documentList } from '@/data/documents';
import { repositoryFilled } from '@/data/repository';
import { getSingleRepoSuccess } from '@/state/actions/singleRepositoryActions';
import DocumentCard from '@/component/document-card';

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

  const handleChangeSortQuery = (event) => {
    setSortQuery(event.target.value);
    handleSearch(searchQuery, event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = (searchFilter = searchQuery, sortFilter = sortQuery) => {
    const { id } = router.query;
    router.push({ pathname: '/repository', query: { id: id, search: searchFilter, sort: sortFilter } })
  }

  const handleClickShowAlert= () => setShowAlert((show) => !show);

  const goToSetting = () => {
    const { id } = router.query;
    router.push({ pathname: '/repository/setting/general', query: { id: id} })
  }

  const sortOption = [
    { value: '', label: 'None'},
    { value: 'updated_at', label: 'Last Updated'},
    { value: 'name', label: 'Name (A-Z)'},
  ]

  useEffect(() => {
    setIsLoadingDocs(true);
    const filterArrayRepo = (array) => {
      const searchFilter = !search ? array : array.filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase()))
      const sortFilter = sortQuery === ''? searchFilter: searchFilter.sort((a, b) => {
        if (sortQuery === 'updated_at') {
          return b.last_updated - a.last_updated;
        } else if (sortQuery === 'name') {
          return a.name.localeCompare(b.name);
        }
      });
      return sortFilter
    }
  
    setTimeout(() => {
      const result = {
        documents: filterArrayRepo(documentList),
        isEmpty : false,
      }
      dispatch(getSingleRepoSuccess(result))
      setIsLoadingDocs(false);
    }, 1000);
  }, [dispatch, search, sortQuery]);

  useEffect(() => {
    setIsLoading(true);
    const { id } = router.query;
    if(!id){
      router.replace({ pathname: '/', query: { search : '', type: '', sort:'', page: 1} })
    }else{
      setIsLoading(false);
    }
  }, [router]);

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
            Repository XYZ
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
                      onClick={() => router.push({ pathname: '/search/advanced',  query: { from: router.asPath } })}
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
                { !isLoadingDocs && (singleRepositoryData.isEmpty || singleRepositoryData.documents.length === 0) &&
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
                { !isLoadingDocs && !singleRepositoryData.isEmpty && singleRepositoryData.documents.length > 0 && 
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      width: '100%'
                    }}
                  >
                    { singleRepositoryData.documents.map((docs, index) => (
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
                <Typography sx={{ color: 'dark_gray.main', typography: 'paragraph_h6' }}>These repositories are collections of books, that are organized and stored for the needs of Myself</Typography>
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
                  <IconButton sx={{ padding: 0 }}>
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
                  <Typography sx={{ color: 'black.main', typography: 'paragraph_h6_bold', marginLeft: '12px' }}>20</Typography>
                  <Typography sx={{ color: 'black.main', typography: 'paragraph_h6' }}>Documents</Typography>
                </Box>
                <Button 
                  color='primary' 
                  variant='contained' 
                  sx={{ 
                    height: '32px',
                    width: '100%',
                    typography: theme.typography.heading_h6,
                  }}
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
                  { repositoryFilled.collaborators &&
                   repositoryFilled.collaborators .map((person, index) => (
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
                      <Typography sx={{ color: 'black.main', typography: 'paragraph_h6',}}>{person.name}</Typography>
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
