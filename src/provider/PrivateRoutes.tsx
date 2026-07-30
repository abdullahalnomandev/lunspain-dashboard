import { Navigate, useLocation } from 'react-router-dom';
import { useProfileQuery } from '../redux/apiSlices/authSlice';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    const { data: profile, isLoading, isError } = useProfileQuery(undefined);

    console.log(profile);
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-[#36C9B8] rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    if (isError || !profile?.data) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (profile?.data?.role === 'user' || profile?.data?.role === 'admin' || profile?.data?.role === 'super_admin') {
        return children;
    }
};

export default PrivateRoute;
