import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

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
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        ...options,
      });
      setMap(newMap);
    }
  }, [ref, map, options]);

  return (
    <MapContainer>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </MapContainer>
  );
};

export default StationsInGoogleMap;