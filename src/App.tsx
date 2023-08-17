import './App.css';

import Navigation from './container/Navigation';
import Contact from './container/Contact';
import Banner from './components/Banner';
import Tickets from './components/Tickets';
import BuyPass from './components/BuyPass';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import BikeStation from './components/BikeStation';
import TicketsPrice from './components/TicketsPrice';
import { useState } from 'react';
import * as Jsondata from "./data/data.json";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect,  ReactElement } from "react";

interface jsonDataInterfaceType{
  Banner: BannerInterface[],
  BuyPass:BuyPassInterface[],
  Tickets:TicketsInterface[],
  TicketsPrice: TicketsPriceInterface[],
  Contact:ContactInterface[]
}
interface BuyPassInterface  {
  title: string,
  paragraph1:string,
  paragraph2:string,
  paragraph3:string,
  text:string
};


interface TicketsPriceInterface  {
  title: string,
  text: string,
  price:string,
  paragraph:string 
};
interface BannerInterface  {
  title: string,
  paragraph:string 
};
interface TicketsInterface  {
  title: string,
  paragraph1:string,
  paragraph2:string
};
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
};

const App= () => {

  const [PageDataInfo, setPageDataInfo] = useState<jsonDataInterfaceType>({Banner:[],BuyPass:[],Tickets:[],TicketsPrice:[],Contact:[]});
  useEffect(() => {
    setPageDataInfo(Jsondata);
  }, []);


  const render = (status:Status):ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
    
  };
  
  
  return (
    <BrowserRouter> 
      <Navigation />
      <Wrapper apiKey={`${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`} render={render}>
        <Routes>
          <Route path="/" element={<div><Banner data={PageDataInfo.Banner} /><BuyPass data={PageDataInfo} /></div>} />
          <Route path="/bikeStation" element={<div><BikeStation/></div>} />   
          <Route path="/ticketsInfo" element={<div><Tickets data={PageDataInfo.Tickets} /><TicketsPrice data={PageDataInfo}/></div>} /> 
        </Routes>
      </Wrapper>
      <Contact data={PageDataInfo}/>
    </BrowserRouter>
  );
}

export default App;
