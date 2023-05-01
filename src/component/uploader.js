import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone'
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import Cookies from 'js-cookie';
import { Box, Typography, Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileCard from './file-card';
import ErrorFileCard from './error-file-card';
import SearchIcon from '@mui/icons-material/Search';
import { refresh } from '@/utils/token';
import { saveAdvancedSearchFile } from '@/state/actions/filterAction';

export default function Uploader(props) {
  const theme = useTheme();
  const router = useRouter()
  const dispatch = useDispatch()

  const [files, setFiles] = useState([]);
  const [isUploadError, setIsUploadError] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const mappedAcc = acceptedFiles.map((file) => ({ file, errors: [] }))
    const mappedRej = rejectedFiles.map((file) => ({ ...file }))

    mappedAcc.forEach((fileWrapper) => {
      const reader = new FileReader();

      reader.onprogress = (event) => {
        const { loaded, total } = event;
        const progress = Math.round((loaded / total) * 100);

        setFiles((curr) =>
          curr.map((f) => {
            if(f.errors.length>0) return

            if (f.file === fileWrapper.file) {
              return { ...f, progress, loaded, total };
            } else {
              return f;
            }
          })
        );
      };
      reader.readAsDataURL(fileWrapper.file);
    });

    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej])
  }, [])

  useEffect(() => {
    setIsUploadError(files.some((file) => file.errors && file.errors.length > 0) || files.length === 0);
  }, [files]);

  const removeFiles = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSearchWithFile = () => {
    const data = {
      file: files[0].file,
    }
    dispatch(saveAdvancedSearchFile(data))
    props.redirectBack()
  };

  const uploadFileToRepo = async () => {
    props.setIsLoading(true);
    const data = new FormData();
    if(files.length === 1){
      const file = files[0].file;
      data.append('file', file);
    } else {
      const fileArray = files
      .filter((fileWrapper) => fileWrapper.errors.length === 0)
      .map((fileWrapper) => fileWrapper.file);
      for (var i = 0; i < fileArray.length; i++){
        data.append('files', fileArray[i])
      }
    }

    const token =  Cookies.get('access_token');
    const refresh_token =  Cookies.get('refresh_token');

    if(token && refresh_token){
      try {
        await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${props.repoId}/documents/upload${files.length === 1 ? '' : 's'}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        })
        props.setAlertSeverity('success');
        props.setAlertLabel('Upload success');
        props.setShowAlert(true);
      } catch (error) {
        props.setAlertSeverity('error');
        if(error.response){
          switch (error.response.data.error_code){
            case 400:
              props.setAlertLabel('Bad request syntax or unsupported method');
              props.setShowAlert(true);
              break;
            case 401:
              refresh('access_token', 'refresh_token', router);
              props.setIsLoading(false);
              break;
            case 'USER__NOT_ALLOWED':
              props.setAlertLabel('You are not allowed to perform this action');
              props.setShowAlert(true);
              break;
            case 404:
              props.setAlertLabel('Nothing matches the given URI');
              props.setShowAlert(true);
              break;
            default :
              props.setAlertLabel('Network Error, Please Try Again.');
              props.setShowAlert(true);
              break;
          }
        } else{
          props.setAlertLabel('Network Error, Please Try Again.');
          props.setShowAlert(true);
        }
        props.setIsLoading(false);
      }
    }
    props.setIsLoading(false)
  }

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : ['.docx'],
      'application/msword' : ['.doc'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 30000 * 1024,
    maxFiles: props.maxFiles ?? 0,
    multiple: !(props.maxFiles === 1),
  })
  
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {},
  });

  return (
    <form 
      onSubmit={formik.handleSubmit} 
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          maxWidth: 'large',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          gap: '16px',
          height: '300px',
          border: '1px solid',
          borderRadius: '10px',
          borderColor: theme.palette.light_gray.main,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()}/>
        <UploadFileIcon
          sx={{
            width: '72px',
            height: '72px',
            color: theme.palette.primary.main,
          }}
        />
        <Typography 
          variant='heading_h4' 
          color='black.main'
          textAlign='center'
          sx={{
            maxWidth: '318px',
            "& .primary": {
              color: theme.palette.primary.main
            }
          }}
        >
          Drag and drop files here or <span className='primary'>browse files </span> to start uploading
        </Typography>
        <Typography 
          variant='paragraph_h5' 
          color='black.main' 
          textAlign='center' 
          sx={{ maxWidth: '382px', }}
        >
          Only PDF, TXT, and DOCX file types are allowed
          {props.maxFiles ? `. (Max ${props.maxFiles} file)` : ''}
        </Typography>
      </div>
      { files.length > 0 &&
        <Typography 
          variant='heading_h3' 
          color='black.main' 
          sx={{ marginTop:  '8px',}}
        >
          Uploaded File{files.length > 1 ? 's' : ''}
        </Typography>
      }
      <Box
        sx={{
          maxWidth: 'large',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        { files.map((fileWrapper, index) => (
          fileWrapper.errors.length > 0?
          <ErrorFileCard 
            key={index}
            name={fileWrapper.file.name}
            error={fileWrapper.errors[0].code}
            size={fileWrapper.file.size}
            onDelete={() => removeFiles(index)}
          />
          : 
          <FileCard
            key={index}
            name={fileWrapper.file.name}
            type={fileWrapper.file.type}
            progress={fileWrapper.progress}
            loaded={fileWrapper.loaded}
            total={fileWrapper.total}
            onDelete={() => removeFiles(index)}
          />
        ))}
      </Box>
      { props.page === 'advanced-search' &&
        <Box
          sx= {{
            width: '100%',
            display: 'flex',
            flexDirection: {mobile: 'column-reverse', mobile_l: 'row'}, 
            gap: {mobile: '16px', mobile_l: '24px'},
            alignItems: 'flex-start',
            justifyContent: {mobile: 'center', mobile_l: 'flex-end'},
          }}
        >
          <Button 
            color='primary' 
            variant='outlined' 
            sx={{ 
              height: '32px',
              width: {mobile: '100%', mobile_l: '150px'},
              typography: theme.typography.heading_h6,
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={ () => props.redirectBack()}
          >
            <Typography
              sx={{ 
                color: 'primary.main', 
                typography: 'heading_h6',
              }}
            >
              Cancel
            </Typography>
          </Button>
          <Button 
            color='primary' 
            variant='contained' 
            sx={{ 
              height: '32px',
              width: {mobile: '100%', mobile_l: '150px'},
              typography: theme.typography.heading_h6,
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={isUploadError}
            onClick={() => handleSearchWithFile()}
          >
            <Typography
              sx={{ 
                color: 'white.main', 
                typography: 'heading_h6',
              }}
            >
              Search
            </Typography>
            <SearchIcon
              sx={{
                width: '18px',
                height: '18px',
                color: theme.palette.white.main
              }}
            />
          </Button>
        </Box>
      }
      { props.page === 'upload-file' &&
        <Button 
          color='primary' 
          variant='contained' 
          sx={{ 
            height: '32px', 
            padding: '0 12px',
            width: '150px',
            typography: theme.typography.heading_h6,
            alignSelf: 'flex-end',
            '&.Mui-disabled': {
              backgroundColor: theme.palette.dark_gray.light,
              color: theme.palette.white.main,
            }
          }}
          disabled={isUploadError}
          onClick={() => uploadFileToRepo()}
        >
          Upload
        </Button> 
      }
    </form>
  )
}