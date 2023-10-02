import { useTranslation } from "react-i18next";


interface TicketsInterface{
    title: string,
    paragraph1:string,
    paragraph2:string
};
interface TicketsInterfaceType{
    data: TicketsInterface;
}
const Tickets:React.FC<TicketsInterfaceType>= ({data}) => {
    const {t} = useTranslation();
    return( 
        <div> 
        <div id="buyTickets">
        <div className="container">
        <div className="row">
            <div className="col-xs-12 col-md-6">
                <img src="img/bike.jpg" className="img-responsive buyTickets-img" alt="" />
            </div>
            <div className="col-xs-12 col-md-6">
                <div className="buyTickets-text">          
                    <h3>{t(data.title)}</h3>
                    <p>{t(data.paragraph1)}</p> 
                    <p>{t(data.paragraph2)}</p> 
                </div>             
            </div>
        </div>
        </div>
        </div>
        </div>
    );  
}

export default Tickets ;