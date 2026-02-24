import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';

import {
  MainLayout,
  AuthLayout,
  IntroductionLayout
} from './layouts';

import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';
import {
  Login,
  Register,
  ForgotPassword,
  UpdatePassword,
  Welcome,
  ProfilePage
} from './pages';
import { IAM, StartingStatement } from './pages';

import { generateMilestoneRoutes } from './routes/MilestoneRoute';
import VerifyCertificatePage from './pages/Auth/VerifyCertificatePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "user-profile", element: <ProfilePage /> },
      { path: "verify-certificate", element: <VerifyCertificatePage /> }
    ]
  },
  { path: "/welcome", element: <Welcome /> },
  {
    path: "milestones",
    element: <IntroductionLayout />,
    children: [
      { path: "milestone0/1", element: <IAM /> },
      { path: "milestone0/2", element: <StartingStatement /> },
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "update-password", element: <UpdatePassword /> },
    ],
  },

  // {
  //   path: "/dashboard",
  //   element: <MainLayout />,
  //   children: [{ index: true, element: <Dashboard /> }],
  // },
  ...generateMilestoneRoutes(),

  { path: "*", element: <NotFound /> },
]);

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <RouterProvider router={router} />
      </ProgressProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "", color: "#5c5c5c", padding: "16px 20px", fontSize: "14px", fontWeight: "700", margin: "20px" },
          duration: 4000,
        }}
      />
    </AuthProvider>
  );
}
