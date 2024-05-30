import axios from "axios";

class userService {
    static BASE_URL = "http://localhost:8080";

    static async login(empid, password) {
        try {
            const response = await axios.post(`${userService.BASE_URL}/auth/login`, { empid, password });
            console.log(response.data); // Kiểm tra phản hồi từ API

            // Kiểm tra xem phản hồi có chứa thông tin empid không
            if (response.data && response.data.empid) {
                const { empid, token } = response.data; // Lấy empid và token từ phản hồi
                localStorage.setItem('empid', empid); // Lưu empid vào local storage
                localStorage.setItem('token', token); // Lưu token vào local storage
                console.log(localStorage.getItem('empid'));
                return response.data;
            } else {
                throw new Error("Không thể lấy thông tin empid từ phản hồi.");
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            throw error;
        }
    }

    static async register(userData, token) {
        const response = await axios.post(
            `${userService.BASE_URL}/auth/register`,
            userData,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    static async getAllUsers(token) {
        const response = await axios.get(
            `${userService.BASE_URL}/admin/get-all-accounts`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    static async getYourProfile(token) {
        const response = await axios.get(
            `${userService.BASE_URL}/adminuser/get-profile`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    static async getUserById(userId, token) {
        const response = await axios.get(
            `${userService.BASE_URL}/admin/get-account/${userId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    static async deleteUser(userId, token) {
        const response = await axios.delete(
            `${userService.BASE_URL}/admin/delete/${userId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    static async updateUser(userId, userData, token) {
        const response = await axios.put(
            `${userService.BASE_URL}/admin/update/${userId}`,
            userData,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }


    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }
    

}

export default userService;
