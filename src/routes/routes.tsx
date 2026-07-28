import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dashboard';
import Users from '../pages/dashboard/users';
import Tags from '../pages/dashboard/tags';
import Coupons from '../pages/dashboard/coupons';
import ClubsTable from '../pages/dashboard/clubs';
import AboutUs from '../pages/dashboard/about-us';
import PrivacyPolicy from '../pages/dashboard/privacy-policy';
import TermsAndCondition from '../pages/dashboard/terms-and-condition';
import Disclaimer from '../pages/dashboard/disclaimer';
import Profile from '../pages/dashboard/profile';
import NotificaitonPage from '../pages/dashboard/notification';
import TransactionsTable from '../pages/dashboard/transections';
import PrivacyPolicyPage from '../pages/PrivacyPolicy';
import SupportPage from '../pages/SupportPage';
import DeleteAccount from '../pages/authentication/DeleteAccount';
import PrivateRoute from '../provider/PrivateRoutes';


const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute> <App /> </PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: "users", element: <Users /> },
            { path: "tags", element: <Tags /> },
            { path: "coupons", element: <Coupons /> },
            { path: "clubs-deck", element: <ClubsTable /> },
            { path: "about-us", element: <AboutUs /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "terms-of-service", element: <TermsAndCondition /> },
            { path: "disclaimer", element: <Disclaimer /> },
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <NotificaitonPage /> },
            { path: "transactions", element: <TransactionsTable /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
    { path: '/privacy', element: <PrivacyPolicyPage /> },
    { path: '/support', element: <SupportPage /> },
    { path: '/delete-account', element: <DeleteAccount /> },


]);

export default router;
