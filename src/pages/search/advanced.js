import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Container, Button, Typography, Box, OutlinedInput } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import FilterInput from '@/component/filter/input';
import FilterDropdown from '@/component/filter/dropdown';
import FilterCard from '@/component/filter/card';
import { domainOption } from '@/constants/option';
import { resetFilterAdvancedSearch, saveAdvancedSearchBasic, saveAdvancedSearchCli } from '@/state/actions/filterAction';
import Uploader from '@/component/uploader';

export default function AdvancedSearch() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const advancedSearch = useSelector(state => state.filter);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('basic');
  const [path, setPath] = useState('');
  const [keyword, setKeyword] = useState(advancedSearch.keyword ?? '');
  const [domain, setDomain] = useState(advancedSearch.domain ?? '');
  const [filters, setFilters] = useState( advancedSearch.filters ?? [
    {
      key: '',
      operator: '',
      value: '',
      model: '',
      scoring_algorithm: '',
      top_n: '',
      score_threshold: '',
    },
  ])
  const [cliQuery, setCliQuery] = useState(advancedSearch.cliQuery ?? '');

  const addFilter = () => {
    const newFilter = {
      key: '',
      operator: '',
      value: '',
      model: '',
      scoring_algorithm: '',
      top_n: '',
      score_threshold: '',
    }
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  const updateFilter = (index, key, operator, value, model, scoring_algorithm, top_n, score_threshold ) => {
    const newFilters = [...filters];
    newFilters[index] = { 
      key: key,
      operator: operator,
      value: value,
      model: model,
      scoring_algorithm: scoring_algorithm,
      top_n: top_n,
      score_threshold: score_threshold,
    };
    setFilters(newFilters);
  };

  const handleChangeMode = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const handleChangeDomain= (event) => {
    setDomain(event.target.value);
  };

  const redirectBack = () => {
    router.push(path)
  }

  const handleSearch = () => {
    if(mode === 'basic') {
      const data = {
        keyword: keyword,
        domain: domain,
        filters: filters,
      }
      dispatch(saveAdvancedSearchBasic(data))
    } else if(mode === 'cli'){
      const data = {
        cliQuery: cliQuery,
      }
      dispatch(saveAdvancedSearchCli(data))
    }
    redirectBack()
  }

  useEffect(() => {
    const { from, origin } = router.query;
    if(from && origin) {
      const decodedPath = decodeURIComponent(from)
      setPath(decodedPath)
      if(origin !== advancedSearch.path){
        const data = { path: origin }
        dispatch(resetFilterAdvancedSearch(data))
        setKeyword('')
        setDomain('')
        setFilters([{
          key: '',
          operator: '',
          value: '',
          model: '',
          scoring_algorithm: '',
          top_n: '',
          score_threshold: '',
        }])
        setCliQuery('')
      }
    }
  }, [advancedSearch.path, dispatch, router]);

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
                  flexDirection: {mobile: 'column', mobile_l:'row'}, 
                  gap: {mobile: '16px', tablet:'32px'},
                  alignItems: {mobile: 'flex-start', mobile_l:'center'},
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
                      borderLeft: '1px solid #CCCCCC !important',
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
                      borderLeft: '1px solid #CCCCCC !important',
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
                    defaultValue=''
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
                {filters.map((f, index) => (
                  <FilterCard 
                    key={index}
                    filter={f}
                    order={index}
                    onRemove={() => removeFilter(index)}
                    onChange={
                      (key, operator, value, model, scoring_algorithm, top_n, score_threshold) => updateFilter(index, key, operator, value, model, scoring_algorithm, top_n, score_threshold)
                    }
                  />
                ))}
                <Button 
                  color='primary' 
                  variant='contained' 
                  sx={{ 
                    height: '32px',
                    width: '150px',
                    typography: theme.typography.heading_h6,
                    alignSelf: 'flex-end'
                  }}
                  onClick={() => addFilter()}
                >
                  <Typography sx={{ color: 'white.main', typography: 'heading_h6',}}> Add Filter </Typography>
                </Button>
              </Box>
            }
            { mode === 'cli' &&
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
                    typography: 'heading_h3',
                    [theme.breakpoints.down('tablet')]: {
                      typography: 'heading_h4',
                    }, 
                  }}
                >
                  Terminal
                </Typography>
                <OutlinedInput
                  id={'cli'}
                  name={'cli'}
                  placeholder={'Enter a command or query ...'}
                  value={cliQuery}
                  onChange={(event) => setCliQuery(event.target.value)}
                  sx={{ width: '100%', borderRadius: '5px'}}
                  multiline={true}
                  minRows={12}
                />
              </Box>
            }
            { mode === 'file' &&
              <Uploader/>
            }
            <Box
              sx= {{
                width: '100%',
                display: 'flex',
                flexDirection: {mobile: 'column-reverse', mobile_l: 'row'}, 
                gap: {mobile: '16px', mobile_l: '24px'},
                alignItems: 'flex-start',
                justifyContent: {mobile: 'center', mobile_l: 'flex-end'},
              }}

            >
              <Button 
                color='primary' 
                variant='outlined' 
                sx={{ 
                  height: '32px',
                  width: {mobile: '100%', mobile_l: '150px'},
                  typography: theme.typography.heading_h6,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={ () => redirectBack()}
              >
                <Typography
                  sx={{ 
                    color: 'primary.main', 
                    typography: 'heading_h6',
                  }}
                >
                  Cancel
                </Typography>
              </Button>
              <Button 
                color='primary' 
                variant='contained' 
                sx={{ 
                  height: '32px',
                  width: {mobile: '100%', mobile_l: '150px'},
                  typography: theme.typography.heading_h6,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => handleSearch()}
              >
                <Typography
                  sx={{ 
                    color: 'white.main', 
                    typography: 'heading_h6',
                  }}
                >
                  Search
                </Typography>
                <SearchIcon
                  sx={{
                    width: '18px',
                    height: '18px',
                    color: theme.palette.white.main
                  }}
                />
              </Button>
            </Box>
          </Container>
        </> 
      }
    </>
  )
}
