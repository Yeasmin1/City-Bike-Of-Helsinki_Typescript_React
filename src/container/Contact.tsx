import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { Container, Box, Typography, Link, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { 
    Facebook as FacebookIcon, 
    Twitter as TwitterIcon, 
    LinkedIn as LinkedInIcon 
} from '@mui/icons-material';

interface ContactInterface {
    title: string;
    social: {
        facebook: string;
        twitter: string;
        linkedin: string;
    };
}

interface ContactInterfaceType {
    data: ContactInterface;
}

const ContactSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
}));

const SocialContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center',
    marginTop: theme.spacing(4),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
    },
}));

const FooterSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(4, 0),
    marginTop: 'auto',
}));

const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none',
    padding: theme.spacing(0.5, 1),
    fontSize: '0.875rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'rgba(25, 118, 210, 0.04)',
        textDecoration: 'none',
        borderRadius: theme.shape.borderRadius,
    },
}));

const FooterText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: '0.875rem',
}));

const Contact = (props: any) => {
    const { t } = useTranslation();

    return (
        <Box component="footer" sx={{ display: 'flex', flexDirection: 'column', minHeight: '30vh' }}>
            <ContactSection>
                <Container>                        <Grid container spacing={4}>
                        {props.data.Contact?.[0] && (
                            <>
                                <Grid xs={12} sm={6} md={3}>
                                    <Typography variant="h6" gutterBottom>
                                        {t(props.data.Contact[0].header1)}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {t(props.data.Contact[0].header2)}
                                    </Typography>
                                    <Typography variant="body2">
                                        {t(props.data.Contact[0].header3)}
                                    </Typography>
                                </Grid>

                                <Grid xs={12} sm={6} md={3}>
                                    <Typography variant="h6" gutterBottom>
                                        {t(props.data.Contact[0].header4)}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {t(props.data.Contact[0].header5)}
                                    </Typography>
                                    <Typography variant="body2">
                                        {t(props.data.Contact[0].header6)}
                                    </Typography>
                                </Grid>

                                <Grid xs={12} sm={6} md={3}>
                                    <Typography variant="h6" gutterBottom>
                                        {t(props.data.Contact[0].header7)}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {t(props.data.Contact[0].header8)}
                                    </Typography>
                                    <Typography variant="body2">
                                        {t(props.data.Contact[0].header9)}
                                    </Typography>
                                </Grid>

                                <Grid xs={12} sm={6} md={3}>
                                    <Typography variant="h6" gutterBottom>
                                        {t(props.data.Contact[0].header10)}
                                    </Typography>
                                </Grid>
                            </>
                        )}
                    </Grid>

                    <SocialContainer>
                        <SocialButton aria-label="Facebook">
                            <FacebookIcon />
                        </SocialButton>
                        <SocialButton aria-label="Twitter">
                            <TwitterIcon />
                        </SocialButton>
                        <SocialButton aria-label="LinkedIn">
                            <LinkedInIcon />
                        </SocialButton>
                    </SocialContainer>
                </Container>
            </ContactSection>

            <FooterSection>
                <Container>
                    {props.data.ContactFooter?.[0] && (
                        <Grid 
                            container 
                            spacing={{ xs: 2, md: 3 }} 
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent={{ xs: 'center', sm: 'space-between' }}
                            alignItems={{ xs: 'center', sm: 'center' }}
                            py={2}
                        >
                            <Grid item>
                                <FooterText>
                                    &copy; {t(props.data.ContactFooter[0].p1)}
                                </FooterText>
                            </Grid>
                            <Grid item>
                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        gap: { xs: 2, sm: 3 },
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <FooterLink href="#">{t(props.data.ContactFooter[0].p2)}</FooterLink>
                                    <FooterLink href="#">{t(props.data.ContactFooter[0].p3)}</FooterLink>
                                    <FooterLink href="#">{t(props.data.ContactFooter[0].p4)}</FooterLink>
                                    <FooterLink href="#">{t(props.data.ContactFooter[0].p5)}</FooterLink>
                                    <FooterLink href="#">{t(props.data.ContactFooter[0].p6)}</FooterLink>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </FooterSection>
        </Box>
    );
};
export default Contact;
