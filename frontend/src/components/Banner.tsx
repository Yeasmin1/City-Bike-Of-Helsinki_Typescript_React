import { useTranslation } from "react-i18next";
import { Container, Box } from '@mui/material';
import { 
    LightSection, 
    ContentContainer, 
    SectionTitle, 
    ResponsiveImage,
    SectionSubtitle 
} from '../theme/commonStyles';

interface BannerInterface {
    title: string;
    paragraph: string;
}

interface BannerInterfaceType {
    data: BannerInterface;
}

const Banner: React.FC<BannerInterfaceType> = ({ data }) => {
    const { t } = useTranslation();
    
    return (
        <LightSection role="region" aria-label="City bike banner">
            <ContentContainer maxWidth="md">
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 4
                }}>
                    <SectionTitle variant="h1">
                        {t(data.title)}
                    </SectionTitle>
                    <ResponsiveImage
                        src="img/bike.jpg"
                        alt="A picture of a city bike"
                        className="cityBikeBanner-img"
                        sx={{ maxWidth: 800, mb: 4 }}
                    />
                    <SectionSubtitle variant="h5" sx={{ maxWidth: 800 }}>
                        {t(data.paragraph)}
                    </SectionSubtitle>
                </Box>
            </ContentContainer>
        </LightSection>
    );
}

export default Banner;
