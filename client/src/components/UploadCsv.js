import React, { Fragment, useState,useEffect } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const FileUpload = () => {
  useEffect(() => {

    fetch('/authenticate')
        .then(res => res.json())
        .then(async (data) => {
            // await console.log(data)
            // console.log('done')
            if ('error' in data) 
            {
                alert(data["error"]);
                navigate("/SignIn");
            }
        })
}, []);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [users, setUser] = useState([{}]);
  const [scolumn] = useState([]);
  const [userEmail,setuserEmail] = useState([]);
  const navigate = useNavigate();
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const uemail =(e)=>{
    setuserEmail(e.target.name);
    setShow1(false);
    setShow(true);
  }
  const app =(e)=>{
    // window.alert(e.target.name);
    scolumn.push(e.target.name);
    e.target.style.display='none';
    e.target.className="btn btn-light";
    console.log(scolumn);
    
  }

  const insColumn=async (e)=>{

    const res= await fetch('/inscsv' , {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        users,scolumn,userEmail
      })
    });
    const data = await res.json();
    if ('message' in data)
    {
      window.alert(data['message']);
      navigate("/Home");
    }
    else 
    {
      window.alert(data["error"]);
    }



  }
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      
      // Clear percentage
      setTimeout(async() => setUploadPercentage(0), 10000);
      const { cc} = await res.data;

      await setUser(cc);
      setShow1(true);

    
     
    
        
      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0)
    }
  };

  return (
    <>
    <div className='container'>
      
    <br/>
    <br/>
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input form-control' 
            id='customFile'
            onChange={onChange}
            />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4 form-control'
          />
      </form>
      {show && (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>Please select the columns that we use to filter emails.</h3>
          </div>
        </div>
      )}


      {show1 && (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>Please select the columns that contain emails. </h3>
          </div>
          
        </div>
      
      )}
      <br/>
          
    </Fragment>
    <center>
    <h1>
                {show && 
                  <>
                <h1>

                    {
                        Object.keys(users[0]).map((key, i) => (
                            
                            

                            <button onClick={app} name={key} className='btn btn-primary btn-block ' style={{"margin-left": "40px","margin-bottom":"20px"}}>{key}</button>
                           
                          
                            ))
                          }


                </h1>
                  <button className='btn btn-dark' onClick={insColumn}>submit</button>
                          </>
                }



        {show1 && 
                  <>
                <h1>

                    {
                        Object.keys(users[0]).map((key, i) => (
                            
                            

                            <button onClick={uemail} name={key} className='btn btn-primary btn-block ' style={{"margin-left": "40px","margin-bottom":"20px"}}>{key}</button>
                           
                          
                            ))
                          }


                </h1>
              
                  <button className='btn btn-dark' onClick={insColumn}>submit</button>
                          </>
                }




            </h1>
            </center>
    </div>
  </>

  );
};

export default FileUpload;