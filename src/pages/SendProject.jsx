import React from 'react'
import Navigation from './Components/Navigation'
import styles from './Module/Upload.module.css'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import CloudImage from '../assets/cloud-computing 1.png'
import iconplus from '../assets/icon plus.png';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../config/api';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

function SendProject() {


    let { id } = useParams();

    const navigate = useNavigate()
    const [previewImage1, setPreviewImage1] = useState(null); //image
    const [previewImage2, setPreviewImage2] = useState(null); //image
    const [previewImage3, setPreviewImage3] = useState(null); //image
    const [previewImage4, setPreviewImage4] = useState(null); //image
    const [previewImage5, setPreviewImage5] = useState(null); //image

    // handle untuk perubahan
    // Function Untuk Edit Profile
    const [formEdit, setForm] = useState({
        description: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",

    });

    const handleChange = (e) => {
        setForm({
            ...formEdit,
            [e.target.name]:
                e.target.type === "file" ?
                    e.target.files === null ? null : e.target.files
                    : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === "file" && e.target.name === "image1") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreviewImage1(url);
        }
        if (e.target.type === "file" && e.target.name === "image2") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreviewImage2(url);
        }
        if (e.target.type === "file" && e.target.name === "image3") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreviewImage3(url);
        }
        if (e.target.type === "file" && e.target.name === "image4") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreviewImage4(url);
        }
        if (e.target.type === "file" && e.target.name === "image5") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreviewImage5(url);
        }

    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Configuration
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };
            const formData = new FormData();
            formData.set("projectdesc", formEdit.description);
            formData.set("image1", formEdit.image1[0], formEdit.image1[0].name);
            formData.set("image2", formEdit.image2[0], formEdit.image2[0].name);
            formData.set("image3", formEdit.image3[0], formEdit.image3[0].name);
            formData.set("image4", formEdit.image4[0], formEdit.image4[0].name);
            formData.set("image5", formEdit.image5[0], formEdit.image5[0].name);

            // Insert category data
            await API.patch(`/sendproject/${id}`, formData, config);

            navigate('/myoffer')
        } catch (error) {
            console.log(error);
        }
        navigate('/myoffer')
    })

    return (
        <>
            <Navigation />
            <Container className='mt-4'>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Row>
                        <Col md="7">
                            {/* ==================== */}
                            {previewImage1 === null ?
                                <>
                                    <label for="image1" className={styles.customfile}>
                                        <img src={CloudImage} className={styles.image} />
                                        <p>Browser your image</p>
                                    </label>
                                </>
                                :
                                <>
                                    <div className={styles.image1wrapper}>
                                        <img src={previewImage1} alt="asdf" className={styles.image1} onClick={() => {
                                            setPreviewImage1(null)
                                        }}
                                        />
                                    </div>
                                </>
                            }
                            <input type="file"
                                name="image1"
                                id="image1"
                                onChange={handleChange}
                            />
                            <Row>
                                <Col md="3">
                                    {previewImage2 === null ? <>
                                        <label for="image2">
                                            <div className={styles.bottomupload}>
                                                <img src={iconplus} className={styles.iconplus} />
                                            </div>
                                        </label>
                                        <input type="file"
                                            name="image2"
                                            id="image2"
                                            onChange={handleChange}
                                        />
                                    </> : <>
                                        <div className={styles.wrapprevimage}>
                                            <img src={previewImage2} alt="asdf" className={styles.previmage} onClick={() => {
                                                setPreviewImage2(null)
                                            }}
                                            />
                                        </div>
                                    </>}
                                </Col>
                                <Col md="3">
                                    {previewImage3 === null ? <>
                                        <label for="image3">
                                            <div className={styles.bottomupload}>
                                                <img src={iconplus} className={styles.iconplus} />
                                            </div>
                                        </label>
                                        <input type="file"
                                            name="image3"
                                            id="image3"
                                            onChange={handleChange}
                                        />
                                    </> : <>
                                        <div className={styles.wrapprevimage}>
                                            <img src={previewImage3} alt="asdf" className={styles.previmage} onClick={() => {
                                                setPreviewImage3(null)
                                            }}
                                            />
                                        </div>
                                    </>}
                                </Col>
                                <Col md="3">
                                    {previewImage4 === null ? <>
                                        <label for="image4">
                                            <div className={styles.bottomupload}>
                                                <img src={iconplus} className={styles.iconplus} />
                                            </div>
                                        </label>
                                        <input type="file"
                                            name="image4"
                                            id="image4"
                                            onChange={handleChange}
                                        />
                                    </> : <>
                                        <div className={styles.wrapprevimage}>
                                            <img src={previewImage4} alt="asdf" className={styles.previmage} onClick={() => {
                                                setPreviewImage4(null)
                                            }}
                                            />
                                        </div>
                                    </>}
                                </Col>
                                <Col md="3">
                                    {previewImage5 === null ? <>
                                        <label for="image5">
                                            <div className={styles.bottomupload}>
                                                <img src={iconplus} className={styles.iconplus} />
                                            </div>
                                        </label>
                                        <input type="file"
                                            name="image5"
                                            id="image5"
                                            onChange={handleChange}
                                        />
                                    </> : <>
                                        <div className={styles.wrapprevimage}>
                                            <img src={previewImage5} alt="asdf" className={styles.previmage} onClick={() => {
                                                setPreviewImage5(null)
                                            }}
                                            />
                                        </div>
                                    </>}
                                </Col>
                            </Row>
                        </Col>
                        <Col md="5">
                            <Form.Group className="mb-5 mt-5" >
                                <Form.Control as="textarea" rows={4}
                                    className={styles.borderColor}
                                    type="textarea" placeholder="Description"
                                    name="description"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {
                                handleSubmit.isLoading ? <>
                                    <div className={styles.buttonWrapper}>
                                        <Button type='submit' className={styles.buttonPost} size='sm'>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            Loading...
                                        </Button>{' '}
                                    </div>
                                </> : <>
                                    <div className={styles.buttonWrapper}>
                                        <Button type='submit' className={styles.buttonPost} size='sm'>Send Project</Button>{' '}
                                    </div>
                                </>
                            }
                        </Col>
                    </Row>
                </Form>
            </Container >
        </>
    )
}

export default SendProject