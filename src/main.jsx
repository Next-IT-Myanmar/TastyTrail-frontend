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
import { RouterProvider } from "react-router";
import router from "./routers/index";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
// Compare this snippet from index.jsx:
