export const downloadFile = async (fileUrl) => {
  try {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const fileName = getFileNameFromUrl(fileUrl);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}

function getFileNameFromUrl(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}