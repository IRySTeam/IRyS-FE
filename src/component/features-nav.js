import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

export default function FeaturesNav(props) {
  const theme = useTheme()
  const router = useRouter()
  const menus = [
    {
      label: 'Overview',
      url: '/features',
    },
    {
      label: 'Role',
      url: '/features/role',
    },
    {
      label: 'Create Repositories',
      url: '/features/create-repository',
    },
    {
      label: 'Manage Repository Setting',
      url: '/features/repo-general-setting',
    },
    {
      label: 'Manage Repository Collaborators',
      url: '/features/repo-collaborator-setting',
    },
    {
      label: 'Upload Documents',
      url: '/features/upload-document',
    },
    {
      label: 'Manage Document',
      url: '/features/manage-document',
    },
    {
      label: 'Monitor Document',
      url: '/features/monitor-document',
    },
    {
      label: 'Search Documents and Repositories',
      url: '/features/search',
    },
    {
      label: 'Advanced Search Document',
      url: '/features/advanced-search',
    },
    {
      label: 'Detail Document',
      url: '/features/detail-document',
    },
  ]

  return (
    <Box 
      sx={{
        position: 'fixed',
        top: 64,
        left: 0,
        display: {mobile: 'none', small: 'flex'},
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRight: '1px solid',
        borderRightColor: theme.palette.light_gray.main,
        height: '100vh',
        padding: '16px'
      }}>
        <Typography variant='heading_h4' color='black.main' sx={{marginBottom: '24px'}}>Features</Typography>
        { menus.map((menu, index) => (
          <Box
            key={index}
            sx={{
              width: '330px',
              justifyContent: 'flex-start',
              borderRadius: '5px',
              backgroundColor: props.features === menu.label ? theme.palette.light_gray.main : 'transparent',
              padding: '5px 8px',
              cursor: 'pointer',
            }}
            onClick={() => router.push({ pathname: menu.url })}
          >
            <Typography variant={ props.features === menu.label ? 'heading_h5' : 'paragraph_h5' } color='black.main'>{menu.label}</Typography>
          </Box>
        ))}
    </Box>
  )
}