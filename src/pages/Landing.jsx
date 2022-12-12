import React from 'react'
import { useState } from 'react';
// boostrap
import Login from './AuthModal/Login'
import Register from './AuthModal/Register'
import Button from 'react-bootstrap/Button';
// css
import style from './Module/Landing.module.css'
// asset
import BGLanding from '../assets/Landing/BGLanding.png'
import Rec from '../assets/Landing/Group 3.png'

function Landing() {
    const [showRegister, setRegisterShow] = useState(false);
    const handleRegisterClose = () => setRegisterShow(false);
    const handleRegisterShow = () => setRegisterShow(true);
    const [showLogin, setLoginShow] = useState(false);
    const handleLoginClose = () => setLoginShow(false);
    const handleLoginShow = () => setLoginShow(true);

    return (
        <>
            <div style={{
                backgroundImage: `url(${BGLanding})`,
                height: "100vh",
                // width: "100%",
                // objectFit: "cover",
                // position: "relative",
            }}>
                <div className={style.centeredContent}>
                    <img className={style.imgIcon} src={Rec} alt="rec" srcset="" />
                    <p className={style.ways}>Ways</p>
                    <div>
                        <p className={style.gallery}>Gallery</p>
                    </div>
                    <h3>show your work to inspire everyone</h3>
                    <p>
                        Ways Exhibition is a website design
                        creators gather to share their work with other creators
                    </p>
                    <Button onClick={handleRegisterShow} className={style.buttonRegister} size='sm'>Register</Button>{' '}

                    <Button onClick={handleLoginShow} className={style.buttonLogin} size='sm'>Login</Button>{' '}

                    <Register Show={showRegister} Hide={handleRegisterClose} />
                    <Login Show={showLogin} Hide={handleLoginClose} />
                </div>
            </div>
        </>
    )
}

export default Landing