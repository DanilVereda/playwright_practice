export enum SignInValidationMessages {
  emptyPassword = 'Password required',
  emptyEmail = 'Email required',
  wrongData = 'Wrong email or password',
}

export enum SignUpValidationMessages {
  emptyName = 'Name is required',
  invalidName = 'Name is invalid',
  invalidLengthName = 'Name has to be from 2 to 20 characters long',
  emptyLastName = 'Last name is required',
  invalidLastName = 'Last name is invalid',
  invalidLengthLastName = 'Last name has to be from 2 to 20 characters long',
  emptyEmail = 'Email required',
  invalidEmail = 'Email is incorrect',
  emptyPassword = 'Password required',
  invalidPassword = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
  emptyRepeatPassword = 'Re-enter password required',
  passwordMismatch = 'Passwords do not match',
  userAlreadyExists = 'User already exists',
}
