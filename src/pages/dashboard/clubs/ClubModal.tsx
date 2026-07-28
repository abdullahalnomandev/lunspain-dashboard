import { Avatar, Modal, Table, Tabs, TabsProps, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { ClassData } from ".";

export default function ClubModal({ isModalOpen, handleModalClose, selectedClub }: { isModalOpen: boolean; handleModalClose: () => void; selectedClub: any }) {
     const classColumns: ColumnsType<ClassData> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 60,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total Enrolled',
      dataIndex: 'enrolled',
      key: 'enrolled',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'success' : status === 'Complete' ? 'error' : 'default'}>
          {status}
        </Tag>
      ),
    },
  ];
     const tabItems: TabsProps['items'] = [
    {
      key: 'information',
      label: 'Information',
      children: selectedClub && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 pb-4 border-b">
            <Avatar src={selectedClub.avatar} size={64} />
            <div>
              <h3 className="text-lg font-semibold">{selectedClub.name}</h3>
              <p className="text-gray-500 text-sm">{selectedClub.username}</p>
              <Tag color="success" className="mt-1">Active</Tag>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Email</p>
              <p className="text-gray-800">{selectedClub.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Website</p>
              <p className="text-gray-800">{selectedClub.website}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Established</p>
              <p className="text-gray-800">{selectedClub.established}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Country</p>
              <p className="text-gray-800">{selectedClub.country}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Postcode</p>
              <p className="text-gray-800">{selectedClub.postcode}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Speciality</p>
              <p className="text-gray-800">{selectedClub.speciality}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Manager</p>
              <p className="text-gray-800">{selectedClub.manager}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Visibility</p>
              <p className="text-gray-800">{selectedClub.visibility}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'classes',
      label: 'Class Details',
      children: selectedClub && (
        <div>
          {selectedClub.classes && selectedClub.classes.length > 0 ? (
            <Table 
              columns={classColumns} 
              dataSource={selectedClub.classes}
              pagination={false}
              size="small"
            />
          ) : (
            <p className="text-gray-500 text-center py-8">No classes available</p>
          )}
        </div>
      ),
    },
  ];



  return (
    <div>
      <Modal
        title="Users Details"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={700}
      >
        <Tabs items={tabItems} />
      </Modal>
    </div>
  )
}
