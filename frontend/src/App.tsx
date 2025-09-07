import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, ReactElement, FC } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { setLoginProfile } from './redux/slices/authSlice';
import { setBannerContent } from './redux/slices/contentSlice';
import type { AppDataInterface } from './types';
import { defaultAppState } from './data/initialStates/appState';
import * as Jsondata from './data/data.json';
import Banner from './components/Banner';
import BikeStation from './components/BikeStation';
import BuyPass from './components/BuyPass';
import Contact from './components/layout/Contact';
import Navigation from './components/layout/Navigation';
import Tickets from './components/Tickets';
import TicketsPrice from './components/TicketsPrice';
import LoginForm from './components/LoginForm';
import './App.css';

const App: FC = () => {
  const [pageDataInfo, setPageDataInfo] = useState<AppDataInterface>(defaultAppState);
  const dispatch = useAppDispatch();
  const loginProfile = useAppSelector(state => state.auth.loginProfile);

  // Load data for web app and login session manage at React component mount 
  useEffect(() => {
    setPageDataInfo(Jsondata as AppDataInterface);
    dispatch(setBannerContent((Jsondata as AppDataInterface).BannerData));
    const isLoggedIn = window.sessionStorage.getItem('userProfile');
    if (isLoggedIn) {
      dispatch(setLoginProfile(JSON.parse(isLoggedIn)));
    }
  }, [dispatch]);

  // Handle error cases during Google map rendering
  const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
  };

  return (
    <>
      <Navigation />
      <Wrapper apiKey={import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY} render={render}>
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <Banner data={pageDataInfo.BannerData} />
                <BuyPass data={pageDataInfo.BuyPassData} />
              </div>
            } 
          />
          <Route path="/loginForm" element={<div><LoginForm data={pageDataInfo.LoginFormData} /></div>}/> 
          <Route path="/bikeStation" element={<div><BikeStation data={{title: "bikeStation", searchPlaceholder: "nearbyBikeStationName"}}/></div>} />   
          <Route path="/ticketsInfo" element={
            <div>
              <Tickets data={pageDataInfo.TicketsInformationData} />
              <TicketsPrice data={{
                TicketsPrice: pageDataInfo.TicketsPrice,
                TicketsPriceHeader: pageDataInfo.TicketsPriceHeader
              }}/>
            </div>
          } /> 
        </Routes>
      </Wrapper>
      <Contact data={pageDataInfo} />
    </>
  );
};

export default App;
