import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
const App = () => {
  return (
    <div>
    <BrowserRouter>
<Routes>
      <Route exact path='/register' Component={Register}/>
      <Route exact path='/' Component={Register} />
        <Route exact path='/login' Component={Login}/>
        <Route exact path='/home' Component={Home} />
        </Routes> 
    </BrowserRouter>
     </div>
  )
}

export default App;
