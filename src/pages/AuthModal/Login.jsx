import React from 'react'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import style from './Auth.module.css'

export default function LoginForm({ Show, Hide }) {

    let navigate = useNavigate()

    const [state, dispatch] = useContext(UserContext);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    //
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitLogin = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const body = JSON.stringify(form);
            const response = await API.post("/login", body, config);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data,
            });

        } catch (error) {
            console.log(error);
        }
        navigate(0)
    });

    return (
        <Modal show={Show} onHide={Hide} onSubmit={Hide} centered>
            <Modal.Body>
                <div className='px-4'>
                    {/* Handle Error Disini */}
                    <h1 className={style.textColor}><b>Login</b></h1>
                    <Form onSubmit={(e) => handleSubmitLogin.mutate(e)}>
                        <Form.Group className="mb-3">
                            <Form.Control className={style.borderColor} name='email' id='email' type="email" placeholder="Enter email"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control className={style.borderColor} name='password' id='password' type="password" placeholder="Enter password"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 my-4">
                            <Button className={style.buttonColor} type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                    <p>
                        <a className='text-decoration-none pe-auto' href='/#'><span className='text-body'>Dont have an account ?</span><span style={{ border: "none" }}
                            className='btn ps-1 mb-1'>Click here</span></a>
                    </p>
                </div >
            </Modal.Body>
        </Modal >
    )
}

