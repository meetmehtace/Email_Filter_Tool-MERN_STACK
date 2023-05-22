import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/Logout')
        .then(res => res.json())
        .then(async (data) => {
            // await console.log(data)
            // console.log('done')
            navigate("/SignIn");
        })
    }, []);

  return (
    <>
    <center>
    <div>
      <h1>Your are logout Successfully</h1>
    </div>
    </center>
    </>
  )
}

export default Logout
