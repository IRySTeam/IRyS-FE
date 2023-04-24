import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import FilterDropdown from './dropdown';
import { filterOption, modelOption, operatorOption, scoringAlgorithmOption } from '@/constants/option';
import FilterInput from './input';

export default function FilterCard(props) {
  const theme = useTheme();
  const [key, setKey] = useState(props.filter.key);
  const [operator, setOperator] = useState(props.filter.operator);
  const [value, setValue] = useState(props.filter.value);
  const [model, setModel] = useState(props.filter.model);
  const [scoringAlgorithm, setScoringAlgorithm] = useState(props.filter.scoring_algorithm);
  const [topN, setTopN] = useState(props.filter.top_n);
  const [scoreThreshold, setScoreThreshold] = useState(props.filter.score_threshold);

  const handleKeyChange = (event) => {
    const newKey = event.target.value;
    setKey(newKey);
    setOperator('');
    setValue('');
    setModel('');
    setScoringAlgorithm('');
    setTopN('');
    setScoreThreshold('');
    props.onChange(newKey, '', '', '', '', '', '');
  };

  const handleOperatorChange = (event) => {
    const newOperator = event.target.value;
    setOperator(newOperator);
    setValue('');
    setModel('');
    setScoringAlgorithm('');
    setTopN('');
    setScoreThreshold('');
    props.onChange(key, newOperator, '', '', '', '', '');
  };

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    props.onChange(key, operator, newValue, model, scoringAlgorithm, topN, scoreThreshold);
  };

  const handleModelChange = (event) => {
    const newModel = event.target.value;
    setModel(newModel);
    props.onChange(key, operator, value, newModel, scoringAlgorithm, topN, scoreThreshold);
  };

  const handleScoringAlgorithmChange = (event) => {
    const newScoringAlgorithm = event.target.value;
    setScoringAlgorithm(newScoringAlgorithm);
    props.onChange(key, operator, value, model, newScoringAlgorithm, topN, scoreThreshold);
  };

  const handleTopNChange = (event) => {
    const newTopN = event.target.value;
    setTopN(newTopN);
    props.onChange(key, operator, value, model, scoringAlgorithm, newTopN, scoreThreshold);
  };

  const handleScoreThresholdChange = (event) => {
    const newScoreThreshold = event.target.value;
    setScoreThreshold(newScoreThreshold);
    props.onChange(key, operator, value, model, scoringAlgorithm, topN, newScoreThreshold);
  };

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
          }}
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
        options={filterOption}
        defaultValue={''}
        onChange={handleKeyChange}
      />
      <FilterDropdown
        label="Operator"
        placeholder="Select an operator.."
        value={props.filter.operator}
        options={operatorOption}
        defaultValue={''}
        onChange={handleOperatorChange}
      />
      <FilterInput
        label="Value"
        placeholder="Enter filter value.."
        value={props.filter.value}
        onChange={handleValueChange}
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
    </Box>
  )
}