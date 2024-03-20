import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState(""); 
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault()
        const payload ={
            email,
            pass
        }
        fetch("http://localhost:8080/users/login",{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(payload)
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            localStorage.setItem('token', data.accessToken);
            navigate('/notes');
        })
        .catch(err=>console.log(err))
    } 
  return (
        <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password:</label>
            <input
              type="password"
              value={pass}
              onChange={(e)=>setPass(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>Login</button>
        </form>
      </div>
  )
}

export default Login