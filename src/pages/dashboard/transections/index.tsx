import React, { useState } from 'react';
import { Table, Tag, Avatar, Space, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import TransactionModal from './TransactionModal';
import { Transectiondata } from '../../../demo-data/transections.data';

interface TransactionData {
  key: string;
  txnId: string;
  userName: string;
  userUsername: string;
  userAvatar: string;
  userEmail: string;
  clubName: string;
  clubAvatar: string;
  date: string;
  amount: string;
  type: 'Class Payment' | 'Membership' | 'Workshop' | 'Private Lesson';
  status: 'Completed' | 'Pending' | 'Failed';
  paymentMethod: string;
  description: string;
  adminCommission: string;
  clubEarnings: string;
  commissionRate: string;
}

const TransactionsTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);

  const handleViewDetails = (transaction: TransactionData): void => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const columns: ColumnsType<TransactionData> = [
    {
      title: 'TXN ID',
      dataIndex: 'txnId',
      key: 'txnId',
      width: 140,
      render: (text: string) => <span className="font-mono text-sm">{text}</span>,
    },
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
      render: (text: string, record: TransactionData) => (
        <div className="flex items-center space-x-3">
          <Avatar src={record.userAvatar} size={40} />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">{record.userEmail}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Club',
      dataIndex: 'clubName',
      key: 'clubName',
      render: (text: string, record: TransactionData) => (
        <div className="flex items-center space-x-2">
          <Avatar src={record.clubAvatar} size={32} />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: { [key: string]: string } = {
          Completed: 'success',
          Pending: 'warning',
          Failed: 'error',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_: any, record: TransactionData) => (
        <Space>
          <Button 
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            Details
          </Button>
        </Space>
      ),
    },
  ];



  return (
    <div className=" bg-gray-50">


      <div className="bg-white rounded-lg shadow">
        <div className="w-full overflow-x-auto">
          <Table 
            columns={columns as any} 
            dataSource={Transectiondata} 
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
            }}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </div>

      <TransactionModal
      handleModalClose={handleModalClose}
      isModalOpen={isModalOpen}
      selectedTransaction={selectedTransaction}
      />

    </div>
  );
};

export default TransactionsTable;