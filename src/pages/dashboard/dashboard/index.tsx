
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from 'recharts';
import {  Select } from 'antd';

export default function Dashboard() {

    const activeUsersData = [
        { month: 'Jan', '2024': 45, '2025': 60 },
        { month: 'Feb', '2024': 52, '2025': 75 },
        { month: 'Mar', '2024': 48, '2025': 70 },
        { month: 'Apr', '2024': 61, '2025': 82 },
        { month: 'May', '2024': 55, '2025': 68 },
        { month: 'Jun', '2024': 67, '2025': 85 },
        { month: 'Jul', '2024': 72, '2025': 90 },
        { month: 'Aug', '2024': 58, '2025': 75 },
        { month: 'Sep', '2024': 64, '2025': 80 },
        { month: 'Oct', '2024': 70, '2025': 88 },
        { month: 'Nov', '2024': 59, '2025': 76 },
        { month: 'Dec', '2024': 66, '2025': 83 }
    ];

    const topClubs = [
        { id: 1, name: 'Rhythm Nation', members: 203, avatar: '🎵' },
        { id: 2, name: 'Rhythm Nation', members: 180, avatar: '🎵' },
        { id: 3, name: 'Rhythm Nation', members: 205, avatar: '🎵' },
        { id: 4, name: 'Rhythm Nation', members: 203, avatar: '🎵' },
        { id: 5, name: 'Groove Masters', members: 175, avatar: '🥁' },
        { id: 6, name: 'Dance Floor Crew', members: 188, avatar: '🕺' },
        { id: 7, name: 'Jazz Fusion', members: 160, avatar: '🎷' },
        { id: 8, name: 'The Beat Collective', members: 192, avatar: '🔊' }
    ];

    const statCards = [
        { label: 'Total Revenue', value: '$2500', color: 'bg-[#F8E5FF99]', icon: '/card1.png' },
        { label: 'Total User', value: '11,250', color: 'bg-[#E9F0FF]', icon: '/card2.png' },
        { label: 'Total Club', value: '1,459', color: 'bg-[#F8E5FF99]', icon: '/card3.png' },
        { label: 'Active Classes', value: '6,428', color: 'bg-[#FDF9EC]', icon: '/card3.png' }
    ];

    const revenueData = [
        {
            month: 'Jan',
            revenue: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            month: 'Feb',
            revenue: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            month: 'Mar',
            revenue: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            month: 'Apr',
            revenue: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            month: 'May',
            revenue: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            month: 'Jun',
            revenue: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            month: 'Jul',
            revenue: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            month: 'Aug',
            revenue: 3200,
            pv: 4100,
            amt: 2300,
        },
        {
            month: 'Sep',
            revenue: 3100,
            pv: 3900,
            amt: 2250,
        },
        {
            month: 'Oct',
            revenue: 3000,
            pv: 3700,
            amt: 2400,
        },
        {
            month: 'Nov',
            revenue: 2800,
            pv: 3600,
            amt: 2185,
        },
        {
            month: 'Dec',
            revenue: 2600,
            pv: 3500,
            amt: 2000,
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
                                    let year = "2025";
                                    return (
                                        <div className="bg-[#986EA8]  bg-linear-to-r from-cyan-[#986EA8] px-3 rounded shadow text-sm text-white ">
                                            <div>
                                                <span className="text-lg">${payload[0].value}</span>
                                            </div>
                                            <div className="mb-1  ">
                                                2 {label} {year}
                                            </div>

                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#986EA8"
                            fill="url(#revenueGradient)"
                        />
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
                                    angle:-30,
                                    textAnchor: 'end',
                                    fontSize: 14,
                                    fill: "#9ca3af"
                                }}
                                height={50}
                            />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                            <Bar dataKey="2024" fill="#8979FF" />
                            <Bar dataKey="2025" fill="#B6E2D3" />
                            <Legend verticalAlign="top" align="right" />

                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Clubs */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Top Clubs</h2>
                    <div className=" max-h-80 overflow-y-auto">
                        {topClubs.map((club, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50  border-b-gray-100  border-b rounded-lg transition">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 overflow-hidden">
             
                                        <span className="text-2xl">{club.avatar}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 text-[15px]">{club.name}</p>
                                        <p className="text-xs text-gray-400 mt-1">July 14, 2025</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Members avatars */}
                                    <div className="flex -space-x-2">
                                        <img src="https://randomuser.me/api/portraits/men/31.jpg" className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="avatar1" />
                                        <img src="https://randomuser.me/api/portraits/women/42.jpg" className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="avatar2" />
                                        <img src="https://randomuser.me/api/portraits/men/49.jpg" className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="avatar3" />
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