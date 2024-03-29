import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getUserDetail } from '@/utils/user';
import Cookies from 'js-cookie';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Logo from './logo';
import { saveAdvancedSearchNavbar } from '@/state/actions/filterAction';
import { logoutUser } from '@/state/actions/userActions';

const pages = [
  {
    label: 'Home',
    url : '/',
  },
  {
    label: 'Features',
    url : '/features',
  }, {
    label: 'FAQ',
    url : '/faq'
  }];

function NavBar(props) {
  const userDetail = useSelector(state => state.user);
  const advancedSearch = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { q, category } = router.query;

  const [search, setSearch] = useState(q? q: category ? advancedSearch.keyword : '');
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.setIsLoading(true)
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    dispatch(saveAdvancedSearchNavbar(search))
    router.push({ pathname: '/search', query: { q : search, category : category? category : 'repo'} })
  }

  useEffect(() => {
    // Protected Route
    const token = Cookies.get('access_token');
    props.setIsLoading(true)
    if(token){
      if(!userDetail.id){
        getUserDetail(token, dispatch, router);
      }
      props.setIsLoading(false);
    }else{
      router.replace({ pathname: '/login' })
    }

    const { q } = router.query;
    if(q){
      setSearch(q)
    }else{
      setSearch('')
    }
  }, [userDetail, dispatch, router, props]);

  const logout =  () => {
    props.setIsLoading(true)
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    dispatch(logoutUser())
    router.replace({ pathname: '/login' })
  }

  return (
    <AppBar position='fixed' maxheight='64px'>
      <Container 
        maxWidth='large'
        sx={{
        padding: '4px 0px',
        [theme.breakpoints.up('small')]: {
          padding: '4px 24px'
        },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            [theme.breakpoints.up('small')]: { display: 'none' },
          }}
        >
          <Box>
            <IconButton
              size='large'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='white'
              sx={{
                padding: 0,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: 'block',}}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => router.push({ pathname: page.url })}>
                  <Typography variant='paragraph_h5' color='black.main'>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <OutlinedInput
            id='public'
            name='public'
            placeholder='Find public repositories or documents...'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyUp={handleKeyPress}
            sx={{
              width: '480px',
              '& .MuiInputBase-input': {
                padding: '4px 16px',
                typography: theme.typography.paragraph_h6,
                backgroundColor: theme.palette.white.main,
                border: '1px solid',
                borderColor: theme.palette.black.main,
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
              [theme.breakpoints.down('tablet')]: {
                width: 'calc(100% - 112px)',
              },
            }}
          />

          <Box>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon color='white' sx={{width: '32px', height: '32px'}}/>
            </IconButton>
            <Menu
              sx={{ mt: '45px', display:{ mobile: 'block', small:'none' } }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               <MenuItem 
                disabled
                sx={{
                  width: '250px',
                  '&.Mui-disabled':{
                    opacity: 1
                  }
                }}
              >
                <Box sx={{ display:'flex', flexDirection:'column'}}>
                  <Typography variant='heading_h5' color='black.main'>Logged in as</Typography>
                  <Typography variant='paragraph_h5' color='black.main' noWrap sx={{maxWidth: '220px'}}>{userDetail? `${userDetail.first_name} ${userDetail.last_name}` : ''}</Typography>
                </Box>
              </MenuItem>
              <MenuItem
                onClick={logout}
              >
                <IconButton
                  sx={{ padding: '0 16px 0 0'}}
                >
                  <LogoutIcon 
                    sx={{
                      width: '24px',
                      height: '24px',
                      color: theme.palette.black.main
                    }}
                  />
                </IconButton>
                <Typography variant='paragraph_h5' color='black.main'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            [theme.breakpoints.down('small')]: { display: 'none' },
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'flex-start', 
              gap: '24px' 
            }}
          >
            <Logo
              width={56}
              height={56}
              withText={false}
            />
            <OutlinedInput
              id='public'
              name='public'
              placeholder='Find public repositories or documents...'
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              onKeyUp={handleKeyPress}
              sx={{
                width: '480px',
                '& .MuiInputBase-input': {
                  padding: '4px 16px',
                  typography: theme.typography.paragraph_h6,
                  backgroundColor: theme.palette.white.main,
                  border: '1px solid',
                  borderColor: theme.palette.black.main,
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
                [theme.breakpoints.down('tablet')]: {
                  width: 'calc(100% - 112px)',
                },
              }}
            />
            {pages.map((page) => {
              if (page.label !== 'Home') {
                return (
                  <Button
                    key={page.label} 
                    variant='text'
                    color='white'
                    sx={{ typography: theme.typography.heading_h5, padding: '0' }}
                    onClick={() => router.push({ pathname: page.url })}
                  >
                    {page.label} 
                  </Button>
                );
              }
              return null;
            })}
          </Box>

          <Box
            sx={{ 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'flex-end', 
              position: 'fixed',
              right: '24px'
            }}
          >                                   
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon
                sx={{
                  width: '32px',
                  height: '32px',
                  color: theme.palette.white.main
                }}
              />
            </IconButton>
            <Menu
              sx={{ mt: '45px', display:{ mobile: 'none', small:'flex' } }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem 
                disabled
                sx={{
                  width: '250px',
                  '&.Mui-disabled':{
                    opacity: 1
                  }
                }}
              >
                <Box sx={{ display:'flex', flexDirection:'column'}}>
                  <Typography variant='heading_h5' color='black.main'>Logged in as</Typography>
                  <Typography variant='paragraph_h5' color='black.main' noWrap sx={{width: '220px'}}>{userDetail? `${userDetail.first_name} ${userDetail.last_name}` : ''}</Typography>
                </Box>
              </MenuItem>
              <MenuItem
                onClick={logout}
              >
                <IconButton
                  sx={{ padding: '0 16px 0 0'}}
                >
                  <LogoutIcon 
                    sx={{
                      width: '24px',
                      height: '24px',
                      color: theme.palette.black.main
                    }}
                  />
                </IconButton>
                <Typography variant='paragraph_h5' color='black.main'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
