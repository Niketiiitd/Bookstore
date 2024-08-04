import React from "react";
import Navbar from './Navbar';
function CustomerLandingPage({ customerId }) {
    return (

        <>
        
        
        <div className="flex flex-col">
            <div className="mt-11 mx-11 h-10 bg-gray-100">
                <Navbar />

            </div>
            
            <p className="text-lg mt-4">This is your landing page</p>
        </div>
        </>
    );
}
export default CustomerLandingPage;