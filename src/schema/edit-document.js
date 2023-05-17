import * as yup from 'yup';

export const editDocumentValidation = yup.object({
  name: yup
    .string('Enter your repository name')
    .required('Please fill in the required field')
    .max(255, 'Repository Name is too long'),
  is_public: yup
    .boolean()
});