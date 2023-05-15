import * as yup from 'yup';

export const deleteDocumentValidation = yup.object({
  name: yup
    .string('Enter your document name')
    .required('Please fill in the required field')
    .oneOf([yup.ref('real_name'), null], `The document name doesn't match`)
    .max(255, 'Document Name is too long'),  
});