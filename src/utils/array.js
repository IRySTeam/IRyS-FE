export const convertExtractionDomainArray= (arr) => {
  const newArray = arr.map((el) => ({
    value: el,
    label: el.charAt(0).toUpperCase() + el.slice(1),
  }));
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
    label: convertOperatorValue(el.name),
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

export const removeEmptyFilters = (arr) => {
  return arr.filter(obj => obj.key !== '' && obj.operator !== '');
}

export const sortByUpdatedAt = (array) => {
  array.sort((a, b) => new Date(b.details.updated_at) - new Date(a.details.updated_at));
  return array;
}

export const sortByTitle = (array) => {
  array.sort((a, b) => a.details.title.localeCompare(b.details.title));
  return array;
}