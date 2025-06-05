import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { RENTALSTATION } from "../graphql/queries/ROUTE";
import Select, { SingleValue } from "react-select";
import BikesAvailableAtStation from "./BikesAvailableAtStation";
import StationsInGoogleMap from "./StationsInGoogleMap";
import { styled } from '@mui/material/styles';
import { 
    Grid, 
    Typography, 
    Box, 
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    LightSection,
    ContentContainer,
    SectionTitle,
    GridItemContent
} from '../theme/commonStyles';

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

const SearchSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .select__control': {
        borderRadius: theme.shape.borderRadius,
        borderColor: theme.palette.divider,
        minHeight: 56,
        boxShadow: 'none',
        '&:hover': {
            borderColor: theme.palette.primary.main,
        },
        '&--is-focused': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
        },
    },
    '& .select__menu': {
        zIndex: 2,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
    },
    '& .select__option': {
        padding: theme.spacing(1.5, 2),
        '&--is-selected': {
            backgroundColor: theme.palette.primary.main,
        },
        '&--is-focused': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}));

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
        <LightSection>
            <ContentContainer>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <GridItemContent>
                            <SectionTitle variant="h2" sx={{ textAlign: 'left', mb: 3 }}>
                                {t(data.title)}
                            </SectionTitle>
                            <Divider sx={{ width: '100%' }} />
                            <SearchSection>
                                <StyledSelect
                                    options={options}
                                    onChange={handleChange}
                                    placeholder={t(data.searchPlaceholder)}
                                    isClearable
                                    classNamePrefix="select"
                                />
                                {selectedStation && (
                                    <Box sx={{ width: '100%' }}>
                                        <BikesAvailableAtStation id={selectedStation} />
                                    </Box>
                                )}
                            </SearchSection>
                        </GridItemContent>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ 
                            height: '600px', 
                            borderRadius: 2, 
                            overflow: 'hidden',
                            boxShadow: 3 
                        }}>
                            <StationsInGoogleMap 
                                style={{ width: "100%", height: "100%" }}
                                center={{ lat: 60.1699, lng: 24.9384 }}
                                zoom={13}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </ContentContainer>
        </LightSection>
    );
};

export default BikeStation;





