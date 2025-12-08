import React from 'react'
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";

import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {


    const { user } = useAuth();

    const navigate = useNavigate();

    const username = user?.email ? user.email.split("@")[0] : null;


    const handleLogout = () => {
        signOut(auth)
        navigate("/login")
    }

  return (
    <>
    
    
    <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img src="https://blogger.googleusercontent.com/img/a/AVvXsEhh2P-tTMhp0vGmNcKxbE4A6XSgBm9JMWWXjMSqYdUMcvmGB0DIEZHdy_epUGjzd6Z18SePTlcCFErMdCjcLxJQcI9WVdNDUphs1EBuYtkgxzTygpYDiqOhCGE5MXHimXBTedfYRKCTPueNV1EmfbmQVvCwowW_btx9Z19_2IcPkEi4e-MHYR5yAM5A-Zo" style={{width: "50px", }} className='me-3' alt="" /> ZenSanta</Link>


            {user ? (
                <div className="ms-auto d-flex">
                    <h5 className='mb-0'>Hi! <span className="text-primary">{username}</span></h5>
                    {/* <button className='btn btn-sm btn-danger ms-3' onClick={handleLogout}>Logout</button> */}
                    
<div className="dropdown">
  <button
    className="btn btn-sm dropdown-toggle no-caret"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="bi bi-three-dots-vertical"></i>
  </button>

  <ul className="dropdown-menu dropdown-menu-end">
    <li>
      <button className="dropdown-item btn btn-sm btn-danger"  onClick={handleLogout}>Logout
      </button>
    </li>
    <li>
      <a className="dropdown-item" href="#">
        Support
      </a>
    </li>
  </ul>
</div>


                </div>
            ) : null}
        </div>
    </nav>

    
    
    </>
  )
}

export default Navbar