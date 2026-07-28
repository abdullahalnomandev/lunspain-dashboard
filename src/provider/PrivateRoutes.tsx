import { Navigate, useLocation } from "react-router-dom";
import { useProfileQuery } from "../redux/apiSlices/authSlice";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
    error,
  } = useProfileQuery(undefined, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  console.log("TOKEN:", token);
  console.log("PROFILE:", profile);
  console.log("ERROR:", error);

  // No token -> login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Loading state
  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[#36C9B8] rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Profile request failed
  if (isError) {
    localStorage.removeItem("token");

    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // No profile data
  if (!profile?.data) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Allow admins
  if (
    profile.data.role === "admin" ||
    profile.data.role === "super_admin"
  ) {
    return <>{children}</>;
  }

  // Other roles not allowed
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;