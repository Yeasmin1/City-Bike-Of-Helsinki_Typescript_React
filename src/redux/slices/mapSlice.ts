import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MapState {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const initialState: MapState = {
  center: {
    lat: 60.1699,
    lng: 24.9384
  },
  zoom: 13
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapCenter: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
      state.center = action.payload;
    },
    setMapZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    }
  }
});

export const { setMapCenter, setMapZoom } = mapSlice.actions;

export default mapSlice.reducer;
