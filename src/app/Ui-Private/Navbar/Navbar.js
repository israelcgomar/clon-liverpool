import React from 'react';
import { Link } from 'react-router-dom';
import { LinkNav } from './LinkNav';
import { SecondNavbar } from './SecondNavbar/SecondNavbar';
import './Navbar.sass';
import img from '../../../assets/img/liverpool_logo.png'
import userphoto from '../../../assets/img/profile_photo.jpg'

export const Navbar = props => (
    <div className='Navbar'>
        <div className='wrapper nav__bar'>
            <div className="brand-logo">
                <Link to="/">
                    <img src={img} alt="logotipo"/>
                </Link>
            </div>
            <nav>
                <ul className='nav__bar__first__child'>
                    <div className='nav__data lead__white'>
                        <ul>
                            <li className='txt__mg'>Hola Israel</li>
                            <Link className='lead__white' to="/all-articles">Cerrar Sesión</Link>
                        </ul>
                    </div>
                    <LinkNav to='/#' img={userphoto}/>
                </ul>
            </nav>
        </div>
        <SecondNavbar></SecondNavbar>
    </div>
);