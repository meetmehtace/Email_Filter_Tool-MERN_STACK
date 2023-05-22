import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
const Home = () => {

  const [show, setShow] = useState(false);
  const [users, setUser] = useState([{}]);
  const [showIt, setShowIt] = useState(false);
  const [usersIt, setUserIt] = useState("");
  const [user,setUs] =useState({subject:"",text:"",html:""});
  const [scolumn,seg] = useState([]);
  const [scolumns,setscolumns] = useState([]);
  const navigate = useNavigate();

  const se=(e)=>{
      if(usersIt !== "")
      {
        scolumns.push(usersIt,scolumn);
      }
      seg([]);
      setUserIt(e.target.name);
      console.log(scolumns);
      setShowIt(true);
      
  }

  let name,value;

  const handelInput = (e)=>
{
  name=e.target.name;
  value=e.target.value;
  setUs({...user,[name]:value});
}


  const ch=async(e)=>{
      // alert(usersIt);
      // alert(e.target.value);
      // segs([])
      await scolumn.push(e.target.value);
      await console.log(usersIt,scolumn)
      // e.target.className="btn btn-dark";
  }

  const sub=async(e)=>{
      
      const {subject,text,html} =user;
      if(usersIt !== "" && scolumn.length >=1)
      {
        await scolumns.push(usersIt,scolumn);
        seg([]);
      }
      console.log(scolumns);
      // const {subject,text,html} =user;

      const res= await fetch('/sendMail' , {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
              subject,text,html,scolumns
          })
        });
        
        const data = await res.json();
        if ('message' in data)
        {
          // setUs({subject:data['message']})
          // console.log(data['message']);
          window.alert(data["message"]);
          reserFilter();
          navigate("/Home");
        }
        else 
        {

          alert(data["error"]);
          navigate("/Home");
        }

  }
  useEffect(() => {

      fetch('/getCsvData')
          .then(res => res.json())
          .then(async (data) => {
              // await console.log(data)
              // console.log('done')
              if ('error' in data) 
              {
                  alert(data["error"]);
                  navigate("/SignIn");
              }
              setUser(data);
              setShow(true);
          })
  }, []);

  const reserFilter = ()=>{
    // alert("hello")
    setShowIt(false);
    setscolumns([]);
    seg([]);
  }
  return (

      <>
      <br/>
         <button className='btn btn-dark' onClick={reserFilter} style={{"margin-left": "91%"}}>Reseat Filter</button>
         <br/>
         <br/>
              <center>
          <h1>
              {show && 
              <h1>
                  <>

                  {
                      Object.keys(users).map((key, i) => (
                          
                          <button onClick={se} className="btn btn-primary" name={key} style={{"margin":"15px"}}>
                              
                              {key}
                              </button>
                      ))
                          
                  }

                      {
                          showIt && 

                          <>
                          <br/>
                          {
                                  Object.keys(users[usersIt]).map((keys,i)=>(
                                      <button name={usersIt}className="btn btn-light"  style={{"margin":"10px"}} onClick={ch} value={users[usersIt][i]}>{users[usersIt][i]}</button>
                                      ))           
                                  }                
                          </>
                      }
                  <div className='container'>


                  <form  method="post">
      <div class="mb-3 mt-3" >
        <label for="subject" class="form-label">Subject:</label>
        <input value={user.subject} onChange={handelInput} type="text" style={{"text-align": "center"}} class="form-control" id="email"  placeholder="Enter Subject" name="subject"/>
      </div>
      <div class="mb-3">
        <label for="text" class="form-label">Text:</label>
        <input value={user.text} type="text" onChange={handelInput} style={{"text-align": "center"}} class="form-control" id="pwd"  placeholder="Enter text" name="text"/>
      </div>
      <div class="mb-3">
        <label for="html" class="form-label">Html:</label>
        <input value={user.html} type="text" onChange={handelInput} style={{"text-align": "center"}} class="form-control" id="pwd"   placeholder="Enter html" name="html"/>
      </div>
      <button type="button" onClick={sub} class="btn btn-primary">Submit</button>
    </form>
   

                  </div>

                  </>
              </h1>
              }

          </h1>
              </center>
      </>
  );
};

export default Home
