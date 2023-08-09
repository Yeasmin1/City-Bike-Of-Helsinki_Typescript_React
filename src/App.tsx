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
  TicketsPrice: TicketsPriceInterface[]
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

const App= () => {
 
  

  const [PageDataInfo, setPageDataInfo] = useState<jsonDataInterfaceType>({Banner:[],BuyPass:[],Tickets:[],TicketsPrice:[]});
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
          <Route path="/" element={<div><Banner data={PageDataInfo.Banner} /><BuyPass data={PageDataInfo.BuyPass} /></div>} />
          <Route path="/bikeStation" element={<div><BikeStation /></div>} />   
          <Route path="/ticketsInfo" element={<div><Tickets data={PageDataInfo.Tickets} /><TicketsPrice data={PageDataInfo.TicketsPrice}/></div>} /> 
        </Routes>
      </Wrapper>
      <Contact/>
    </BrowserRouter>
  );
}

export default App;
