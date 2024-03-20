import axios from 'axios';
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          const authToken = localStorage.getItem('token');
          const res = await axios.get('http://localhost:8080/users/logout', {
            headers: {
              Authorization: authToken
            }
          });
          localStorage.removeItem('token');
          console.log(res.data);
          navigate('/login');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

    return(
    <>
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home"><Link style={{marginRight:'20px'}} to='/signup'>SignUp</Link> </Nav.Link>
        {localStorage.getItem("token")===null?
        (<Nav.Link href="#features"><Link style={{marginRight:'20px'}} to='/login'>Login</Link></Nav.Link>):
        (<Nav.Link href="#features"><Link style={{marginRight:'20px'}} onClick={handleLogout}>Logout</Link></Nav.Link>)}
        <Nav.Link href="#pricing"><Link style={{marginRight:'20px'}} to='/notes'>Notes</Link></Nav.Link>
      </Nav>
    </Container>
  </Navbar>
</>
    )
}

export default NavBar