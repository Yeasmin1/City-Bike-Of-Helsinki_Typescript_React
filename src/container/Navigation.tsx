import { Link } from "react-router-dom";
const Navigation = () => {
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
                        <Link to={{pathname:"/bikeStation"}}>
                                Bike Stations
                        </Link>
                    </li>

                    <li>
                    <Link to={{pathname:"/ticketsInfo"}}>
                            Tickets and Fare
                        </Link>
                    </li>

                    <li>
                    <a href='#travelling' className='page-scroll'>
                        Travelling
                    </a>
                    </li>
                    
                    <li>
                    <a href='#customer' className='page-scroll'>
                        Customer Service
                    </a>
                    </li>
                    <li>
                    <a href='#cbh' className='page-scroll'>
                        About Us
                    </a>
                    </li>
                </ul>
                </div>
            </div>
    </nav>
    );
}

export default Navigation;