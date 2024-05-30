
// import React from 'react'

// const HeaderComponent = () => {
//   return (
//     <div>
//         <header>
//             <nav className='navbar navbar-light' style={{backgroundColor: '#e3f2fd'}}>
//                   <a className='navbar-brand' href='#'>Private Website</a>
//             </nav>
//         </header>
//     </div>
//   )
// }

// export default HeaderComponent

import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import {getCurrentUserEmpid } from '../services/ResourceService';
import '../css/Header.css'

function HeaderComponent() {
    const isAuthenticated = userService.isAuthenticated();
    const isAdmin = userService.isAdmin();
    const [currentUser, setCurrentUser] = useState(null); // Đối tượng người dùng hiện tại

    useEffect(() => {
        // Lấy thông tin về người dùng hiện tại khi component được tạo
        const fetchCurrentUser = async () => {
            try {
                const user = await getCurrentUserEmpid(); // Hàm getCurrentUser() trả về thông tin về người dùng hiện tại
                setCurrentUser(user);
                console.log("Fetched user: ", currentUser);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };
        fetchCurrentUser(); // Gọi hàm để lấy thông tin người dùng hiện tại
    }, [currentUser]);


    const handleLogout = () => {
        const confirmDelete = window.confirm('Xác nhận đăng xuất');
        if (confirmDelete) {
            userService.logout();
        }
    };

    return (
        <header className="header">
            <div className="logo">abc</div>
            <nav>
                <ul>
                    <li><a href="/resources">Đăng kí tài nguyên</a></li>
                    {/* <li><a href="#">Yêu cầu</a></li> */}
                    <li><a href={`/profile/${currentUser}`}>Thông tin cá nhân</a></li>
                    {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Đăng xuất</Link></li>}
                </ul>
            </nav>
        </header>
    );
}

export default HeaderComponent;