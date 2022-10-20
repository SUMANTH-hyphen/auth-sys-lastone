import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';

function LoginNavBar() {

    const openNotification = () => {
        notification.open({
            message: 'Successful Logout',
            description: 'Come back again',
            duration: 2,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };

    const clearData = () => {
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg='light'>
            <Container>
                <Navbar.Brand href="#home">Welcome</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login" onClick={() => { openNotification(); clearData() }}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default LoginNavBar;