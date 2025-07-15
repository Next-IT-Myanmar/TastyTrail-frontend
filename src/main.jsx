// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import './index.css'
// import App from './App.jsx'
// import router from './routers/index.jsx'

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );


import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom/client';
import { store } from './redux/store';
import { RouterProvider } from "react-router";
import { Provider } from 'react-redux';
import router from "./routers/index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
