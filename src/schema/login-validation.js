import * as yup from 'yup';

export const loginValidation = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Please fill in the required field')
    .max(255, 'Email is too long'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Please fill in the required field')
    .max(255, 'Password is too long'),
});