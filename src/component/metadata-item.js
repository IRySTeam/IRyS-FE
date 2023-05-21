import { capitalizeFirstLetter } from '@/utils/document';
import { Box, Typography } from '@mui/material';
import MetadataItemObjValue from './metadata-item-obj-value';

export default function MetadataItem(props) {
  const renderValue = () => {
    switch (typeof props.value) {
      case 'string':
        return <Typography variant='paragraph_h6' color='black.main' sx={{minHeight:'21px'}}>{props.value}</Typography>
      case 'number':
        return <Typography variant='paragraph_h6' color='black.main' sx={{minHeight:'21px'}}>{props.value}</Typography>
      case 'boolean':
        return <Typography variant='paragraph_h6' color='black.main' sx={{minHeight:'21px'}}>{props.value}</Typography>
      case 'object':
        if (Array.isArray(props.value)) {
          if (props.value.length > 0 && typeof props.value[0] === 'string') {
            return props.value.map((val, index) => (
              <Typography
                key={index}
                variant="paragraph_h6"
                color="black.main"
                sx={{
                  minHeight: '21px',
                  marginBottom: index === props.value.length - 1 ? '8px' : 0
                }}
              >
                {val}
              </Typography>
            ));
          } else if (props.value.length > 0 && typeof props.value[0] === 'object') {
            return props.value.map((val, index) => (
              <MetadataItemObjValue 
                key={index}
                label={props.label}
                value={val}
                no={index}
              />
            ));
          } else {
            return <Typography variant='paragraph_h6' color='black.main' sx={{minHeight:'21px'}} />
          }
        } else if (props.value.text_vector) {
          return <Typography variant='paragraph_h6' color='black.main' sx={{minHeight:'21px'}}>{props.value.text}</Typography>
        } else {
          return <></>
        }
      default:
        return <></>
    }
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '8px',
      }}
    >
      <Typography variant='heading_h6' color='black.main'>{capitalizeFirstLetter(props.label)}:</Typography>
      {renderValue()}
    </Box>
  )
}