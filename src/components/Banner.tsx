const Banner = (props:any) => {
        return(
            <div id="banner"> 
                  <div className="container">
                    <div className="row ">
                        <div className="col-md-8 col-md-offset-3 ">
                            {props.data
                                ? props.data.map((d:any, i:any) => (
                                    <div key={`${d.name}-${i}`} >
                                        <div className="banner-title">{d.title}</div>
                                        
                                        <img src="img/bike.jpg" className="img-responsive banner-img" alt="" /> 
                                        <div className="banner-text">{d.paragraph}</div>
                                        
                                        </div> 
                                    ))
                                : 'loading'}                   
                        </div>
                    </div>
                </div>
                
            </div>             
        );

}

export default Banner;
