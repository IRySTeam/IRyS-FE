import { useState } from 'react';
import { Container, Button, Typography, Box, useMediaQuery, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FeaturesNav from '@/component/features-nav';
import FeaturesDrawer from '@/component/features-drawer';
import Image from 'next/image';

export default function FeaturesManageRepositoryCollaborators() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
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
            features={'Manage Repository Collaborators'}
          />
          <FeaturesDrawer 
            features={'Manage Repository Collaborators'}
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
                Manage Repository Collaborators
              </Typography>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
                This feature allows repository owners and administrators to efficiently handle the access and roles of collaborators associated with a repository. This feature provides a dedicated page where users can add new collaborators, modify existing collaborator roles, and remove access for specific collaborators. It is important to note that these actions can only be performed by the repository owner or users with administrator privileges.
                <br/><br/>
              </Typography>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: theme.palette.light_gray.main,
                  alignSelf: 'center'
                }}
              >
                <Image 
                  src={'/features/collaborator_settings.png'} 
                  alt='repository collaborator setting page' 
                  width={mobile? 356.25: 712.5} 
                  height={mobile? 197.5: 395}
                />
              </Box>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
                <br/>
                Users can invite new collaborators to join the repository by providing their email addresses or usernames. Once invited, the collaborators will receive notifications and invitations to access the repository. Users also have the ability to change the roles of existing collaborators. Roles include owner, admin, uploader, or viewer, each with varying levels of permissions and access rights. In certain cases, it may be necessary to revoke access for specific collaborators. This feature allows repository owners and administrators to remove access for individual collaborators, effectively revoking their ability to interact with the repository`s content and settings.
                <br/><br/>
                This feature is exclusive to repository owners and users with administrator privileges. Only they have the authority to add new collaborators, modify roles, and remove access. By offering these features enables repository owners and administrators to efficiently control and organize the access and roles of collaborators. This ensures smooth collaboration and maintains the security and integrity of the repository by limiting access to authorized individuals.
              </Typography>
            </Box>
          </Container>
        </> 
      }
    </>
  )
}
