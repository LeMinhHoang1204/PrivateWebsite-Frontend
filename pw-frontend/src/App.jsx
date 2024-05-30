
import './App.css'
import EmploymentComponent from './components/EmploymentComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListDepartmentComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EmployeeFormComponent from './components/EmployeeFormComponent'
import EmployeeProfileComponent from './components/EmployeeProfileComponent'
import userService from './services/userService'
import LoginPage from './components/auth/LoginPage'
import ProfilePage from './components/auth/ProfilePage'
import RegisterRoomComponent from './components/RegisterRoomComponent'


function App() {


  return (
    <>
    <BrowserRouter>
        <HeaderComponent />
        <Routes>

            {/* <Route path='/' element = { <ListEmployeeComponent />}></Route> */}

            {/* http://localhost:3000/departments */}
            <Route path='/departments' element = { <ListEmployeeComponent />}></Route>

            {/* http://localhost:3000/add-department */}
            <Route path='/add-department' element = {<EmploymentComponent />}></Route>

            {/* http://localhost:3000/edit-department/1 */}
            <Route path= 'departments/edit-department/:id' element ={<EmploymentComponent />}></Route>

            <Route path= '/employees/edit-employee/:id' element = {<EmployeeProfileComponent/>}></Route>

            {/* <Route path= '/employees/profile/:id' element = {<EmployeeFormComponent/>}></Route> */}

            {/*  */}

            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            <Route path="/profile/:id" element={<EmployeeFormComponent />} />

            <Route path="/resources" element={<RegisterRoomComponent />} />

            
        </Routes>

        <FooterComponent/>
    </BrowserRouter>

    </>
  )
}

export default App
