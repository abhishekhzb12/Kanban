import React, { useState } from 'react'

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState(""); 
    const [role, setRole] = useState("");
    console.log(role)
    const handleSubmit = (e) =>{
        e.preventDefault()
        const payload ={
            username,
            email,
            pass,
            role
        }
        fetch("http://localhost:8080/users/register",{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(payload)
        }).then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    } 
  return (
    <>
        <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center' }}>Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block' }}>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block' }}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block' }}>Password:</label>
              <input
                type="password"
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block' }}>Role:</label>
              <select
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
              >
                <option value="Admin">Admin</option>
                <option  value="RegularUser">RegularUser</option>
              </select>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Register
            </button>
          </form>
        </div>
        </div>
        </>
  )
}

export default SignUp