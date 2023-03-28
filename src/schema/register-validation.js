import * as yup from 'yup';

export const registerValidation = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  firstName: yup
    .string('Enter your first name')
    .required('First Name is required'),
  lastName: yup
    .string('Enter your last name')
    .required('Last name is required'),
  password: yup
    .string('Enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
      "Your password must be at least 8 characters characters and should include a combinations of numbers, letters, and special characters (!@$%)."
    )
    .required('Password is required'),
  passwordConfirmation: yup
    .string('Enter your password confirmation')
    .oneOf([yup.ref('password'), null], `Password confirmation doesn't match. Please try again.`)
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
      "Your password must be at least 8 characters characters and should include a combinations of numbers, letters, and special characters (!@$%)."
    )
    .required('Password Confirmation is required'),
});