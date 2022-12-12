import React from 'react'
import Navigation from './Components/Navigation'
import Container from 'react-bootstrap/esm/Container'
import style from './Module/OrderOffer.module.css'
import { Link } from 'react-router-dom'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import iconaccept from '../assets/accept.png'
import iconcancel from '../assets/cancel.png'
import iconwaiting from '../assets/waiting.png'
import { useState } from 'react'
import ModalOrderPrev from './Components/ModalOrderPrev'

function MyOrder() {
    let { data: Order, refetch } = useQuery("offerCache", async () => {
        const response = await API.get("/myorder");
        return response.data.data;
    });

    const [state, setState] = useState({})
    console.log(state)

    // untuk respon order
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navigation />
            <Container className='mt-4'>
                <div className="dropdown">
                    <button className={style.buttonsearch} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        My Order
                        <img className='ms-2' src="https://cdn-icons-png.flaticon.com/128/32/32195.png" width={10} />
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className='dropdown-item' to='/myorder'>My Order</Link></li>
                        <li><Link className='dropdown-item' to='/myoffer'>My Offer</Link></li>
                    </ul>
                </div>

                <table className="table table-bordered border-dark">
                    <thead>
                        <tr className='table-secondary'>
                            <th scope="col">No</th>
                            <th scope="col">Vendor</th>
                            <th scope="col">Order</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Project</th>
                            <th scope="col">End Project</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Order?.map((e, i) => {
                                return <>
                                    <tr>
                                        <th>{i + 1}</th>
                                        <td>{e.seller.name}</td>
                                        <td>
                                            {e.status === "success" ?

                                                <Link className='text-primary' to={`/viewproject/${e.id}`}>
                                                    {e.title}
                                                </Link>
                                                :
                                                <p>
                                                    {e.title}
                                                </p>

                                            }
                                        </td>
                                        <td>{e.price}</td>
                                        <td>{e.startproject}</td>
                                        <td>{e.endproject}</td>
                                        {
                                            e.status === "waiting" ?
                                                <td>Waiting Vendor Response</td>
                                                : e.status === "pending" ?
                                                    <td>Waiting Vendor Project</td>
                                                    : e.status === "success" ?
                                                        <td>Success</td>
                                                        : e.status === "cancel" ?
                                                            <td>Cancel</td>
                                                            : <td>Waiting Your Response</td>
                                        }
                                        {
                                            e.status === "waiting" ?
                                                <td className='d-flex justify-content-evenly'>
                                                    <img src={iconwaiting} alt="" srcset="" />
                                                </td>
                                                : e.status === "pending" ?
                                                    <td className='d-flex justify-content-evenly'>
                                                        <span className={style.done}>Vendor Build</span>
                                                    </td>
                                                    : e.status === "success" ?
                                                        <td className='d-flex justify-content-evenly'><img src={iconaccept} alt="" srcset="" /></td>
                                                        : e.status === "cancel" ?
                                                            <td className='d-flex justify-content-evenly'><img src={iconcancel} alt="" srcset="" /></td>
                                                            : <td className='d-flex justify-content-evenly'>
                                                                {/* <Modal id={e.id} /> */}
                                                                {/* <Link className={style.send} to={`/viewproject/${e.id}`}>
                                                                    Preview
                                                                </Link> */}
                                                                <p onClick={() => { setState(Order.find((x) => x.id === e.id)); handleShow() }}
                                                                    className={style.send}
                                                                >Preview</p>
                                                            </td>
                                        }
                                    </tr>
                                </>
                            })
                        }
                    </tbody>
                </table>
            </Container>
            <ModalOrderPrev show={show} order={state} handleClose={handleClose} refetch={refetch} />
        </>
    )
}

export default MyOrder