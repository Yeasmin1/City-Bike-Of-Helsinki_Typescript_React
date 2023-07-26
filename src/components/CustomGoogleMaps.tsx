import { useRef } from "react";
import { useEffect } from "react";
import * as React from "react";
import { useState} from 'react';

const GooggleApiKey = `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
const GoogleAPiMapUrl = `${process.env.REACT_APP_GOOGLE_MAP_API_URL}`

interface PlaceProps{
  stationNameInMap:string;
}
const CustomGoogleMaps: React.FC<PlaceProps>= ({stationNameInMap}) =>{
  const[placeName, setPlaceName]= useState (stationNameInMap)
    const  googleMapRef = useRef<HTMLDivElement>(null);
    let googleMap:any;
    useEffect(() => {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `${GoogleAPiMapUrl}`+"?"+"key="+`${GooggleApiKey}`+"&libraries=places";
      googleMapScript.async = true;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", () => {
        getLatLng();
      });
    }, [placeName]);

    if (placeName!= stationNameInMap){
      setPlaceName(stationNameInMap);
    }

    const createGoogleMap = (coordinates:any) => {
      googleMap = new window.google.maps.Map(googleMapRef.current!, {  //The non-null assertion operator (!.), also called the exclamation mark operator, indicates to the compiler that we are sure that the value we want to access is not null or undefined.
        zoom: 12,
        center: {
          lat: coordinates.lat(),
          lng: coordinates.lng(),
        },
        disableDefaultUI: true,
      });
    };

    const getLatLng = () => {
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

    return (
      <div
        id="google-map"
        ref={googleMapRef}
        style={{ width: "600px", height: "600px" }}
      />
    );
  };

export default CustomGoogleMaps;