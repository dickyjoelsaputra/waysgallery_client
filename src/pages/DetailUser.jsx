import React from 'react'
import Navigation from './Components/Navigation'
import Container from 'react-bootstrap/esm/Container'
import style from './Module/DetailUser.module.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import { useParams } from 'react-router-dom';
import profiledefault from "../assets/black_profile.png"
import imagenotfound from "../assets/imagenotfound.png"

function DetailUser() {
    let { id } = useParams();

    let { data: User } = useQuery("userCache", async () => {
        const response = await API.get(`/getuser/${id}`);
        return response.data.data;
    });

    console.log(User)
    return (
        <>
            <Navigation />
            <div class="position-relative">
                <div className={style.rectangle} />
                <Container>
                    <Row className='mt-4'>
                        <Col md="5" className='mt-5'>
                            {
                                User?.avatar === "" ? <>
                                    <img className={style.userimage} src={profiledefault} />
                                </> : <>
                                    <img className={style.userimage} src={User?.avatar} />
                                </>
                            }

                            <h4>{User?.name}</h4>

                            <h2><b>{User?.greeting}</b></h2>
                            <Button className={style.buttonFollow} size='sm'>Follow</Button>{' '}
                            <Link to={`/hired/${User?.id}`}>
                                <Button className={style.buttonHire} size='sm'>Hire</Button>{' '}
                            </Link>
                        </Col>
                        <Col md="7">
                            {
                                User?.bestart === "" ? <>
                                    <img className={style.rightImage}
                                        src={imagenotfound} />
                                </> : <>
                                    <img className={style.rightImage}
                                        src={User?.bestart} />
                                </>
                            }
                        </Col>
                    </Row>
                    <div className={style.bottompage}>
                        <p><b>Geralt Works</b></p>
                        <Row className='mb-5 mt-5'>
                            {
                                User?.posts?.map((e) => (
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
            </div >
        </>
    )
}

export default DetailUser