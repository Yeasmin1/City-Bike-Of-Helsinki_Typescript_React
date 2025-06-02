import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { Container, Grid, Box, Typography, Button } from '@mui/material';

interface BuyPassInterface {
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    text: string;
    areaSelectionButton: string;
}

interface BuyPassInterfaceType {
    data: BuyPassInterface;
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
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(4),
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 4),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const StyledLink = styled(Link)({
    textDecoration: 'none',
});

const BuyPass: React.FC<BuyPassInterfaceType> = ({ data }) => {
    const { t } = useTranslation();

    return (
        <Box id="buyPass" role="region" aria-label="Information about ticket based on cities">
            <Container>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <StyledImage
                            src="img/city-map.jpg"
                            alt="Picture of a city map"
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
                            <Typography paragraph>
                                {t(data.paragraph3)}
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                {t(data.text)}
                            </Typography>
                            <StyledLink to="/ticketsInfo">
                                <StyledButton
                                    variant="contained"
                                    size="large"
                                    aria-label="Link to Helsinki and Espoo city bike prices"
                                >
                                    {t(data.areaSelectionButton)}
                                </StyledButton>
                            </StyledLink>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default BuyPass;