import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Container, Button, Typography, Box } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import FilterInput from '@/component/filter/input';
import FilterDropdown from '@/component/filter/dropdown';
import FilterCard from '@/component/filter/card';
import { domainOption } from '@/constants/option';

export default function AdvancedSearch() {
  const theme = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('basic');
  const [path, setPath] = useState('');
  const [keyword, setKeyword] = useState('');
  const [domain, setDomain] = useState('');
  const [filter, setFilter] = useState([
    {
      key: '',
      operator: '',
      value: '',
      model: '',
      scoring_algorithm: '',
      top_n: null,
      score_threshold: null,
    },
  ])

  const handleChangeMode = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const handleChangeDomain= (event) => {
    console.log(event.target.value)
    setDomain(event.target.value);
  };

  useEffect(() => {
    const { from } = router.query;
    if(from) setPath(from);
  }, [router]);

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
          <Container 
            sx={{
              padding: '40px 24px', 
              minHeight:'100vh',
              width: '100%',
              maxWidth:'tablet',
              display: 'flex',
              flexDirection: 'column', 
              gap: '40px',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              [theme.breakpoints.down('tablet')]: {
                padding: '40px 16px',
              }, 
            }} 
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column', 
                gap: '8px',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }} 
            >
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'heading_h2',
                  [theme.breakpoints.down('tablet')]: {
                    typography: 'heading_h3',
                  }, 
                }}
              >
                { path.includes('repository') ? 'Repository XYZ' : 'Public Databases'} 
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column', 
                gap: '16px',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row', 
                  gap: {mobile: '16px', tablet:'32px'},
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Typography 
                  sx={{ 
                    color: 'black.main', 
                    typography: 'heading_h3',
                    [theme.breakpoints.down('tablet')]: {
                      typography: 'heading_h4',
                    }, 
                  }}
                >
                  Advanced Search
                </Typography>
                <ToggleButtonGroup
                  color="primary"
                  exclusive
                  value={mode}
                  onChange={handleChangeMode}
                >
                  <ToggleButton 
                    value="basic"
                    sx={{
                      padding: 0,
                      height: '35px',
                      width: '60px',
                      backgroundColor: theme.palette.white.main,
                      borderRadius: '5px',
                      borderColor: theme.palette.light_gray.main,
                      '&.Mui-selected':{
                        backgroundColor: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-selected:hover':{
                        backgroundColor: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                      }
                    }}
                  >
                    <Typography sx={{ color: mode === 'basic' ? 'white.main' : 'black.main', typography: 'heading_h6',}}>Basic</Typography>
                  </ToggleButton>
                  <ToggleButton 
                    value="cli"
                    sx={{
                      padding: 0,
                      height: '35px',
                      width: '60px',
                      backgroundColor: theme.palette.white.main,
                      borderColor: theme.palette.light_gray.main,
                      borderRadius: '5px',
                      '&.Mui-selected':{
                        backgroundColor: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-selected:hover':{
                        backgroundColor: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                      }
                    }}
                  >
                    <Typography sx={{ color: mode === 'cli' ? 'white.main' : 'black.main', typography: 'heading_h6',}}>CLI</Typography>
                  </ToggleButton>
                  <ToggleButton 
                    value="file"
                    sx={{
                      padding: 0,
                      height: '35px',
                      width: '60px',
                      backgroundColor: theme.palette.white.main,
                      borderColor: theme.palette.light_gray.main,
                      borderRadius: '5px',
                      '&.Mui-selected':{
                        backgroundColor: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-selected:hover':{
                        backgroundColor: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                      }
                    }}
                  >
                    <Typography sx={{ color: mode === 'file' ? 'white.main' : 'black.main', typography: 'heading_h6',}}>File</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              { mode === 'basic' &&
                <>
                  <FilterInput 
                    label="Keyword"
                    placeholder="Enter a keyword..."
                    value={keyword}
                    onChange={handleChangeKeyword}
                  />
                  <FilterDropdown
                    label="Domain"
                    placeholder="Select a domain.."
                    value={domain}
                    options={domainOption}
                    onChange={handleChangeDomain}
                  />
                </>
              }
            </Box>
            { mode === 'basic' &&
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column', 
                  gap: '16px',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
              }}
              >
                <Typography 
                  sx={{ 
                    color: 'black.main', 
                    typography: 'heading_h4',
                    [theme.breakpoints.down('tablet')]: {
                      typography: 'heading_h5',
                    }, 
                  }}
                >
                  Filter Options
                </Typography>
                <Box 
                  sx={{ 
                    height: '1px', 
                    width: '100%',
                    backgroundColor: theme.palette.light_gray.main
                  }}
                />
                {filter.map((f, index) => (
                  <FilterCard 
                    key={index}
                    filter={f}
                    order={index}
                  />
                ))}
              </Box>
            }
          </Container>
        </> 
      }
    </>
  )
}
