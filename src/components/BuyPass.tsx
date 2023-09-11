import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BuyPassInterface  {
    title: string,
    paragraph1:string,
    paragraph2:string,
    paragraph3:string,
    text:string,
    button:string
};
interface BuyPassInterfaceType{
    data: BuyPassInterface;
}
const BuyPass:React.FC<BuyPassInterfaceType>= ({data}) => {
    const {t} = useTranslation();
    return(
        <div id="buyPass">
        <div className="container">
        <div className="row">
            <div className="col-xs-12 col-md-6">
                {" "}
                <img src="img/city-map.jpg" className="img-responsive buyPass-img" alt="" />{" "}
            </div>
            <div className="col-xs-12 col-md-6">           
                <h3>{t(data.title)}</h3>
                <p>{t(data.paragraph1)}</p> 
                <p>{t(data.paragraph2)}</p>
                <p>{t(data.paragraph3)}</p>
                <h4>{t(data.text)}</h4>        
                <Link to="/ticketsInfo" className='btn btn-custom btn-lg page-scroll'>
                    {t(data.button)}   
                </Link> 
            </div>
        </div>
        </div>
        </div>
    );
}

export default BuyPass;