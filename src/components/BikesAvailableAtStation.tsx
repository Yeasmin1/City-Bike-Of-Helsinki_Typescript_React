import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { AVAILABLEBIKES } from "../graphql/queries/ROUTE";
import { styled } from '@mui/material/styles';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

interface BikesAvailableAtStationProps {
    id: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

const BikesAvailableAtStation: React.FC<BikesAvailableAtStationProps> = ({ id }) => {
    const { t } = useTranslation();
    const { loading, error, data } = useQuery(AVAILABLEBIKES, {
        variables: { id },
    });

    if (loading) {
        return (
            <StyledBox>
                <CircularProgress />
            </StyledBox>
        );
    }

    if (error) {
        return (
            <StyledBox>
                <Alert severity="error">
                    Error: {error.message}
                </Alert>
            </StyledBox>
        );
    }

    return (
        <StyledBox>
            <Typography variant="h6">
                {t('Available Bikes')}: {data?.bikeRentalStation?.bikesAvailable || 0}
            </Typography>
        </StyledBox>
    );
};

export default BikesAvailableAtStation;





