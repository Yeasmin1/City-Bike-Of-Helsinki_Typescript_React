import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { AVAILABLEBIKES } from "../graphql/queries/ROUTE";
import { styled } from '@mui/material/styles';
import { Box, Typography, CircularProgress, Alert, Paper } from '@mui/material';
import { StyledCard } from '../theme/commonStyles';

interface BikesAvailableAtStationProps {
    id: string;
}

const StatusCard = styled(StyledCard)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
}));

const BikesAvailableAtStation: React.FC<BikesAvailableAtStationProps> = ({ id }) => {
    const { t } = useTranslation();
    const { loading, error, data } = useQuery(AVAILABLEBIKES, {
        variables: { id },
    });

    if (loading) {
        return (
            <StatusCard>
                <CircularProgress size={40} thickness={4} />
            </StatusCard>
        );
    }

    if (error) {
        return (
            <StatusCard>
                <Alert 
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    Error: {error.message}
                </Alert>
            </StatusCard>
        );
    }

    return (
        <StatusCard>
            <Typography 
                variant="h5" 
                color="primary.main"
                gutterBottom
            >
                {t('Available Bikes')}
            </Typography>
            <Typography 
                variant="h3" 
                color="text.primary"
                sx={{ fontWeight: 'bold' }}
            >
                {data?.bikeRentalStation?.bikesAvailable || 0}
            </Typography>
        </StatusCard>
    );
};

export default BikesAvailableAtStation;





