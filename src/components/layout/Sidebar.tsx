import { ConfigProvider, Layout, Menu, MenuProps, Drawer, Button } from 'antd';
import { TSidebarItem } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LogOut, Menu as MenuIcon, X as CrossIcon } from 'lucide-react';

const { Sider } = Layout;

const Sidebar = () => {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setDrawerVisible(false);
        setOpenKeys([]);
    }, [location.pathname]);

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    const sidebarItemsGenerator = (items: TSidebarItem[]): MenuProps['items'] => {
        return items.map((item) => {
            if (item.children) {
                return {
                    key: item.key,
                    icon: item.icon,
                    label: item.label,
                    children: item.children.map((child) => ({
                        key: `/${child.path}`,
                        icon: child.icon,
                        label: <Link to={`/${child.path}`}>{child.label}</Link>,
                    })),
                };
            }

            return {
                key: `/${item.path}`,
                icon: item.icon,
                label: <Link to={`/${item.path}`}>{item.label}</Link>,
            };
        });
    };

    const navigate = useNavigate();

    const sidebarContent = (
        <>
            <p className="absolute top-28 -left-20 w-64 h-56 bg-white/5 rounded-[50%] pointer-events-none z-40" />
            <p className="absolute w-96 h-64 top-52 -left-28 bg-white/5 rounded-[50%] pointer-events-none z-30" />
            <p className="absolute top-80 -left-20 w-64 h-56 bg-white/5 rounded-[50%] pointer-events-none z-20" />

            <Link to="/">
                <div className="flex flex-col gap-3 items-center justify-center p-5 pb-2">
                    <img src="/logo-lunaspin.png" alt="" className="h-14" />
                </div>
            </Link>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                items={sidebarItemsGenerator(sidebarItems)}
                style={{ background: 'transparent' }}
                className="flex-1 z-50 [&_.ant-menu-submenu]:!bg-transparent [&_.ant-menu-sub]:!bg-transparent"
                onClick={() => isMobile && setDrawerVisible(false)} // Close drawer on click (mobile)
            />

            <div className="p-4 w-full space-y-2 absolute bottom-0 right-0">
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                        
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-white/15 text-[#F44336] font-semibold rounded-md transition"
                >
                    <LogOut size={20} />
                    <span>Log Out</span>
                </button>
            </div>
        </>
    );

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: '#414446',
                },
                components: {
                    Menu: {
                        itemActiveBg: '#F69348',
                        itemSelectedColor: '#fff',
                        itemBorderRadius: '10px 10px 10px 10px' as any,
                        itemHeight: 45,
                        itemMarginBlock: 12,
                        itemSelectedBg: '#F69348',
                    },
                },
            }}
        >
            {isMobile ? (
                <>
                    {/* Mobile Topbar Menu Button */}
                    <Button
                        type="text"
                        onClick={() => setDrawerVisible(true)}
                        icon={<MenuIcon color="#fff" size={24} />}
                        className="!lg:!hidden !fixed !top-4 !hover:!bg-purple-950 !left-4 !z-[1000] !bg-[#540D6E] !flex !items-center !justify-center !w-10 !h-10 !shadow-md"
                        aria-label="Open sidebar"
                    />
                    {/* Mobile Drawer Sidebar */}
                    <Drawer
                        title={null}
                        placement="left"
                        closable={false}
                        onClose={() => setDrawerVisible(false)}
                        open={drawerVisible}
                        width={256}
                        bodyStyle={{ padding: 0, overflow: 'hidden', background: 'linear-gradient(to bottom, #540D6E 0%, #13293D 100%)', position: 'relative', height: '100%' }}
                        className="!p-0"
                    >
                        {/* Custom close button in top right */}
                        <button
                            onClick={() => setDrawerVisible(false)}
                            aria-label="Close sidebar"
                            className="absolute top-4 right-2.5 z-[1050] flex items-center justify-center p-1 bg-white/15 rounded-full shadow-md border-none cursor-pointer transition-colors hover:bg-white/25 focus:outline-none"
                        >
                            <CrossIcon size={24} color="#fff" strokeWidth={2.2} />
                        </button>
                        {sidebarContent}
                    </Drawer>
                </>
            ) : (
                <Sider
                    width={250}
                    theme="light"
                    breakpoint="lg"
                    collapsedWidth="0"
                    className="!relative overflow-hidden !bg-gradient-to-b !from-[#540D6E] !to-[#13293D] flex flex-col"
                >
                    {sidebarContent}
                </Sider>
            )}
        </ConfigProvider>
    );
};

export default Sidebar;