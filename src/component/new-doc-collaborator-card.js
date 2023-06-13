import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Typography, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import Dropdown from './dropdown';
import { isOwnerDocs } from '@/utils/roles';
import { newDocRoleOptionEditor, newDocRoleOptionOwner } from '@/constants/option';

export default function NewDocCollaboratorCard(props) {
  const theme = useTheme();
  const mobile_l = useMediaQuery(theme.breakpoints.down('tablet'));
  const mobile = useMediaQuery(theme.breakpoints.down('mobile_l'));

  return (
    <Box
      sx={{
        width:'100%',
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent:'space-between',
        padding: '8px 16px',
        border: '1px solid',
        borderRadius: '5px',
        borderColor: theme.palette.light_gray.main
      }}
    >
      <Box
        sx={{
          width: {mobile: 'calc(100% - 52px)', tablet: 'calc(100% - 216px)'},
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'flex-start',
          justifyContent:'center',
          gap: '8px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent:'flex-start',
            gap: {mobile: '8px', tablet: '16px'}
          }}
        >
          <Box
            sx={{
              display: 'flex',
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
              width:{mobile: 'calc(100% - 44px)', tablet: 'calc(100% - 52px)'},
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
        <Dropdown
          label={'Role'}
          placeholder={'Role'} 
          value={props.role}
          id={props.item.id}
          handleChange={props.onRoleChange}
          options={isOwnerDocs(props.currentRole) ? newDocRoleOptionOwner : newDocRoleOptionEditor}
          width={mobile ? '100%' : '150px'}
          backgroundColor={theme.palette.white.main}
          sx={{
            display: {mobile: 'flex', tablet: 'none'}
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row', 
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: '16px'
        }}
      >
        <Dropdown
          label={'Role'}
          placeholder={'Role'} 
          value={props.role}
          id={props.item.id}
          handleChange={props.onRoleChange}
          options={isOwnerDocs(props.currentRole) ? newDocRoleOptionOwner : newDocRoleOptionEditor}
          width='150px'
          backgroundColor={theme.palette.white.main}
          sx={{
            display: {mobile: 'none', tablet: 'flex'}
          }}
        />
        <IconButton
          sx={{ padding: 0, }}
          onClick={props.onRemoveNewCollaborator}
        >
          <CloseIcon
            sx={{
              width: '36px',
              height: '36px',
              color: theme.palette.dark_gray.main,
            }}
          />
        </IconButton>   
      </Box>
    </Box>
  )
}