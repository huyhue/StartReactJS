import productApi from 'api/productApi';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import NotFound from './components/NotFound';
import { Button } from 'reactstrap';
import SignIn from 'features/SignIn';
import { unwrapResult } from '@reduxjs/toolkit';
import { getMe } from 'app/userSlice';
import { useDispatch } from 'react-redux';

// Lazy load - Code splitting
const Photo = React.lazy(() => import('./features/Photo'));

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,

        };
        const response = await productApi.getAll(params);
        console.log(response);
        setProductList(response.data);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    }

    fetchProductList();
  }, []);

  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        // user logs out, handle something here
        console.log('User is not logged in');
        return;
      }

      // Get me when signed in
      // const action = getMe();
      try {
        const actionResult = await dispatch(getMe());
        const currentUser = unwrapResult(actionResult);
        console.log('Logged in user: ', actionResult);
      } catch (error) {
        console.log('Failed to login ', error.message);
        // show toast error
      }

      // console.log('Logged in user: ', user.displayName);

      // const token = await user.getIdToken();
      // console.log('Logged in user token: ', token);
    });

    return () => unregisterAuthObserver();
  }, []);

  const handleButtonClick = async () => {
    try {
      const params = {
        _page: 1,
        _limit: 10,
      };
      const response = await productApi.getAll(params);
      console.log(response);
    } catch (error) {
      console.log('Failed to fetch product list: ', error);
    }
  }


  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Button onClick={handleButtonClick}>Fetch Product List</Button>

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;