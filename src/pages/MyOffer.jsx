import React from 'react'
import Navigation from './Components/Navigation'
import Container from 'react-bootstrap/esm/Container'
import style from './Module/OrderOffer.module.css'
import { Link } from 'react-router-dom'
import { API } from '../config/api'
import { useQuery } from 'react-query'
import iconaccept from '../assets/accept.png'
import iconcancel from '../assets/cancel.png'

function MyOffer() {

    let { data: Offer, refetch } = useQuery("offerCache", async () => {
        const response = await API.get("/myoffer");
        return response.data.data;
    });

    let handleCancel = async (id) => {
        await API.patch(`/canceloffer/` + id);
        refetch()
    };

    let handleAccept = async (id) => {
        await API.patch(`/acceptoffer/` + id);
        refetch()
    };

    return (
        <>
            <Navigation />
            <Container className='mt-4'>
                <div className="dropdown">
                    <button className={style.buttonsearch} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        My Offer
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
                            <th scope="col">Client</th>
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
                            Offer?.map((e, i) => {
                                return <>
                                    <tr>
                                        <th>{i + 1}</th>
                                        <td>{e.buyer.name}</td>
                                        <td>
                                            {e.status === "success" ?

                                                <Link className='text-primary' to={`/viewproject/${e.id}`}>
                                                    {e.title}
                                                </Link>
                                                :
                                                <p className='mb-0'>
                                                    {e.title}
                                                </p>

                                            }
                                        </td >
                                        <td>{e.price}</td>
                                        <td>{e.startproject}</td>
                                        <td>{e.endproject}</td>
                                        {
                                            e.status === "waiting" ?
                                                <td>Waiting Accept</td>
                                                : e.status === "pending" ?
                                                    <td>Waiting Send Project</td>
                                                    : e.status === "success" ?
                                                        <td>Success</td>
                                                        : e.status === "cancel" ?
                                                            <td>Cancel</td>
                                                            : <td>Project Sended</td>
                                        }
                                        {
                                            e.status === "waiting" ?
                                                <td className='d-flex justify-content-evenly'>
                                                    <span onClick={() => { handleCancel(e.id) }} className={style.cancel}>Cancel</span>
                                                    <span onClick={() => { handleAccept(e.id) }} className={style.approve}>Approve</span>
                                                </td>
                                                : e.status === "pending" ?
                                                    <td className='d-flex justify-content-evenly'>
                                                        <Link className={style.send} to={`/sendproject/${e.id}`}>
                                                            Send Project
                                                        </Link>
                                                    </td>
                                                    : e.status === "success" ?
                                                        <td className='d-flex justify-content-evenly'><img src={iconaccept} alt="" srcset="" /></td>
                                                        : e.status === "cancel" ?
                                                            <td className='d-flex justify-content-evenly'><img src={iconcancel} alt="" srcset="" /></td>
                                                            : <td className='d-flex justify-content-evenly'>
                                                                <span className={style.done}>Project Sended</span>
                                                            </td>
                                        }
                                    </tr>
                                </>
                            })
                        }
                    </tbody>
                </table>
            </Container>
        </>
    )
}

export default MyOffer