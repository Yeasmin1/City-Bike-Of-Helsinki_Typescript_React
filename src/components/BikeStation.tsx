import Select from 'react-select'
import {ROUTE} from '../graphql/queries/ROUTE'
import { useQuery } from '@apollo/react-hooks'
import React from 'react';
import { useState } from 'react';
import CustomGoogleMaps from './CustomGoogleMaps';

const containerStyle = {
    width: '4000px',
    height: '800px'
  };
  
const center = {
    lat: 61.9241,
    lng: 25.7482
  };
interface biikeStationProps{
    name: any
}
const BikeStation: React.FC= () => {
    const[stationName, setStationName]= useState ("Helsinki")

    const { data, error, loading }  = useQuery(ROUTE)
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error || !data) {
        return <div>ERROR</div>;
      }
    console.log("test")
    console.log(data) 
    
    const options = data.bikeRentalStations.map((d:any) => ({
        "value" : d.id,
        "label" : d.name
      }))
    console.log(options)

   const handleChange= (e:any) => {
    console.log("handleTest")
       console.log(e.label); 
       setStationName(e.label)
       console.log("nextPlace")
       console.log(stationName)
   }

    return( 
        <div> 
        <div id="bikeStation">
            <div className="container">
                <div className="row">
                    <div className='col-xs-12 col-md-6 '>
                        <h3>Bike station near you</h3>
                        <hr/>
                        
                        <div className="searchFormStyle">
                        <Select options={options} onChange={handleChange} />
                        </div>
                        </div>

                    <div className='col-xs-12 col-md-6'>
                        <CustomGoogleMaps stationNameInMap={stationName}/>
                    </div>  
            </div>
            </div>
        </div>

    </div>
            );
    }

export default BikeStation;





  