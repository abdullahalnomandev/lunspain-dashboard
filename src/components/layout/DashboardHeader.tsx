import { FiBell } from 'react-icons/fi';
import { Input, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import getNavbatItem from '../../data/getNavbarItems';
import { Link, useLocation } from 'react-router-dom';
import { useProfileQuery, PROFILE_QUERY_ARG } from '../../redux/apiSlices/authSlice';
import { imageUrl } from '../../redux/api/baseApi';

export default function DashboardHeader() {

    const {
        data: profileResponse,
        isLoading,
        isFetching,
        isError,
    } = useProfileQuery(PROFILE_QUERY_ARG);

    const profile = profileResponse?.data;

    const firstName = profile?.profile?.firstName || '';
    const lastName = profile?.profile?.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();

    const profileImage =
        profile?.profile?.image && profile?.profile?.image.startsWith('https')
            ? profile.profile.image
            : profile?.profile?.image
                ? imageUrl + profile.profile.image
                : 'https://i.ibb.co/z5YHLV9/profile.png';

    const role = profile?.role || 'User';

    const param = useLocation().pathname.split('/')[1];
    const keyItem =
        getNavbatItem(param)?.label || param || 'Dashboard';

    return (
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
                {/* Left */}
                <div>
                    <h1 className="text-xl sm:text-3xl text-[#425464] hidden md:block">
                        {keyItem.toLowerCase() === 'profile'
                            ? keyItem.charAt(0).toUpperCase() + keyItem.slice(1)
                            : keyItem}
                    </h1>
                </div>

                {/* Right */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* Search */}
                    {/* <div className="hidden sm:flex items-center">
                        <Input
                            placeholder="Search"
                            prefix={<SearchOutlined className="text-gray-400" />}
                            className="!w-64 !rounded-lg !border !border-gray-300"
                            style={{
                                height: '40px',
                                fontSize: '16px',
                            }}
                        />
                    </div> */}

                    {/* Notification */}
                    <Link to="/notification">
                        <button className="relative p-2 text-[#223047] hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                            <FiBell className="h-6 w-6" />
                            {/* <span className="absolute -top-1 -right-0 flex items-center justify-center bg-[#34D3C7] text-white text-xs font-semibold rounded-full w-6 h-6 shadow-md border-2 border-white">
                                2
                            </span> */}
                        </button>
                    </Link>

                    {/* Profile */}
                    {isLoading || isFetching ? (
                        <Skeleton.Avatar active size="large" />
                    ) : !isError ? (
                        <div className="flex items-center space-x-3">
                            <Link to="/profile">
                                <img
                                    src={profileImage}
                                    alt={fullName}
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                />
                            </Link>

                            <div className="flex flex-col">
                                <span className="text-sm sm:text-base font-semibold text-gray-900">
                                    {fullName || 'User'}
                                </span>

                                <span className="text-xs sm:text-sm text-gray-400 capitalize">
                                    {role.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <span className="text-sm text-gray-500">
                                Failed to load profile
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}