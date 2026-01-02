import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactDetail from './components/ContactDetail';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/add" element={<ContactForm />} />
            <Route path="/edit/:id" element={<ContactForm />} />
            <Route path="/contact/:id" element={<ContactDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
