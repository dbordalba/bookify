import { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import PropTypes from 'prop-types'
import AuthService from "../services/AuthService";
import { Navigate, useNavigate } from "react-router-dom";


export default function Logout () {

    const navigate = useNavigate();
    if(!AuthService.getCurrentUser()){
        return <Navigate to="/login" replace={true} />
    }
    
    AuthService.logout().then(()=>{
        navigate('/login')
    });

    return <></>;
     
}