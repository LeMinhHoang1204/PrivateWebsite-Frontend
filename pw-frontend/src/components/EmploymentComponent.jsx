import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartment, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const EmploymentComponent = () => {

    const[name, setName] = useState('')

    const navigator = useNavigate();

    const {id} = useParams();

    const [error, setErrors] = useState({
        name: ''
    })

    function handleName(e){
        setName(e.target.value)
    }

    function saveOrUpdateDepartment(e){
        e.preventDefault();

        if(validateForm())
        {
            const department = {name}
            console.log(department)

            if(id){
                    updateDepartment(id, name).then((Response) => {
                    console.log(Response.data);
                    navigator('/departments');
                }).catch(error => {
                    console.error(error);
                })
            } else{
                    createDepartment(department).then((Response) => {
                    console.log(Response.data);
                    navigator('/departments');
            }).catch(error => {
                    console.error(error);
            })
            }
        }
    }

    function validateForm(){
        let valid = true;

        const errorCopy ={... error};

        if(name.trim()){
            errorCopy.name = '';
        }else{
            errorCopy.name = 'Name is required';
            valid = false;
        }

        setErrors(errorCopy);
        
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update department</h2>
        } else{
            return <h2 className='text-center'>Add department</h2>

        }
    }

    useEffect(() =>{
        if(id){
            getDepartment(id).then((Response) =>{
                setName(Response.data.name);
            }).catch(error => {
                console.error(error);
            })
        }

    },[id])

  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form_group mb-2'>
                            <label className='form-label'>Name:</label>
                            <input type="text"  
                                    placeholder='Enter department name'
                                    name='Name'
                                    value={name}
                                    className={`form-control ${error.name ? 'is-invalid': ''}`}
                                    onChange={handleName} />
                            {error.name && <div className='invalid-feedback'>{error.name}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateDepartment}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default EmploymentComponent