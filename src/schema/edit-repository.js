import * as yup from 'yup';

export const editRepositoryValidation = yup.object({
  name: yup
    .string('Enter your repository name')
    .required('Please fill in the required field')
    .max(255, 'Repository Name is too long'),
  description: yup
    .string('Enter your repository description')
    .max(255, 'Description is too long'),
});