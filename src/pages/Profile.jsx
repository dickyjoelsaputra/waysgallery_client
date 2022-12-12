import React from 'react'
import Navigation from './Components/Navigation'
import Container from 'react-bootstrap/esm/Container'
import style from './Module/Profile.module.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { API } from '../config/api';
import { useQuery } from "react-query";
import profiledefault from "../assets/black_profile.png"
import imagenotfound from "../assets/imagenotfound.png"

function Profile() {
    let { data: Profile } = useQuery("profileCache", async () => {
        const response = await API.get("/myprofile");
        return response.data.data;
    });

    return (
        <>
            <Navigation />
            <div class="position-relative">
                <div className={style.rectangle} />
                <Container>
                    <Row className='mt-4'>
                        <Col md="5" className='mt-5'>
                            {Profile?.avatar === "" ? <>
                                <img className={style.userimage} src={profiledefault} />
                            </> : <>
                                <img className={style.userimage} src={Profile?.avatar} />
                            </>}

                            <h4>{Profile?.name}</h4>

                            <h2><b>{Profile?.greeting}</b></h2>
                            <Link to="/edit-profile">
                                <Button className={style.buttonUpload} size='sm'>Edit Profile</Button>
                            </Link>
                        </Col>
                        <Col md="7">
                            {
                                Profile?.bestart === "" ? <>
                                    <img className={style.rightImage}
                                        src={imagenotfound} />
                                </> : <>
                                    <img className={style.rightImage}
                                        src={Profile?.bestart} />
                                </>
                            }
                        </Col>
                    </Row>
                    <div className={style.bottompage}>
                        <p><b>My Works</b></p>
                        <Row className='mt-5 mb-5'>
                            {
                                Profile?.posts?.map((e) => (
                                    <Col md="4">
                                        <Link to={`/detail/${e.id}`}>
                                            <img className={style.bottomimage} src={e.image1} alt="" srcset="" />
                                        </Link>
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>

                </Container>
            </div>
        </>
    )
}

export default Profile