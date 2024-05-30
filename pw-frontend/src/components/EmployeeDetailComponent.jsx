import React from 'react';
import PropTypes from 'prop-types';
import '../css/EmployeeDetails.css';  // Import file CSS để tạo style

const EmployeeDetails = ({ employee }) => {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <div className='employee-get'>
          <p><strong>Id:</strong> {employee.id}</p>
      </div>
      
      <p><strong className='employee-get'>Citizen Id:</strong> {employee.citizen_id}</p>
      <p><strong className='employee-get'>Phone Number:</strong> {employee.phone_number}</p>
      <p><strong>Date of Birth:</strong> {employee.dob}</p>
      <p><strong>Employee Type:</strong> {employee.emp_type}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Sex:</strong> {employee.sex}</p>
      <p><strong>Start Date:</strong> {employee.start_date}</p>
      <p><strong>Department:</strong> {employee.department ? employee.department.name : 'N/A'}</p>
      <p><strong>Manager:</strong> {employee.manager ? employee.manager.name : 'N/A'}</p>
    </div>
  );
};

EmployeeDetails.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    citizen_id: PropTypes.string,
    phone_number: PropTypes.string,
    dob: PropTypes.string,
    emp_type: PropTypes.number,
    email: PropTypes.string.isRequired,
    sex: PropTypes.number,
    start_date: PropTypes.string,
    department: PropTypes.shape({
      name: PropTypes.string,
    }),
    manager: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default EmployeeDetails;
