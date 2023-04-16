import React from 'react'
import { LayoutProps } from './layout.props'
import { Footer, Navbar } from '@/components';

const  Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Navbar/>
      <div style={{minHeight: "90vh"}} >
        {children}
      </div>
      <Footer/>
    </>
  )
};

export default Layout