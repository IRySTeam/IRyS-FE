import * as yup from 'yup';

export const createRepositoryValidation = yup.object({
  name: yup
    .string('Enter your repository name')
    .required('Please fill in the required field'),
  description: yup
    .string('Enter your repository description')
    .max(256, 'Description should be of maximum 256 characters length'),
  type: yup
  .string('Pick your repository visibility')
  .oneOf(['public', 'private'], `The type of repository either public or private`)
});