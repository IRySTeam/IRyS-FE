export const formatDate = (datetime) => {
  const date = new Date(datetime);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

export const formatDateTable = (datetime) => {
  const date = new Date(datetime);
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-GB', options);
}