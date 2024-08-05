import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from './customer/Home';
import Profile from './customer/Profile';

function CustomerLandingPage({ customerId }) {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col">
          <div className="mt-11 mx-11 h-10 bg-gray-100">
            <Box display="flex" alignItems="center">
              <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
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
                <Link to='/Profile'>
                  <button>Profile</button>
                </Link>
              </Box>
            </Box>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default CustomerLandingPage;