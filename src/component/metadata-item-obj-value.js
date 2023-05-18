import { capitalizeFirstLetter } from '@/utils/document';
import { Box, Typography } from '@mui/material';

export default function MetadataItemObjValue(props) {
  return (
    <>
      <Typography variant='paragraph_h6_bold' color='black.main'>{capitalizeFirstLetter(props.label)} {props.no+1}</Typography>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '8px',
        }}
      >
        { props.value && 
          Object.entries(props.value).map(([key, value]) => (
            <Typography key={key} variant='paragraph_h6' color='black.main'>{capitalizeFirstLetter(key)} : {capitalizeFirstLetter(value)}</Typography>
          ))
        }
      </Box>
    </>
  )
}