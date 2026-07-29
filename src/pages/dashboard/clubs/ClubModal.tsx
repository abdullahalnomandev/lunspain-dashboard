import { Avatar, Modal, Spin, Table, Tabs, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useGetClubByIdQuery, useGetClubClassesQuery } from '../../../redux/apiSlices/clubSlice';
import { imageUrl } from '../../../redux/api/baseApi';
import { IClass, IClub, IClubManager } from '../../../types/types';

const formatManagerName = (manager: IClubManager) => {
    if (manager.profile?.firstName) {
        return `${manager.profile.firstName} ${manager.profile.lastName || ''}`.trim();
    }
    return manager.profile?.username || manager.email;
};

const getImageSrc = (path?: string) => {
    if (!path) return undefined;
    return path.startsWith('http') ? path : `${imageUrl}${path}`;
};

export default function ClubModal({
    isModalOpen,
    handleModalClose,
    clubId,
}: {
    isModalOpen: boolean;
    handleModalClose: () => void;
    clubId: string | null;
}) {
    const { data: club, isLoading: isClubLoading } = useGetClubByIdQuery(clubId!, {
        skip: !clubId || !isModalOpen,
    });

    const { data: classes = [], isLoading: isClassesLoading } = useGetClubClassesQuery(clubId!, {
        skip: !clubId || !isModalOpen,
    });
    console.log({classes})

    const classColumns: ColumnsType<IClass> = [
        {
            title: 'Class Name',
            dataIndex: 'class_name',
            key: 'class_name',
            render: (name: string) => name || '-',
        },
        {
            title: 'Date',
            dataIndex: 'date_of_class',
            key: 'date_of_class',
            render: (date: string) => (date ? new Date(date).toLocaleDateString() : '-'),
        },
        {
            title: 'Time',
            dataIndex: 'start_time',
            key: 'start_time',
            render: (time: string, record: IClass) =>
                time ? `${time}${record.duration ? ` (${record.duration})` : ''}` : '-',
        },
        {
            title: 'Max Attendees',
            dataIndex: 'max_number_of_attendees',
            key: 'max_number_of_attendees',
            align: 'center',
            render: (max: number) => max ?? '-',
        },
        {
            title: 'Remaining',
            dataIndex: 'remaining_space',
            key: 'remaining_space',
            align: 'center',
            render: (remaining: number) => remaining ?? '-',
        },
        {
            title: 'Price',
            dataIndex: 'const_per_ticket',
            key: 'const_per_ticket',
            render: (price: number) => (price != null ? `$${price}` : '-'),
        },
        {
            title: 'Status',
            key: 'status',
            render: (_: unknown, record: IClass) => (
                <Tag color={record.class_status === 'available' ? 'success' : 'default'}>
                    {record.class_status || record.booking_status || '-'}
                </Tag>
            ),
        },
    ];

    const renderClubInfo = (clubData: IClub) => (
        <div className="space-y-4">
            <div className="flex items-center space-x-4 pb-4 border-b">
                <Avatar src={getImageSrc(clubData.image)} size={64}>
                    {clubData.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <div>
                    <h3 className="text-lg font-semibold">{clubData.name}</h3>
                    <p className="text-gray-500 text-sm">{clubData.email}</p>
                    <Tag color={clubData.enable_public_club ? 'blue' : 'default'} className="mt-1">
                        {clubData.enable_public_club ? 'Public' : 'Private'}
                    </Tag>
                </div>
            </div>

            {clubData.description && (
                <div>
                    <p className="text-gray-500 text-sm mb-1">Description</p>
                    <p className="text-gray-800">{clubData.description}</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                    <p className="text-gray-500 text-sm mb-1">Website</p>
                    <p className="text-gray-800">{clubData.website || '-'}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Address</p>
                    <p className="text-gray-800">{clubData.address || '-'}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Established</p>
                    <p className="text-gray-800">
                        {clubData.stablished_date
                            ? new Date(clubData.stablished_date).toLocaleDateString()
                            : '-'}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Country</p>
                    <p className="text-gray-800">{clubData.country || '-'}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Postcode</p>
                    <p className="text-gray-800">{clubData.post_code || '-'}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Speciality</p>
                    <p className="text-gray-800">
                        {clubData.club_specilaity?.length ? clubData.club_specilaity.join(', ') : '-'}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Total Members</p>
                    <p className="text-gray-800">{clubData.total_members ?? clubData.club_members ?? '-'}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Managers</p>
                    <p className="text-gray-800">
                        {clubData.managers?.length
                            ? clubData.managers.map(formatManagerName).join(', ')
                            : '-'}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Waiting List</p>
                    <p className="text-gray-800">{clubData.allow_waiting_list ? 'Enabled' : 'Disabled'}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Class Cancellation</p>
                    <p className="text-gray-800">{clubData.allow_class_cancelation ? 'Allowed' : 'Not allowed'}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Pre-class Cancellation</p>
                    <p className="text-gray-800">
                        {clubData.pre_class_cancelation
                            ? `${clubData.pre_class_cancelation.period ?? 0} ${clubData.pre_class_cancelation.period_type ?? ''}`
                            : '-'}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Payment Currency</p>
                    <p className="text-gray-800 uppercase">{clubData.payment?.currency_of_payment || '-'}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">In-person Payment</p>
                    <p className="text-gray-800">{clubData.payment?.in_person_payment ? 'Yes' : 'No'}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Booking System</p>
                    <p className="text-gray-800">
                        {clubData.premium_feature?.booking_system ? 'Enabled' : 'Disabled'}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Community & Sharing</p>
                    <p className="text-gray-800">
                        {clubData.premium_feature?.community_and_sharing ? 'Enabled' : 'Disabled'}
                    </p>
                </div>
            </div>
        </div>
    );

    const tabItems = [
        {
            key: 'information',
            label: 'Information',
            children: isClubLoading ? (
                <div className="flex justify-center py-12">
                    <Spin />
                </div>
            ) : club ? (
                renderClubInfo(club)
            ) : null,
        },
        {
            key: 'classes',
            label: 'Class Details',
            children: isClassesLoading ? (
                <div className="flex justify-center py-12">
                    <Spin />
                </div>
            ) : classes.length > 0 ? (
                <Table
                    columns={classColumns}
                    dataSource={classes}
                    rowKey={(record) => `${record._id}-${record.date_of_class}`}
                    pagination={false}
                    size="small"
                    scroll={{ x: 'max-content' }}
                />
            ) : (
                <p className="text-gray-500 text-center py-8">No classes available</p>
            ),
        },
    ];

    return (
        <Modal title="Club Details" open={isModalOpen} onCancel={handleModalClose} footer={null} width={700}>
            <Tabs items={tabItems} />
        </Modal>
    );
}
