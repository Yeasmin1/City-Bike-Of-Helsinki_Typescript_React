import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface LanguageItem {
    code: string;
    label: string;
    languageButtonId: string;
}

interface LanguageProps {
    languages: LanguageItem[];
    onLanguageChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LanguageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const LanguageText = styled('span')(({ theme }) => ({
    cursor: 'pointer',
    fontWeight: 600,
    color: theme.palette.primary.main,
    position: 'relative',
    padding: theme.spacing(0.5, 1),
    transition: 'color 0.2s',
    '&:hover': {
        opacity: 0.8,
    },
    '&.active': {
        '&::after': {
            width: '100%',
        }
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: '2px',
        width: '0%',
        backgroundColor: theme.palette.primary.main,
        transition: 'width 0.3s',
    },
}));

const Language: React.FC<LanguageProps> = ({ languages, onLanguageChange }) => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        onLanguageChange(langCode);
    };

    return (
        <LanguageContainer>
            {languages.map((lang) => (
                <LanguageText
                    key={lang.code}
                    id={lang.languageButtonId}
                    className={i18n.language === lang.code ? 'active' : ''}
                    onClick={() => handleLanguageChange(lang.code)}
                >
                    {lang.label}
                </LanguageText>
            ))}
        </LanguageContainer>
    );
};

export default Language;

export const LANGUAGES = [
    { id:0, label: "English", code: "en",languageButtonId:"englishButton", arialanguageid:"english language"},
    { id:1, label: "Suomi", code: "fin",languageButtonId:"finnishButton", arialanguageid:"suomi language"},
];
