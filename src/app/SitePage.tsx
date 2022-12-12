import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from './footer/Footer';
import NavBar from './nav/NavBar';

interface SitePageProps {
}

class SitePage extends React.Component<SitePageProps, {}> {
  render() {
    return (
      <div className='app-container'>
        <NavBar />
        <div className='page-container'>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  }
}

export default SitePage;
