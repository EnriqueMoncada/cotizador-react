import React from 'react';
import Logo from './components/Logo.jsx'
import Form from './components/Form.jsx'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className='header'>
        <Logo />
      </header>
      <div className='principal-section'>
        <div className='principal-container'>
          <div className="image-side"></div>
          <div className='form-side'>
            <Form></Form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
