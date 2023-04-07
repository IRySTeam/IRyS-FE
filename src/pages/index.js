import { useState } from "react";
import { Container, Button, Typography, Box, OutlinedInput } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Loading from "@/component/loading";
import NavBar from "@/component/navbar";
import SearchIcon from '@mui/icons-material/Search';
import Dropdown from "@/component/dropdown";
import { repositories } from "@/data/repositories";
import RepositoryCard from "@/component/repository-card";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const { search, type, sort} = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(search? search : '');
  const [typeQuery, setTypeQuery] = useState(type? type : 'all');
  const [sortQuery, setSortQuery] = useState(sort? sort : 'none');

  const handleChangeTypeQuery = (event) => {
    setTypeQuery(event.target.value);
  };

  const handleChangeSortQuery = (event) => {
    setSortQuery(event.target.value);
  };

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

  return (
    <>
      { isLoading && <Loading/> }
      {!isLoading &&
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
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
            >
              New Repository
            </Button>
          </Box>
          <Box sx={{flexGrow:1, width: "100%", maxWidth:"large"}}>
            <Grid container columns={{ mobile: 4, tablet: 6, small: 12 }} rowSpacing={5} columnSpacing={{ mobile: 5, tablet: 6, small: 7 }}>
              { repositories.length > 0 && repositories.map((repo, index) => (
                <Grid mobile={4} tablet={3} small={4} desktop={3} large={2}  key={index}>
                  <RepositoryCard 
                    item={repo}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          </Container>
        </> 
      }
    </>
  )
}
