import React  from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import UploadCsv from './components/UploadCsv';
import UserDetail from './components/UserDetail';
import Logout from './components/Logout'
const App = () => {


  return (
    <>
 
    <Routes>
      <Route path='' element={[<Signin />]} />
      <Route path='/SignUp' element={<Signup />} />
      <Route path='/SignIn' element={<Signin />}  />
      <Route path='/Home' element={[<Navbar/>,<Home />] } />
      <Route path='/UploadCsv' element={[<Navbar/>,<UploadCsv />]} />
      <Route path='/Logout' element={<Logout />} />
      <Route path='/UserDetail' element={[<Navbar/>,<UserDetail />]} />
    </Routes>
    </>
  )
}

export default App