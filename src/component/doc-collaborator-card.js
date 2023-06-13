import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Dropdown from './dropdown';
import { isOnlyEditorDocs, isOwnerDocs } from '@/utils/roles';
import { docRoleOptionEditor, docRoleOptionOwner, docRoleOptionViewer } from '@/constants/option';

export default function DocCollaboratorCard(props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width:'100%',
        display: 'flex',
        flexDirection: {mobile: 'column', mobile_l: 'row'}, 
        alignItems: {mobile: 'flex-start', mobile_l: 'center'},
        justifyContent:'space-between',
        gap: '16px'
      }}
    >
      <Box
        sx={{
          width:{mobile: '100%', mobile_l: 'calc(100% - 166px)', tablet: 'calc(100% - 180px)', small: 'calc(100% - 332px)'},
          display: 'flex',
          flexDirection: {mobile:'column', tablet: 'row'}, 
          alignItems: {mobile: 'flex-start', mobile_l: 'center'},
          justifyContent:'flex-start',
          gap: '16px'
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
          disableOwner={isOwnerDocs(props.item.role) || (isOnlyEditorDocs(props.item.role) && isOnlyEditorDocs(props.currentRole))} 
          value={props.item.role}
          id={props.order}
          handleChange={props.onRoleChange}
          options={isOwnerDocs(props.item.role) ? docRoleOptionOwner : isOnlyEditorDocs(props.item.role) ? docRoleOptionEditor : docRoleOptionViewer}
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
          disabled={isOwnerDocs(props.item.role) || (isOnlyEditorDocs(props.item.role) && isOnlyEditorDocs(props.currentRole))} 
          onClick={props.onRemoveAccess}
        >
          Remove Access
        </Button>
      </Box>
    </Box>
  )
}