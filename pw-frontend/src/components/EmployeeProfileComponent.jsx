import React, { useState, useEffect } from 'react';
import EmployeeDetails from './EmployeeDetailComponent';
import '../css/EmployeeProfile.css';
import { getEmployee } from '../services/EmployeeService';
import { useParams } from 'react-router-dom';


const EmployeeProfileComponent = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const {id} = useParams();

  useEffect(() => {

    // Gửi yêu cầu đến máy chủ để lấy thông tin của nhân viên đó
    getEmployee(id)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        setError("There was an error fetching the employee data!");
        console.error("There was an error fetching the employee data!", error);
      });
  }, [id]);

  return (
    <div className="container">
      <h2>Employee Information</h2>
      {error && <p>{error}</p>}
      {employee ? (
        <EmployeeDetails employee={employee} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeProfileComponent;
