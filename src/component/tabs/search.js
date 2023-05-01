import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Box, Typography, } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

export default function SearchTabs(props) {
  const theme = useTheme();
  const router = useRouter();

  const handleClickCategory = (query, category) => {
    router.push({ pathname: '/search', query: { q : query, category: category } })
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
            borderColor: props.category === 'repo' ? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            padding: '4px'
          }, 
          [theme.breakpoints.up('small')]: {
            width: '234px',
            borderLeft: '3px solid',
            borderColor: props.category === 'repo' ? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            marginY: '8px',
          },
          padding: '0 4px',
          cursor: 'pointer',
        }}
        onClick={()=> handleClickCategory(props.query, 'repo')}
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
            backgroundColor: props.category === 'repo' ? theme.palette.light_gray.light : 'transparent',
            padding: '5px 8px'
          }} 
        >
          <FolderOpenIcon color='dark_gray.light' sx={{width: '20px', height: '20px'}}/>
          <Typography
            sx={{ 
              color: 'black.main', 
              typography: props.category === 'repo' ? 'paragraph_h6_bold' : 'paragraph_h6',
            }}
          >
            Repositories
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
            borderColor: props.category === 'docs' ? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            padding: '4px'
          }, 
          [theme.breakpoints.up('small')]: {
            width: '234px',
            borderLeft: '3px solid',
            borderColor: props.category === 'docs' ? theme.palette.primary.main : 'transparent',
            borderRadius: '1px',
            marginY: '8px',
          },
          padding: '0 4px',
          cursor: 'pointer',
        }}
        onClick={()=> handleClickCategory(props.query, 'docs')}
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
            backgroundColor: props.category === 'docs' ? theme.palette.light_gray.light : 'transparent',
            padding: '5px 8px'
          }} 
        >
          <InsertDriveFileOutlinedIcon color='dark_gray.light' sx={{width: '20px', height: '20px'}}/>
          <Typography
            sx={{ 
              color: 'black.main', 
              typography: props.category === 'docs' ? 'paragraph_h6_bold' : 'paragraph_h6',
            }}
          >
            Documents
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