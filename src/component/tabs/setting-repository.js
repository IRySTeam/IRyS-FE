import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Box, Typography, } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';

export default function SettingRepositoryTabs(props) {
  const theme = useTheme();
  const router = useRouter();

  const handleClickSetting = (id, type) => {
    router.push({ pathname: `/repository/setting/${type === 'general' ? 'general' : 'collaborators'}`, query: { id : id } })
  }

  return (
    <Box
      sx={{
        width:'100%',
        display: 'flex',
        flexDirection: { mobile: 'row', small:'column' }, 
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        marginLeft: {mobile: 0, small:'16px'},
      }} 
    >
      <Box
        sx={{
          [theme.breakpoints.down('small')]: {
            width:'50%',
            borderBottom: '3px solid',
            borderColor: props.type === 'general' ? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            padding: '4px'
          }, 
          [theme.breakpoints.up('small')]: {
            width: '234px',
            borderLeft: '3px solid',
            borderColor:  props.type === 'general' ? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            marginY: '8px',
          },
          padding: '0 4px',
          cursor: 'pointer',
        }}
        onClick={()=> handleClickSetting(props.id, 'general')}
      >
        <Box
          sx={{
            width:'100%',
            display: 'flex',
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: { mobile: 'center', small:'flex-start' },
            gap: { mobile: '16px', small:'4px' },
            borderRadius: '5px',
            backgroundColor: props.type === 'general' ? theme.palette.light_gray.light : 'transparent',
            padding: '5px 8px'
          }} 
        >
          <SettingsIcon color='dark_gray.light' sx={{width: '20px', height: '20px'}}/>
          <Typography
            sx={{ 
              color: 'black.main', 
              typography: props.type === 'general' ? 'paragraph_h6_bold' : 'paragraph_h6',
            }}
          >
            General
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width:'223px',
          height: '1px',
          backgroundColor: theme.palette.light_gray.main,
          display: {mobile: 'none', small:'flex'},
          marginLeft: '7px',
        }} 
      />
      <Box
        sx={{
          [theme.breakpoints.down('small')]: {
            width:'50%',
            borderBottom: '3px solid',
            borderColor: props.type === 'collaborators'? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            padding: '4px'
          }, 
          [theme.breakpoints.up('small')]: {
            width: '234px',
            borderLeft: '3px solid',
            borderColor: props.type === 'collaborators'? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            marginY: '8px',
          },
          padding: '0 4px',
          cursor: 'pointer',
        }}
        onClick={()=> handleClickSetting(props.id, 'collaborators')}
      >
        <Box
          sx={{
            width:'100%',
            display: 'flex',
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: { mobile: 'center', small:'flex-start' },
            gap: { mobile: '16px', small: '4px' },
            borderRadius: '5px',
            backgroundColor: props.type === 'collaborators'? theme.palette.light_gray.light : 'transparent',
            padding: '5px 8px'
          }} 
        >
          <GroupsIcon color='dark_gray.light' sx={{width: '20px', height: '20px'}}/>
          <Typography
            sx={{ 
              color: 'black.main', 
              typography: props.type === 'collaborators'? 'paragraph_h6_bold' : 'paragraph_h6',
            }}
          >
            Collaborators
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width:'223px',
          height: '1px',
          backgroundColor: theme.palette.light_gray.main,
          display: {mobile: 'none', small:'flex'},
          marginLeft: '7px',
        }} 
      />
    </Box>
 )
}