import Image from 'next/image'
import { Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { formatDate } from '@/utils/date';
import { formatAuthor } from '@/utils/document';

export default function DocumentCard(props) {
  const theme = useTheme();
  
  const handleClickBox = (id) => {
    console.log(`Open Document with Index ${id}`)
  };

  const handleClickDownload = (event) => {
    event.stopPropagation();
    console.log(`Download Document with Index ${props.item.id}`)
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: { mobile:'300px', tablet:'250px', laptop: '200px' },
        border: '1px solid',
        color: theme.palette.light_gray.main,
        padding: '16px 24px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        cursor: 'pointer'
      }}
      onClick={()=> handleClickBox(props.item.id)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {mobile: 'column-reverse', tablet:'row', small:'column-reverse', laptop:'row'},
          justifyContent: 'space-between',
          width: "100%",
          gap: '8px'
        }}
      >
        <Box
          sx={{
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            maxWidth: {mobile: '100%', tablet: '540px', laptop: 'calc(100% - 200px)'},
            gap: '8px',
          }}
        >
          <Typography 
            variant='heading_h4' 
            color='black.main' 
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {props.item.name}
          </Typography>
          <Typography 
            variant='paragraph_h6' 
            color='dark_gray.main' 
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: {mobile: 3, tablet: 2},
              WebkitBoxOrient: 'vertical',
            }}
          >
            {props.item.highlighted_text}
          </Typography>
          <Typography 
            variant='paragraph_h6' 
            color='black.main' 
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {formatAuthor(props.item.author)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'flex-start',
            gap: '8px'
          }}
        >
          <Box
            sx={{
              width: '100px',
              height: '20px',
              display: 'flex',
              alignItem: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '10px'
            }}
          >
            <Typography variant='heading_h6' color='white.main' sx={{ textTransform: 'capitalize' }}>{props.item.visibility}</Typography>
          </Box>
          <Box
            sx={{
              height: '20px',
              display:{mobile: 'block', laptop:'none'}
            }}
          >
            { props.item.type === 'pdf' &&
              <Image src={'/pdf-icon.svg'} alt='pdf-icon' width={20} height={20}/>
            }
            { props.item.type === 'txt' &&
              <Image src={'/txt-icon.svg'} alt='txt-icon' width={20} height={20}/>
            }
            { props.item.type === 'docx' &&
              <Image src={'/doc-icon.svg'} alt='doc-icon' width={20} height={20}/>
            }
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: {mobile: 'column-reverse', laptop:'row'},
          alignItems: {mobile: 'flex-start', laptop:'center'},
          justifyContent: {mobile: 'flex-start', laptop:'space-between'},
          gap: '8px'
        }}
      >
        <Box
          sx={{
            width: {mobile:'100%', laptop: '30%'},
            display: 'flex',
            flexDirection: 'row',
            justifyContent: {mobile: 'flex-end', laptop:'flex-start'},
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <Box
            sx={{
              height:'32px',
              display:{mobile: 'none', laptop:'block'}
            }}
          >
            { props.item.type === 'pdf' &&
              <Image src={'/pdf-icon.svg'} alt='pdf-icon' width={32} height={32}/>
            }
            { props.item.type === 'txt' &&
              <Image src={'/txt-icon.svg'} alt='txt-icon' width={32} height={32}/>
            }
            { props.item.type === 'docx' &&
              <Image src={'/doc-icon.svg'} alt='doc-icon' width={32} height={32}/>
            }
          </Box>

          <Button 
            color='primary' 
            variant='contained' 
            sx={{ 
              height: '32px',
              width: {mobile: '100%', tablet:'125px'},
              typography: theme.typography.heading_h6,
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => handleClickDownload(props.item.id)}
          >
            <Typography
              sx={{ 
                color: 'white.main', 
                typography: 'heading_h6',
              }}
            >
              Download
            </Typography>
            <FileDownloadIcon
              sx={{
                width: '18px',
                height: '18px',
                color: theme.palette.white.main
              }}
            />
          </Button>
        </Box>
        <Box
          sx={{
            width: {mobile: '100%', laptop:'50%'},
            display: 'flex',
            flexDirection: {mobile: 'column', tablet:'row'},
            alignItems: 'flex-start',
            justifyContent: {mobile: 'flex-start', tablet:'space-between', laptop:'flex-end'},
            gap: {mobile: '8px', laptop:'16px'}
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '8px',
              maxWidth: {mobile: '100%', tablet:'50%'},
            }}
          >
            <FolderOpenIcon color='dark_gray' sx={{width: '20px', height: '20px'}}/>
            <Typography 
              variant='paragraph_h6' 
              color='dark_gray.main' 
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {props.item.repository.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '8px',
              maxWidth: {mobile: '100%', tablet:'50%'},
            }}
          >
            <AccessTimeIcon color='dark_gray' sx={{width: '20px', height: '20px'}}/>
            <Typography 
              variant='paragraph_h6' 
              color='dark_gray.main' 
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {`Updated on ${formatDate(props.item.last_updated)}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box> 
  )
}