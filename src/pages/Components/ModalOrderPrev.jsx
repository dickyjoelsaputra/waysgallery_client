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
import { useNavigate } from 'react-router-dom';

function ModalOrderPrev({ show, handleClose, order, refetch }) {

    const navigate = useNavigate()

    const [preview, setPreview] = useState(null);
    useEffect(() => {
        setPreview(order.image1)
    }, [order])

    let handleCancel = async (id) => {
        await API.patch(`/cancelorder/` + id);
        navigate("/myorder")
        refetch()
        handleClose()
    };

    let handleAccept = async (id) => {
        await API.patch(`/acceptorder/` + id);
        navigate("/myorder")
        refetch()
        handleClose()
    };

    return (
        <>
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
                                                onClick={() => { setPreview(order.image1) }}
                                                src={order.image1} alt="" srcset="" />
                                        </div>
                                        <div className='col-2'>
                                            <img className={styles.cardbodyimgselect}
                                                onClick={() => { setPreview(order.image2) }}
                                                src={order.image2} alt="" srcset="" />
                                        </div>
                                        <div className='col-2'>
                                            <img className={styles.cardbodyimgselect}
                                                onClick={() => { setPreview(order.image3) }}
                                                src={order.image3} alt="" srcset="" />
                                        </div>
                                        <div className='col-2'>
                                            <img className={styles.cardbodyimgselect}
                                                onClick={() => { setPreview(order.image4) }}
                                                src={order.image4} alt="" srcset="" />
                                        </div>
                                        <div className='col-2'>
                                            <img className={styles.cardbodyimgselect}
                                                onClick={() => { setPreview(order.image5) }}
                                                src={order.image5} alt="" srcset="" />
                                        </div>
                                        <div className='col-1' />
                                    </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <h3>
                                    {order.title}
                                </h3>
                                <h5>
                                    user request description :
                                </h5>
                                <p>{order.description}</p>
                                <h5>
                                    vendor respone description :
                                </h5>
                                <p>
                                    {order.projectdesc}
                                </p>
                                <div className='d-flex justify-content-evenly mt-5'>
                                    <span className={styles.cancel}
                                        onClick={() => { handleCancel(order.id) }}>Cancel</span>
                                    <span className={styles.approve}
                                        onClick={() => { handleAccept(order.id) }}>Approve</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalOrderPrev