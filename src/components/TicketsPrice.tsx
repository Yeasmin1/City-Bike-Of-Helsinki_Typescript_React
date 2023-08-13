const TicketsPrice = (props:any) => {
    return (
      <div id='tprice' className='text-center'>
        <div className='container'>
          <div className='col-md-8 col-md-offset-2 tprice section-title'>
            <h3>Buy a pass</h3>
          </div>
        
            <div id='row'>       
              {props.data
                ? props.data.map((d:any, i:any) => (
                    <div key={`${d.name}-${i}`} className='col-md-3 col-sm-6'> 
                        <div className="card list-group"> 

                          <div className="card-body" style={{ height:300 }}> 
                           
                                <h3 className="card-title text-center">{d.title}</h3>
                                <p className="card-text">{d.text}</p>
                                <h1 className="card-text">{d.price}</h1>
                                <p className="card-text">{d.paragraph}</p> 
                                <button>Select</button>

                           
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
  