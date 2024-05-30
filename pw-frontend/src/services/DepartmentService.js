// import axios from "axios";

// const REST_API_BASE_URL ='http://localhost:8080/departments'

// export const listDepartments = () => axios.get(REST_API_BASE_URL);

// export const createDepartment = (department) => axios.post(REST_API_BASE_URL + '/add-department', department);

// export const getDepartment = (departmentId) => axios.get(REST_API_BASE_URL + '/' + departmentId)

// export const updateDepartment = (departmentId, department) => axios.put(REST_API_BASE_URL + '/edit-department/' + departmentId, department)

import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/departments';

export const listDepartments = () => axios.get(REST_API_BASE_URL);

export const createDepartment = (department) => axios.post(`${REST_API_BASE_URL}/add-department`, department);

export const getDepartment = (departmentId) => axios.get(`${REST_API_BASE_URL}/${departmentId}`);

//export const updateDepartment = (departmentId, department) => axios.put(`${REST_API_BASE_URL}/edit-department/${departmentId}`, department);

export const updateDepartment = (departmentId, name) => axios.put(`${REST_API_BASE_URL}/edit-department/${departmentId}`, null, {params: { name }});

export const deleteDepartment = (departmentId) => axios.delete(`${REST_API_BASE_URL}/${departmentId}`);

