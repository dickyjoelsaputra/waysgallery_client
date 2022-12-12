import React from 'react'
import Container from 'react-bootstrap/esm/Container';
import { API } from '../config/api';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import styles from './Module/ViewProject.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

export default function ViewProject() {
    let { id } = useParams();
    const navigate = useNavigate()

    const [preview, setPreview] = useState(null);

    let { data: MyOrder, refetch } = useQuery("vieworderr1Cacheadsadas", async () => {
        const response = await API.get(`/myorder/${id}`);
        return response.data.data;
    });

    useEffect(() => {
        setPreview(MyOrder?.image1)
    }, [MyOrder])

    return (
        <>
            <Navigation />
            <Container className='mt-4'>
                <Row>
                    <Col md={7}>
                        <div className={styles.cardbody}>
                            <img className={styles.cardbodyimg} src={preview} alt="" srcset="" />
                            <div className='row mt-3 mb-3'>
                                <div className='col-1' />
                                <div className='col-2'>
                                    <img className={styles.cardbodyimgselect}
                                        onClick={() => { setPreview(MyOrder?.image1) }}
                                        src={MyOrder?.image1} alt="" srcset="" />
                                </div>
                                <div className='col-2'>
                                    <img className={styles.cardbodyimgselect}
                                        onClick={() => { setPreview(MyOrder?.image2) }}
                                        src={MyOrder?.image2} alt="" srcset="" />
                                </div>
                                <div className='col-2'>
                                    <img className={styles.cardbodyimgselect}
                                        onClick={() => { setPreview(MyOrder?.image3) }}
                                        src={MyOrder?.image3} alt="" srcset="" />
                                </div>
                                <div className='col-2'>
                                    <img className={styles.cardbodyimgselect}
                                        onClick={() => { setPreview(MyOrder?.image4) }}
                                        src={MyOrder?.image4} alt="" srcset="" />
                                </div>
                                <div className='col-2'>
                                    <img className={styles.cardbodyimgselect}
                                        onClick={() => { setPreview(MyOrder?.image5) }}
                                        src={MyOrder?.image5} alt="" srcset="" />
                                </div>
                                <div className='col-1' />
                            </div>
                        </div>
                    </Col>
                    <Col md={5}>
                        <h3>
                            {MyOrder?.title}
                        </h3>
                        <h5>
                            Price
                        </h5>
                        <p>
                            {MyOrder?.price}
                        </p>
                        <h5>
                            User Request
                        </h5>
                        <p>
                            {MyOrder?.description}
                        </p>
                        <h5>
                            Vendor Respone
                        </h5>
                        <p>
                            {MyOrder?.projectdesc}
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Button variant="dark">Download Project</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>

    )
}