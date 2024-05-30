import React, { useEffect, useState } from 'react';
import { getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const {id} = useParams();
const navigator = useNavigate();

  const [formData, setFormData] = useState({
    phone_number: '',
    email: '',
    dob: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating employee data with:', formData);
      await updateEmployee(id, formData.phone_number, formData.email, formData.dob);
      setIsEditing(false);
      const updatedEmployee = { ...employee, ...formData };
      setEmployee(updatedEmployee);
      console.log('Updated');

    } catch (error) {
      console.error('Error updating employee data:', error);
      setError('Error updating employee data');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="employee-card">
      <h2>Thông tin cá nhân</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ và Tên</label>
          <input type="text" value={employee.name} readOnly />
        </div>
        <div className="form-group">
          <label>CMND</label>
          <input type="text" value={employee.citizen_id} readOnly />
        </div>
        <div className="form-group">
          <label>Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <input type="text" value={employee.email} readOnly />
          )}
        </div>
        <div className="form-group">
          <label>Ngày sinh</label>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          ) : (
            <input type="text" value={employee.dob} readOnly />
          )}
        </div>
        <div className="form-group">
          <label>Giới tính</label>
          <input type="text" value={employee.sex === 1 ? 'Nam' : 'Nữ'} readOnly />
        </div>
        <div className="form-group">
          <label>SDT</label>
          {isEditing ? (
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          ) : (
            <input type="text" value={employee.phone_number} readOnly />
          )}
        </div>
        <div className="form-group">
          <label>Mã nhân viên</label>
          <input type="text" value={employee.id} readOnly />
        </div>
        <div className="form-group">
          <label>Ngày bắt đầu</label>
          <input type="text" value={employee.start_date} readOnly />
        </div>
        <div className="form-group">
          <label>Phòng ban</label>
          <input type="text" value={employee.department ? employee.department.name : 'N/A'} readOnly />
        </div>
        <div className="form-group">
          <label>Quản lý</label>
          <input type="text" value={employee.manager ? employee.manager.name : 'N/A'} readOnly />
        </div>

        {isEditing ? (
          <div>
            <button type="submit">Lưu</button>
            <button type="button" onClick={() => setIsEditing(false)}>Hủy</button>
          </div>
        ) : (
          // <button type="button" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
          <button type="button" onClick={() => updateEmployee(employee.id)}>Chỉnh sửa</button>
        )}
      </form>
    </div>
  );
};

export default EditEmployee;
