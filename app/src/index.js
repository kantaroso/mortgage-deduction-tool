import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// component
import { Root } from './root/index.js';
import { RootChild } from './root/child.js';
import { ErrorPage } from './error/index.js';
import { NewEasy } from './new/easy/index.js';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/new/easy",
        element: <NewEasy />,
      },
      {
        path: "/",
        element: <RootChild />,
      },
      /*
      {
        path: "/purchased/easy",
        element: <PurchasedEasy />,
      }
      */
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
