import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Language from './Language';
import { styled } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Container,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

interface NavigationProps {
    loginProfile: {
        picture?: string;
        name: string;
        email: string;
    } | null;
    setLoginProfile: (profile: any) => void;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(2),
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

const Logo = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
}));

const Navigation: React.FC<NavigationProps> = ({ loginProfile, setLoginProfile }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigate = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        setLoginProfile(null);
        localStorage.removeItem('userProfile');
    };

    const drawer = (
        <List>
            <ListItem button component={Link} to="/">
                <ListItemText primary={t('home')} />
            </ListItem>
            <ListItem button component={Link} to="/ticketsInfo">
                <ListItemText primary={t('tickets')} />
            </ListItem>
            <ListItem button component={Link} to="/stations">
                <ListItemText primary={t('stations')} />
            </ListItem>
        </List>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <Container>
                    <Toolbar>
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}

                        <Logo to="/">
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                City Bike
                            </Typography>
                        </Logo>

                        <Box sx={{ flexGrow: 1 }} />

                        {!isMobile && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <NavButton component={Link} to="/">
                                    {t('home')}
                                </NavButton>
                                <NavButton component={Link} to="/ticketsInfo">
                                    {t('tickets')}
                                </NavButton>
                                <NavButton component={Link} to="/stations">
                                    {t('stations')}
                                </NavButton>
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                            <Language languages={[
                                { code: 'en', label: 'EN', languageButtonId: 'englishButton' },
                                { code: 'fin', label: 'FI', languageButtonId: 'finnishButton' }
                            ]} />
                            
                            {loginProfile ? (
                                <>
                                    <Button
                                        color="inherit"
                                        onClick={handleLogout}
                                        startIcon={<PersonIcon />}
                                        sx={{ ml: 2 }}
                                    >
                                        {loginProfile.name}
                                    </Button>
                                </>
                            ) : (
                                <IconButton
                                    color="inherit"
                                    onClick={handleNavigate}
                                    sx={{ ml: 2 }}
                                >
                                    <PersonIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </StyledAppBar>

            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Navigation;