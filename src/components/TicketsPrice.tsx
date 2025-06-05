import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Box 
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
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

const TicketsPrice: React.FC<TicketsPriceInterfaceType> = ({ data }) => {
    const { t } = useTranslation();
    
    const priceCards = data.TicketsPrice.map(item => ({
        title: t(item.title),
        price: t(item.price),
        text: t(item.text)
    }));

    return (
        <PriceSection>
            <Container>
                <Typography 
                    variant="h3" 
                    align="center" 
                    gutterBottom
                    sx={{ mb: 4 }}
                >
                    {t(data.TicketsPriceHeader[0].title)}
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {priceCards.map((card, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <PriceCard>
                                <CardContent>
                                    <CardTitle variant="h5">
                                        {card.title}
                                    </CardTitle>
                                    <Typography 
                                        variant="h4" 
                                        align="center" 
                                        color="primary"
                                    >
                                        {card.price}
                                    </Typography>
                                </CardContent>
                            </PriceCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </PriceSection>
    );
};

export default TicketsPrice;
