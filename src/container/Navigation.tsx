import { Link } from "react-router-dom";
import { LANGUAGES } from "./Language";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const isActive = ({ isActive }: any) => `link ${isActive ? "active" : ""}`;

const Navigation = () => {
    const { i18n, t } = useTranslation();

    const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang_code = e.target.value;
        i18n.changeLanguage(lang_code);
    };

    return(
        <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
             
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
                 <NavLink className={isActive} to="/">
                 {t("home")}
                </NavLink>
                </li>
                    
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
                    <li>
                    <NavLink className={isActive} to="/cbh">
                    {t("cbh")}
                   </NavLink>

                    </li>
                    <li>
                    <select defaultValue={"en"} onChange={onChangeLang}>
                {LANGUAGES.map(({ code, label }) => (
                <option key={code} value={code}>
                    {label}
                </option>
                ))}
            </select>

                    </li>
                    
                </ul>
                
                </div>
            </div>
           

    </nav>
    );
}

export default Navigation;