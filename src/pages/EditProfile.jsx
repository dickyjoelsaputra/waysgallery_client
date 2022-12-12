import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Navigation from './Components/Navigation'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import gambarkamera from '../assets/gambarkamera.png'
import styles from './Module/EditProfile.module.css'
import Button from 'react-bootstrap/esm/Button';
import { API } from '../config/api';
import { useQuery } from "react-query";
import { useMutation } from 'react-query'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const navigate = useNavigate()

    // FETCH DATA UNTUK EDIT USER
    // NOTE HARUS DIBIKIN GLOBAL
    // let { data: Profile, refetch } = useQuery("profileCache", async () => {
    //     const response = await API.get("/myprofile");
    //     return response.data.data;
    // });

    const [previewAvatar, setPreviewAvatar] = useState(null); //image
    const [previewBestArt, setPreviewBestArt] = useState(null); //image

    // handle untuk perubahan
    // Function Untuk Edit Profile
    const [formEdit, setForm] = useState({
        name: "",
        greeting: "",
        avatar: "",
        bestart: "",
    });

    const handleChange = (e) => {
        setForm({
            ...formEdit,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === "file" && e.target.name === "avatar") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreviewAvatar(url);
        }
        if (e.target.type === "file" && e.target.name === "bestart") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreviewBestArt(url);
        }

    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };

            const formData = new FormData();
            formData.set("avatar", formEdit.avatar[0], formEdit.avatar[0].name);
            formData.set("bestart", formEdit.bestart[0], formEdit.bestart[0].name);
            formData.set("greeting", formEdit.greeting);
            formData.set("name", formEdit.name);

            await API.patch("/edit-profile", formData, config);
            navigate("/profile")
        } catch (error) {
            console.log(error);
        }
    })


    return (
        <>
            <Navigation />
            <Container className='mt-4'>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Row>
                        <Col md="3">
                            <div className={styles.wraperimage}>
                                {
                                    previewBestArt == null ?
                                        <>
                                            <img src={gambarkamera} className={styles.imagepreview} />
                                        </>
                                        :
                                        <>
                                            <img src={previewBestArt} className={styles.imagepreview} />
                                        </>
                                }
                                {
                                    previewAvatar == null ?
                                        <>
                                            <img src={gambarkamera} className={styles.imagepreview} />
                                        </>
                                        :
                                        <>
                                            <img src={previewAvatar} className={styles.imagepreview} />
                                        </>
                                }
                            </div>
                        </Col>
                        <Col md="4">
                            <label for="bestart" class={styles.customfile}>
                                <div>Upload Your Best Art</div>
                            </label>
                            <input type="file"
                                name="bestart"
                                id='bestart'
                                onChange={handleChange} />
                            {/* ==================== */}
                            <label for="avatar" class={styles.customfile}>
                                <div>Upload your Avatar</div>
                            </label>
                            <input type="file"
                                name="avatar"
                                id="avatar"
                                onChange={handleChange}
                            />
                        </Col>
                        <Col md="1" />
                        <Col md="4">
                            <Form.Group className="mb-5 mt-5" >
                                <Form.Control
                                    className={styles.borderColor}
                                    type="text" placeholder="Greeting"
                                    name="greeting"
                                    // value={Profile?.greeting}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-5 mt-5" >
                                <Form.Control
                                    className={styles.borderColor}
                                    type="text" placeholder="Name"
                                    name="name"
                                    // value={Profile?.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <div className="d-grid gap-2 my-4">
                                <Button className={styles.buttonColor} type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container >
        </>
    )
}

export default EditProfile