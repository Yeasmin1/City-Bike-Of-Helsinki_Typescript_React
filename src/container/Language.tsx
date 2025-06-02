import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { Box, Button, ButtonGroup } from '@mui/material';

interface LanguageItem {
    code: string;
    label: string;
    languageButtonId: string;
}

interface LanguageProps {
    languages: LanguageItem[];
}

const LanguageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const LanguageButton = styled(Button)(({ theme }) => ({
    minWidth: 'auto',
    padding: theme.spacing(0.5, 1),
    textTransform: 'uppercase',
    '&.active': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
}));

const Language: React.FC<LanguageProps> = ({ languages }) => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
    };

    return (
        <LanguageContainer>
            <ButtonGroup variant="outlined" size="small">
                {languages.map((lang) => (
                    <LanguageButton
                        key={lang.code}
                        id={lang.languageButtonId}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={i18n.language === lang.code ? 'active' : ''}
                    >
                        {lang.label}
                    </LanguageButton>
                ))}
            </ButtonGroup>
        </LanguageContainer>
    );
};

export default Language;

export const LANGUAGES = [
    { id:0, label: "English", code: "en",languageButtonId:"englishButton", arialanguageid:"english language"},
    { id:1, label: "Suomi", code: "fin",languageButtonId:"finnishButton", arialanguageid:"suomi language"},
];
