import React, {useEffect, useState} from 'react'
import { listDepartments, deleteDepartment } from '../services/DepartmentService'
import { useNavigate } from 'react-router-dom'

const ListDepartmentComponent = () => {

    const[departments, setdepartments] = useState([])
    const navigator = useNavigate();

    useEffect(() =>{
        getAllDepartment();
    }, [])
    
    function getAllDepartment(){
        listDepartments().then((Response) =>{
            setdepartments(Response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewDepartment()
    {
        navigator('/add-department')
    }

    function updateDepartment(id){
        navigator(`/edit-department/${id}`)
    }

    function removeDepartment(id){
        console.log(id);

        deleteDepartment(id).then((Response) => {
            getAllDepartment();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
    <div className='container col-md-6 offset-md-3 offset-md-3'>
        <h2 className='text-center'>List of Departments</h2>
        <button className='btn btn-primary' onClick={addNewDepartment}>Add department</button>
        <table className='table table-striped table bordered'>
            <thead>
                <tr>
                    <th>Dept ID</th>
                    <th>Dept Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    departments.map(department =>
                    <tr key = {department.id}>
                    <td>{department.id}</td>
                    <td>{department.name}</td>
                    <td>
                        <button className='btn btn-info' onClick={() => updateDepartment(department.id)}>Update</button>
                        <button className='btn btn-danger' onClick={() => removeDepartment(department.id)} 
                                style={{marginLeft: '10px'}}>Delete</button>
                    </td>
                </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListDepartmentComponent