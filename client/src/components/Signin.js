import React, { useState } from 'react'
import {useNavigate,NavLink} from 'react-router-dom'
const Signin = () => {
  const navigate = useNavigate();
  const [user,setUser]=useState({email:"",password:"",tyUser:""});
  let name,value;
  const handelInput = (e) =>
  {

    name=e.target.name;
    value=e.target.value;
    
    setUser({...user,[name]:value});
  }
  const ch = (e) =>
  {
    
    name=e.target.name;
    value=e.target.value;
    if(value)value=0;
    else value=1;
    setUser({...user,[name]:value});
    
  }
  const LoginUser =async (e)=>{
   // e.preventDefault()
    const {email,password,tyUser}=await user;
    const res = await fetch('/login' , {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
       email,password,tyUser
      })
    });

    const data = await res.json();
    if ('message' in data)
    {
      // window.alert('Login Successfully');
      navigate("/Home");
    }
    else 
    {
      window.alert(data["error"]);
    }
     
  }
  return (
    
    <>
    
       <section className="vh-100" style={{"background-color": "#eee" }} >
       <br/>
       <br/>
       <br/>
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11"  style={{"marginTop":"25px"}}>
              <div className="card text-black" style={{"border-radius": "25px"}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input value={user.email} type="email" name="email" onChange={handelInput} id="form3Example3c" className="form-control" />
                            <label className="form-label" for="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input value={user.password} type="password" name ="password" onChange={handelInput} id="form3Example4c" className="form-control" />
                            <label className="form-label" for="form3Example4c">Password</label>
                          </div>
                        </div>



                        <div className="form-check d-flex justify-content-center mb-5">
                          <input  className="form-check-input me-2" type="checkbox" name="tyUser" value={user.tyUser}  onChange={ch} id="form2Example3c" />
                          <label className="form-check-label" for="form2Example3">
                            SignIn as a Admin
                          </label>
                        </div>


                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" onClick={LoginUser} className="btn btn-primary btn-lg">Login</button>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <NavLink to="/SignUp" className="btn btn-dark ">don’t have an account? Register here </NavLink>
                        </div>
                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="error" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signin