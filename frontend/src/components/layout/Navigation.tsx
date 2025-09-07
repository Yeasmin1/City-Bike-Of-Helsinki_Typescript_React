import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation, i18n } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../redux/slices/authSlice';
import { toggleMobileNav, openProfileMenu, closeProfileMenu} from '../../redux/slices/uiSlice';
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
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { googleLogout } from '@react-oauth/google';

interface NavigationProps {
    // No props needed anymore as we'll use Redux
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    borderBottom: 'none',
    position: 'sticky',
    top: '40px',
    zIndex: theme.zIndex.appBar,
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
        duration: theme.transitions.duration.standard,
    }),
    '&:hover': {
        boxShadow: theme.shadows[4],
    },
    '& .MuiTypography-root': {
        color: theme.palette.common.white,
    }
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    position: 'relative',
    height: 28,
    padding: theme.spacing(0, 1),
    fontWeight: 600,
    '&:hover': {
        color: theme.palette.common.white,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
        backgroundColor: theme.palette.common.white,
        transition: 'width 0.3s ease-in-out'
    }
}));

const Logo = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.common.white,
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
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: theme.palette.common.white,
    }
}));

const TopNav = styled(AppBar)(({ theme }) => ({
    background: theme.palette.grey[100],
    boxShadow: 'none',
    minHeight: 40,
    height: 40,
    justifyContent: 'center',
    zIndex: theme.zIndex.appBar + 1,
    position: 'sticky',
    top: 0,
    width: '100%',
}));

const TopToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    '& .MuiContainer-root': {
        padding: 0,
    },
}));

const MainToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: '56px',
    '& .MuiContainer-root': {
        padding: 0,
    },
    '& .MuiButton-root': {
        lineHeight: '28px',
        display: 'flex',
        alignItems: 'center',
    }
}));

const TopRightSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    '& .MuiButton-root': {
        fontWeight: 600,
        borderRadius: '20px',
        padding: theme.spacing(0, 1.5),
        height: 28,
        '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
        }
    }
}));

const NavContainer = styled(Container)(({ theme }) => ({
   maxWidth: theme.breakpoints.values.lg + 'px',
   width: '100%',
   margin: '0 auto',
   padding: theme.spacing(0, 3),
   [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
   },
}));

const MainNav = styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: 40,
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.background.paper,
    width: '100%',
}));

const Navigation: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t, i18n } = useTranslation();
    const loginProfile = useAppSelector(state => state.auth.loginProfile);
    const mobileOpen = useAppSelector(state => state.ui.isMobileNavOpen);
    const isMobileNavOpen = useAppSelector(state => state.ui.isMobileNavOpen)
    const isProfileMenuOpen = useAppSelector(state => state.ui.isProfileMenuOpen)
    const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => {
        dispatch(toggleMobileNav());
    };
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setanchorEl(event.currentTarget);
        dispatch(openProfileMenu());
    };
    const handleMenuClose = () => {
       setanchorEl(null);
       dispatch(closeProfileMenu());
    };
    const handleLogout = () => {
        googleLogout();
        dispatch(logout());
        handleMenuClose();
        navigate('/');
    };
    const handleNavigate = () => {
        navigate('/loginForm');
    };

    const handleClickLang = (e: React.MouseEvent<HTMLButtonElement>) => {
        const lang_code = e.currentTarget.value;
        i18n.changeLanguage(lang_code);
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
                <Box sx={{ borderTop: 1, borderColor: 'divider', my: 1 }} />
                {loginProfile ? (
                    <StyledListItem 
                        onClick={handleLogout}
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                        <ListItemText 
                            primary={`${t('logout')} (${loginProfile.name})`}
                            sx={{ color: 'primary.main' }}
                        />
                    </StyledListItem>
                ) : (
                    <StyledListItem 
                        onClick={handleNavigate}
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                        <ListItemText 
                            primary={t('loginFormTitle')}
                            sx={{ color: 'primary.main' }}
                        />
                    </StyledListItem>
                )}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Top nav for language selector and login */}
            <TopNav position="static">
                <NavContainer>
                    <TopToolbar>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: -0.5, sm: -1 } }}>
                            <Language languages={[
                                { code: 'en', label: 'In English', languageButtonId: 'englishButton' },
                                { code: 'fin', label: 'Suomeksi', languageButtonId: 'finnishButton' }
                            ]} onLanguageChange={handleClickLang} />
                        </Box>
                        <TopRightSection>
                            {loginProfile ? (
                                <>
                                    <Button
                                        color="primary"
                                        variant="text"
                                        onClick={handleMenuOpen}
                                        startIcon={<PersonIcon />}
                                        size="small"
                                        id="profileNameButton"
                                    >
                                        {loginProfile.name}
                                    </Button>
                                    <Menu
                                        id="profile-menu"
                                        anchorEl={anchorEl}
                                        open={isProfileMenuOpen}
                                        onClose={handleMenuClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuItem onClick={handleLogout} id="logoutButton">
                                            {t('logout')}
                                        </MenuItem>
                                    </Menu>
                                </>
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
                </NavContainer>
            </TopNav>

            {/* Main nav for logo and nav links */}
            <MainNav>
                <StyledAppBar position="static">
                    <NavContainer>
                        <MainToolbar>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: -0.5, sm: -1 } }}>
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
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    gap: 0.5
                                }}>
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
                    </NavContainer>
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