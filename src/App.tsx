import { lazy, useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';

import {
  MainLayout,
  AuthLayout,
  IntroductionLayout
} from './layouts';

import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import {
  Login,
  Register,
  ForgotPassword,
  UpdatePassword,
  Welcome,
} from './pages';
import { IAM, StartingStatement, Complete } from './pages';

import { generateMilestoneRoutes } from './routes/MilestoneRoute';
import VerifyCertificatePage from './pages/Auth/VerifyCertificatePage';
import ProtectedRoute from './routes/ProtectedRoute';
import { AdminRoute } from './routes/AdminRoute';

// Pages most visitors never open are split out of the first load. About Us alone
// brings the Google Maps client with it.
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Recap = lazy(() => import('./pages/Recap'));
const ProfilePage = lazy(() => import('./pages/Auth/Profile'));
const Admin = lazy(() => import('./pages/Admin'));

const MAX_VISIBLE_TOASTS = 3;

function ToastLimit() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((item) => item.visible)
      .slice(MAX_VISIBLE_TOASTS)
      .forEach((item) => toast.remove(item.id));
  }, [toasts]);

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "user-profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: "recap", element: <ProtectedRoute><Recap /></ProtectedRoute> },
      { path: "admin", element: <AdminRoute><Admin /></AdminRoute> },
      { path: "verify/:certificateId", element: <VerifyCertificatePage /> },
      { path: "verify-certificate/:certificateId", element: <VerifyCertificatePage /> }
    ]
  },
  { path: "/welcome", element: <ProtectedRoute><Welcome /></ProtectedRoute> },
  {
    path: "milestones",
    element: <ProtectedRoute><IntroductionLayout /></ProtectedRoute>,
    children: [
      { path: "milestone0/1", element: <IAM /> },
      { path: "milestone0/2", element: <StartingStatement /> },
      // The single final state of the programme; also the permanent home of the
      // certificate download, so finishing never means walking back into a milestone.
      { path: "complete", element: <Complete /> },
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

  ...generateMilestoneRoutes(),

  { path: "*", element: <NotFound /> },
]);

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        {/* Honours the OS "reduce motion" setting for every framer-motion animation. */}
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} />
        </MotionConfig>
      </ProgressProvider>
      <ToastLimit />
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
