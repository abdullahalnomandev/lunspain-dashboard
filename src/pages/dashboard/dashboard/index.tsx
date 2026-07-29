import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from 'recharts';
import { Select } from 'antd';
import { useGetDashboardOverviewQuery } from '../../../redux/apiSlices/userSlice';
import { useGetTopClubsQuery } from '../../../redux/apiSlices/clubSlice';
import { imageUrl } from '../../../redux/api/baseApi';

export default function Dashboard() {
    // TODO: Replace with actual data from the API
    const { data: dashboardOverview } = useGetDashboardOverviewQuery({ year: new Date().getFullYear() });
    const { data: topClubsData } = useGetTopClubsQuery();
    console.log(dashboardOverview);

    const activeUsersData = dashboardOverview?.data?.userRegistrationsPerMonth ?? [
        { month: 'Jan', '2025': 10, '2026': 20 },
        { month: 'Feb', '2025': 15, '2026': 25 },
        { month: 'Mar', '2025': 20, '2026': 30 },
        { month: 'Apr', '2025': 25, '2026': 35 },
        { month: 'May', '2025': 30, '2026': 40 },
        { month: 'Jun', '2025': 35, '2026': 45 },
        { month: 'Jul', '2025': 40, '2026': 50 },
        { month: 'Aug', '2025': 45, '2026': 55 },
        { month: 'Sep', '2025': 50, '2026': 60 },
        { month: 'Oct', '2025': 55, '2026': 65 },
        { month: 'Nov', '2025': 60, '2026': 70 },
        { month: 'Dec', '2025': 65, '2026': 75 },
    ];


    const statCards = [
        {
            label: 'Total Revenue',
            value: dashboardOverview?.data?.totalRevenue ?? 0,
            color: 'bg-[#F8E5FF99]',
            icon: '/card1.png',
        },
        {
            label: 'Total User',
            value: dashboardOverview?.data?.totalUsers ?? 0,
            color: 'bg-[#E9F0FF]',
            icon: '/card2.png',
        },
        {
            label: 'Total Club',
            value: dashboardOverview?.data?.totalClubs ?? 0,
            color: 'bg-[#F8E5FF99]',
            icon: '/card3.png',
        },
        {
            label: 'Active Classes',
            value: dashboardOverview?.data?.totalActiveClasses ?? 0,
            color: 'bg-[#FDF9EC]',
            icon: '/card3.png',
        },
    ];

    const revenueData = dashboardOverview?.data?.monthlyRevenue ?? [
        {
            month: 'Jan',
            earning: 1000,
        },
        {
            month: 'Feb',
            earning: 1500,
        },
        {
            month: 'Mar',
            earning: 2000,
        },
        {
            month: 'Apr',
            earning: 2500,
        },
        {
            month: 'May',
            earning: 3000,
        },
        {
            month: 'Jun',
            earning: 3500,
        },
        {
            month: 'Jul',
            earning: 4000,
        },
        {
            month: 'Aug',
            earning: 4500,
        },
        {
            month: 'Sep',
            earning: 5000,
        },
        {
            month: 'Oct',
            earning: 5500,
        },
        {
            month: 'Nov',
            earning: 6000,
        },
        {
            month: 'Dec',
            earning: 6500,
        },
    ];

    return (
        <div style={{ width: '100%' }}>
            {/* Date Picker Custom UI */}
            {/* <div className="flex justify-end items-center mb-6">
                <div className="flex items-center  border-gray-200 bg-white rounded-sm  text-[#505B6B] shadow-sm overflow-hidden" style={{ width: 250 }}>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleChange}
                        format="DD MMM, YYYY"
                        allowClear={false}
                        className="flex-1 !m-0 border-none !p-0 !pl-2 cursor-pointer shadow-none outline-none !bg-transparent  select-none text-[#505B6B]"
                        suffixIcon={
                            <span className="bg-[#986EA8]  flex items-center justify-center  w-[36px] h-[36px]">
                                <FaRegCalendarAlt  size={18} className=" text-white" />
                            </span>
                        }
                        style={{
                          flex: 1,
                          background: 'transparent',
                          border: 'none',
                          boxShadow: 'none',
                        }}
                    />
                </div>
            </div> */}

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, idx) => (
                    <div key={idx} className={`${card.color} rounded-lg p-6 border border-gray-200`}>
                        <div className="flex items-center justify-start gap-4">
                            <img src={card.icon} alt={card.label} className="w-10 h-10 object-contain" />
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                                <p className="text-gray-600 text-sm mb-1">{card.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Revenue</h2>
                    <Select
                        defaultValue="2025"
                        style={{ width: 100 }}
                        className="text-sm"
                        options={[
                            { value: '2025', label: '2025' },
                            { value: '2024', label: '2024' },
                        ]}
                    />
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                        width={500}
                        height={200}
                        data={revenueData}
                        syncId="anyId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    let year = '2025';
                                    return (
                                        <div className="bg-[#986EA8] bg-linear-to-r from-cyan-[#986EA8] px-3 rounded shadow text-sm text-white ">
                                            <div>
                                                <span className="text-lg">${payload[0].payload.earning}</span>
                                            </div>
                                            <div className="mb-1">
                                                {label} {year}
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area type="monotone" dataKey="earning" stroke="#986EA8" fill="url(#revenueGradient)" />
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#7c5fe6" stopOpacity={0.32} />
                                <stop offset="80%" stopColor="#7c5fe6" stopOpacity={0.12} />
                                <stop offset="100%" stopColor="#7c5fe6" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <Legend
                            payload={[
                                {
                                    value: '2025',
                                    type: 'line',
                                    id: '2025',
                                    color: '#986EA8',
                                },
                            ]}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Active Users Chart */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Active Users</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={activeUsersData}>
                            <XAxis
                                dataKey="month"
                                stroke="#9ca3af"
                                tick={{
                                    // @ts-ignore
                                    angle: -30,
                                    textAnchor: 'end',
                                    fontSize: 14,
                                    fill: '#9ca3af',
                                }}
                                height={50}
                            />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                }}
                            />
                            <Bar dataKey="2025" fill="#8979FF" />
                            <Bar dataKey="2026" fill="#B6E2D3" />
                            <Legend verticalAlign="top" align="right" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Clubs */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Top Clubs</h2>
                    <div className=" max-h-80 overflow-y-auto">
                        {((topClubsData as any)?.data || [])?.map((club: any, idx: number) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50  border-b-gray-100  border-b rounded-lg transition"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 overflow-hidden">
                                        <span className="text-2xl">
                                            {club.image ? (
                                                <img
                                                    src={imageUrl + club.image}
                                                    alt={club.name}
                                                    className="w-12 h-12 object-cover rounded-full"
                                                />
                                            ) : (
                                                <span className="text-2xl bg-gray-300 text-gray-500 rounded-full w-10 h-10 flex items-center justify-center">
                                                    {club.name
                                                        ? club.name
                                                              .split(' ')
                                                              .map((w: string) => w.charAt(0))
                                                              .join('')
                                                              .substring(0, 2)
                                                              .toUpperCase()
                                                        : 'C'}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-[15px]">{club.name}</p>
                                        <p className="text-xs text-gray-400 mt-1">July 14, 2025</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Members avatars */}
                                    <div className="flex -space-x-2">
                                        <img
                                            src="https://randomuser.me/api/portraits/men/31.jpg"
                                            className="w-7 h-7 rounded-full border-2 border-white object-cover"
                                            alt="avatar1"
                                        />
                                        <img
                                            src="https://randomuser.me/api/portraits/women/42.jpg"
                                            className="w-7 h-7 rounded-full border-2 border-white object-cover"
                                            alt="avatar2"
                                        />
                                        <img
                                            src="https://randomuser.me/api/portraits/men/49.jpg"
                                            className="w-7 h-7 rounded-full border-2 border-white object-cover"
                                            alt="avatar3"
                                        />
                                    </div>
                                    <span className="font-semibold text-gray-500 text-sm">+{club.members}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
