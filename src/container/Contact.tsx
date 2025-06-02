import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { Container, Grid, Box, Typography, Link, IconButton } from '@mui/material';
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

const Contact = (props:any) => {
  const {t} = useTranslation();
  return(
    <div>
        <div id='contact' role="contentinfo" aria-label="Service related information links">
          <div className='container d-flex'>
            <div className='col-md-12'>
              {props.data.Contact
                  ? props.data.Contact.map((d:any, i:any) => (
                      <div key={`${d.name}-${i}`} >               
                                       
                  <div className='col-md-3'>
                    <div className='row'>
                      <div className='contact-item'>
                      
                        <h5>{t(d.header1)}</h5>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='contact-item'>
                      <h5> {t(d.header2)}</h5>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='contact-item'>
                      <h5>{t(d.header3)}</h5>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-3'>
                    <div className='row'>
                      <div className='contact-item'>
                        <h5> {t(d.header4)}</h5>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='contact-item'>
                      <h5>{t(d.header5)}</h5>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='contact-item'>
                      <h5>{t(d.header6)}</h5>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-3'>
                    <div className='row'>
                      <div className='contact-item'>
                        <h5> {t(d.header7)}</h5>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='contact-item'>
                      <h5> {t(d.header8)}</h5>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='contact-item'>
                      <h5>{t(d.header9)}</h5>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-3'>
                    <div className='row'>
                      <div className='contact-item '>
                        <h5>{t(d.header10)}</h5>
                      </div>
                    </div>
                  </div>
                  </div>
                ))
            : 'loading'}
              </div>
          
            </div>
          </div>
        
        <div id='footer' role="contentinfo" aria-label="App related information links">
          <div className='container'>
            <div className='d-flex flex-row '>
            {props.data.ContactFooter
                  ? props.data.ContactFooter.map((d:any, i:any) => (
                    <div key={`${d.name}-${i}`} >
                          
                          <div className='col-md-2'>
                
                <p>&copy; {t(d.p1)}</p>   
                </div>
                <div className='col-md-2'>
                <p>{t(d.p2)}</p>   
                </div>
                <div className='col-md-2'>
                <p>{t(d.p3)}</p>   
                </div>
                <div className='col-md-2'>
                <p>{t(d.p4)}</p>   
                </div>
                <div className='col-md-2'>
                <p>{t(d.p5)}</p>   
                </div>
                <div className='col-md-2'>
                <p>{t(d.p6)}</p>   
                </div>
               </div>
                  ))
                : 'loading'}
                
              </div>
            </div>
        </div>
            
  </div>

 );
}
export default Contact;
