import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Box,
    Button 
} from '@mui/material';

interface TicketsPriceItem {
    title: string;
    text: string;
    price: string;
    paragraph: string;
    button: string;
}

interface TicketsPriceInterfaceType {
    data: {
        TicketsPrice: TicketsPriceItem[];
        TicketsPriceHeader: Array<{ title: string }>;
    };
}

const PriceCard = styled(Card)(({ theme }) => ({
    height: 400,
    minWidth: 280,
    maxWidth: 320,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    margin: '0 auto', // Center card in grid item
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[4],
    },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
}));

const PriceSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(6, 0),
    backgroundColor: theme.palette.grey[50],
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(3),
    '& > *:not(:last-child)': {
        marginBottom: theme.spacing(2),
    },
    '& .MuiButton-root': {
        marginTop: 'auto' // Pushes button to bottom
    }
}));


const TicketsPrice: React.FC<TicketsPriceInterfaceType> = ({ data }) => {
    const { t } = useTranslation();

    return (
        <PriceSection id="tprice">
            <Container maxWidth="lg" sx={{ overflowX: 'hidden' }}>
                {data.TicketsPriceHeader ? (
                    <Typography 
                        variant="h3" 
                        align="center" 
                        gutterBottom
                        sx={{ mb: 4 }}
                    >
                        {t(data.TicketsPriceHeader[0].title)}
                    </Typography>
                ) : (
                    'loading'
                )}

                <Grid 
            container 
            spacing={3}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'stretch',
                '& .MuiGrid-item': {
                    display: 'flex',
                    flex: '0 0 auto',
                    width: {
                        xs: '100%',
                        sm: '50%',
                        lg: '25%'
                    },
                    maxWidth: {
                        xs: '100%',
                        sm: '50%',
                        lg: '25%'
                    }
                }
            }}
        >
                    {data.TicketsPrice ? data.TicketsPrice.map((card, index) => (
                        <Grid item key={`${card.title}-${index}`}>
                            <PriceCard>
                                <StyledCardContent>
                                    <CardTitle variant="h5">
                                        {t(card.title)}
                                    </CardTitle>
                                    <Typography 
                                        variant="body1" 
                                        align="center"
                                    >
                                        {t(card.text)}
                                    </Typography>
                                    <Typography 
                                        variant="h4" 
                                        align="center" 
                                        color="primary"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {t(card.price)}
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        align="center"
                                    >
                                        {t(card.paragraph)}
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 'auto' }}
                                    >
                                        {t(card.button)}
                                    </Button>
                                </StyledCardContent>
                            </PriceCard>
                        </Grid>
                    )) : 'loading'}
                </Grid>
            </Container>
        </PriceSection>
    );
};

export default TicketsPrice;