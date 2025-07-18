import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { Container, Box, Typography, Link, IconButton, Stack, Divider } from '@mui/material';
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const SocialContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center',
    marginTop: theme.spacing(4),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.action.hover,
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

const FooterSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(3, 0),
    marginTop: 'auto',
    color: theme.palette.primary.contrastText,
    '& .MuiContainer-root': {
        maxWidth: theme.breakpoints.values.lg + 'px',
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(0, 3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 2),
        },
    },
}));

const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    display: 'block',
    width: '100%',
    padding: theme.spacing(0.25, 0),
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.action.hover,
        textDecoration: 'none',
        borderRadius: theme.shape.borderRadius,
    },
}));

const FooterText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.body2.fontSize,
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightSemiBold,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.contrastText,
}));

const Contact = (props: any) => {
    const { t } = useTranslation();

    return (
        <Box component="footer" sx={{ display: 'flex', flexDirection: 'column', minHeight: '30vh' }}>

            <FooterSection>
                <Container maxWidth="lg">
                    {props.data.ContactFooter?.[0] && (
                        <Grid 
                            container 
                            spacing={2}
                            py={3}
                            sx={{
                                width: '100%',
                                margin: 0,
                                justifyContent: 'space-between',
                                '& .MuiGrid-item': {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                    px: 3
                                }
                            }}
                        >
                            
                                <Grid
                                container
                                direction="row"
                                sx={{
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                }}
                                >

                                    <SocialContainer sx={{ mt: { xs: 2, sm: 0 } }}>
                                        <SocialButton 
                                            aria-label="Facebook"
                                            size="small"
                                        >
                                            <FacebookIcon fontSize="small" />
                                        </SocialButton>
                                        <SocialButton 
                                            aria-label="Twitter"
                                            size="small"
                                        >
                                          <TwitterIcon fontSize="small" />
                                        </SocialButton>
                                        <SocialButton 
                                            aria-label="LinkedIn"
                                            size="small"
                                        >
                                            <LinkedInIcon fontSize="small" />
                                        </SocialButton>
                                    </SocialContainer>
                                    
                                        
                                        
                                   
                                    
                             
                            </Grid>
                            
                            
                            <Grid item xs={12} sm={6} md={3}>
                                <FooterHeading variant="h6">
                                    Services
                                </FooterHeading>
                                <Stack spacing={0.5}>
                                    <FooterLink href="#">CBH App</FooterLink>
                                    <FooterLink href="#">Top Up Card</FooterLink>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <FooterHeading variant="h6">
                                    Legal
                                </FooterHeading>
                                <Stack spacing={0.5}>
                                    <FooterLink href="#">Terms of Use</FooterLink>
                                    <FooterLink href="#">Privacy Policy</FooterLink>
                                    <FooterLink href="#">Cookie Preferences</FooterLink>
                                    <FooterLink href="#">Accessibility</FooterLink>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <FooterHeading variant="h6">
                                    Locations
                                </FooterHeading>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography 
                                            variant="subtitle2" 
                                            sx={{ 
                                                fontWeight: 600,
                                                marginBottom: 1
                                            }}
                                        >
                                            Helsinki
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography 
                                            variant="subtitle2"
                                            sx={{ 
                                                fontWeight: 600,
                                                marginBottom: 1
                                            }}
                                        >
                                            Vantaa
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FooterHeading variant="h6">
                                    Support
                                </FooterHeading>
                                <Stack spacing={0.5}>
                                    <FooterLink href="#">Customer Service</FooterLink>
                                    <FooterLink href="#">Submit Fault Report</FooterLink>
                                    <FooterLink href="#">Give Feedback</FooterLink>
                                    <FooterLink href="#">Contact Us</FooterLink>
                                </Stack>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                sx={{
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                }}
                                >
                                     <FooterText sx={{ order: { xs: 1, sm: 0 } }}>
                                        © 2025 CBH. All rights reserved.
                                     </FooterText>

                            </Grid>
                           
                            
                        </Grid>
                    )}
                </Container>
            </FooterSection>
        </Box>
    );
};
export default Contact;
