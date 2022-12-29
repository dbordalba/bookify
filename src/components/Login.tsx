import { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import PropTypes from 'prop-types'
import AuthService from "../services/AuthService";
import { Navigate, useNavigate } from "react-router-dom";


export default function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        AuthService.login(email,password).then(response => {
            if(response.message){
                setError(response.message);
            }
            else{
                setValidated(true);
                navigate("/")
            }
        })
    

      }

      if(AuthService.getCurrentUser()){
        return <Navigate to="/" replace={true} />
    }

    return <Container>

        <Row className="mt-5 justify-content-center">
            <Col xs={6} >
                <Card>
                    <Card.Header>Bookify Login</Card.Header>
                    <Card.Body className="m-3">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group
                            className="mb-3"
                            controlId="email"
                            >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required 
                                type="text"
                                placeholder="Enter email address"
                                onChange={(event) => setEmail(event.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                            className="mb-3"
                            controlId="password"
                            >
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                required
                                type="password"
                                placeholder="Enter password" 
                                onChange={(event) => setPassword(event.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid password.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type='submit'>
                                Login
                            </Button> 
                            <div className="text-danger mt-1">{error}</div>
                        </Form>
                    </Card.Body>

                </Card>
            </Col>
        </Row>

        

  </Container>
  ;
}
// Login.PropTypes = {
//     setToken : PropTypes.func.isRequired
// }