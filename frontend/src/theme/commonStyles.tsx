import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Paper } from '@mui/material';

// Section components
export const PageSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
}));

export const LightSection = styled(PageSection)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export const DarkSection = styled(PageSection)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

// Container components
export const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

// Typography components
export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 700,
  textAlign: 'center',
  color: theme.palette.primary.main,
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Card components
export const StyledCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

// Grid item container
export const GridItemContent = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

// Image container
export const ResponsiveImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
}));
