import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import styles from './ModalOrder.module.css'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';

function ModalOrder({ id }) {

    const [preview, setPreview] = useState(null);
    useEffect(() => {
        setPreview(MyOrder?.image1)
    }, [MyOrder])


    return (
        <>
            <p onClick={handleShow} className='mb-0 text-primary'>
                {MyOrder?.title}
            </p>

            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Body>
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
                                    user request description :
                                </h5>
                                <p>{MyOrder?.description}</p>
                                <h5>
                                    vendor respone description :
                                </h5>
                                <p>
                                    {MyOrder?.projectdesc}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalOrder