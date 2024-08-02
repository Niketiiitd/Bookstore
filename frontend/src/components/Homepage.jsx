import axios from "axios";
import React, { useState } from "react";

function Homepage() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer');
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const [isSignup, setIsSignup] = useState(false);
    const handleSigninToLogin = () => { setIsSignup(prevState => !prevState); };
    const handleUserTypeChange = (type) => setUserType(type);
    const handleSubmit = () =>{
        if (isSignup){
            // handle login
            handleLogin();
        }else{
            // handle signup
            handleSignin();
        }

    }
    const handleLogin = () =>{
        axios.post('/loginCheck',{phone,password,userType})
        .then((response) => {
            console.log('logged in successfully');
        })
        .catch((error) => {
            console.log('log in error');
        });
    }
    const handleForgetPassword={};
    return (
      <>
          <div className="flex min-h-full flex-1 flex-col mt-[10%] mx-[20%] justify-center px-6 py-12 lg:px-8 box-border border-2">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                      alt="Your Company"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      className="mx-auto h-10 w-auto"
                  />
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      {isSignup ? 'Log in to your account' : 'Sign in to new account'} 
                  </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone No
                    </label>
                    <div className="mt-2">
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            onChange={handlePhoneChange} // Ensure you have a corresponding handlePhoneChange function
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                      <div>
                          <div className="flex items-center justify-between">
                              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                  Password
                              </label>
                              {isSignup && (
                                  <div className="text-sm">
                                      <button onClick={handleForgetPassword} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                          Forgot password?
                                      </button>
                                  </div>
                              )}
                          </div>
                          <div className="mt-2">
                              <input
                                  id="password"
                                  name="password"
                                  type="password"
                                  required
                                  autoComplete="current-password"
                                  onChange={handlePasswordChange}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                          </div>
                      </div>

                      <div>
                          <button
                              type="submit"
                              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={handleSubmit}
                          >
                              {isSignup ? 'Log In' : 'Sign In'}
                          </button>
                      </div>
                  </form>

                  <p className="mt-10 text-center text-sm text-gray-500">
                      {isSignup ? 'New Here? ' : 'Already a customer? '}
                      <button onClick={handleSigninToLogin} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                          {isSignup ? 'Sign in' : 'Log in'}
                      </button>
                  </p>

                  <div className="mt-6 flex justify-center space-x-4">
                      <button
                          className={`w-12 h-12 rounded-full ${userType === 'admin' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                          onClick={() => handleUserTypeChange('admin')}
                      >
                          Admin
                      </button>
                      <button
                          className={`w-12 h-12 rounded-full ${userType === 'customer' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                          onClick={() => handleUserTypeChange('customer')}
                      >
                          Customer
                      </button>
                      <button
                          className={`w-12 h-12 rounded-full ${userType === 'deliveryPerson' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                          onClick={() => handleUserTypeChange('deliveryPerson')}
                      >
                          Delivery
                      </button>
                      <button
                          className={`w-12 h-12 rounded-full ${userType === 'vendor' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                          onClick={() => handleUserTypeChange('vendor')}
                      >
                          Vendor
                      </button>
                  </div>
              </div>
          </div> 
      </>
  );
}

export default Homepage;