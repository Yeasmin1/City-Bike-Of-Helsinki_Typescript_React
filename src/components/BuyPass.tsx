import { Link } from "react-router-dom";
const BuyPass= (props:any) => {
    return(
        <div id="buyPass">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {" "}
                        <img src="img/city-map.jpg" className="img-responsive buyPass-img" alt="" />{" "}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="buyPass-text">
                             {props.data
                                ? props.data.map((d:any, i:any) => (
                                    <div key={`${d.name}-${i}`} >
                                            <h3>{d.title}</h3>
                                            <p>{d.paragraph1}</p> 
                                            <p>{d.paragraph2}</p>
                                            <p>{d.paragraph3}</p>
                                            <h4>{d.text}</h4>
                                        </div>
                                    ))
                                : 'loading'}
                            <Link to="/ticketsInfo" className='btn btn-custom btn-lg page-scroll'>
                                Helsinki and Espoo
                            </Link> 
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BuyPass;