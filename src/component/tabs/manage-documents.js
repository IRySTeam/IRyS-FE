import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Box, Typography, } from '@mui/material';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import MonitorOutlinedIcon from '@mui/icons-material/MonitorOutlined';
import UploadFileSharpIcon from '@mui/icons-material/UploadFileSharp';

export default function ManageDocumentsTabs(props) {
  const theme = useTheme();
  const router = useRouter();

  const handleClickSetting = (id, type) => {
    router.push({ pathname: `/repository/manage-documents/${type}`, query: { id : id } })
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
        overflowX: 'auto'
      }} 
    >
      <Box
        sx={{
          [theme.breakpoints.down('small')]: {
            width:'33%',
            borderBottom: '3px solid',
            borderColor: props.type === 'databases' ? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            padding: '4px'
          }, 
          [theme.breakpoints.up('small')]: {
            width: '234px',
            borderLeft: '3px solid',
            borderColor:  props.type === 'databases' ? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            marginY: '8px',
          },
          [theme.breakpoints.down('tablet')]: {
            minWidth:'210px',
          }, 
          padding: '0 4px',
          cursor: 'pointer',
        }}
        onClick={()=> handleClickSetting(props.id, 'databases')}
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
            backgroundColor: props.type === 'databases' ? theme.palette.light_gray.light : 'transparent',
            padding: '5px 8px'
          }} 
        >
          <StorageRoundedIcon color='dark_gray.light' sx={{width: '20px', height: '20px'}}/>
          <Typography
            sx={{ 
              color: 'black.main', 
              typography: props.type === 'databases' ? 'paragraph_h6_bold' : 'paragraph_h6',
            }}
          >
            Databases
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
            width:'33%',
            borderBottom: '3px solid',
            borderColor: props.type === 'monitor'? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            padding: '4px'
          }, 
          [theme.breakpoints.up('small')]: {
            width: '234px',
            borderLeft: '3px solid',
            borderColor: props.type === 'monitor'? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            marginY: '8px',
          },
          [theme.breakpoints.down('tablet')]: {
            minWidth:'210px',
          }, 
          padding: '0 4px',
          cursor: 'pointer',
        }}
        onClick={()=> handleClickSetting(props.id, 'monitor')}
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
            backgroundColor: props.type === 'monitor'? theme.palette.light_gray.light : 'transparent',
            padding: '5px 8px'
          }} 
        >
          <MonitorOutlinedIcon color='dark_gray.light' sx={{width: '20px', height: '20px'}}/>
          <Typography
            sx={{ 
              color: 'black.main', 
              typography: props.type === 'monitor'? 'paragraph_h6_bold' : 'paragraph_h6',
            }}
          >
            Monitor Documents
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
            width:'33%',
            borderBottom: '3px solid',
            borderColor: props.type === 'upload'? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            padding: '4px'
          }, 
          [theme.breakpoints.up('small')]: {
            width: '234px',
            borderLeft: '3px solid',
            borderColor: props.type === 'upload'? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            marginY: '8px',
          },
          [theme.breakpoints.down('tablet')]: {
            minWidth:'210px',
          }, 
          padding: '0 4px',
          cursor: 'pointer',
        }}
        onClick={()=> handleClickSetting(props.id, 'upload')}
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
            backgroundColor: props.type === 'upload'? theme.palette.light_gray.light : 'transparent',
            padding: '5px 8px'
          }} 
        >
          <UploadFileSharpIcon  color='dark_gray.light' sx={{width: '20px', height: '20px'}}/>
          <Typography
            sx={{ 
              color: 'black.main', 
              typography: props.type === 'upload'? 'paragraph_h6_bold' : 'paragraph_h6',
            }}
          >
            Upload Documents
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