import React, { useEffect, useRef, ReactElement } from "react";
import { useState} from 'react';

 interface mapElements{
  stationNameInMap:string;
  }

const StationsInGoogleMap:React.FC<mapElements>= ({stationNameInMap}) => {

  const[placeName, setPlaceName]= useState(stationNameInMap)
  const ref = React.useRef(null);
    let googleMap:any;
  
  useEffect(() => {
    getLatLng();
   
  }
  );

  const createGoogleMap = (coordinates:any) => {
    googleMap=new window.google.maps.Map(ref.current!,{  //The non-null assertion operator (!.), also called the exclamation mark operator, indicates to the compiler that we are sure that the value we want to access is not null or undefined.
      center: {
        lat:  coordinates.lat(61.9241),
        lng: coordinates.lng( 25.7482)
      },
      zoom:15,
    });
  };
  
  if (placeName!= stationNameInMap){
    setPlaceName(stationNameInMap);
  }

  const getLatLng = ()  => {
    let lat:any | null, lng:any| null, placeId:any| null;
    new window.google.maps.Geocoder().geocode(
      { address: placeName },
      function (results:any, status:any) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          placeId = results[0].place_id;
          createGoogleMap(results[0].geometry.location);
          lat = results[0].geometry.location.lat();
          lng = results[0].geometry.location.lng();
          new window.google.maps.Marker({
            position: { lat, lng },
            map: googleMap,
            animation: window.google.maps.Animation.DROP,
            title: placeName,
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  };

  return(
      <>
        <div 
          id="map"
          ref={ref}  
          style={{ width: "600px", height: "600px" }} />
        </>
    );       

};

export default StationsInGoogleMap;