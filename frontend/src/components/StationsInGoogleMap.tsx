import React, { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setMapCenter, setMapZoom } from '../redux/slices/mapSlice';

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  children?: React.ReactNode;
}

const MapContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "600px",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[3],
}));

const StationsInGoogleMap: React.FC<MapProps> = ({
  children,
  style,
  ...options
}) => {
  const dispatch = useAppDispatch();
  const mapState = useAppSelector(state => state.map);
  const mapRef = useRef<google.maps.Map | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current && !mapRef.current) {
      mapRef.current = new window.google.maps.Map(ref.current, {
        center: mapState.center,
        zoom: mapState.zoom,
        ...options,
      });

      // Add listener for center changes
      mapRef.current.addListener('center_changed', () => {
        if (mapRef.current) {
          const center = mapRef.current.getCenter();
          if (center) {
            dispatch(setMapCenter({ 
              lat: center.lat(), 
              lng: center.lng() 
            }));
          }
        }
      });

      // Add listener for zoom changes
      mapRef.current.addListener('zoom_changed', () => {
        if (mapRef.current) {
          dispatch(setMapZoom(mapRef.current.getZoom() || mapState.zoom));
        }
      });
    }
  }, [dispatch]);

  // Update map when mapState changes
  React.useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(mapState.center);
      mapRef.current.setZoom(mapState.zoom);
    }
  }, [mapState.center.lat, mapState.center.lng, mapState.zoom]);

  return (
    <MapContainer>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass the mapRef instead of map instance directly
          return React.cloneElement(child as React.ReactElement<any>, { map: mapRef.current });
        }
        return child;
      })}
    </MapContainer>
  );
};

export default StationsInGoogleMap;