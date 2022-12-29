import React, { useState} from 'react';
import { BrowserRouter as Router, HashRouter, Link, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import logo from './images/bookify-logo.svg';
import './App.css';

import Search from './components/Search';
import Filter from './components/Filter';
import Dashboard from './components/Dashboard';
import Details from './components/Details';
import Login from './components/Login';
import AuthService from './services/AuthService';
import { Navbar, Container,Nav, NavDropdown } from 'react-bootstrap';


function App(){

    if(!AuthService.getCurrentUser()){
      return <Navigate to="/login" replace={true} />
    }

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              {/* <img src={logo} className="" alt="logo" /> */}
              Bookify
              </Navbar.Brand>
              <Nav className="ms-auto">
                <Nav.Link href="/logout">Logout</Nav.Link>
              </Nav>
            </Container>
        </Navbar>
        
        <Container>
        <div className='row'>
          <div className='col-12'>
            <div className='float-end'>
              <Details/>
            </div>
          </div>
          <div className='col-12 mt-2'>
            <Dashboard/>
          </div>

        </div>
        </Container>
      </>
    );
}

export default App;
