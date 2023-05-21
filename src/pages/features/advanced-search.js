import { useState } from 'react';
import { Container, Button, Typography, Box, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import FeaturesNav from '@/component/features-nav';
import FeaturesDrawer from '@/component/features-drawer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { topLevelQueryParams } from '@/data/top_level';
import { filterRecruitment, filterScientific, generalFilter } from '@/data/filter';

export default function FeaturesAdvancedSearch() {
  const theme = useTheme();
  const router = useRouter();
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open)
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {!isLoading &&
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
          <FeaturesNav 
            features={'Advanced Search Document'}
          />
          <FeaturesDrawer
            features={'Advanced Search Document'}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
          />
          <Container 
            sx={{
              padding: '40px', 
              minHeight:'100vh',
              display: 'flex',
              flexDirection: 'column', 
              gap: '24px',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: 'calc(100% - 362px)',
              [theme.breakpoints.down('small')]: {
                padding: '40px 16px',
                width: '100%',
              },
              [theme.breakpoints.down('tablet')]: {
                gap: '16px'
              },
              marginTop: '64px',
              marginLeft: {mobile: '0', small: '360px'},
            }} 
          >
          <Button 
            color='primary' 
            variant='contained' 
            sx={{ 
              height: '32px',
              width: {tablet:'200px'},
              typography: theme.typography.heading_h6,
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
              justifyContent: 'space-between',
              alignItems: 'center',
              display: {mobile: 'flex', small:'none'},
            }}
            onClick={() => toggleDrawer(true)}
          >
            <Typography
              sx={{ 
                color: 'white.main', 
                typography: 'heading_h6',
              }}
            >
              Explore Features
            </Typography>
            < ArrowForwardIosIcon color='white' sx={{width: '20px', height: '20px'}}/>
          </Button>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h2',
              [theme.breakpoints.down('tablet')]: {
                typography: 'heading_h4',
              }, 
            }}
          >
            Advanced Search
          </Typography>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'paragraph_h4',
              textAlign: 'justify',
            }}
          >
            In addition to exploring repositories based on a simple text-based keyword search, IRyS provides the advanced search feature that enables you to further focus your search within a specific document domain. Here, you can define additional parameters for your search, such as the domain itself and also have the choice to pass in advanced filters.
          </Typography>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h4',
              textAlign: 'justify',
            }}
          >
            Top Level Parameters for Query
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {topLevelQueryParams.map((row) => (
                  <TableRow
                    key={row.name}
                  >
                    <TableCell align="center">
                      <Typography 
                        sx={{ 
                          color: 'black.main', 
                          typography: 'heading_h5',
                          textAlign: 'justify',
                        }}
                      >
                        {row.label}
                      </Typography>
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{
                        borderLeft: '1px solid',
                        borderLeftColor: theme.palette.light_gray.main
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: 'black.main', 
                          typography: 'paragraph_h5',
                          textAlign: 'justify',
                        }}
                      >
                        {row.desc}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h4',
              textAlign: 'justify',
            }}
          >
            Domains
          </Typography>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'paragraph_h4',
              textAlign: 'justify',
            }}
          >
            As of right now, all documents will automatically be a part of the GENERAL domain, and can additionally be associated with a more specific domain, that includes the RECRUITMENT and SCIENTIFIC domains.
          </Typography>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h4',
              textAlign: 'justify',
            }}
          >
            General Advanced Filters
          </Typography>
          <TableContainer component={Paper}>
            <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'heading_h5',
                    }}
                  >
                    Information
                  </Typography>
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{
                    borderLeft: '1px solid',
                    borderLeftColor: theme.palette.light_gray.main
                }}>
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'heading_h5',
                    }}
                  >
                    Description
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {generalFilter.map((row) => (
                  <TableRow
                    key={row.name}
                  >
                    <TableCell align="center">
                      <Typography 
                        sx={{ 
                          color: 'black.main', 
                          typography: 'heading_h5',
                        }}
                      >
                        {row.value}
                      </Typography>
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{
                        borderLeft: '1px solid',
                        borderLeftColor: theme.palette.light_gray.main
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: 'black.main', 
                          typography: 'paragraph_h5',
                          textAlign: 'justify',
                        }}
                      >
                        {row.desc}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h4',
              textAlign: 'justify',
            }}
          >
            Domain Specific Advanced Filters: Recruitment
          </Typography>
          <TableContainer component={Paper}>
            <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'heading_h5',
                    }}
                  >
                    Information
                  </Typography>
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{
                    borderLeft: '1px solid',
                    borderLeftColor: theme.palette.light_gray.main
                }}>
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'heading_h5',
                    }}
                  >
                    Description
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {filterRecruitment.map((row) => (
                  <TableRow
                    key={row.name}
                  >
                    <TableCell align="center">
                      <Typography 
                        sx={{ 
                          color: 'black.main', 
                          typography: 'heading_h5',
                        }}
                      >
                        {row.value}
                      </Typography>
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{
                        borderLeft: '1px solid',
                        borderLeftColor: theme.palette.light_gray.main
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: 'black.main', 
                          typography: 'paragraph_h5',
                          textAlign: 'justify',
                        }}
                      >
                        {row.desc}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h4',
              textAlign: 'justify',
            }}
          >
            Domain Specific Advanced Filters: Scientific
          </Typography>
          <TableContainer component={Paper}>
            <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'heading_h5',
                    }}
                  >
                    Information
                  </Typography>
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{
                    borderLeft: '1px solid',
                    borderLeftColor: theme.palette.light_gray.main
                }}>
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'heading_h5',
                    }}
                  >
                    Description
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {filterScientific.map((row) => (
                  <TableRow
                    key={row.name}
                  >
                    <TableCell align="center">
                      <Typography 
                        sx={{ 
                          color: 'black.main', 
                          typography: 'heading_h5',
                        }}
                      >
                        {row.value}
                      </Typography>
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{
                        borderLeft: '1px solid',
                        borderLeftColor: theme.palette.light_gray.main
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: 'black.main', 
                          typography: 'paragraph_h5',
                          textAlign: 'justify',
                        }}
                      >
                        {row.desc}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h4',
            }}
          >
            Basic Search
          </Typography>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'paragraph_h4',
              textAlign: 'justify',
            }}
          >
            Basic search returns documents based on a query accessible from IRyS`s UI based console. The acceptable parameters are those that are mentioned above and can be directly inputted into each respective field provided in the web UI console. 
          </Typography>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h4',
            }}
          >
            CLI Search
          </Typography>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'paragraph_h4',
              textAlign: 'justify',
            }}
          >
            CLI search returns documents based on a provided query string defined based on IRyS`s DSL. Below is the structure of IRyS`s DSL.
          </Typography>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h4',
            }}
          >
            File Search
          </Typography>
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'paragraph_h4',
              textAlign: 'justify',
            }}
          >
            File search returns documents that are evaluated to have similar content to an uploaded file. The acceptable file formats that can be uploaded include PDF, DOC, DOCX, and TXT documents. 
          </Typography>
          </Container>
        </> 
      }
    </>
  )
}
