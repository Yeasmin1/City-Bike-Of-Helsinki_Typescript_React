import { useTranslation } from "react-i18next";
const TicketsPrice = (props:any) => {
  const { i18n, t } = useTranslation();
    return (
      <div id='tprice' className='text-center'>
        <div className='container'>
          {props.data.TicketsPriceHeader
                  ? props.data.TicketsPriceHeader.map((d:any, i:any) => (
                    <div key={`${d.name}-${i}`} className='col-md-8 col-md-offset-2 tprice section-title'>
                          
              <h3>{t(d.title)}</h3>
          </div>
                  ))
                : 'loading'}
        
            <div id='row'>       
              {props.data.TicketsPrice
                ? props.data.TicketsPrice.map((d:any, i:any) => (
                    <div key={`${d.name}-${i}`} className='col-md-3 col-sm-6'> 
                     
                        <div className="card list-group"> 

                          <div className="card-body" style={{ height:300 }}> 
                           
                                <h3 className="card-title text-center">{t(d.title)}</h3>
                                <p className="card-text">{t(d.text)}</p>
                                <h1 className="card-text">{t(d.price)}</h1>
                                <p className="card-text">{t(d.paragraph)}</p> 
                                <button>{t(d.button)}</button>

                           
                            </div>
                        </div>
                     </div>
                     
                  
                  ))
                : 'loading'}
               
               
            </div>
            
        

          
        </div>
      </div>
    )
  }
  export default TicketsPrice;
  