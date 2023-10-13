import { useTranslation } from "react-i18next";
interface BannerInterface  {
    title: string,
    paragraph:string 
};
interface BannerInterfaceType{
    data: BannerInterface;
}
const Banner:React.FC<BannerInterfaceType>= ({data}) => {
    const {t } = useTranslation();
    return(
        <div role="region" aria-label="City bike banner"> 
            <div className="container">
                <div className="row ">
                    <div className="col-md-8 col-md-offset-3 ">                     
                        <div className="cityBikeBanner-title">{t(data.title)}</div>
                        <img src="img/bike.jpg" className="img-responsive cityBikeBanner-img" aria-label="A picture of a city bike" /> 
                        <div id="cityBikeText" className="cityBikeBanner-text">{t(data.paragraph)}</div>          
                    </div>                       
                    </div>
                </div>
            </div>         
    );
}

export default Banner;
