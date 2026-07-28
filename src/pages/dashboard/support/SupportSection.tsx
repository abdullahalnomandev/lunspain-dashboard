import React, { useState } from 'react';
import { Table, Button, Typography, Card, message } from 'antd';
import { Mail, Phone, Trash2 } from 'lucide-react';
import { supportData, SupportTicket } from '../../../demo-data/support-data';
import SupportModel from './SupportModel';

const { Title, Text } = Typography;

const SupportInboxTable: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const handleReply = () => {
        setIsVisible(true);
    };

    const handleDelete = (record: SupportTicket) => {
        message.success(`Ticket ${record.sn} deleted successfully`);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    const columns = [
        {
            title: '',
            dataIndex: 'checkbox',
            key: 'checkbox',
            width: 60,
            align: 'center' as const,
            render: () => null, // Checkbox is handled by rowSelection
        },
        {
            title: '#SN',
            dataIndex: 'sn',
            key: 'sn',
            width: 100,
            align: 'center' as const,
            render: (text: string) => (
                <Text strong className="text-gray-700">
                    {text}
                </Text>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 250,
            align: 'center' as const,
            render: (text: string) => <Text className="text-gray-800 text-sm">{text}</Text>,
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            flex: 1,
            align: 'left' as const,
            render: (text: string) => <Text className="text-gray-600 text-sm">{text}</Text>,
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: 120,
            align: 'center' as const,
            render: (text: string) => <Text className="text-gray-600 text-sm">{text}</Text>,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 120,
            align: 'center' as const,
            render: (text: string) => <Text className="text-gray-600 text-sm">{text}</Text>,
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            align: 'center' as const,
            render: (_: any, record: SupportTicket) => (
                <div className="flex items-center justify-center space-x-2">
                    <Button
                        className="bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-white px-4 py-3 rounded"
                        size="small"
                        onClick={() => handleReply()}
                    >
                        Replay
                    </Button>
                    <Button
                        type="text"
                        icon={<Trash2 className="w-4 h-4" />}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        size="small"
                        onClick={() => handleDelete(record)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div >
            {/* Header */}
            <div className="mb-12">
                <div className="mb-6 border-b-[1px] border-primary pb-4" style={{ width: '124px' }}>
                    <Title level={4} className="!mb-0 !text-gray-800  !font-bold">
                        Contact Us 
                    </Title>
                </div>


                {/* Main Heading */}
                <h1 className="text-xl lg:text-2xl font-bold text-gray-700 mb-6 leading-tight">
                    WE <span className="text-primary font-bold">UNDERSTAND</span>, WE <span className="text-primary font-bold">SUPPORT</span>, WE <span className="text-primary font-bold">DELIVER</span>
                </h1>

                <p className="text-gray-600 text-sm font-semibold">
                    Choose your preferred channel to reach us.
                </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mb-12 mx-auto">
                {/* Email Section */}
                <div className="flex items-center bg-[#FBF6F3] rounded-md px-6 py-4 gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Mail className="w-7 h-7 text-[#2D2D2D]" strokeWidth={2} />
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-[#2D2D2D] mb-1">Mail us at</p>
                        <a
                            href="mailto:support@betopialimited.com"
                            className="text-base font-semibold text-[#2D2D2D] hover:text-orange-500 transition-colors"
                            style={{ fontFamily: 'inherit' }}
                        >
                            support@betopialimited.com
                        </a>
                    </div>
                </div>

                {/* Phone Section */}
                <div className="flex items-center bg-[#FBF6F3] rounded-md px-6 py-4 gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Phone className="w-7 h-7 text-[#2D2D2D]" strokeWidth={2} />
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-[#2D2D2D] mb-1">Call Us at</p>
                        <a
                            href="tel:+8801332840871"
                            className="text-base font-semibold text-[#2D2D2D] hover:text-orange-500 transition-colors"
                            style={{ fontFamily: 'inherit' }}
                        >
                            +88 01332840871
                        </a>
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <Card className="shadow-sm rounded-t-none">
                <div className="mb-6 text-center">
                    <Title level={1} className="mb-1 !font-bold">
                        Support <span className="text-orange-500 font-bold">Inbox</span>
                    </Title>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg overflow-hidden">
                    <Table
                        columns={columns}
                        dataSource={supportData}
                        rowSelection={rowSelection}
                        pagination={{
                            pageSize: 10,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            className: '!px-5',
                        }}
                        className=""
                        size="middle"
                        rowClassName="bg-[#F9F0EC]"
                        onHeaderRow={() => ({ className: 'bg-[#F3F6F9]' })}
                        scroll={{ x: 768 }}
                    />
                </div>
            </Card>

            <SupportModel isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
    );
};

export default SupportInboxTable;
