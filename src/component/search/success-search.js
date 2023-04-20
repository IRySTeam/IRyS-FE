import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Container, Box, Typography, Button,} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Unstable_Grid2';
import KeyboardDoubleArrowDownOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowDownOutlined';
import SearchTabs from '../tabs/search';
import RepositoryCard from '../repository-card';
import DocumentCard from '../document-card';

export default function SuccessSearch(props) {
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
            marginTop: { mobile: 0, small:'40px'},
          }}  
        >
          { props.category === 'repo' && 
            <>
            <Grid container columns={{ mobile: 4, tablet: 6, small: 12 }} rowSpacing={5} columnSpacing={{ mobile: 5, tablet: 6, small: 7 }}>
            { props.data.map((repo, index) => (
              <Grid mobile={4} tablet={3} small={6} desktop={4} large={3}  key={index}>
                <RepositoryCard 
                  item={repo}
                />
              </Grid>
            ))}
            </Grid>
            {
              props.total_page > 1 && 
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '40px',
                }}
              >
                <Pagination count={props.total_page} page={parseInt(props.page)} onChange={props.onChangePage} shape="rounded" color='primary'/>
              </Box>
            }
            </>
          }
          { props.category === 'docs' &&
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '100%'
              }}
            >
              { props.data.map((repo, index) => (
                <DocumentCard
                  key={index}
                  item={repo}
                  query={props.query}
                />
              ))}
            </Box> 
          }
        </Box>
      </Box>
    </Container>
  )
}