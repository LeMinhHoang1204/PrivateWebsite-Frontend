import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/resourcetypes';

export const listResourceType = () => axios.get(REST_API_BASE_URL)
