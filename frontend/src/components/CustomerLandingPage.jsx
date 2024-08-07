import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Cart from './customer/Cart';
import Home from './customer/Home';
import Profile from './customer/Profile';
function CustomerLandingPage({ customerId }) {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col">
          <div className="mt-11 mx-11 h-10 bg-gray-100">
            <Box display="flex" alignItems="center">
              <Breadcrumb spacing='25px' separator={<ChevronRightIcon color='gray.500' />}>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to='/About'>About</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink as={Link} to='/Contact'>Contact</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Box marginLeft="auto">
                <div className='flex mx-3'>
                <Link to='/Profile'>
                  <button>Profile</button>
                </Link>
                <Link to='/Cart' className='ml-4'>
                  <button>Cart</button>
                </Link>
                </div>
              </Box>
            </Box>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile customerId={customerId}/>} />
            <Route path="/Cart" element={<Cart customerId={customerId}/>} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default CustomerLandingPage;