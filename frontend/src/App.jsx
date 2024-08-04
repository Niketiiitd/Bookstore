import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';

import { useEffect, useState } from 'react';
import CustomerLandingPage from './components/CustomerLandingPage';
import Homepage from './components/Homepage';
import './index.css';
function App() {
  const [customerData,setCustomerData] = useState(null);
  const [renderToLandingPage, setRenderToLandingPage] = useState(false);
  const handleUserAuthenticated = (userType, id) => {
    setCustomerData({ userType, id });
    setRenderToLandingPage(true);
  };
  useEffect(()=>{
    axios.get('http://localhost:7777')
    .then((response) => {
      console.log("Connection successful");
    })
    .catch((error) =>{
      console.log(error)
    })

    if (customerData) {
      console.log('User authenticated:', customerData);

    }


  },[customerData]);
  
  return (
    <ChakraProvider>
    <div className='italic'>
      {!renderToLandingPage ? (
        <Homepage onUserAuthenticated={handleUserAuthenticated} />
      ) : (
        <>
          {customerData.userType === 'Customer' && <CustomerLandingPage customerId={customerData.id} />}
          {customerData.userType === 'Vendor' && <VendorLandingPage vendorId={customerData.id} />}
          {customerData.userType === 'DeliveryAgent' && <DeliveryAgentLandingPage daId={customerData.id} />}
          {customerData.userType === 'Admin' && <AdminLandingPage adminId={customerData.id} />}
        </>
      )}
    </div>
    </ChakraProvider>
)};

export default App
