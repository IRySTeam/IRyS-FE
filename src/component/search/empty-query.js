import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Container, Box, Typography, Button, Link, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormInput from '../form-input';

export default function EmptyQuery(props) {
  const theme = useTheme();
  const router = useRouter();
  const countRepo = '1M';
  const countDocument = '20M';

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    router.push({ pathname: '/search', query: { q : props.query, category: props.category} })
  }

  return (
    <Container 
      sx={{
        padding: '80px 24px 40px 24px', 
        minHeight:'100vh',
        width: '100%',
        maxWidth:'tablet',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('tablet')]: {
          padding: '40px 16px',
        },
      }} 
    >
      <Typography 
        sx={{ 
          color: 'black.main', 
          typography: 'heading_h2',
          textAlign: 'center',
          [theme.breakpoints.down('tablet')]: {
            typography: 'heading_h3',
          }, 
        }}
      >
       {`Search more than ${countRepo} public repositories and ${countDocument} public documents`} 
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row', 
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginTop: '24px',
        }}
      >
        <FormInput 
          id='query'            
          name='query'
          placeholder='Find public repositories or documents...'
          value={props.query}
          onChange={(e) => props.setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          small={true}
          sx={{
            width: 'calc(100% - 56px)'
          }}
        />
        <Button
          variant='contained'
          color='primary'
          sx={{
            minWidth: '40px',
            width: '40px',
            maxHeight: '40px',
            padding: '8px 8px',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '5px'
          }}
          onClick={() => handleSearch()}
        >
          <SearchIcon 
            sx={{
              width: '32px',
              height: '32px',
              color: theme.palette.white.main,
            }}
          />
        </Button>
      </Box>
      <Typography variant='paragraph_h4' color='dark_gray.main' sx={{textAlign: 'center', width: '100%', marginTop: '16px'}}>
        <>
        If you want to find more accurate and relevant results, try using the&nbsp;
        <Link
          variant='paragraph_h4'
          underline='none'
          color={'primary.main'}
          onClick={() => router.push({ pathname: '/search/advanced',  query: { from: router.asPath, origin: router.pathname } })}
        >
          advanced search&nbsp;
        </Link>
        options.
        </>
      </Typography>
    </Container>
  )
}