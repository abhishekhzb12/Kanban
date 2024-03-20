import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Notes from './components/Notes';
import NavBar from './components/NavBar';


function App() {

  return (
    <>
    <NavBar/>
       <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/notes' element={<Notes/>}/>
       </Routes>
    </>
  )
}

export default App
