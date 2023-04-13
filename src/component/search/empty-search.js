import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Container, Box, Typography, Button,} from '@mui/material';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import SearchTabs from '../tabs/search';

export default function EmptySearch(props) {
  const theme = useTheme();
  const router = useRouter();

  return (
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
        Public Databases
      </Typography>
      <Box
        sx={{
          width:'100%',
          display: 'flex',
          flexDirection: { mobile: 'column', small:'row' }, 
          gap: '40px',
          alignItems: 'flex-start',
          justifyContent:{ mobile: 'flex-start', small:'space-between' },
        }} 
      >
        <Box
          sx={{
            width:{ mobile: '100%', small:'250px' },
            display: 'flex',
            gap: '18px',
            flexDirection: 'column', 
            alignItems: 'flex-start',
            justifyContent:'flex-start',
          }} 
        >
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h3',
              [theme.breakpoints.down('small')]: {
                typography: 'heading_h4',
              }, 
            }}
          >
           Category
          </Typography>
          <SearchTabs 
            query={props.query} 
            category={props.category}
          />
          <Button 
            color='primary' 
            variant='contained' 
            sx={{ 
              height: '32px',
              width: {mobile: '100%', small:'234px'},
              typography: theme.typography.heading_h6,
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              justifyContent: {mobile: 'center', small:'space-between'},
              alignItems: 'center',
              marginLeft: {mobile: 0, small:'16px'},
              marginTop: {mobile: 0, small:'6px'},
            }}
            onClick={() => router.push({ pathname: '/search/advanced' })}
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
        </Box>
        <Box
          sx={{
            width:{ mobile: '100%', small:'calc(100% - 350px)'},
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent:'flex-start',
            marginTop: { mobile: 0, small:'40px'},
          }}  
        >
          <Typography variant='paragraph_h3' color='dark_gray.main' sx={{textAlign: 'center'}}>{`No ${props.category === 'repo'? 'repositories' : 'documents'} found.`}</Typography>
          <Typography variant='paragraph_h5' color='dark_gray.main' sx={{textAlign: 'center'}}>Please check for typos, or use fewer terms or fields.</Typography>
        </Box>
      </Box>
    </Container>
  )
}