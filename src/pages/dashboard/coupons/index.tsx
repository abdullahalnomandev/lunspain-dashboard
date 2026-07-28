import { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { format, formatDistanceToNow } from 'date-fns';
import Swal from 'sweetalert2';
import { useDeleteCouponMutation, useGetCouponsQuery } from '../../../redux/apiSlices/couponSlice';
import { ICoupon } from '../../../types/types';
import CouponModal from './CouponModal';

const formatCouponValue = (coupon: ICoupon) => {
    if (coupon.type === 'percent') return `${coupon.value}%`;
    return coupon.value.toString();
};

const CouponTable = () => {
    const [page, setPage] = useState(1);
    const pageSize = 15;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);

    const { data: coupons, isLoading } = useGetCouponsQuery({ page, limit: pageSize });
    const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

    const handleCreate = () => {
        setSelectedCoupon(null);
        setIsModalOpen(true);
    };

    const handleEdit = (coupon: ICoupon) => {
        setSelectedCoupon(coupon);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCoupon(null);
    };

    const handleDelete = (coupon: ICoupon) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete coupon "${coupon.code}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                await deleteCoupon(coupon._id).unwrap();
                Swal.fire('Deleted!', 'Coupon has been deleted successfully.', 'success');
            } catch {
                Swal.fire('Error!', 'Failed to delete coupon.', 'error');
            }
        });
    };

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: ICoupon['type']) => (
                <Tag color={type === 'percent' ? 'blue' : 'purple'}>{type === 'percent' ? 'Percent' : 'Fixed'}</Tag>
            ),
        },
        {
            title: 'Value',
            key: 'value',
            render: (_: unknown, record: ICoupon) => formatCouponValue(record),
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (active: boolean) => (
                <Tag color={active ? 'success' : 'error'}>{active ? 'Active' : 'Inactive'}</Tag>
            ),
        },
        {
            title: 'Created',
            key: 'createdAt',
            render: (_: unknown, record: ICoupon) =>
                record.createdAt ? (
                    <div>
                        <div>{format(new Date(record.createdAt), 'dd MMM yyyy')}</div>
                        <small className="text-gray-500">
                            {formatDistanceToNow(new Date(record.createdAt), {
                                addSuffix: true,
                            })}
                        </small>
                    </div>
                ) : (
                    '-'
                ),
        },
        {
            title: 'Updated',
            key: 'updatedAt',
            render: (_: unknown, record: ICoupon) =>
                record.updatedAt
                    ? `${formatDistanceToNow(new Date(record.updatedAt), {
                          addSuffix: true,
                      })}`
                    : '-',
        },
        {
            title: 'Action',
            key: 'action',
            width: 120,
            render: (_: unknown, record: ICoupon) => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        loading={isDeleting}
                        onClick={() => handleDelete(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="bg-gray-50">
            <div className="mb-4 flex justify-end">
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    Add Coupon
                </Button>
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
                    dataSource={coupons?.data || []}
                    pagination={{
                        current: coupons?.pagination?.page || page,
                        pageSize,
                        total: coupons?.pagination?.total || 0,
                        showSizeChanger: false,
                        onChange: (newPage) => setPage(newPage),
                    }}
                    scroll={{
                        x: 'max-content',
                        y: 'calc(100vh - 260px)',
                    }}
                />
            </div>

            <CouponModal isOpen={isModalOpen} onClose={handleModalClose} selectedCoupon={selectedCoupon} />
        </div>
    );
};

export default CouponTable;
