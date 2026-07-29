import { useState } from 'react';
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { useDeleteTagMutation, useGetTagsQuery } from '../../../redux/apiSlices/tagSlice';
import { ITag } from '../../../types/types';
import TagModal from './TagModal';
import { format, formatDistanceToNow } from 'date-fns';

const TagTable = () => {
    const [page, setPage] = useState(1);
    const pageSize = 15;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState<ITag | null>(null);

    const { data: tags, isLoading } = useGetTagsQuery({ page, limit: pageSize });
    const [deleteTag, { isLoading: isDeleting }] = useDeleteTagMutation();

    const handleCreate = () => {
        setSelectedTag(null);
        setIsModalOpen(true);
    };

    const handleEdit = (tag: ITag) => {
        setSelectedTag(tag);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedTag(null);
    };

    const handleDelete = (tag: ITag) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete tag "${tag.name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                await deleteTag(tag._id).unwrap();
                Swal.fire('Deleted!', 'Tag has been deleted successfully.', 'success');
            } catch {
                Swal.fire('Error!', 'Failed to delete tag.', 'error');
            }
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Created',
            key: 'createdAt',
            render: (_: unknown, record: ITag) =>
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
            render: (_: unknown, record: ITag) =>
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
            render: (_: unknown, record: ITag) => (
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
                    Add Tag
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
                    dataSource={tags?.data || []}
                    pagination={{
                        current: tags?.pagination?.page || page,
                        pageSize,
                        total: tags?.pagination?.total || 0,
                        showSizeChanger: false,
                        onChange: (newPage) => setPage(newPage),
                    }}
                    scroll={{
                        x: 'max-content',
                        y: 'calc(100vh - 280px)',
                    }}
                />
            </div>

            <TagModal isOpen={isModalOpen} onClose={handleModalClose} selectedTag={selectedTag} />
        </div>
    );
};

export default TagTable;
