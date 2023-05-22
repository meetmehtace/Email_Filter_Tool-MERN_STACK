import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import logo from '../images/logo.png'

const Navbar = () => {
    const [show, setShow] = useState(false);
    const [users, setUser] = useState([{}]);
    useEffect(() => {

        fetch('/navbarItem')
            .then(res => res.json())
            .then(async (data) => {
                // await console.log(data)
                // console.log('done')
                setUser(data);
                setShow(true);
            })
    }, []);
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
            <img src={logo} alt='error' height='40px'></img>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">

            {show && <>
            
               { Object.keys(users.message).map((key, i) => (
                          
                          <>
                        
                      

                <li className="nav-item">
                    <NavLink className="nav-link" to={"/"+users.message[key]}>{users.message[key]}</NavLink>
                </li>

               
                {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/UploadCsv">UploadCsv</NavLink>
                </li>


                <li className="nav-item">
                    <NavLink className="nav-link" to="/SignIn">SignIn</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/SignUp">SignUp</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/UserDetail">UserDetail</NavLink>
                </li> */}


                </> ))}
  </>} 
            </ul>
        </div>
        </nav>
    </>
  )
}

export default Navbar
