import { Link } from "react-router-dom";
import { LANGUAGES } from "./Language";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsPersonCircle } from 'react-icons/bs';

interface loginProfileType{
   loginProfile: any; 
   }

const isActive = ({ isActive }: any) => `link ${isActive ? "active" : ""}`;
const Navigation:React.FC<loginProfileType>= ({loginProfile})  => {
    const { i18n, t } = useTranslation();
    const onClickLang = (e: React.MouseEvent<HTMLButtonElement>) => {
            const lang_code = e.currentTarget.value
            i18n.changeLanguage(lang_code);
    };

    return(
        <div >
            <nav className="navbarFirst">
             <div className="container">
             <div className="nav-elements">
                <ul>
                <li>
                    <div>
                        {LANGUAGES.map(({ code, label }) => (
                            <button className="btn-custom-button ml-1" value={code} onClick={onClickLang}>
                            {label}
                            </button>
                            ))}
                    </div>
                    </li>
                    <li>
                    <div>
                    <NavLink to="/loginForm"> {loginProfile ? (
                        <div>{loginProfile.name}</div>    
                        ) : (
                            <button className="btn-custom-button profile-custom">
                                <span >
                           <BsPersonCircle/> &nbsp;Login
                         </span>

                            </button>
                        
                        )}</NavLink>
                          </div>
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
                    data-target='#bs-example-navbar-collapse-1'
                >
                    {' '}
                    <span className='sr-only'>Toggle navigation</span>{' '}
                    <span className='icon-bar'></span>{' '}
                    <span className='icon-bar'></span>{' '}
                    <span className='icon-bar'></span>{' '}
                </button>
                
                <Link className='navbar-brand page-scroll' to={{pathname:"/"}}>
                    CBH
                </Link>
                
            </div>
            
            <div
            className='collapse navbar-collapse'
            id='bs-example-navbar-collapse-1'
            >
            <ul className='nav navbar-nav navbar-right'>
                
            <li>
                <NavLink className={isActive} to="/bikeStation">
                {t("bikeStation")}
            </NavLink>

            </li>

                <li>
                <NavLink className={isActive} to="/ticketsInfo">
                {t("ticketsInfo")}
                </NavLink>
            
                </li>

                <li>
                <NavLink className={isActive} to="/travelling">
                {t("travelling")}
                </NavLink>
                </li>
                
                <li>
                <NavLink className={isActive} to="/customer">
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