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
import { docRoles, repoRoles } from '@/data/features';
import CheckIcon from '@mui/icons-material/Check';

export default function FeaturesRole() {
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
            features={'Role'}
          />
          <FeaturesDrawer 
            features={'Role'}
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
                Roles and Permissions
              </Typography>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
              The application has different roles that define the level of access and permissions for users. A role is a collection of permissions that allows users to perform specific actions on IRyS resources. To make permissions available to users, you assign roles. When you assign a role, you grant all the permissions that the role contains.
              <br/><br/>
              Each permission in the IRyS has a role that defines what users can do with a repository or document. This section outlines the four roles for repositories and the three roles for documents within each repository.
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
                Repository Roles
              </Typography>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
                There are four user roles in a repository, namely owner, admin, uploader, and viewer. The following table shows the operations users can perform for each role.
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
                        Permitted Operation
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
                        Owner
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
                        Admin
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
                        Uploader
                      </Typography>
                    </TableCell>
                    <TableCell 
                      align="start" 
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
                        Viewer
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                  <TableBody>
                    {repoRoles.map((row) => (
                      <TableRow
                        key={row.name}
                      >
                        <TableCell align="left">
                          <Typography 
                            sx={{ 
                              color: 'black.main', 
                              typography: 'paragprah_h5',
                            }}
                          >
                            {row.operation}
                          </Typography>
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{
                            borderLeft: '1px solid',
                            borderLeftColor: theme.palette.light_gray.main
                          }}
                        >
                          { row.owner &&  
                            <CheckIcon 
                              sx={{
                                width: '16px',
                                height: '16px',
                                color: theme.palette.dark_gray.main,
                              }}
                            />
                          }
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{
                            borderLeft: '1px solid',
                            borderLeftColor: theme.palette.light_gray.main
                          }}
                        >
                          { row.admin &&  
                            <CheckIcon 
                              sx={{
                                width: '16px',
                                height: '16px',
                                color: theme.palette.dark_gray.main,
                              }}
                            />
                          }
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{
                            borderLeft: '1px solid',
                            borderLeftColor: theme.palette.light_gray.main
                          }}
                        >
                          { row.uploader &&  
                            <CheckIcon 
                              sx={{
                                width: '16px',
                                height: '16px',
                                color: theme.palette.dark_gray.main,
                              }}
                            />
                          }
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{
                            borderLeft: '1px solid',
                            borderLeftColor: theme.palette.light_gray.main
                          }}
                        >
                          { row.viewer &&  
                            <CheckIcon 
                              sx={{
                                width: '16px',
                                height: '16px',
                                color: theme.palette.dark_gray.main,
                              }}
                            />
                          }
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
                Document Roles
              </Typography>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
                There are three user roles in a document, namely owner, editor, and viewer. The following table shows the operations users can perform for each role.
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
                        Permitted Operation
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
                        Owner
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
                        Editor
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
                        Viewer
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                  <TableBody>
                    {docRoles.map((row) => (
                      <TableRow
                        key={row.name}
                      >
                        <TableCell align="left">
                          <Typography 
                            sx={{ 
                              color: 'black.main', 
                              typography: 'paragprah_h5',
                            }}
                          >
                            {row.operation}
                          </Typography>
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{
                            borderLeft: '1px solid',
                            borderLeftColor: theme.palette.light_gray.main
                          }}
                        >
                          { row.owner &&  
                            <CheckIcon 
                              sx={{
                                width: '16px',
                                height: '16px',
                                color: theme.palette.dark_gray.main,
                              }}
                            />
                          }
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{
                            borderLeft: '1px solid',
                            borderLeftColor: theme.palette.light_gray.main
                          }}
                        >
                          { row.editor &&  
                            <CheckIcon 
                              sx={{
                                width: '16px',
                                height: '16px',
                                color: theme.palette.dark_gray.main,
                              }}
                            />
                          }
                        </TableCell>
                        <TableCell 
                          align="center" 
                          sx={{
                            borderLeft: '1px solid',
                            borderLeftColor: theme.palette.light_gray.main
                          }}
                        >
                          { row.viewer &&  
                            <CheckIcon 
                              sx={{
                                width: '16px',
                                height: '16px',
                                color: theme.palette.dark_gray.main,
                              }}
                            />
                          }
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
