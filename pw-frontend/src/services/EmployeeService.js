import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/employees';

export const getEmployee = (employeeId) => axios.get(`${REST_API_BASE_URL}/${employeeId}`);

export const updateEmployee = (employeeId, formData) => axios.put(`${REST_API_BASE_URL}/edit-employee/${employeeId}`, formData, {
    headers: { 'Content-Type': 'application/json' }});

