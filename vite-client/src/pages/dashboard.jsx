import React, { useEffect, useState } from "react";
import jwtdecode from 'jwt-decode';
import Form from 'react-bootstrap/Form';
import Avatar from '@mui/material/Avatar';
import LoginNavBar from "../components/loginnavbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate()
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();

    async function displayContent() {
        const req = await fetch('http://localhost:1337/api/dashboard', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })
        const data = await req.json()
        console.log(data)
        if (data.status === 'ok') {
            setEmail(data.user.email)
            setFname(data.user.fname)
            setLname(data.user.lname)
        }
        else {
            alert('error')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwtdecode(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate('/login')
            }
            else {
                displayContent()
                setTimeout(() => {
                    localStorage.removeItem('token')
                }, 5000);
            }
        }
    }, [])

    return (
        <div>
            <LoginNavBar />
            <div className="dashCenter">
                <center>
                    <Avatar alt="Remy Sharp" src="" sx={{ width: 220, height: 220 }} /><br /><br />
                </center>
                <Form.Label >First Name</Form.Label>
                <Form.Control type="text" disabled value={fname} />
                <Form.Label >Last Name</Form.Label>
                <Form.Control type="text" disabled value={lname} />
                <Form.Label >Email</Form.Label>
                <Form.Control type="email" disabled value={email} />
            </div>
        </div>
    )
}

export default Dashboard

