import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import { formatDate } from '@/utils/date';

export default function RepositoryCard(props) {
  const theme = useTheme();
  const router = useRouter();
  const [anchorElOption, setAnchorElOption] = useState(null);
  
  const handleClickBox = (id) => {
    router.push({ pathname: '/repository', query: { id : id} });
  };

  const handleOpenElOption = (event) => {
    event.stopPropagation();
    setAnchorElOption(event.currentTarget);
  };

  const handleCloseElOption = (event) => {
    event.stopPropagation();
    setAnchorElOption(null);
  };

  const goToSetting = (id) => (event) => {
    event.stopPropagation();
    router.push({ pathname: '/repository/setting/general', query: { id: id} })
  }

  const goToCollaboratorSetting = (id) => (event) => {
    event.stopPropagation();
    router.push({ pathname: '/repository/setting/collaborators', query: { id: id} })
  }
  return (
    <Box
      sx={{
        border: '1px solid',
        color: theme.palette.light_gray.main,
        padding: '24px',
        borderRadius: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        cursor: 'pointer'
      }}
      onClick={()=> handleClickBox(props.item.id)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}
      >
        <FolderOpenIcon color='warning' sx={{width: '48px', height: '48px'}}/>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '90px',
              height: '20px',
              display: 'flex',
              alignItem: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '10px'
            }}
          >
            <Typography variant='heading_h6' color='white.main' sx={{ textTransform: 'capitalize' }}>{props.item.is_public? 'public' : 'private'}</Typography>
          </Box>
          <IconButton onClick={handleOpenElOption} sx={{ p: 0 }}>
            <MoreVertIcon
              sx={{
                width: '32px',
                height: '32px',
                color: theme.palette.black.main
              }}
            />
          </IconButton>
          <Menu
            sx={{ mt: '32px', display:{ mobile: 'none', small:'block' } }}
            id='menu-appbar'
            anchorEl={anchorElOption}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElOption)}
            onClose={handleCloseElOption}
          >
            <MenuItem
              onClick={goToSetting(props.item.id)}
            >
              <IconButton
                sx={{ padding: '0 16px 0 0'}}
              >
                <SettingsIcon
                  sx={{
                    width: '24px',
                    height: '24px',
                    color: theme.palette.black.main
                  }}
                />
              </IconButton>
              <Typography variant='paragraph_h5' color='black.main'>Settings</Typography>
            </MenuItem>
            <MenuItem
              onClick={goToCollaboratorSetting(props.item.id)}
            >
              <IconButton
                sx={{ padding: '0 16px 0 0'}}
              >
                <GroupsIcon
                  sx={{
                    width: '24px',
                    height: '24px',
                    color: theme.palette.black.main
                  }}
                />
              </IconButton>
              <Typography variant='paragraph_h5' color='black.main'>Collaborators</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Typography 
        variant='heading_h4' 
        color='black.main' 
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
          minHeight: '60px'
        }}
      >
        {props.item.name}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '8px'
        }}
      >
        <PersonOutlineIcon color='dark_gray' sx={{width: '20px', height: '20px'}}/>
        <Typography 
          variant='paragraph_h6' 
          color='dark_gray.main' 
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {props.item.owner ? `${props.item.owner.first_name} ${props.item.owner.last_name}` : ''}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '8px'
        }}
      >
        <AccessTimeIcon color='dark_gray' sx={{width: '20px', height: '20px'}}/>
        <Typography 
          variant='paragraph_h6' 
          color='dark_gray.main' 
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
          }}
        >
          { props.item.updated_at ? `Updated on ${formatDate(props.item.updated_at)}` : '' }
        </Typography>
      </Box>
    </Box> 
  )
}