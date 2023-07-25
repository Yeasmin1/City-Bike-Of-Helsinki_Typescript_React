const BuyPass= (props:any) => {
    return(
        <div id="buyPass">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {" "}
                        <img src="img/map.webp" className="img-responsive" alt="" />{" "}
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
                            <div className='btn btn-custom btn-lg page-scroll'>
                                Helsinki and Espoo
                            </div> 
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BuyPass;