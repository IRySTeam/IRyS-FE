export const formatDate = (datetime) => {
  const date = new Date(datetime);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}