import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {  useState, useEffect,  ReactElement } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Banner from './components/Banner';
import BikeStation from './components/BikeStation';
import BuyPass from './components/BuyPass';
import Contact from './container/Contact';
import Navigation from './container/Navigation';
import * as Jsondata from "./data/data.json";
import Tickets from './components/Tickets';
import TicketsPrice from './components/TicketsPrice';
import LoginForm from './components/LoginForm';
import './App.css';

interface ProfileType{
  picture?:string;
  name: string;
  email?: string;
 }
 
interface jsonDataInterfaceType{
  LoginFormData:LoginFormInterface,
  BannerData: BannerInterface,
  BuyPassData:BuyPassInterface,
  TicketsInformationData:TicketsInterface,
  TicketsPrice: TicketsPriceInterface[],
  Contact:ContactInterface[]
}

interface LoginFormInterface  {
  title: string ,
  label1:string,
  label2:string,
  buttonText1:string,
  paragraph1:string,
  paragraph2:string,
  buttonText2:string,
  emailPlaceholder:string,
  passwordPlaceholder:string
}

interface BuyPassInterface  {
  title: string,
  paragraph1:string,
  paragraph2:string,
  paragraph3:string,
  text:string,
  button:string
}

interface TicketsPriceInterface  {
  title: string,
  text: string,
  price:string,
  paragraph:string 
}

interface BannerInterface  {
  title: string,
  paragraph:string 
}

interface TicketsInterface  {
  title: string,
  paragraph1:string,
  paragraph2:string
}

interface ContactInterface  {
  header1:string,
  header2:string,
  header3:string,
  header4:string,
  header5:string,
  header6:string,
  header7:string,
  header8:string,
  header9:string,
  header10:string
}

const App= () => {
  const [PageDataInfo, setPageDataInfo] = useState<jsonDataInterfaceType>({ LoginFormData: {title:"", label1:"", label2:"", 
       buttonText1:"", paragraph1:"",paragraph2:"",buttonText2:"" ,emailPlaceholder:"" ,passwordPlaceholder:""},
       BannerData: {title:"",paragraph:""}, BuyPassData:{title:"",paragraph1:"",paragraph2:"",paragraph3:"",
       text:"",button:""}, TicketsInformationData:{title:"",paragraph1:"",paragraph2:""},TicketsPrice:[],Contact:[]});
  const[loginProfile, setLoginProfile] = useState<ProfileType | null>(null); 

  // Load data for web app and login session manage at React component mount 
  useEffect(() => {
    setPageDataInfo(Jsondata);
    const isLoggedIn = window.sessionStorage.getItem('userProfile')
    if (isLoggedIn){
      setLoginProfile(JSON.parse(isLoggedIn)) //JSON.parse expect always non null values.
    }
  }, []);

  // Handle error cases during Google map rendering
  const render = (status:Status):ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>; 
  };

  return (
    <BrowserRouter> 
      <Navigation loginProfile={loginProfile} setLoginProfile={setLoginProfile}/>
      <Wrapper apiKey={`${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`} render={render}>
        <Routes>
          <Route path="/" element={<div><Banner data={PageDataInfo.BannerData} /><BuyPass data={PageDataInfo.BuyPassData} /></div>} /> 
          <Route path="/loginForm" element={<div><LoginForm data={PageDataInfo.LoginFormData} setLoginProfile={setLoginProfile}/></div>}/> 
          <Route path="/bikeStation" element={<div><BikeStation/></div>} />   
          <Route path="/ticketsInfo" element={<div><Tickets data={PageDataInfo.TicketsInformationData} /><TicketsPrice data={PageDataInfo}/></div>} /> 
        </Routes>
      </Wrapper>
      <Contact data={PageDataInfo}/>
    </BrowserRouter>
  );
}

export default App;
