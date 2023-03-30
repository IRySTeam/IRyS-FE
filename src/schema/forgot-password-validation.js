import * as yup from 'yup';

export const forgotPasswordValidation = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Please fill in the required field'),
});