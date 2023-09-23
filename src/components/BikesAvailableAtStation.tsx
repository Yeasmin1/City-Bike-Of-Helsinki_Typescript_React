import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from "react-i18next"; //imported it in all the relevant component
import {AVAILABLEBIKES} from '../graphql/queries/ROUTE';

interface stationIdDataType{
  stationIdInBox:string;
}

const BikesAvailableAtStation:React.FC<stationIdDataType>= ({stationIdInBox}) => {
  const[stationIdForBikes, setStationIdForBikes]= useState(stationIdInBox)
  const {t} = useTranslation() 

  // useQuery hook uses apolloClient to recive data from Digitransit API
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
  
  // Set state variable that triggers page rendering when new stationIdInBox is received
  if (stationIdForBikes!== stationIdInBox){
    setStationIdForBikes(stationIdInBox);
  }

  return( 
    <div>      
      {t("availableBikestationNumber")} 
      <h4 >{data.bikeRentalStation.bikesAvailable}</h4>
    </div>
  );
}

export default BikesAvailableAtStation;





  