import Select from 'react-select'
import {RENTALSTATION} from '../graphql/queries/ROUTE'
import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react';
import StationsInGoogleMap from './StationsInGoogleMap';
import BikesAvailableAtStation from './BikesAvailableAtStation';

const BikeStation = () => {
    const[stationName, setStationName]= useState ("Helsinki")
    const[stationId, setStationId]= useState ("070")

    const { data,error,loading }  = useQuery(RENTALSTATION)
   
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error || !data) {
        return <div>ERROR</div>;
      }
      
      //created a modified array with two elements 
    const options = data.bikeRentalStations.map((d:any) => ({
        "value" : d.stationId,
        "label" : d.name
      }))
     
   const handleChange= (e:any) => {
       setStationName(e.label)
       setStationId(e.value)
   }
    return( 
        <div> 
        <div id="bikeStation">
            <div className="container">
                <div className="row">
                    <div className='col-xs-12 col-md-6 '>
                        <h3>Search nearby bike stations</h3>
                        <hr className='hrStyle'/>
                        
                        <div className="searchFormStyle">
                        <Select options={options} onChange={handleChange} />
                        </div>
                        <div className='thumbnail '>
                              <h4>Bike Station Name: {stationName}</h4>
                              <BikesAvailableAtStation stationIdInBox={stationId}/>
                           
                          </div>   
                        </div>

                    <div className='col-xs-12 col-md-6'>
                        <StationsInGoogleMap stationNameInMap={stationName}/>
                    </div>  
            </div>
            </div>
        </div>

    </div>
            );
    }

export default BikeStation;





  