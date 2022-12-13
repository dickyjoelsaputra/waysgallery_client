import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
// assets
import DropDownIconLogout from '../../assets/navigation/logout.png'
import DropDownIconProfile from '../../assets/navigation/user.png'
import DropDownIconOrder from '../../assets/navigation/order.png'
// css
import styles from './Navusericon.module.css'
import profiledefault from '../../assets/black_profile.png'

export default function Navusericon() {
    // logout
    // logout
    const [state, dispatch] = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
        navigate("/landing");

    };
    return (
        <>
            <div className="dropdown">
                <button className="btn dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {
                        state.user.avatar === "" ? <>
                            <img src={profiledefault} alt="" className={styles.Icon} />
                        </> : <>

                            <img className={styles.Icon}
                                // src={Profile.image === "http://localhost:5000/uploads/" ? null : Profile?.image}
                                src={state.user.avatar}
                                alt='icon' />
                        </>
                    }
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <Link className="dropdown-item" to="/profile">
                            <img alt='imgdropwdown' className={styles.Dropdownicon} src={DropDownIconProfile} />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="/myorder">
                            <img alt='imgdropwdown' className={styles.Dropdownicon} src={DropDownIconOrder} />
                            Orders
                        </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <a className="dropdown-item" href="/#"
                            onClick={logout}
                        >
                            <img alt='dropdownicon' className={styles.Dropdownicon} src={DropDownIconLogout} />
                            Logout
                        </a>
                    </li>
                </ul>
            </div>

        </>
    )


}