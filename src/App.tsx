import './App.css';
import Navigation from './container/Navigation';
import Contact from './container/Contact';
import SmoothScroll from "smooth-scroll";
import Banner from './components/Banner';
import Tickets from './components/Tickets';
import BuyPass from './components/BuyPass';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import BikeStation from './components/BikeStation';
import TicketsPrice from './components/TicketsPrice';
import { useEffect } from 'react';
import { useState } from 'react';
import * as Jsondata from "./data/data.json";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

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
  console.log (PageDataInfo)
  

  return (
    <BrowserRouter> 
      <Navigation />
      <Routes>
        <Route path="/home" element={<div><Banner data={PageDataInfo.Banner} /><BuyPass data={PageDataInfo.BuyPass} /></div>} />
        <Route path="/bikeStation" element={<div><BikeStation /></div>} />  
        <Route path="/ticketsInfo" element={<div><Tickets data={PageDataInfo.Tickets} /><TicketsPrice data={PageDataInfo.TicketsPrice}/></div>} /> 
      </Routes>
      <Contact/>
    </BrowserRouter>
  );
}

export default App;
