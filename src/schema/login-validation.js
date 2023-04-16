import * as yup from 'yup';

export const loginValidation = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Please fill in the required field')
    .max(255, 'Email is too long'),
  password: yup
    .string('Enter your password')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-=+{};:,<.>.])(?=.*\d).{8,}$/,
      'Your password must be at least 8 characters that contain at least one uppercase letter, one lowercase letter, one special character (! @ $ % ^ & * ( ) \ - _ = + { } ; : , < . >), and one number.'
    )
    .required('Please fill in the required field')
    .max(255, 'Password is too long'),
});