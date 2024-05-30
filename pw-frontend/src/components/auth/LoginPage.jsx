import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
// import '../css/Login.css';
import'../../css/Login.css';

function LoginPage(){
const [empid, setEmpid] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userData = await userService.login(empid, password)
        console.log(userData)
        if (userData.token) {
            localStorage.setItem('token', userData.token)
            localStorage.setItem('role', userData.role)
            navigate(`/profile/${empid}`)
        }else{
            setError(userData.message)
        }
        
    } catch (error) {
        console.log(error)
        setError(error.message)
        setTimeout(()=>{
            setError('');
        }, 5000);
    }

}


    return(
        <div className="body">
            <div className="auth-container">
            <h2 className="login-title" >Đăng nhập</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Mã nhân viên: </label>
                    <input type="empid"  placeholder='Nhập mã nhân viên' value={empid} onChange={(e) => setEmpid(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Mật khẩu: </label>
                    <input type="password"  placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                        <p className="forgot-password">
                    <a href="/forgot-password">Quên mật khẩu?</a>
                    </p>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
        </div>
        
    )

}

export default LoginPage;