import React from "react";

function CustomerLandingPage({ customerId }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Welcome Customer {customerId}</h1>
            <p className="text-lg mt-4">This is your landing page</p>
        </div>
    );
}
export default CustomerLandingPage;