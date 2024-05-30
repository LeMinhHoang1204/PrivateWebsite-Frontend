import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';


function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    // const fetchProfileInfo = async () => {
    //     try {

    //         const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    //         const response = await userService.getYourProfile(token);
    //         setProfileInfo(response.Account);
    //     } catch (error) {
    //         console.error('Error fetching profile information:', error);
    //     }
    // };
    const fetchProfileInfo = async () => {
    try {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token is missing or invalid');
        return;
    }

    const response = await userService.getYourProfile(token);

    // Kiểm tra nếu response và response.data tồn tại
    if (response && response.data) {
        console.log('API Response:', response.data); // Log toàn bộ phản hồi để kiểm tra cấu trúc

        // Kiểm tra nếu response.data.Account tồn tại
        if (response.data.Account) {
            setProfileInfo(response.data.Account);
        } else {
            console.error('Error fetching profile information: Account data is missing');
        }
    } else {
        console.error('Error fetching profile information: No data returned');
    }
} catch (error) {
    console.error('Error fetching profile information:', error);
    if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
        console.error('Error headers:', error.response.headers);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error setting up request:', error.message);
    }
}

};


    return (
        <div className="profile-page-container">
            <h2>Profile Information</h2>
            <p>Status: {profileInfo.Status}</p>
            <p>Role: {profileInfo.Role}</p>
            <p>ImagePath: {profileInfo.ImagePath}</p>
            <p>Bio: {profileInfo.Bio}</p>
            {/* {profileInfo.role === "ADMIN" && (
                <button><Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link></button>
            )} */}
        </div>
    );
}

export default ProfilePage;