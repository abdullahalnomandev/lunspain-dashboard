import { useState } from 'react';
import { Table, Tag, Avatar, Space, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useGetClubsQuery } from '../../../redux/apiSlices/clubSlice';
import { IClub } from '../../../types/types';
import ClubModal from './ClubModal';
import { imageUrl } from '../../../redux/api/baseApi';

const ClubsTable = () => {
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

    const { data: clubs, isLoading } = useGetClubsQuery({ page, limit: pageSize });

    const handleInfoClick = (club: IClub) => {
        setSelectedClubId(club._id);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedClubId(null);
    };

    // Set same fixed width for all columns for uniformity
    const sameWidth = 150;

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: sameWidth,
            render: (_: string, record: IClub) => (
                <Space>
                    {record.image ? (
                        <Avatar
                            size={40}
                            src={imageUrl + record.image}
                            alt={record.name}
                        />
                    ) : (
                        <Avatar size={40}>
                            {record.name?.charAt(0)?.toUpperCase() || '?'}
                        </Avatar>
                    )}
                    <span className="font-medium">{record.name}</span>
                </Space>
            ),
        },
  
        {
            title: 'Members',
            key: 'members',
            width: sameWidth,
            render: (_: unknown, record: IClub) => record.club_members ?? record.total_members ?? '-',
        },
        {
            title: 'Established',
            key: 'stablished_date',
            width: sameWidth,
            render: (_: unknown, record: IClub) =>
                record.stablished_date ? new Date(record.stablished_date).toLocaleDateString() : '-',
        },
        {
            title: 'Visibility',
            key: 'visibility',
            width: sameWidth,
            render: (_: unknown, record: IClub) => (
                <Tag color={record.enable_public_club ? 'blue' : 'default'}>
                    {record.enable_public_club ? 'Public' : 'Private'}
                </Tag>
            ),
        },
        {
            title: 'Created',
            key: 'createdAt',
            width: sameWidth,
            render: (_: unknown, record: IClub) =>
                record.createdAt ? new Date(record.createdAt).toLocaleDateString() : '-',
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_: unknown, record: IClub) => (
                <Button type="text" icon={<InfoCircleOutlined />} onClick={() => handleInfoClick(record)} />
            ),
        },
    ];

    console.log({ clubs });
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
                    dataSource={clubs?.data || []}
                    pagination={{
                        current: clubs?.pagination?.page || page,
                        pageSize,
                        total: clubs?.pagination?.total || 0,
                        showSizeChanger: false,
                        onChange: (newPage) => setPage(newPage),
                    }}
                    scroll={{
                        x: 'max-content',
                        y: 'calc(100vh - 230px)',
                    }}
                />
            </div>

            <ClubModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} clubId={selectedClubId} />
        </div>
    );
};

export default ClubsTable;
