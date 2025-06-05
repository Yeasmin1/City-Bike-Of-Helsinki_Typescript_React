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
    boxShadow: theme.shadows[2],
    borderBottom: 'none',
    position: 'sticky',
    top: '36px',
    zIndex: theme.zIndex.appBar,
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
        duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
        boxShadow: theme.shadows[4],
    },
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(2),
    position: 'relative',
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        '&::after': {
            width: '100%',
        }
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        transition: 'width 0.3s ease-in-out'
    }
}));

const Logo = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: '1.5rem',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['color', 'background-color', 'transform'], {
        duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
        transform: 'translateY(-1px)',
        backgroundColor: 'rgba(25, 118, 210, 0.04)',
    }
}));

const TopNav = styled(AppBar)(({ theme }) => ({
    background: theme.palette.grey[100],
    boxShadow: 'none',
    minHeight: 36,
    height: 36,
    justifyContent: 'center',
    zIndex: theme.zIndex.appBar + 1,
    position: 'sticky',
    top: 0,
}));

const TopToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: 36,
    height: 36,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
    '& .MuiContainer-root': {
        padding: 0,
    },
}));

const MainToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
    '& .MuiContainer-root': {
        padding: 0,
    },
}));

const TopRightSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const MainNav = styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: 36,
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.background.paper,
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
        navigate('/loginForm');
    };

    const handleLogout = () => {
        setLoginProfile(null);
        window.sessionStorage.removeItem('userProfile');
    };

    const StyledDrawer = styled(Drawer)(({ theme }) => ({
        '& .MuiDrawer-paper': {
            width: 240,
            background: theme.palette.background.default,
            borderRight: 'none',
            boxShadow: theme.shadows[3],
        },
    }));

    const StyledListItem = styled(ListItem)(({ theme }) => ({
        margin: theme.spacing(1, 2),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '& .MuiListItemText-primary': {
            fontWeight: 500,
        },
    }));

    const drawer = (
        <Box sx={{ pt: 2 }}>
            <Box sx={{ px: 2, pb: 2 }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    City Bike
                </Typography>
            </Box>
            <List>
                <StyledListItem 
                    component={Link} 
                    to="/"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                    <ListItemText primary={t('home')} />
                </StyledListItem>
                <StyledListItem 
                    component={Link} 
                    to="/ticketsInfo"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                    <ListItemText primary={t('ticketsInfo')} />
                </StyledListItem>
                <StyledListItem 
                    component={Link} 
                    to="/bikeStation"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                    <ListItemText primary={t('bikeStation')} />
                </StyledListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Top nav for language selector and login */}
            <TopNav position="static">
                <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
                    <TopToolbar>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: -1 }}>
                            <Language languages={[
                                { code: 'en', label: 'EN', languageButtonId: 'englishButton' },
                                { code: 'fin', label: 'FI', languageButtonId: 'finnishButton' }
                            ]} />
                        </Box>
                        <TopRightSection>
                            {loginProfile ? (
                                <Button
                                    color="primary"
                                    variant="text"
                                    onClick={handleLogout}
                                    startIcon={<PersonIcon />}
                                    size="small"
                                    id="profileNameButton"
                                    sx={{ 
                                        fontWeight: 500,
                                        borderRadius: '20px',
                                        px: 1.5,
                                        height: 28,
                                        '&:hover': {
                                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                        }
                                    }}
                                >
                                    {`${loginProfile.name}`}
                                </Button>
                            ) : (
                                <Button
                                    color="primary"
                                    variant="text"
                                    onClick={handleNavigate}
                                    startIcon={<PersonIcon />}
                                    size="small"
                                    id="loginUserButton"
                                    sx={{ 
                                        fontWeight: 500,
                                        borderRadius: '20px',
                                        px: 1.5,
                                        height: 28,
                                        '&:hover': {
                                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                        }
                                    }}
                                >
                                    {t('loginFormTitle')}
                                </Button>
                            )}
                        </TopRightSection>
                    </TopToolbar>
                </Container>
            </TopNav>

            {/* Main nav for logo and nav links */}
            <MainNav>
                <StyledAppBar position="static">
                    <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
                        <MainToolbar>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: -1, sm: -2 } }}>
                                {isMobile && (
                                    <IconButton
                                        color="primary"
                                        aria-label="open drawer"
                                        edge="start"
                                        onClick={handleDrawerToggle}
                                        sx={{
                                            mr: 2,
                                            transition: theme.transitions.create(['transform', 'background-color'], {
                                                duration: theme.transitions.duration.shorter,
                                            }),
                                            '&:hover': {
                                                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                )}
                                <Logo to="/">
                                    <Typography variant="h6">
                                        City Bike
                                    </Typography>
                                </Logo>
                            </Box>

                            {!isMobile && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: -1 }}>
                                    <NavButton component={Link} to="/">
                                        {t('home')}
                                    </NavButton>
                                    <NavButton component={Link} to="/ticketsInfo">
                                        {t('ticketsInfo')}
                                    </NavButton>
                                    <NavButton component={Link} to="/bikeStation">
                                        {t('bikeStation')}
                                    </NavButton>
                                </Box>
                            )}
                        </MainToolbar>
                    </Container>
                </StyledAppBar>
            </MainNav>

            <StyledDrawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                SlideProps={{
                    timeout: {
                        enter: theme.transitions.duration.enteringScreen,
                        exit: theme.transitions.duration.leavingScreen,
                    },
                }}
            >
                {drawer}
            </StyledDrawer>
        </Box>
    );
};

export default Navigation;