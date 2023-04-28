import { useCallback, useState} from 'react';
import { useDropzone } from 'react-dropzone'
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import { Box, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileCard from './file-card';

export default function Uploader(props) {
  const theme = useTheme();

  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const mappedAcc = acceptedFiles.map((file) => ({ file, errors: [] }))
    const mappedRej = rejectedFiles.map((file) => ({ file, errors: [] }))

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

    mappedRej.forEach((fileWrapper) => {
      if(fileWrapper.file.errors.length>0){
        const code = fileWrapper.file.errors[0].code
        props.setAlertSeverity('error')
        if(code === 'file-invalid-type'){
          props.setAlertLabel('Invalid file types. Only PDF, TXT, and DOCX file types are allowed.');
        } else if(code === 'too-many-files'){
          props.setAlertLabel('Sorry, only one file can be uploaded at a time.');
        } else {
          props.setAlertLabel('Upload error. Please Try Again.');
        }
        props.setShowAlert(true);
      }
    });
    setFiles(() => [...mappedAcc])
  }, [props])

  const removeFiles = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

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
          <FileCard
            key={index}
            name={fileWrapper.file.name}
            filePath={fileWrapper.file.path}
            type={fileWrapper.file.type}
            progress={fileWrapper.progress}
            loaded={fileWrapper.loaded}
            total={fileWrapper.total}
            onDelete={() => removeFiles(index)}
            error={fileWrapper.error}
          />
        ))}
      </Box>
    </form>
  )
}