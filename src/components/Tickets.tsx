const Tickets = (props:any) => {
    return( 
       <div> 
          <div id="buyTickets">
            <div className="container">
                <div className="row">
                   <div className="col-xs-12 col-md-6">
                        {" "}
                        <img src="img/bike.jpg" className="img-responsive" alt="" />{" "}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="buyTickets-text">
                           {props.data
                                ? props.data.map((d:any, i:any) => (
                                    <div key={`${d.name}-${i}`} >
                                            <h3>{d.title}</h3>
                                            <p>{d.paragraph1}</p> 
                                            <p>{d.paragraph2}</p> 

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