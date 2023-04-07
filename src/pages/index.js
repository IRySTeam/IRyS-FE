import { useState, useEffect } from "react";
import { Container, Button, Typography, Box, OutlinedInput, Link } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Loading from "@/component/loading";
import CustomAlert from "@/component/custom-alert";
import NavBar from "@/component/navbar";
import SearchIcon from '@mui/icons-material/Search';
import Dropdown from "@/component/dropdown";
import { repositoryList } from "@/data/repositories";
import RepositoryCard from "@/component/repository-card";
import { getRepoListSuccess } from "@/state/actions/repositoryActions";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const { search, type, sort, newRepository} = router.query;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRepo, setIsLoadingRepo] = useState(false);
  const [searchQuery, setSearchQuery] = useState(search? search : '');
  const [typeQuery, setTypeQuery] = useState(type? type : 'all');
  const [sortQuery, setSortQuery] = useState(sort? sort : 'none');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertLabel, setAlertLabel] = useState("Repository successfully created!");
  const repositoryData = useSelector(state => state.repository);
  const isEmptyRepo = false;

  const handleChangeTypeQuery = (event) => {
    setTypeQuery(event.target.value);
    handleSearch(searchQuery, event.target.value, sortQuery);
  };

  const handleChangeSortQuery = (event) => {
    setSortQuery(event.target.value);
    handleSearch(searchQuery, typeQuery, event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = (searchFilter = searchQuery, typeFilter = typeQuery, sortFilter = sortQuery) => {
    router.push({ pathname: "/", query: { search : searchFilter, type: typeFilter, sort: sortFilter} })
  }

  const handleClickShowAlert= () => setShowAlert((show) => !show);

  const typeOption = [
    { value: 'all', label: 'All'},
    { value: 'public', label: 'Public'},
    { value: 'private', label: 'Private'},
  ]

  const sortOption = [
    { value: 'none', label: 'None'},
    { value: 'last_updated', label: 'Last Updated'},
    { value: 'alphabet', label: 'Name (A-Z)'},
  ]

  useEffect(() => {
    setIsLoadingRepo(true);
    const filterArrayRepo = (array) => {
      const searchFilter = !search ? array : array.filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase()))
      const typeFilter = typeQuery === 'all' ? searchFilter : searchFilter.filter((repo) => (repo.type === typeQuery))
      const sortFilter = sortQuery === 'none'? typeFilter : typeFilter.sort((a, b) => {
        if (sortQuery === 'last_updated') {
          return b.last_updated - a.last_updated;
        } else if (sortQuery === 'alphabet') {
          return a.name.localeCompare(b.name);
        }
      });
      return sortFilter
    }
  
    setTimeout(() => {
      const result = {
        repositories : isEmptyRepo? [] : filterArrayRepo(repositoryList),
        isEmpty : isEmptyRepo,
      }
      dispatch(getRepoListSuccess(result))
      setIsLoadingRepo(false);
    }, 1000);
  }, [dispatch, isEmptyRepo, search, sortQuery, typeQuery]);

  useEffect(() => {
    if(newRepository){
      setAlertSeverity("success");
      setAlertLabel(`Congratulations! Your new repository (${newRepository}) was successful created`);
      setShowAlert(true);
    }
  }, [newRepository]);

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {!isLoading &&
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
          { !isLoading && showAlert &&
            <CustomAlert
              severity={alertSeverity}
              label={alertLabel}
              onClose={handleClickShowAlert}
            /> 
          }
          <Container 
            sx={{
              padding: "40px", 
              minHeight:"100vh",
              maxWidth:"large",
              display: "flex",
              flexDirection: "column", 
              gap: "40px",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              [theme.breakpoints.down("small")]: {
                padding: "40px 16px",
              },
              [theme.breakpoints.down("tablet")]: {
                gap: "16px"
              },  
            }} 
          >
          <Typography 
            sx={{ 
              color: "black.main", 
              typography: "heading_h1",
              [theme.breakpoints.down("tablet")]: {
                typography: "heading_h3",
              }, 
            }}
          >
            My Repositories
          </Typography>
          <Box
            sx={{
              width:"100%",
              display: "flex",
              flexDirection: { mobile: "column-reverse", tablet: "row" }, 
              gap: "16px",
              alignItems: "flex-start",
              justifyContent: { mobile: "flex-start", tablet: "space-between" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { mobile: "column", small: "row" }, 
                gap: "16px",
                alignItems: "flex-start",
                justifyContent: { mobile: "flex-start", small: "flex-start" },
                [theme.breakpoints.down("tablet")]: {
                  width:'100%', 
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row", 
                  gap: "16px",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  [theme.breakpoints.down("small")]: {
                    width:'100%', 
                  },
                }}
              >
                <OutlinedInput
                  id="own"
                  name="own"
                  placeholder="Find a repository..."
                  value={searchQuery}
                  onChange={(e)=>setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  sx={{
                    width: "720px",
                    "& .MuiInputBase-input": {
                      height: "30px",
                      maxHeight: "30px",
                      padding: "0 16px",
                      display: "flex",
                      justifyContent: "center",
                      typography: theme.typography.paragraph_h6,
                      backgroundColor: theme.palette.white.main,
                      border: "1px solid",
                      borderColor: theme.palette.light_gray.main,
                      borderRadius: "5px",
                    },
                    "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      border: "0 !important",
                    },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "0 !important",
                    },
                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                      border: "0 !important",
                    },
                    [theme.breakpoints.down("large")]: {
                      width: "560px",
                    },
                    [theme.breakpoints.down("laptop")]: {
                      width: "320px",
                    },
                    [theme.breakpoints.down("tablet")]: {
                      width: "calc(100% - 56px)",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    minWidth: "32px",
                    width: "32px",
                    maxHeight: "32px",
                    padding: "8px 8px",
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "5px"
                  }}
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {mobile: "column", mobile_l: "row"}, 
                  gap: "16px",
                  alignItems: "flex-start",
                  justifyContent: {mobile: "space-between", small: "flex-start"},
                  [theme.breakpoints.down("tablet")]: {
                    width:'100%', 
                  },
                }}
              >
                <Dropdown
                  label={"Type"}
                  placeholder={"Type"} 
                  value={typeQuery}
                  handleChange={handleChangeTypeQuery}
                  options={typeOption}
                  defaultValue={"all"}
                />
                <Dropdown
                  label={"Order"} 
                  placeholder={"Sort"} 
                  value={sortQuery}
                  handleChange={handleChangeSortQuery}
                  options={sortOption}
                  defaultValue={"none"}
                />
              </Box>

            </Box>
            <Button 
              color="primary" 
              variant="contained" 
              sx={{ 
                height: "32px",
                width: "150px",
                typography: theme.typography.heading_h6 ,
                [theme.breakpoints.down("tablet")]: {
                  width:'100%', 
                },
              }}
              onClick={() => router.push({ pathname: "/create-repository" })}
            >
              New Repository
            </Button>
          </Box>
          <Box sx={{flexGrow:1, width: "100%", maxWidth:"large"}}>
            { isLoadingRepo &&
              <Loading transparent={true} centered={false}/>
            }
            { !isLoadingRepo && (repositoryData.isEmpty || repositoryData.repositories.length === 0) &&
              <Box
                sx={{
                  width: "100%", 
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItem: "center"
                }}
              >
                <Typography variant="paragraph_h2" color="dark_gray.main" sx={{textAlign: "center"}}>{repositoryData.isEmpty ? 'No repository.' : 'No repositories found.'}</Typography>
                <Typography variant="paragraph_h4" color="dark_gray.main" sx={{textAlign: "center"}}>
                  {repositoryData.isEmpty ? 
                  <>
                  <Link
                    variant="Paragraph h4"
                    underline="none"
                    href={"/create-repository"}
                    color={"primary.main"}
                  >
                    Create a repository&nbsp;
                  </Link>
                  to get started
                  </>
                  : 
                  'Please check for typos, or use fewer terms or fields.'}
                </Typography>
              </Box>
            }
            { !isLoadingRepo && !repositoryData.isEmpty && repositoryData.repositories.length > 0 && 
              <Grid container columns={{ mobile: 4, tablet: 6, small: 12 }} rowSpacing={5} columnSpacing={{ mobile: 5, tablet: 6, small: 7 }}>
              { repositoryData.repositories.map((repo, index) => (
                <Grid mobile={4} tablet={3} small={4} desktop={3} large={2}  key={index}>
                  <RepositoryCard 
                    item={repo}
                  />
                </Grid>
              ))}
              </Grid>
            }

          </Box>
          </Container>
        </> 
      }
    </>
  )
}
