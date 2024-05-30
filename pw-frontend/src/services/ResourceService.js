import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/resources';

export const registerResource = (id, empid, token) => {
    const data = { empid: empid }; // Định nghĩa dữ liệu cần gửi đi, trong trường này là empid
    return axios.post(`${REST_API_BASE_URL}/register/${id}` , data, { headers: { Authorization: `Bearer ${token}` },}); // Gửi yêu cầu POST với dữ liệu
}

export const acceptResource = (id, token) => axios.post(`${REST_API_BASE_URL}/admin/accept/${id}`, {}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const rejectResource = (id, token) => axios.post(`${REST_API_BASE_URL}/admin/reject/${id}`, {}, { headers: { Authorization: `Bearer ${token}` },})

export const listResource = (token) => axios.get(REST_API_BASE_URL, { headers: { Authorization: `Bearer ${token}` },})

export const addResource = (resource, token) => axios.post(`${REST_API_BASE_URL}/admin/add`, resource, { headers: { Authorization: `Bearer ${token}` },})

export const getCurrentUserEmpid = () => {
  return JSON.parse(localStorage.getItem("empid"));
};

export const getCurrentUserToken = () => {
  return localStorage.getItem("token");
};


export const updateResourceNote = (resourceId, newNote, token) => {
  return axios.put(`${REST_API_BASE_URL}/admin/edit/${resourceId}`, { note: newNote }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
