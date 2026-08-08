import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/student/layout/Layout'

import './Firebase/firebaseconfig'
import Home from './components/student/Home'

import Profile from './components/student/profile'
import Login from './components/Login'
import Admlayout from './components/admin/layout/Admlayout'
import ManageStudents from './components/admin/student/ManageStudents'
import AddStudent from './components/admin/student/AddStudent'
import AdmSettings from '././components/admin/AdmSettings'

import { ToastContainer } from 'react-toastify'
import Hostel from './components/admin/hostel/Hostel'
import ManageHostel from './components/admin/hostel/ManageHostel'
import EditHostel from './components/admin/hostel/EditHostel'
import EditStudent from './components/admin/student/EditStudent'
import RoomAvailability from './components/admin/room/RoomAvailability'
import Complaint from './components/student/complaint/complaint'
import TrackComplaints from './components/student/complaint/TrackComplaints'
import RaiseComplaint from './components/student/complaint/RaiseComplaint'
import MyComplaints from './components/student/complaint/MyComplaints'
import ManageComplaints from './components/admin/ManageComplaints'
import Settings from './components/student/Settings'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Login />}></Route>

          <Route path="/admin" element={<Admlayout />}>
            <Route path="/admin" element={<Home />}></Route>
            <Route path="/admin/students" element={<ManageStudents />}></Route>
            <Route path="/admin/student/add" element={<AddStudent />}></Route>
            <Route path="/admin/student/edit/:id" element={<EditStudent />}></Route>
            <Route path='/admin/settings' element={<AdmSettings />}></Route>
            <Route path='/admin/profile' element={<Profile />}></Route>
            <Route path='/admin/hostels' element={<ManageHostel />}></Route>
            <Route path='/admin/complaints' element={<ManageComplaints />}></Route>
            
            <Route path='/admin/hostel/add' element={<Hostel />}></Route>
            <Route path='/admin/hostel/edit/:id' element={<EditHostel />}></Route>
            <Route path='/admin/rooms' element={<RoomAvailability />}></Route>
            <Route path='/admin/complaints' element={<TrackComplaints />}></Route>

          </Route>
          
          <Route path="/student" element={<Layout />}>
            <Route path="/student" element={<Home />}></Route>
            <Route path='/student/settings' element={<Settings />}></Route>
            <Route path='/student/mycomplaints' element={<MyComplaints />}></Route>
            <Route path='/student/profile' element={<Profile />}></Route>
            <Route path='/student/addcomplaint' element={<RaiseComplaint />}></Route>
          </Route>

        </Routes>
      </BrowserRouter>

      <ToastContainer/>

    </>
  )
}