import React, {useRef, useState} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import '../styles/login.css'

export default function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        }catch{
            setError("Failed to log in");
        }

        setLoading(false);
    } 
    
    return(
        <>
            <div className="login-div">
                <Card className="opacity-50">
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <br></br>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <br></br>
                            <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to = "/forgot-password">Forgot Password?</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="w-100 text-center mt-2 text-white">
                Don't have an account? <Link to = "/signup">Sign Up</Link>
            </div>
            </>
    )
}