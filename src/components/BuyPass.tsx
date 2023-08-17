import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const BuyPass= (props:any) => {
    const { i18n, t } = useTranslation();
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
                             {props.data.BuyPass
                                ? props.data.BuyPass.map((d:any, i:any) => (
                                    <div key={`${d.name}-${i}`} >
                                            <h3>{t(d.title)}</h3>
                                            <p>{t(d.paragraph1)}</p> 
                                            <p>{t(d.paragraph2)}</p>
                                            <p>{t(d.paragraph3)}</p>
                                            <h4>{t(d.text)}</h4>
                                        </div>
                                    ))
                                : 'loading'}
                            <Link to="/ticketsInfo" className='btn btn-custom btn-lg page-scroll'>
                            {props.data.BuyPassButton
                                ? props.data.BuyPassButton.map((d:any, i:any) => (
                                    <div key={`${d.name}-${i}`} >
                                            {t(d.button)}
                                        </div>
                                    ))
                                : 'loading'}
                                
                            </Link> 
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BuyPass;