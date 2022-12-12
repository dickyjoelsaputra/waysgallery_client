import React from 'react'
import Navigation from './Components/Navigation'
import Container from 'react-bootstrap/esm/Container'
import styles from './Module/DetailPost.module.css'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import profiledefault from "../assets/black_profile.png"

function DetailPost() {

    const [state, dispatch] = useContext(UserContext);
    const [preview, setPreview] = useState(null);

    let { id } = useParams();
    let { data: Post } = useQuery("asdf", async () => {
        const response = await API.get("/post/" + id);
        // setPreview(Post?.image1)
        return response.data.data;
    });
    // const previewgambar = preview

    useEffect(() => {
        setPreview(Post?.image1)
    }, [Post])

    return (
        <>
            <Navigation />
            <Container className='mt-4 mb-5'>
                <div className={styles.card}>
                    <div className={styles.cardheader}>
                        <div className='row'>
                            {
                                state.user.id === Post?.user?.id ?
                                    <>
                                        {
                                            Post?.user?.avatar === "" ? <>
                                                <div className='col-2'>
                                                    <img className={styles.Icon} src={profiledefault} alt="robocop" />
                                                </div>
                                            </> : <>
                                                <div className='col-2'>
                                                    <img className={styles.Icon} src={Post?.user?.avatar} alt="robocop" />
                                                </div>
                                            </>
                                        }
                                    </>
                                    :
                                    <Link className='col-2' to={`/detail-user/${Post?.user?.id}`}>
                                        {
                                            Post?.user?.avatar === "" ? <>
                                                <img className={styles.Icon} src={profiledefault} alt="robocop" />
                                            </> : <>
                                                <img className={styles.Icon} src={Post?.user?.avatar} alt="robocop" />
                                            </>
                                        }
                                    </Link>

                            }
                            <div className='col-4'>
                                <b>{Post?.title}</b>
                                <p>{Post?.user?.name}</p>
                            </div>
                            <div className='col-1'></div>
                            <div className='col-5'>
                                {
                                    state.user.id === Post?.user?.id ?
                                        <>
                                        </>
                                        :
                                        <>
                                            <Button className={styles.buttonFollow} size='sm'>Follow</Button>{' '}
                                            <Link to={`/hired/${Post?.user?.id}`}>
                                                <Button className={styles.buttonHire} size='sm'>Hire</Button>{' '}
                                            </Link>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardbody}>
                        <img className={styles.cardbodyimg} src={preview} alt="" srcset="" />
                        <div className='row mt-3 mb-3'>
                            <div className='col-1' />
                            <div className='col-2'>
                                <img className={styles.cardbodyimgselect}
                                    onClick={() => { setPreview(Post?.image1) }}
                                    src={Post?.image1} alt="" srcset="" />
                            </div>
                            <div className='col-2'>
                                <img className={styles.cardbodyimgselect}
                                    onClick={() => { setPreview(Post?.image2) }}
                                    src={Post?.image2} alt="" srcset="" />
                            </div>
                            <div className='col-2'>
                                <img className={styles.cardbodyimgselect}
                                    onClick={() => { setPreview(Post?.image3) }}
                                    src={Post?.image3} alt="" srcset="" />
                            </div>
                            <div className='col-2'>
                                <img className={styles.cardbodyimgselect}
                                    onClick={() => { setPreview(Post?.image4) }}
                                    src={Post?.image4} alt="" srcset="" />
                            </div>
                            <div className='col-2'>
                                <img className={styles.cardbodyimgselect}
                                    onClick={() => { setPreview(Post?.image5) }}
                                    src={Post?.image5} alt="" srcset="" />
                            </div>
                            <div className='col-1' />
                        </div>
                        <b>👋</b><b> {Post?.user?.greeting} </b><b className='text-primary'>{Post?.user?.email}</b>
                        <p>{Post?.description}</p>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default DetailPost