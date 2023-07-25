const TicketsPrice = (props:any) => {
    return (
      <div id='tprice' className='text-center'>
        <div className='container'>
          <div className='col-md-8 col-md-offset-2 section-title'>
            <h3>Buy a pass</h3>
          </div>
          <div id='row'>
            {props.data
              ? props.data.map((d:any, i:any) => (
                  <div key={`${d.name}-${i}`} className='col-md-3 col-sm-6'>
                    <div className='thumbnail'>
                      {' '}
                      <div className='caption'>
                        <h4>{d.title}</h4>
                        <p>{d.text}</p>
                        <h1>{d.price}</h1>
                        <p>{d.paragraph}</p>
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
  