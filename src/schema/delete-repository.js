import * as yup from 'yup';

export const deleteRepositoryValidation = yup.object({
  name: yup
    .string('Enter your repository name')
    .required('Please fill in the required field')
    .oneOf([yup.ref('real_name'), null], `The repository name doesn't match`)
    .max(255, 'Repository Name is too long'),  
});