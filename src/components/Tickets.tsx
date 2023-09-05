import { useTranslation } from "react-i18next";

const Tickets = (props:any) => {
    const { i18n, t } = useTranslation();
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
                           
                                {props.data
                                        ? props.data.map((d:any, i:any) => (
                                            <div key={`${d.name}-${i}`} >
                                                    <h3>{t(d.title)}</h3>
                                                    <p>{t(d.paragraph1)}</p> 
                                                    <p>{t(d.paragraph2)}</p> 

                                            </div>   
                                  
                                    ))
                                : 'loading'}
                           
                        </div>

                    </div>
                </div>
            </div>
          </div>

        </div>
     );  
}

export default Tickets ;