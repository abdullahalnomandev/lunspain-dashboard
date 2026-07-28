import React, { useState } from 'react';
import { Table, Tag, Avatar, Space, Button } from 'antd';
import { InfoCircleOutlined, LockOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ClubModal from './ClubModal';
import { clubsData } from '../../../demo-data/clubs-data';
import Swal from 'sweetalert2';

export interface ClassData {
  no: number;
  title: string;
  date: string;
  enrolled: number;
  price: string;
  status: 'Active' | 'Complete';
}

interface ClubData {
  key: string;
  no: number;
  name: string;
  username: string;
  avatar: string;
  email: string;
  established: string;
  country: string;
  visibility: string;
  status: 'Active' | 'Disable';
  website: string;
  postcode: string;
  speciality: string;
  manager: string;
  classes: ClassData[];
}

const ClubsTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedClub, setSelectedClub] = useState<ClubData | null>(null);

  const handleInfoClick = (club: ClubData): void => {
    setSelectedClub(club);
    setIsModalOpen(true);
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setSelectedClub(null);
  };

  const handleLockUser=(id: string): void =>{
      console.log(id);

      Swal.fire({
        title: 'Are you sure?',
        text: "You want to lock this user?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, lock it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Locked!',
            'Your club has been locked.',
            'success'
          )
        }
      })
      
  }

  const columns: ColumnsType<ClubData> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 60,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: ClubData) => (
        <Space>
          <Avatar src={record.avatar} size={32} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Established',
      dataIndex: 'established',
      key: 'established',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Visibility',
      dataIndex: 'visibility',
      key: 'visibility',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'success' : 'error'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_: any, record: ClubData) => (
        <Space>
          <Button 
            type="text" 
            icon={<InfoCircleOutlined />} 
            onClick={() => handleInfoClick(record)}
          />
          <Button type="text" icon={<LockOutlined />} onClick={() => handleLockUser(record.key)} />
        </Space>
      ),
    },
  ];


 

 
  return (
    <div className=" bg-gray-50 ">
      <div className="bg-white rounded-lg shadow">
        <div className="w-full overflow-x-auto">
          <Table 
            columns={columns} 
            dataSource={clubsData as any} 
            pagination={{
              pageSize: 10,
              total: 100
            }}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </div>

      <ClubModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} selectedClub={selectedClub} />
      
    </div>
  );
};

export default ClubsTable;