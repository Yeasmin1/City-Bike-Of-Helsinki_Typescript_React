import React, { Fragment, useState} from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { googleLogout} from '@react-oauth/google';
import { BsPersonCircle } from 'react-icons/bs';
import { LANGUAGES } from "./Language";
import Dropdown from 'react-bootstrap/Dropdown';

interface ProfileType{
    picture?: string;
    name: string;
    email?: string;
   }
   
interface loginProfileType{
   loginProfile: any | ProfileType;
   setLoginProfile: any;
}

const Navigation:React.FC<loginProfileType>= ({loginProfile, setLoginProfile})  => {
    const [open, setOpen] = useState(false);
    const {i18n, t} = useTranslation();
    const navigate = useNavigate();


    const handleClickLang = (e: React.MouseEvent<HTMLButtonElement>) => {
        const lang_code = e.currentTarget.value
        i18n.changeLanguage(lang_code);
    };

    const handleOpen = () => {
        setOpen(!open);
    };
      
    const handleNavigate = ()=>{
        navigate("/loginForm") ;
    };

    const handleLogout = () =>{
        googleLogout();
        setLoginProfile(null);
        setOpen(false);
        window.sessionStorage.clear();
        navigate("/") ;
    };
    //TODO: error handling for googleLogout

    return(
        <div >
            <nav id="navbar-first">
                <div className="container">
                <div className="nav-elements ">
                    <ul>
                        <li>
                        <div>
                            { /* Fragment is required to define unique keys for each item
                             because JSX elements directly inside a map() call always need key */
                            LANGUAGES.map(languageItem => 
                                <Fragment key={languageItem.id}> 
                            
                                <button className='btn-custom-button ml-1' value={languageItem.code} onClick={handleClickLang}>
                                    {languageItem.label}
                                </button>

                                
                                </Fragment>  
                            )
                            }
                        </div>
                        </li>
                        <li> 
                            {
                            loginProfile ? (
                                <div>
                                    {/*<Dropdown className='drop'>
                                    <Dropdown.Toggle className='btn-custom-button' id="dropdown-basic">
                                    {loginProfile.name} 
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='dropMenu'>
                                        <Dropdown.Item  onClick={handleLogout} href="#/">Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                       
                                    </Dropdown>
                                    */}
                                   <button className='btn-custom-button' onClick={handleOpen}>
                                        {loginProfile.name}   
                                    </button>  
                                    {
                                    open ? (
                                        <div >
                                        <button className='logout-button 'onClick={handleLogout}>
                                            Logout
                                        </button>
                                        </div>
                                    ) : null
                                    }
                              
                                </div>
                            ) : (
                                <div>
                                    <button className='btn-custom-button 'onClick={handleNavigate }>
                                        <span className='span-button'>
                                         <BsPersonCircle /> &nbsp;Login
                                        </span>
                                        
                                    </button> 
                                </div>
                            )
                            }
                        </li>
                     </ul>
                </div>
                </div>
            </nav>
   
            <nav id='menu' className='navbar-default '>
                <div className='container'>
                <div className='navbar-header'>
                <button
                    type='button'
                    className='navbar-toggle collapsed'
                    data-toggle='collapse'
                    data-target='#navbar-item-collapse'>
                    {' '}
                    <span className='sr-only'></span>{' '}
                    <span className='icon-bar'></span>{' '}
                    <span className='icon-bar'></span>{' '}
                    <span className='icon-bar'></span>{' '}
                </button>

                <Link className='navbar-brand page-scroll' to={{pathname:"/"}}>
                    CBH
                </Link>
                </div>

                <div className='collapse navbar-collapse' id='navbar-item-collapse'>
                <ul className='nav navbar-nav navbar-right'>
                    <li>
                    <NavLink to="/bikeStation">
                        {t("bikeStation")}
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/ticketsInfo">
                    {t("ticketsInfo")}
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/">
                    {t("travelling")}
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/">
                    {t("customer")}
                    </NavLink>
                    </li>
                </ul>
                </div>
                </div>
            </nav>
        </div>
    
    );
}

export default Navigation;