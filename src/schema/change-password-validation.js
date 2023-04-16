import * as yup from 'yup';

export const changePasswordValidation = yup.object({
  new_password: yup
    .string('Enter your password')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-=+{};:,<.>.])(?=.*\d).{8,}$/,
      'Your password must be at least 8 characters that contain at least one uppercase letter, one lowercase letter, one special character (! @ $ % ^ & * ( ) \ - _ = + { } ; : , < . >), and one number.'
    )
    .required('Please fill in the required field')
    .max(255, 'Password is too long'),
  confirm_new_password: yup
    .string('Enter your password confirmation')
    .oneOf([yup.ref('new_password'), null], `The password you entered doesn't match`)
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-=+{};:,<.>.])(?=.*\d).{8,}$/,
      'Your password must be at least 8 characters that contain at least one uppercase letter, one lowercase letter, one special character (! @ $ % ^ & * ( ) \ - _ = + { } ; : , < . >), and one number.'
    )
    .required('Please fill in the required field')
    .max(255, 'Password is too long'),
});