import React from 'react'

// boostrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavIcon from '../../assets/navigation/NavIcon.png'
import Navusericon from './NavuserIcon';
import Button from 'react-bootstrap/esm/Button';
import style from './Navigation.module.css'
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <>
            <Navbar bg="white" className='p-1' expand="lg">
                <Container>
                    <Link to="/home">
                        <Navbar.Brand>
                            <img src={NavIcon} alt="navicon" width={80} />
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        <Nav>
                            <Link to='/upload-post'>
                                <Button className={style.buttonUpload} size='sm'>Upload</Button>
                            </Link>
                            <Navusericon />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <hr className='m-0' style={{ opacity: "0.1" }} />
        </>
    )
}

export default Navigation