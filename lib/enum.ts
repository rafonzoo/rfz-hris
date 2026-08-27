export enum Routes {
  Homepage = "/",
  Signin = "/signin",
  Register = "/register",
  Employee = "/employee",
}

export enum RoutesRedirection {
  Unauthorized = Routes.Signin,
  Authorized = Routes.Employee,
}
