// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { RouterProvider } from 'react-router'
// import { createBrowserRouter } from 'react-router'
// import FirstComponent from './component/first.jsx'
// import { Provider } from 'react-redux'
// import { store } from './Store/store.js'
// import CardList from './component/CardList.jsx'
// import ChooseForm from './component/customer/ChooseForm.jsx'
  
// const router=createBrowserRouter([
//   {path:"/",element:<App/>},
//   {path:'/firstpage',element:<FirstComponent/>},
//   {path:'/cardlist',element:<CardList/>},
//   {path:'/paymant',element:<ChooseForm/>},


// ])

// createRoot(document.getElementById('root')).render(
//   <StrictMode>

// <Provider store={store}>
// <RouterProvider router={router}/>

// </Provider>
   
//     {/* <App /> */}
//   </StrictMode>,
// )
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './Store/store.js';

import LoginPage, { AdminPage, UserPage } from './App.jsx';
import FirstComponent from './component/first.jsx';
import CardList from './component/CardList.jsx';
import ChooseForm from './component/customer/ChooseForm.jsx';
import Section from './component/Section.jsx';
import Items from './component/admin/Admin.jsx';
import AddNewItem from './component/admin/AddNewItem.jsx';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/all-product', element: <Items /> },
  { path: '/products', element: <Section /> },
  { path: '/firstpage', element: <FirstComponent /> },
  { path: '/cardlist', element: <CardList /> },
  { path: '/paymant', element: <ChooseForm /> },
  {path:"/add-new-item",element:<AddNewItem/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
