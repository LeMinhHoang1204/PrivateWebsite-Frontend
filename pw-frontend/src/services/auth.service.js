import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/Employees';

// export const ListEmployees =() => axios.get(REST_API_BASE_URL);

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// const AuthService = {
// //   register,
// //   login,
// //   logout,
//   getCurrentUser,
// }

// export default AuthService;

export const getEmployee = (EmployeeId) => axios.get(`${REST_API_BASE_URL}/${EmployeeId}`);
