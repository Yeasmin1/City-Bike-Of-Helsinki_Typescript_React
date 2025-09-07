import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Station {
  stationId: string;
  name: string;
}

interface BikeStationState {
  selectedStation: string | null;
  stations: Station[];
  loading: boolean;
  error: string | null;
}

const initialState: BikeStationState = {
  selectedStation: null,
  stations: [],
  loading: false,
  error: null,
};

export const bikeStationSlice = createSlice({
  name: 'bikeStation',
  initialState,
  reducers: {
    setSelectedStation: (state, action: PayloadAction<string | null>) => {
      state.selectedStation = action.payload;
    },
    setStations: (state, action: PayloadAction<Station[]>) => {
      state.stations = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedStation, setStations, setLoading, setError } = bikeStationSlice.actions;

export default bikeStationSlice.reducer;
