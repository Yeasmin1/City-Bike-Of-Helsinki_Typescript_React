import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { RENTALSTATION } from "../graphql/queries/ROUTE";
import Select, { SingleValue } from "react-select";
import BikesAvailableAtStation from "./BikesAvailableAtStation";
import StationsInGoogleMap from "./StationsInGoogleMap";
import { styled } from '@mui/material/styles';
import { 
    Container, 
    Grid, 
    Typography, 
    Box, 
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';

interface BikeStationInterface {
    title: string;
    searchPlaceholder: string;
}

interface BikeStationInterfaceType {
    data: BikeStationInterface;
}

interface Station {
    name: string;
    stationId: string;
}

const StationContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4, 0),
}));

const SearchSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const StyledSelect = styled(Select)`
    margin-top: ${props => props.theme.spacing(2)};
    & .select__control {
        border-color: ${props => props.theme.palette.divider};
        &:hover {
            border-color: ${props => props.theme.palette.primary.main};
        }
        &--is-focused {
            border-color: ${props => props.theme.palette.primary.main};
            box-shadow: 0 0 0 1px ${props => props.theme.palette.primary.main};
        }
    }
`;

const BikeStation: React.FC<BikeStationInterfaceType> = ({ data }) => {
    const { t } = useTranslation();
    const [selectedStation, setSelectedStation] = useState<string | null>(null);
    const { loading, error, data: stationData } = useQuery(RENTALSTATION);

    const handleChange = (
        option: SingleValue<{ value: string; label: string }>
    ) => {
        if (option) {
            setSelectedStation(option.value);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={4}>
                <Alert severity="error">
                    Error loading stations: {error.message}
                </Alert>
            </Box>
        );
    }

    const options = stationData?.bikeRentalStations?.map((station: Station) => ({
        value: station.stationId,
        label: station.name,
    })) || [];

    return (
        <StationContainer>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            {t(data.title)}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <SearchSection>
                            <StyledSelect
                                options={options}
                                onChange={handleChange}
                                placeholder={t(data.searchPlaceholder)}
                                isClearable
                                classNamePrefix="select"
                            />
                            {selectedStation && (
                                <Box mt={2}>
                                    <BikesAvailableAtStation id={selectedStation} />
                                </Box>
                            )}
                        </SearchSection>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StationsInGoogleMap 
                            style={{ width: "100%", height: "600px" }}
                            center={{ lat: 60.1699, lng: 24.9384 }}
                            zoom={13}
                        />
                    </Grid>
                </Grid>
            </Container>
        </StationContainer>
    );
};

export default BikeStation;





