import { useQuery } from '@apollo/client';
import { useState } from 'react';
import {AVAILABLEBIKES} from '../graphql/queries/ROUTE'

interface stationIdDataType{
    stationIdInBox:string;
    }
const BikesAvailableAtStation:React.FC<stationIdDataType>= ({stationIdInBox}) => {
   
    const[stationIdForBikes, setStationIdForBikes]= useState (stationIdInBox)
    const { data,error,loading }  = useQuery(
         AVAILABLEBIKES,{
            variables: {id: stationIdForBikes}

         })                                                         
   
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error || !data) {
        return <div>ERROR</div>;
      }
  
  if (stationIdForBikes!= stationIdInBox){
    setStationIdForBikes(stationIdInBox);
  }

    return( 
       <div >      
         <h4>Bikes available at the station right now: {data.bikeRentalStation.bikesAvailable}</h4> 
       </div>
            );
    }

export default BikesAvailableAtStation;





  