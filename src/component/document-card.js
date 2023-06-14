import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { formatDate } from '@/utils/date';
import { downloadFile } from '@/utils/download';
import { capitalizeFirstLetter } from '@/utils/document';

export default function DocumentCard(props) {
  const theme = useTheme();
  const router = useRouter();
  const repositoryData = useSelector(state => state.repository);
  
  const handleClickBox = (id) => {
    router.push({ pathname: '/detail-document', query: { id: id} })
  };

  const handleClickDownload = (event) => {
    event.stopPropagation();
    downloadFile(props.item.details.file_url)
  };

  const boldHighlightedText = (preview, highlighted) => {
    const words = preview.split(' ');
    const boldedWords = words.map((word, index) => {
      if (highlighted.some((highlight) => word.includes(highlight))) {
        return <span key={index} className='bold'>{word} </span>;
      }
      return word+' ';
    });
    return boldedWords
  }

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
      onClick={()=> handleClickBox(props.item.details.id)}
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
            maxWidth: {mobile: '100%', laptop: 'calc(100% - 200px)'},
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
            {props.item.details.title}
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
              '& .bold':{
                typography: theme.typography.paragraph_h6_bold,
              },
            }}
          >
            {boldHighlightedText(props.item.preview, props.item.highlights)}
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
            {props.item.details.uploader ? `${props.item.details.uploader.first_name} ${props.item.details.uploader.last_name}` : ''}
          </Typography>
        </Box>
        <Box
          sx={{
            display: {mobile: 'flex', tablet: 'none', laptop: 'flex'},
            flexDirection: {mobile: 'row', laptop: 'column'},
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '8px'
          }}
        >
          { props.item.details.is_public &&
          <Box
            sx={{
              width: '120px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '10px'
            }}
          >
            <Typography variant='heading_h6' color='white.main'>{props.item.details.is_public ? 'Public' : 'Private' }</Typography>
          </Box>}
          { props.item.domain &&
          <Box
            sx={{
              width: '120px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.warning.main,            
              borderRadius: '10px'
            }}
          >
            <Typography variant='heading_h6' color='white.main'>{capitalizeFirstLetter(props.item.domain)}</Typography>
          </Box>}
          <Box 
            sx={{ height: '20px',
                display: {mobile: 'flex', tablet: 'none'},
              }}
          
          >
            { props.item.details.mimetype === 'application/pdf' &&
              <Image src={'/pdf-icon.svg'} alt='pdf-icon' width={20} height={20}/>
            }
            { props.item.details.mimetype === 'text/plain' &&
              <Image src={'/txt-icon.svg'} alt='txt-icon' width={20} height={20}/>
            }
            { ( props.item.details.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || props.item.details.mimetype === 'application/msword' ) &&
              <Image src={'/doc-icon.svg'} alt='doc-icon' width={20} height={20}/>
            }
            { !( props.item.details.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || props.item.details.mimetype === 'application/msword' || props.item.details.mimetype === 'text/plain' || props.item.details.mimetype === 'application/pdf') &&
              <Image src={'/unknown-icon.svg'} alt='unknown-icon' width={20} height={20}/>
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
            justifyContent: {mobile: 'space-between', laptop:'flex-start'},
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <Box
            sx={{
              display: {mobile: 'none', tablet: 'flex'},
              justifyContent: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '8px'
            }}
          >
            { props.item.details.is_public &&
            <Box
              sx={{
                width: '100px',
                height: '20px',
                display: {mobile: 'none', tablet: 'flex', laptop: 'none'},
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '10px'
              }}
            >
              <Typography variant='heading_h6' color='white.main'>{props.item.details.is_public ? 'Public' : 'Private' }</Typography>
            </Box>}
            { props.item.domain &&
            <Box
              sx={{
                width: '120px',
                height: '20px',
                display: {mobile: 'none', tablet: 'flex', laptop: 'none'},
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.warning.main,            
                borderRadius: '10px'
              }}
            >
              <Typography variant='heading_h6' color='white.main'>{capitalizeFirstLetter(props.item.domain)}</Typography>
            </Box>}
            <Box sx={{ height: '32px' }}>
              { props.item.details.mimetype === 'application/pdf' &&
                <Image src={'/pdf-icon.svg'} alt='pdf-icon' width={32} height={32}/>
              }
              { props.item.details.mimetype === 'text/plain' &&
                <Image src={'/txt-icon.svg'} alt='txt-icon' width={32} height={32}/>
              }
              { ( props.item.details.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || props.item.details.mimetype === 'application/msword' ) &&
                <Image src={'/doc-icon.svg'} alt='doc-icon' width={32} height={32}/>
              }
              { !( props.item.details.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || props.item.details.mimetype === 'application/msword' || props.item.details.mimetype === 'text/plain' || props.item.details.mimetype === 'application/pdf') &&
                <Image src={'/unknown-icon.svg'} alt='unknown-icon' width={32} height={32}/>
              }
            </Box>
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
            onClick={handleClickDownload}
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
          { !props.hideFolder && 
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
              {repositoryData.name ?? ''}
            </Typography>
          </Box>}
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
              {`Updated on ${formatDate(props.item.details.updated_at)}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box> 
  )
}