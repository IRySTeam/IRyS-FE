import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Container, Button, Typography, Box, OutlinedInput, Link } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import CustomAlert from '@/component/custom-alert';
import NavBar from '@/component/navbar';
import SearchIcon from '@mui/icons-material/Search';
import Dropdown from '@/component/dropdown';
import RepositoryCard from '@/component/repository-card';
import { getJoinedRepoListSuccess } from '@/state/actions/joinedRepositoryActions';
import { typeOption, sortOption } from '@/constants/option';

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const tablet = useMediaQuery(theme.breakpoints.down('small'));
  const small = useMediaQuery(theme.breakpoints.down('desktop'));
  const { search, type, sort, page, newRepository, deleteRepository} = router.query;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRepo, setIsLoadingRepo] = useState(false);
  const [pagination, setPagination] = useState(page? page : 1);
  const [searchQuery, setSearchQuery] = useState(search? search : '');
  const [typeQuery, setTypeQuery] = useState(type? type : '');
  const [sortQuery, setSortQuery] = useState(sort? sort : '');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertLabel, setAlertLabel] = useState('Repository successfully created!');
  const joinedRepositoryData = useSelector(state => state.joinedRepository);

  const handleChangeTypeQuery = (event) => {
    setTypeQuery(event.target.value);
    handleSearch(searchQuery, event.target.value, sortQuery);
  };

  const handleChangeSortQuery = (event) => {
    setSortQuery(event.target.value);
    handleSearch(searchQuery, typeQuery, event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = (searchFilter = searchQuery, typeFilter = typeQuery, sortFilter = sortQuery) => {
    router.push({ pathname: '/', query: { search : searchFilter, type: typeFilter, sort: sortFilter, page: 1} })
  }

  const handleClickShowAlert = () => setShowAlert((show) => !show);

  const handleChangePage = (event, value) => {
    setPagination(value);
    router.push({ pathname: '/', query: { search : searchQuery, type: typeQuery, sort: sortQuery, page: value} })
  };

  useEffect(() => {
    setIsLoadingRepo(true);
    const fetchRepo = async () =>  {
      const token =  Cookies.get('access_token');
      const data = {
        name: search,
        type: typeQuery,
        sort_by: sortQuery,
        page_no: page? page : 1,
        page_size: mobile ? 5 : tablet? 6: small? 9: 12,
      }
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/joined`, {
          params : data,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch(getJoinedRepoListSuccess(response.data))
      } catch (error){
        setAlertSeverity('error');
        setAlertLabel(`Network Error, Please try again`);
        setShowAlert(true);
      }
    }
    fetchRepo()
    setIsLoadingRepo(false);
  }, [dispatch, mobile, page, search, small, sortQuery, tablet, typeQuery]);

  useEffect(() => {
    if(newRepository){
      setAlertSeverity('success');
      setAlertLabel(`Congratulations! Your new repository (${newRepository}) was successfully created`);
      setShowAlert(true);
    }
  }, [newRepository]);

  useEffect(() => {
    if(deleteRepository){
      setAlertSeverity('success');
      setAlertLabel(`${deleteRepository} was successfully deleted`);
      setShowAlert(true);
    }
  }, [deleteRepository]);

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
            My Repositories
          </Typography>
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
                flexDirection: { mobile: 'column', small: 'row' }, 
                gap: '16px',
                alignItems: 'flex-start',
                justifyContent: { mobile: 'flex-start', small: 'flex-start' },
                [theme.breakpoints.down('tablet')]: {
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
                  placeholder='Find a repository...'
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
                    [theme.breakpoints.down('laptop')]: {
                      width: '320px',
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
                <Dropdown
                  label={'Type'}
                  placeholder={'Type'} 
                  value={typeQuery}
                  handleChange={handleChangeTypeQuery}
                  options={typeOption}
                  defaultValue={''}
                />
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
            <Button 
              color='primary' 
              variant='contained' 
              sx={{ 
                height: '32px',
                width: '150px',
                typography: theme.typography.heading_h6 ,
                [theme.breakpoints.down('tablet')]: {
                  width:'100%', 
                },
              }}
              onClick={() => router.push({ pathname: '/create-repository' })}
            >
              New Repository
            </Button>
          </Box>
          <Box sx={{flexGrow:1, width: '100%', maxWidth:'large'}}>
            { isLoadingRepo &&
              <Loading transparent={true} centered={false}/>
            }
            { !isLoadingRepo && (joinedRepositoryData.repositories.length === 0) &&
              <Box
                sx={{
                  width: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItem: 'center'
                }}
              >
                <Typography variant='paragraph_h2' color='dark_gray.main' sx={{textAlign: 'center'}}>{joinedRepositoryData.does_user_have_any_repos ? 'No repositories found.' : 'No repository.'}</Typography>
                <Typography variant='paragraph_h4' color='dark_gray.main' sx={{textAlign: 'center'}}>
                  {joinedRepositoryData.does_user_have_any_repos ?
                  'Please check for typos, or use fewer terms or fields.'
                  :
                  <>
                    <Link
                      variant='paragraph_h4'
                      underline='none'
                      href={'/create-repository'}
                      color={'primary.main'}
                    >
                      Create a repository&nbsp;
                    </Link>
                    to get started
                  </>
                  }
                </Typography>
              </Box>
            }
            { !isLoadingRepo && joinedRepositoryData.repositories.length > 0 && 
              <>
              <Grid container columns={{ mobile: 4, tablet: 6, small: 12 }} rowSpacing={5} columnSpacing={{ mobile: 5, tablet: 6, small: 7 }}>
              { joinedRepositoryData.repositories.map((repo, index) => (
                <Grid mobile={4} tablet={3} small={4} desktop={3} large={2}  key={index}>
                  <RepositoryCard 
                    item={repo}
                  />
                </Grid>
              ))}
              </Grid>
              {
                joinedRepositoryData.total_page > 1 && 
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '40px',
                  }}
                >
                  <Pagination 
                    count={joinedRepositoryData.total_page} 
                    page={parseInt(pagination)} 
                    onChange={handleChangePage} 
                    shape="rounded" 
                    color='primary' 
                    sx={{
                      '& .MuiPaginationItem-root': {
                        typography: theme.typography.heading_h6
                      }
                    }}/>
                </Box>
              }
              </>
            }
          </Box>
          </Container>
        </> 
      }
    </>
  )
}
