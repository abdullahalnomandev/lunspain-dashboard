import { Avatar, Descriptions, Modal, Tag } from 'antd'

export default function TransactionModal({isModalOpen,handleModalClose,selectedTransaction}:{isModalOpen:boolean,handleModalClose:()=>void,selectedTransaction:any}) {
  return (
    
      <Modal
        title={
          <div className="flex items-center justify-between pr-6">
            <span>Transaction Details</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={700}
      >
        {selectedTransaction && (
          <div className="space-y-6">
            {/* Transaction Status */}
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">Transaction ID: {selectedTransaction.txnId}</h3>
                <p className="text-gray-500 text-sm mt-1">{selectedTransaction.date}</p>
              </div>
              <Tag 
                color={
                  selectedTransaction.status === 'Completed' ? 'success' : 
                  selectedTransaction.status === 'Pending' ? 'warning' : 'error'
                }
                className="text-sm px-3 py-1"
              >
                {selectedTransaction.status}
              </Tag>
            </div>

            {/* User and Club Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">FROM USER</p>
                <div className="flex items-center space-x-3">
                  <Avatar src={selectedTransaction.userAvatar} size={48} />
                  <div>
                    <div className="font-semibold">{selectedTransaction.userName}</div>
                    <div className="text-sm text-gray-600">{selectedTransaction.userEmail}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">TO CLUB</p>
                <div className="flex items-center space-x-3">
                  <Avatar src={selectedTransaction.clubAvatar} size={48} />
                  <div>
                    <div className="font-semibold">{selectedTransaction.clubName}</div>
                    <div className="text-sm text-gray-600">Dance Club</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="Type" span={2}>
                <Tag color="blue">{selectedTransaction.type}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {selectedTransaction.description}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method" span={2}>
                {selectedTransaction.paymentMethod}
              </Descriptions.Item>
            </Descriptions>

            {/* Payment Breakdown */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-5 rounded-lg border border-purple-200">
              <h4 className="font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">💰</span>
                Payment Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Amount</span>
                  <span className="font-semibold text-lg">{selectedTransaction.amount}</span>
                </div>
                
                <div className="border-t border-purple-200 pt-3 mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Admin Commission ({selectedTransaction.commissionRate})</span>
                    <span className="font-semibold text-purple-600">{selectedTransaction.adminCommission}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Club Earnings</span>
                    <span className="font-semibold text-green-600">{selectedTransaction.clubEarnings}</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border-t-2 border-purple-300 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Your Commission</span>
                    <span className="font-bold text-xl text-purple-600">{selectedTransaction.adminCommission}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
  )
}
