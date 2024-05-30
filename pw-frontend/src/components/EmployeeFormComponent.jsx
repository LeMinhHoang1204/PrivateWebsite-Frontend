import React, { useEffect, useState } from 'react';
import { getEmployee, updateEmployee } from '../services/EmployeeService';
import '../css/EmployeeFormComponent.css';  // Import CSS for styling
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeFormComponent = () => {
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const {id} = useParams();
  const [formData, setFormData] = useState({
    phone_number: '',
    email: '',
    dob: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching data for id: ${id}`);
        const response = await getEmployee(id);
        console.log('Employee data fetched successfully:', response.data);
        setEmployee(response.data);
        setFormData({
          phone_number: response.data.phone_number,
          email: response.data.email,
          dob: response.data.dob
        });
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError('Error fetching employee data');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

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
      await updateEmployee(id, formData);
      const updatedEmployee = { ...employee, ...formData };
      setEmployee(updatedEmployee);
      console.log('Updated');
      setIsEditing(false);
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

  // function updateEmployee(id){
  //   navigator(`/edit-employee/${id}`)
  // }

  return (
    <div className='body'>
          <div className="employee-card">
      <h2 className="h2">Thông tin cá nhân</h2>
       {/* <ImageUploader/> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ và Tên</label>
          <input type="text" value={employee.name} readOnly />
          <label>CMND</label>
          <input type="text" value={employee.citizen_id} readOnly />
        </div>
        
        <div className="form-group">
          <label>Giới tính</label>
          <input type="text" value={employee.sex === 1 ? 'Nam' : 'Nữ'} readOnly />
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
        {/* <div className="form-group">
          <label>Giới tính</label>
          <input type="text" value={employee.sex === 1 ? 'Nam' : 'Nữ'} readOnly />
        </div> */}
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
          <label>Phòng ban</label>
          <input type="text" value={employee.department ? employee.department.name : 'N/A'} readOnly />
        </div>
        <div className="form-group">
          <label>Ngày bắt đầu</label>
          <input type="text" value={employee.start_date} readOnly />
          <label>Người quản lý</label>
          <input type="text" value={employee.manager ? employee.manager.name : 'N/A'} readOnly />
        </div>

        {isEditing ? (
          <div className='button-row'>
            <button className="button-cancel">Huỷ</button>
            <button type="save">Lưu</button>
            {/* <button type="button" onClick={() => setIsEditing(false)}>Hủy</button> */}
          </div>
        ) : (
          <button className="button-fix" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
        )}
      </form>
    </div>
    </div>
    
  );
};  

export default EmployeeFormComponent;
