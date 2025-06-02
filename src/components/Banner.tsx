import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { Container, Box, Typography } from '@mui/material';

interface BannerInterface {
    title: string;
    paragraph: string;
}

interface BannerInterfaceType {
    data: BannerInterface;
}

const BannerContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(4, 0),
}));

const BannerTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    fontWeight: 700,
    color: theme.palette.primary.main,
}));

const BannerImage = styled('img')({
    width: '100%',
    height: 'auto',
    marginBottom: '2rem',
});

const BannerText = styled(Typography)(({ theme }) => ({
    fontSize: '1.1rem',
    lineHeight: 1.6,
    color: theme.palette.text.primary,
}));

const Banner: React.FC<BannerInterfaceType> = ({ data }) => {
    const { t } = useTranslation();
    
    return (
        <BannerContainer role="region" aria-label="City bike banner">
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <BannerTitle variant="h1">
                        {t(data.title)}
                    </BannerTitle>
                    <BannerImage 
                        src="img/bike.jpg"
                        alt="A picture of a city bike"
                        className="cityBikeBanner-img"
                    />
                    <BannerText id="cityBikeText">
                        {t(data.paragraph)}
                    </BannerText>
                </Box>
            </Container>
        </BannerContainer>
    );
}

export default Banner;
