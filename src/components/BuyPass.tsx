import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BuyPassInterface  {
    title: string,
    paragraph1:string,
    paragraph2:string,
    paragraph3:string,
    text:string,
    areaSelectionButton:string
};
interface BuyPassInterfaceType{
    data: BuyPassInterface;
}
const BuyPass:React.FC<BuyPassInterfaceType>= ({data}) => {
    const {t} = useTranslation();
    return(
        <div id="buyPass" role="region" aria-label="Information about ticket based on cities">
        <div className="container">
        <div className="row">
            <div className="col-xs-12 col-md-6">
                {" "}
                <img src="img/city-map.jpg" className="img-responsive buyPass-img" aria-label="Picture of a city map"/>{" "}
            </div>
            <div className="col-xs-12 col-md-6">           
                <h3>{t(data.title)}</h3>
                <p>{t(data.paragraph1)}</p> 
                <p>{t(data.paragraph2)}</p>
                <p>{t(data.paragraph3)}</p>
                <h4>{t(data.text)}</h4>        
                <Link to="/ticketsInfo" aria-label="Link to Helsinki and Espoo city bike prices " className='btn btn-custom btn-lg page-scroll'>
                    {t(data.areaSelectionButton)}   
                </Link>      
            </div>
        </div>
        </div>
        </div>
    );
}

export default BuyPass;