import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import HomeNavBar from '../components/homenavbar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    const successNotification = () => {
        notification.success({
            message: 'Successful Login',
            duration: 2,
            placement: 'top',
        });
    };

    const errorNotification = () => {
        notification.error({
            message: 'Incorrect Email/Password',
            duration: 4,
            placement: 'top',
        });
    };

    async function submitHandler(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                passwd,
            }),
        })

        const data = await response.json()

        if (data.status) {
            localStorage.setItem('token', data.status)
            successNotification()
            navigate('/dashboard')
        }
        else {
            errorNotification()
        }
        console.log(data)
    }
    return (
        <div>
            <HomeNavBar />
            <div className='loginForm'>
                <Form onSubmit={submitHandler}>
                    <h1>Login</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required value={passwd} onChange={(e) => setPasswd(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;


