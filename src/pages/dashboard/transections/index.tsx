import { useState } from 'react';
import { Table, Tag } from 'antd';
import { format, formatDistanceToNow } from 'date-fns';
import { useGetBookingClassAttendanceQuery } from '../../../redux/apiSlices/bookingClassSlice';
import { imageUrl } from '../../../redux/api/baseApi';

const TransectionsTable = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: bookingClassAttendance, isLoading } = useGetBookingClassAttendanceQuery({ page, limit: pageSize });

  // Only include the most important fields: User, Booking ID, Class Name, Payment Status, Payment Method, Price, Created
  const columns = [
    {
      title: 'User',
      dataIndex: ['user', 'profile', 'firstName'],
      key: 'user',
      render: (_: any, record: any) =>
        record.user?.profile ? (
          <div className="flex items-center gap-2">
            <img
              src={
                record.user.profile.image.startsWith('http')
                  ? record.user.profile.image
                  : imageUrl + record.user.profile.image
              }
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <span>
              {record.user.profile.firstName} {record.user.profile.lastName}
            </span>
          </div>
        ) : (
          '-'
        ),
    },
    {
      title: 'Booking ID',
      dataIndex: 'booking_id',
      key: 'booking_id',
    },
    {
      title: 'Class Name',
      dataIndex: ['class', 'class_name'],
      key: 'class_name',
      render: (_: any, record: any) =>
        record.class && record.class.class_name ? record.class.class_name : '-',
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (status: string) => (
        <Tag
          color={status === 'paid' ? 'green' : 'orange'}
          style={{ minWidth: 70, textAlign: 'center' }}
        >
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      key: 'payment_method',
      render: (method: string) => (method ? method.toUpperCase() : '-'),
    },
    {
      title: 'Price',
      dataIndex: 'price_of_class',
      key: 'price_of_class',
      render: (price: number) => (price ? `$${price}` : '-'),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) =>
        date ? (
          <div>
            <div>{format(new Date(date), 'dd MMM yyyy')}</div>
            <small className="text-gray-500">
              {formatDistanceToNow(new Date(date), { addSuffix: true })}
            </small>
          </div>
        ) : (
          '-'
        ),
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Booking Class Transactions</h2>
      </div>
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
          dataSource={bookingClassAttendance?.data || []}
          pagination={{
            current: bookingClassAttendance?.pagination?.page || page,
            pageSize: bookingClassAttendance?.pagination?.limit || pageSize,
            total: bookingClassAttendance?.pagination?.total || 0,
            showSizeChanger: false,
            onChange: (newPage) => setPage(newPage),
          }}
          scroll={{
            x: 'max-content',
            y: 'calc(100vh - 280px)',
          }}
        />
      </div>
    </div>
  );
};

export default TransectionsTable;
