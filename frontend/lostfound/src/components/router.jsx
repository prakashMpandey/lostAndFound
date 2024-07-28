// import React from 'react';
// import { createBrowserRouter } from 'react-router-dom';

// import ProtectedRoute from './protected.jsx';
// import { useAuth } from '../store/auth.jsx'

// import Signup from './signup.jsx'
// import Login from './login.jsx'
// import Navbar from './navbar.jsx'
// import Card from './card.jsx'
// import Home from './home.jsx'
// import Create from './create.jsx'
// import Message from './message.jsx'
// import Update from './update.jsx'
// import Search from './search.jsx'
// import Reply from './reply.jsx'
// import MyMessage from './myMessage.jsx'
// import Logout from './logout.jsx'
// import Footer from './footer.jsx'
// import Mypost from './mypost.jsx'


// // Function to check if the user is authenticated


// const {isAuthenticated}=useAuth()
// console.log("in router",isAuthenticated)
// // Create the router configuration
// const router = createBrowserRouter(
//   [
//     {
//       path: '/',
//       element: <Login />,
//       index: true
//     },
//     {
//       path: 'signin',
//       element: <Login />,
//       index: true
//     },
//     {
//       path: 'signup',
//       element: <Signup />,
//       index: true
//     },
//     {
//       element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
//       children: [
//         {
//           path: '/messages',
//           element: <Message />
//         },
//         {
//           path: '/post',
//           element: <Create />
//         },
//         {
//           path: 'logout',
//           element: <Logout />
//         },
//         {
//           path: '/mypost',
//           element: <Mypost />
//         },
//         {
//           path: '/home',
//           element: <Home />
//         },
//       ]
//     },
//     {
//       path: '*',
//       element: <p>404 Error - Nothing here...</p>
//     }
//   ]
// );

// export default router;