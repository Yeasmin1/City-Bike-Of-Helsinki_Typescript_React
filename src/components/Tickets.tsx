import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { Container, Grid, Box, Typography } from '@mui/material';


interface TicketsInterface{
    title: string,
    paragraph1:string,
    paragraph2:string
};
interface TicketsInterfaceType{
    data: TicketsInterface;
}

const StyledImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        marginBottom: 0,
    },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
}));

const StyledSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4, 0),
}));

const Tickets:React.FC<TicketsInterfaceType>= ({data}) => {
    const {t} = useTranslation();
    
    return( 
        <StyledSection component="section" id="buyTickets">
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <StyledImage
                            src="img/bike.jpg"
                            alt="City Bike"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ContentBox>
                            <Typography variant="h3" gutterBottom>
                                {t(data.title)}
                            </Typography>
                            <Typography paragraph>
                                {t(data.paragraph1)}
                            </Typography>
                            <Typography paragraph>
                                {t(data.paragraph2)}
                            </Typography>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Container>
        </StyledSection>
    );  
}

export default Tickets ;