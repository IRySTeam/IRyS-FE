import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Dropdown from './dropdown';

export default function CollaboratorCard(props) {
  const theme = useTheme();

  const roleOption = [
    { value: 'owner', label: 'Owner'},
    { value: 'admin', label: 'Admin'},
    { value: 'uploader', label: 'Uploader'},
    { value: 'viewer', label: 'Viewer'},
  ]

  return (
    <Box
      sx={{
        width:'100%',
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent:'space-between',
        gap: '16px'
      }}
    >
      <Box
        sx={{
          width:{mobile: 'calc(100% - 166px)', tablet: 'calc(100% - 180px)', small: 'calc(100% - 332px)'},
          display: 'flex',
          flexDirection: 'row', 
          alignItems: 'center',
          justifyContent:'flex-start',
          gap: '16px'
        }}
      >
        <Box
          sx={{
            display: {mobile: 'none', tablet: 'flex'},
            width: '36px',
            height: '36px',
            borderRadius: '18px',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <PersonIcon
            sx={{
              width: '24px',
              height: '24px',
              color: theme.palette.white.main
            }}
          />
        </Box>
        <Box
          sx={{
            width:{mobile: '100%', tablet: 'calc(100% - 60px)'},
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'flex-start',
            justifyContent:'flex-start',                       
          }}
        >
          <Typography variant='form_label_small' color='black.main'>{`${props.item.first_name} ${props.item.last_name}`}</Typography>
          <Typography 
            variant='form_sublabel_small' 
            color='black.main' 
            sx={{
              maxWidth: 'calc(100% - 16px)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              whiteSpace: 'nowrap'
            }}
          >
            {props.item.email}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { mobile: 'column', tablet: 'row' }, 
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: '16px'
        }}
      >
        <Dropdown
          label={'Role'}
          placeholder={'Role'} 
          value={props.item.role}
          // handleChange={handleChangeTypeQuery}
          options={roleOption}
          width='150px'
          backgroundColor={theme.palette.white.main}
        />
        <Button 
          color='danger_button' 
          variant='contained' 
          sx={{ 
            height: '32px', 
            padding: '0 12px',
            width: '150px',
            typography: theme.typography.heading_h6,
            color: theme.palette.white.main,
            '&.Mui-disabled': {
              backgroundColor: theme.palette.dark_gray.light,
              color: theme.palette.white.main,
            },
          }}
          disabled={props.item.role === 'owner'}
        >
          Remove Access
        </Button>
      </Box>
    </Box>
  )
}