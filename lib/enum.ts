export enum Routes {
  Homepage = '/',
  Signin = '/signin',
  Register = '/register',
  Employee = '/employee',
  Onboarding = '/onboarding',
}

export enum RoutesRedirection {
  Unauthorized = Routes.Signin,
  Authorized = Routes.Employee,
}

export enum ErrorCode {
  UserNotFound = 'user-not-found',
  EmployeeNotFound = 'employee-not-found',
}
