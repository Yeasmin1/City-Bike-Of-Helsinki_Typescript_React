const Banner = (props:any) => {
        return(
            <div id="cover">
                <div className='banner'>
                  <div className="container">
                    <div className="row ">
                        <div className="col-md-8 col-md-offset-3 banner-text">
                            {props.data
                                ? props.data.map((d:any, i:any) => (
                                    <div key={`${d.name}-${i}`} >
                                        <h1>{d.title}</h1>
                                        <img src="img/bike.jpg" className="img-responsive" alt="" /> 
                                        <h4>{d.paragraph}</h4>
                                        </div> 
                                    ))
                                : 'loading'}                   
                        </div>
                    </div>
                </div>
                  </div>  
            </div>             
        );

}

export default Banner;
