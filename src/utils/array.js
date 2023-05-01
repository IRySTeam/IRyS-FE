export const convertExtractionDomainArray= (arr) => {
  const newArray = arr.map((el) => ({
    value: el === 'general'? '' : el,
    label: el.charAt(0).toUpperCase() + el.slice(1),
  }));

  console.log('new', newArray);
  return newArray
}

const convertOperatorValue = (operator) => {
  const words = operator.split('_');
  const capitalized = words.map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}${word === 'eq' ? 'ual' : ''}`);
  return capitalized.join(' ');
}

const convertOperatorArray= (arr) => {
  const operatorArray = arr.map((el) => ({
    value: el,
    label: convertOperatorValue(el),
  }));
  operatorArray.unshift({ value: '', label: 'None' });
  return operatorArray
}

export const convertFilterKeyArray = (arr) => {
  const keyArray = arr.map((el) => ({
    value: el.name,
    label: el.name.charAt(0).toUpperCase() + el.name.slice(1),
  }));
  keyArray.unshift({ value: '', label: 'None' });
  return keyArray
}

export const convertFilterKeyTypeArray = (arr) => {
  return arr.map((el) => ({
    value: el.name,
    label: el.type,
  }));
}

export const convertFilterKeyOperatorArray = (arr) => {
  const operatorArray = arr.map((el) => ({
    value: el.name,
    label: convertOperatorArray(el.operators),
  }));
  operatorArray.unshift({ value: '', label: [{value: '', label: 'None'}] });
  return operatorArray
}