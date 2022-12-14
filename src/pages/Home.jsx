import React from 'react'

// componen
import Navigation from './Components/Navigation'
import Container from 'react-bootstrap/esm/Container'
import { photos } from "../assets/photos";
import style from "./Module/Home.module.css"
import { Link } from 'react-router-dom';
import { API } from "../config/api";
import { useQuery } from 'react-query';
import DetailPost from './DetailPost'
import { useState } from 'react';
import { useEffect } from 'react';

function Home() {

    let { data: Posts } = useQuery('postsCache', async () => {
        const response = await API.get('/posts');
        return response.data.data;
    });

    // handle search
    const [previewPost, setPreviewPost] = useState(Posts); //image

    const [searchInput, setSearchInput] = useState('');

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = previewPost.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setPreviewPost(filteredData)
        }
    }

    useEffect(() => {
        if (searchInput == '') {
            setPreviewPost(Posts)
        }
    }, [searchItems])

    // console.log(searchInput)

    return (
        <>
            <Navigation />
            <Container className='mt-4'>
                <div className='row mb-4'>
                    <div className="col-3">
                        <div className="dropdown">
                            <button className={style.buttonsearch} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Today
                                <img className='ms-2' src="https://cdn-icons-png.flaticon.com/128/32/32195.png" width={10} />
                            </button>
                            <ul className="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6">

                    </div>
                    <div className="col-3">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => searchItems(e.target.value)} />
                        </div>
                    </div>
                </div>
                <ul className={style.imagegallery}>
                    {
                        previewPost?.map((e) => {
                            return <>
                                <li>
                                    <Link to={`/detail/${e.id}`}>
                                        <img src={e.image1} />
                                        <div className={style.overlay}><span>{e.title}</span></div>
                                    </Link>
                                </li>
                            </>
                        })
                    }
                </ul>
            </Container>
        </>
    )
}

export default Home