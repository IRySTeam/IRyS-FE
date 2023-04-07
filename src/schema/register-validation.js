import * as yup from 'yup';

export const registerValidation = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Please fill in the required field')
    .max(255, 'Email is too long'),
  firstName: yup
    .string('Enter your first name')
    .required('Please fill in the required field')
    .max(255, 'First name is too long'),
  lastName: yup
    .string('Enter your last name')
    .required('Please fill in the required field')
    .max(255, 'Last name is too long'),
  password: yup
    .string('Enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
      "Your password must be at least 8 characters characters and should include a combinations of numbers, letters, and special characters (!@$%)."
    )
    .required('Please fill in the required field')
    .max(255, 'Password is too long'),
  passwordConfirmation: yup
    .string('Enter your password confirmation')
    .oneOf([yup.ref('password'), null], `The password you entered doesn't match`)
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
      "Your password must be at least 8 characters characters and should include a combinations of numbers, letters, and special characters (!@$%)."
    )
    .required('Please fill in the required field')
    .max(255, 'Password is too long'),
});