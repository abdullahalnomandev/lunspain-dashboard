import { useState } from 'react';
import { Table, Tag, Avatar, Space, Button } from 'antd';
import { InfoCircleOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { useChangeStatusUserMutation, useGetUsersQuery } from '../../../redux/apiSlices/userSlice';
import UserModal from './UserModal';
import { imageUrl } from '../../../redux/api/baseApi';

const UserTable = () => {
    const [page, setPage] = useState(1);
    // Set page size for scroll and pagination
    const pageSize = 15;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const { data: users, isLoading, refetch } = useGetUsersQuery({ page, limit: pageSize });
    const [changeStatusUser, { isLoading: isChangingStatus }] = useChangeStatusUserMutation();

    const handleInfoClick = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleToggleUserStatus = (user: { _id: string; status: string }) => {
        const isLocked = user.status === 'delete';
        const nextStatus = isLocked ? 'active' : 'delete';

        Swal.fire({
            title: 'Are you sure?',
            text: isLocked ? 'You want to unlock this user?' : 'You want to lock this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: isLocked ? 'Yes, unlock it!' : 'Yes, lock it!',
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                await changeStatusUser({ id: user._id, status: nextStatus }).unwrap();
                refetch();
                Swal.fire(
                    isLocked ? 'Unlocked!' : 'Locked!',
                    isLocked ? 'User has been unlocked successfully.' : 'User has been locked successfully.',
                    'success',
                );
            } catch {
                Swal.fire('Error!', 'Failed to update user status.', 'error');
            }
        });
    };

    const columns = [
        {
            title: 'User ID',
            dataIndex: '_id',
            key: '_id',
            width: 150,
            render: (id: string) => id.slice(-8),
        },
        {
            title: 'User',
            key: 'user',
            render: (_: any, record: any) => (
                <Space>
                    <Avatar
                        size={40}
                        src={
                            record?.profile?.image.startsWith('https')
                                ? record?.profile?.image
                                : imageUrl + record?.profile?.image
                        }
                    />
                    <div>
                        <div className="font-medium">
                            {record?.profile?.firstName
                                ? `${record.profile.firstName} ${record.profile.lastName || ''}`
                                : record?.profile?.username || 'N/A'}
                        </div>

                        {record?.profile?.username && (
                            <div className="text-gray-500 text-xs">@{record.profile.username}</div>
                        )}
                    </div>
                </Space>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Country',
            key: 'country',
            render: (_: any, record: any) => record?.profile?.country || '-',
        },
        {
            title: 'Verified',
            key: 'verified',
            render: (_: any, record: any) => (
                <Tag color={record.verified ? 'success' : 'warning'}>{record.verified ? 'Verified' : 'Unverified'}</Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'success' : 'error'}>{status === 'active' ? 'Active' : 'Locked'}</Tag>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => <Tag color="blue">{role}</Tag>,
        },
        {
            title: 'Created',
            key: 'createdAt',
            render: (_: any, record: any) => new Date(record.createdAt).toLocaleDateString(),
        },
        {
            title: 'Action',
            key: 'action',
            width: 120,
            render: (_: any, record: any) => (
                <Space>
                    <Button type="text" icon={<InfoCircleOutlined />} onClick={() => handleInfoClick(record)} />

                    <Button
                        type="text"
                        danger={record.status === 'active'}
                        icon={record.status === 'delete' ? <UnlockOutlined /> : <LockOutlined />}
                        loading={isChangingStatus}
                        onClick={() => handleToggleUserStatus(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="bg-gray-50">
            <div
                className="bg-white rounded-lg shadow"
                style={{
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Table
                    rowKey="_id"
                    loading={isLoading}
                    columns={columns}
                    dataSource={users?.data || []}
                    // Screen height, vertical scroll before pagination
                    pagination={{
                        current: users?.pagination?.page || page,
                        pageSize: pageSize,
                        total: users?.pagination?.total || 0,
                        showSizeChanger: false,
                        onChange: (newPage) => {
                            setPage(newPage);
                        },
                    }}
                    scroll={{
                        x: 'max-content',
                        y: 'calc(100vh - 230px)',
                    }}
                    // Optional: Add a customTable class if using CSS module styles
                    // className={styles.customTable}
                />
            </div>

            <UserModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} selectedUser={selectedUser} />
        </div>
    );
};

export default UserTable;
