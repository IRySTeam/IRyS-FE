import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import FilterDropdown from './dropdown';
import { modelOption, scoringAlgorithmOption } from '@/constants/option';
import FilterInput from './input';

export default function FilterCard(props) {
  const theme = useTheme();
  const filterOption = useSelector(state => state.filterOption);
  const [key, setKey] = useState(props.filter.key);
  const [dataType, setDataType] = useState(props.filter.data_type);
  const [operator, setOperator] = useState(props.filter.operator);
  const [value, setValue] = useState(props.filter.value);
  const [model, setModel] = useState(props.filter.model);
  const [scoringAlgorithm, setScoringAlgorithm] = useState(props.filter.scoring_algorithm);
  const [topN, setTopN] = useState(props.filter.top_n);
  const [scoreThreshold, setScoreThreshold] = useState(props.filter.score_threshold);

  const handleKeyChange = (event) => {
    const newKey = event.target.value;
    const newDataType = getTypeOfKey(newKey);
    setKey(newKey);
    setDataType(newDataType);
    setOperator('');
    setValue('');
    setModel('');
    setScoringAlgorithm('');
    setTopN(0);
    setScoreThreshold(0);
    props.onChange(newKey, newDataType, '', '', '', '', 0, 0);
  };

  const handleOperatorChange = (event) => {
    const newOperator = event.target.value;
    setOperator(newOperator);
    setValue('');
    setModel('');
    setScoringAlgorithm('');
    setTopN(0);
    setScoreThreshold(0);
    props.onChange(key, dataType, newOperator, '', '', '', 0, 0);
  };

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    props.onChange(key, dataType, operator, newValue, model, scoringAlgorithm, topN, scoreThreshold);
  };

  const handleModelChange = (event) => {
    const newModel = event.target.value;
    setModel(newModel);
    props.onChange(key, dataType, operator, value, newModel, scoringAlgorithm, topN, scoreThreshold);
  };

  const handleScoringAlgorithmChange = (event) => {
    const newScoringAlgorithm = event.target.value;
    setScoringAlgorithm(newScoringAlgorithm);
    props.onChange(key, dataType, operator, value, model, newScoringAlgorithm, topN, scoreThreshold);
  };

  const handleTopNChange = (event) => {
    const newTopN = parseInt(event.target.value);
    setTopN(newTopN);
    props.onChange(key, dataType, operator, value, model, scoringAlgorithm, newTopN, scoreThreshold);
  };

  const handleScoreThresholdChange = (event) => {
    const newScoreThreshold = parseFloat(event.target.value);
    setScoreThreshold(newScoreThreshold);
    props.onChange(key, dataType, operator, value, model, scoringAlgorithm, topN, newScoreThreshold);
  };

  const getTypeOfKey = (key) => {
    const type = filterOption.filter_type_option.find((option) => option.value === key);
    return type ? type.label : '';
  }

  const getOperatorOfKey = () => {
    const operator = filterOption.filter_operator_option.find((option) => option.value === key);
    return operator ? operator.label : [{value: '', label: 'None'}];
  }

  return (
    <Box 
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography 
          sx={{ 
            color: 'black.main', 
            typography: 'heading_h4',
            [theme.breakpoints.down('tablet')]: {
              typography: 'heading_h5',
            }, 
          }}
        >
          {`Filter ${props.order + 1}`}
        </Typography>
        <IconButton
          sx={{ 
            padding: '4px',
            backgroundColor: theme.palette.error.main,
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: theme.palette.error.main,
            },
          }}
          onClick={props.onRemove}
        >
          <CloseIcon
            sx={{
              width: '16px',
              height: '16px',
              color: theme.palette.white.main,
            }}
          />
        </IconButton>
      </Box>
      <FilterDropdown
        label="Filter"
        placeholder="Select a filter.."
        value={props.filter.key}
        options={filterOption.filter_key_option}
        defaultValue={''}
        onChange={handleKeyChange}
        required={true}
      />
      <FilterDropdown
        label="Operator"
        placeholder="Select an operator.."
        value={props.filter.operator}
        options={getOperatorOfKey()}
        defaultValue={''}
        onChange={handleOperatorChange}
        required={true}
      />
      <FilterInput
        label="Value"
        placeholder="Enter filter value.."
        value={props.filter.value}
        onChange={handleValueChange}
        required={true}
        disabled={ props.filter.operator=== 'exists' || props.filter.operator === 'not_exists' }
      />
      { props.filter.operator === 'semantic_search' &&
      <>
        <FilterDropdown
          label="Model"
          placeholder="Select a model.."
          value={props.filter.model}
          options={modelOption}
          defaultValue={''}
          onChange={handleModelChange}
        />
        <FilterDropdown
          label="Scoring Algorithm"
          placeholder="Select a scoring algorithm.."
          value={props.filter.scoring_algorithm}
          options={scoringAlgorithmOption}
          defaultValue={''}
          onChange={handleScoringAlgorithmChange}
        />
        <FilterInput
          label="Top N"
          placeholder="Enter the top n number.."
          value={props.filter.top_n}
          onChange={handleTopNChange}
        />
        <FilterInput
          label="Score Threshold"
          placeholder="Enter the score threshold (decimal).."
          value={props.filter.score_threshold}
          onChange={handleScoreThresholdChange}
        />
      </>
      }
      <Box 
        sx={{ 
          height: '1px', 
          width: '100%',
          backgroundColor: theme.palette.light_gray.main
        }}
      />
    </Box>
  )
}