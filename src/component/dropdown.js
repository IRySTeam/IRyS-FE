import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, FormControl, Select, MenuItem, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

export default function Dropdown(props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <FormControl sx={{ ...props.sx, minWidth: props.width?? '180px', height: 32, minHeight: 32, maxHeight: 32, padding: 0 }}>
      <Select
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={props.value}
        onChange={(event) => props.handleChange(event, props.id)}
        disabled={props.disableOwner && props.value === 'Owner'}
        displayEmpty
        renderValue={(selected) => {
          return <Typography variant='heading_h6' color='black.main'>{selected === props.defaultValue ? props.placeholder : props.options.find(x => x.value === selected).label}</Typography>
        }}
        sx={{
          '&& .MuiSelect-select' : {
            padding: '4px 16px',
            backgroundColor: props.backgroundColor ?? theme.palette.light_gray.light,
            borderColor: theme.palette.light_gray.main,
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              marginTop: '4px',
              '&& .MuiMenuItem-root.Mui-selected': {
                backgroundColor: theme.palette.white.main
              },
              '&& .MuiMenuItem-root:hover': {
                backgroundColor: theme.palette.white.main
              },
              '&& .MuiMenuItem-root.Mui-selected:hover': {
                backgroundColor: theme.palette.white.main
              },
            }
          },
          MenuListProps:{
            sx: {
              paddingTop: 0,
              paddingBottom: 0,
            }
          }
        }}
        IconComponent={ExpandMoreIcon}
      >
        <MenuItem
          disabled 
          sx={{
            padding: '8px 16px',
            borderBottom: '1px solid', 
            borderBottomColor: theme.palette.light_gray.main,
            backgroundColor: theme.palette.white.main,
            minHeight: '0px',
            '&.Mui-disabled':{
              opacity: 1,
            }
          }}
        >
          <Typography variant='dropdown_heading' color='black.main' sx={{flexGrow: 1}}>{`Select ${props.label}`}</Typography>
          <IconButton
            sx={{ padding: 0, }}
          >
            <CloseIcon
              sx={{
                width: '16px',
                height: '16px',
                color: theme.palette.dark_gray.main,
              }}
            />
          </IconButton>
        </MenuItem>
        {props.options.map((option, index) => (
          <MenuItem 
            key={option.value}
            sx={{
              padding: option.value === props.value ? '8px 16px' : '8px 16px 8px 40px',
              borderBottom: index === props.options.length - 1 ? '0' : '1px solid', 
              borderBottomColor: theme.palette.light_gray.main,
              backgroundColor: theme.palette.white.main,
              minHeight: '0px',
            }}
            value={option.value}
          >
            { option.value === props.value &&  
              <CheckIcon 
                sx={{
                  width: '16px',
                  height: '16px',
                  color: theme.palette.dark_gray.main,
                  marginRight: '8px'
                }}
              />
            }
            <Typography variant='dropdown_option' color='black.main'>{option.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}