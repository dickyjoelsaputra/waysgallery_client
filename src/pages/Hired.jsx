import React from 'react'
import styles from './Module/Hired.module.css'
import Navigation from './Components/Navigation'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { API } from '../config/api';
import { useNavigate, useParams } from 'react-router-dom';

function Hired() {

    const navigate = useNavigate()

    let { id } = useParams();

    const [formhired, setFormHired] = useState(
        {
            title: "",
            description: "",
            startproject: "",
            endproject: "",
            price: "",
            seller_id: id,
        })

    console.log(formhired)

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration Content-type
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            // Data body
            const body = JSON.stringify(formhired);

            // Insert data user to database
            const response = await API.post('/hired', body, config);

            navigate("/home")
            // Handling response here
        } catch (error) {
            console.log(error);
        }
    });
    return (
        <>
            <Navigation />
            <Container className='mt-5'>
                <div className={styles.formwraper}>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)} >
                        <Form.Group className="mb-3">
                            <Form.Control className={styles.borderColor} name='text' id='title' type="text" placeholder="Title"
                                onChange={e => setFormHired({ ...formhired, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control className={styles.borderColor} name='description' id='description' as="textarea" rows={4} type="textarea" placeholder="Description"
                                onChange={e => setFormHired({ ...formhired, description: e.target.value })}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Control className={styles.borderColor} name='start_project' id='start_project' type="date" placeholder="Start Project"
                                        onChange={e => setFormHired({ ...formhired, startproject: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Control className={styles.borderColor} name='end_project' id='end_project' type="date" placeholder="End Project"
                                        onChange={e => setFormHired({ ...formhired, endproject: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Control className={styles.borderColor} name='price' id='price' type="number" placeholder="Price"
                                onChange={e => setFormHired({ ...formhired, price: e.target.value })}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 my-4">
                            <Button className={styles.buttonColor} type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>

        </>
    )
}

export default Hired