import { useState } from 'react';
import { Container, Button, Typography, Box, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FeaturesNav from '@/component/features-nav';
import FeaturesDrawer from '@/component/features-drawer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { filterRecruitment, filterScientific, generalFilter } from '@/data/filter';

export default function FeaturesDetailDocument() {
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
            features={'Detail Document'}
          />
          <FeaturesDrawer 
            features={'Detail Document'}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
          />
          <Container 
            sx={{
              padding: '40px', 
              minHeight:'100vh',
              display: 'flex',
              flexDirection: 'column', 
              gap: '56px',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: 'calc(100% - 362px)',
              [theme.breakpoints.down('small')]: {
                padding: '40px 16px',
                width: '100%',
              },
              [theme.breakpoints.down('tablet')]: {
                gap: '40px'
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column', 
                gap: '16px',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
              }}
            >
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'heading_h2',
                  [theme.breakpoints.down('tablet')]: {
                    typography: 'heading_h4',
                  }, 
                }}
              >
                Detail Documents
              </Typography>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
                The document detail page consists of two parts, the file viewer and the information section. The file viewer allows you to see the selected file within IRyS without downloading the file. The information section provides an organized overview of the important information extracted from your uploaded documents. The information section separated into two subsections, extracted information and extracted entities. The extracted information subsection contains extracted metadata and domain specific information from the document. On the other hand, the extracted entities subsection contains entities extracted using a technique called Named Entity Recognition (NER). Entities refer to important elements or components within the text, such as PERSON, ORGANIZATION, and LOCATION.
                <br/><br/>
                The content of the information section will differ depending on the domain of the document. The entities and information displayed for each domain is defined as follows.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column', 
                gap: '16px',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
              }}
            >
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
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column', 
                gap: '16px',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
              }}
            >
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
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column', 
                gap: '16px',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
              }}
            >
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
            </Box>
          </Container>
        </> 
      }
    </>
  )
}
