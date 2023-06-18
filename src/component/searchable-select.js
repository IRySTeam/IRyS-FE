import {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, } from '@mui/material';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';


export default function SearchableSelect(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let abortController = new AbortController();

    setLoading(true);
    const fetchUsersRepo = async () =>  {
      const token =  Cookies.get('access_token');
      const data = {
        query: props.inputValue,
        page_no: 1,
        page_size: 10,
      }
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${props.repoId}/members/add/search`, {
          params : data,
          headers: {
            Authorization: `Bearer ${token}`
          },
          signal: abortController.signal
        })
        setOptions(response.data.results)
      } catch (error){
        if(error.code !== 'ERR_CANCELED')console.log(error)
      }
    }

    const fetchUsersDocs = async () =>  {
      const token =  Cookies.get('access_token');
      const data = {
        query: props.inputValue,
        page_no: 1,
        page_size: 100,
      }
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/documents/${props.docId}/collaborators/add/search`, {
          params : data,
          headers: {
            Authorization: `Bearer ${token}`
          },
          signal: abortController.signal
        })
        setOptions(response.data.results)
      } catch (error){
        if(error.code !== 'ERR_CANCELED')console.log(error)
      }
    }
    if(props.repoId){
      fetchUsersRepo()
    }else if (props.docId){
      fetchUsersDocs()
    }
    setLoading(false)
    return () => abortController.abort();
  }, [props.docId, props.inputValue, props.repoId]);

  return (
    <Autocomplete
      sx={{
        width: '100%',
      }}
      forcePopupIcon={false}
      open={open}
      value={props.value}
      onChange={props.onChange}
      inputValue={props.inputValue}
      onInputChange={props.onInputChange}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => {
        if (!option) {
          return '';
        }
        return `${option.first_name} ${option.last_name}`;
      }}
      options={options}
      loading={loading}
      disableClearable={true}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            placeholder: 'Search by name or email',
            endAdornment: (
              <>
                {loading ? <CircularProgress color="primary" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
            sx:{
              width: '100%',
              height: '32px',
              padding: 0,
              typography: theme.typography.form_sublabel_small,
              '&.MuiOutlinedInput-root':{
                padding: '0 8.5px'
              },
            },
          }}
        />
      )}
      renderOption={(props, option, index) => {
        return (
        <Box
          sx={{
            width:'100%',
            display: 'flex',
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent:'flex-start',
            gap: '16px',
            padding: '8px 16px !important',
            borderBottom: index.index < (options.length-1) ? '1px solid' : 0,
            borderBottomColor: theme.palette.light_gray.main,
          }}
          {...props}
        >
          <Box
            sx={{
              display: 'flex',
              width: '36px',
              height: '36px',
              borderRadius: '18px',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <PersonIcon
              sx={{
                width: '24px',
                height: '24px',
                color: theme.palette.white.main
              }}
            />
          </Box>
          <Box
            sx={{
              width:'calc(100% - 62px)',
              display: 'flex',
              flexDirection: 'column', 
              alignItems: 'flex-start',
              justifyContent:'flex-start',                       
            }}
          >
            <Typography variant='form_label_small' color='black.main'>{`${option.first_name} ${option.last_name}`}</Typography>
            <Typography 
              variant='form_sublabel_small' 
              color='black.main' 
              sx={{
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'nowrap'
              }}
            >
              {option.email}
            </Typography>
          </Box>
        </Box>)
      }}
      noOptionsText={
        <Typography  variant='heading_h6' color="black.main">{`Could not find a IRyS account matching ${props.inputValue}`}</Typography>
      }
      loadingText={
        <Typography variant='heading_h6' color="black.main">Fetching users .....</Typography>
      }
      ListboxProps={{
        sx: {
          padding: '0',
          border: '1px solid',
          borderColor: theme.palette.light_gray.main,
          borderRadius: '5px',
        },
      }}
      componentsProps={{
        paper:{
          sx:{
            marginTop: '8px',
          }
        },
      }}
    />
  );
}