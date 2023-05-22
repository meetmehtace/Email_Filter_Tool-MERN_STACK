import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
const UserDetail = () => {
  const navigate = useNavigate();
    var i =1;
    const [show, setShow] = useState(false);
    const [users, setUser] = useState([{}]);
    useEffect(() => {

        fetch('/UserDetail')
            .then(res => res.json())
            .then(async (data) => {
                // await console.log(data)
                // console.log('done')
                if ('error' in data) 
                {
                  alert(data["error"]);
                  navigate("/Home");
                }
                else
                {

                  setUser(data);
                  setShow(true);
                  console.log(data)
                }
            })
    }, []);

const fe = () =>{
  fetch('/UserDetail')
            .then(res => res.json())
            .then(async (data) => {
                // await console.log(data)
                // console.log('done')
                
                setUser(data);
                setShow(true);
                console.log(data)
            })
}
const disapprove = async(e) =>{

// alert(e.target.id)
const email=e.target.id
  const res= await fetch('/disapprove' , {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
        email
    })
  });
  
  const data = await res.json();
  if ('message' in data)
  {
    fe()
    // window.location.reload();
  }
  else 
  {
    alert(data["error"]);
  }


}

const approve = async (e) =>{

  // alert(e.target.id)
  const email= e.target.id
  const res= await fetch('/approve' , {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
        email
    })
  });
  
  const data = await res.json();
  if ('message' in data)
  {
   fe()
    // window.location.reload();
  }
  else 
  {
    alert(data["error"]);
  }

}
  return (
    <>
    
      <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>

  {   
  show && 
    <>
        {
        
        users.map(name => (
    <tr>
      <th scope="row">{i++}</th>
      <td>{name.name}</td>
      <td>{name.email}</td>
      
      { name.login===1 &&  <td> < button onClick={disapprove} id={name.email} className='btn btn-danger'>disapprove</button>  </td> }
      { name.login===0 &&  <td> <button id={name.email} onClick={approve} className='btn btn-primary'>approve</button>  </td> }
    </tr>
))}
    </>
}
  </tbody>
</table>
    </>
  )
}

export default UserDetail
