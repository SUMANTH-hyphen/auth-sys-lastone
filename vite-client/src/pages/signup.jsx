import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import HomeNavBar from "../components/homenavbar";

const Signup = () => {

    const navigate = useNavigate()

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [img, setImg] = useState("");

    async function submitHandler(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:1337/api/register', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fname,
                lname,
                email,
                passwd,
                img,
            }),
        })

        const data = await response.json()

        if (data.status === 'ok') {
            navigate('/login')
        }
    }

    return (
        <div>
            <HomeNavBar />
            <div className="signupForm">
                <h1>Signup</h1>
                <Form onSubmit={submitHandler}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" required value={fname} onChange={(e) => setFname(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" required value={lname} onChange={(e) => setLname(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required value={passwd} onChange={(e) => setPasswd(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridUpload">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={(e) => { setImg(e.target.files[0].name); console.log(img) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" required />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Signup;

