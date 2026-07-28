import { Avatar, Modal, Tabs, Tag } from 'antd';
import { imageUrl } from '../../../redux/api/baseApi';

export default function UserModal({
    isModalOpen,
    handleModalClose,
    selectedUser,
}: {
    isModalOpen: boolean;
    handleModalClose: () => void;
    selectedUser: any;
}) {
    const tabItems = [
        {
            key: 'information',
            label: 'Information',
            children: selectedUser && (
                <div className="space-y-4">
                    <div className="flex items-center space-x-4 pb-4 border-b">
                        <Avatar src={selectedUser.profile.image.startsWith('https') ? selectedUser.profile.image : imageUrl + selectedUser.profile.image} size={64} />
                        <div>
                            <h3 className="text-lg font-semibold">{selectedUser.profile.firstName} {selectedUser.profile.lastName}</h3>
                            <p className="text-gray-500 text-sm">{selectedUser.profile.username}</p>
                            <Tag color="success" className="mt-1">
                                Active
                            </Tag>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-500 text-sm">Email</p>
                            <p className="text-gray-800">{selectedUser.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Date of Birth</p>
                            <p className="text-gray-800">
                                {selectedUser?.profile?.date_of_birth
                                    ? new Date(selectedUser.profile.date_of_birth).toLocaleDateString()
                                    : 'N/A'}
                            </p>
                        </div>
                   
                        <div>
                            <p className="text-gray-500 text-sm">Country</p>
                            <p className="text-gray-800">{selectedUser?.profile?.country}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Skills</p>
                            <p className="text-gray-800">
                                {Array.isArray(selectedUser?.profile?.skills)
                                    ? selectedUser.profile.skills
                                          .map((skill: any) =>
                                              typeof skill === 'string'
                                                  ? skill
                                                  : skill?.name || ''
                                          )
                                          .filter(Boolean)
                                          .join(', ')
                                    : 'N/A'}
                            </p>
                       
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Experience</p>
                            <p className="text-gray-800">{selectedUser?.profile?.year_of_exprience}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Experience level</p>
                            <p className="text-gray-800">{selectedUser?.profile?.lavel_of_exprience}</p>
                        </div>
                    </div>
                </div>
            ),
        },
        // {
        //     key: 'upload',
        //     label: 'Upload',
        //     children: selectedUser && (
        //         <div>
        //             <h3 className="text-xl font-semibold mb-4">Upload Content</h3>
        //             <h4 className="text-purple-600 text-sm font-medium mb-4">Recent Posts</h4>

        //             {selectedUser.recentPosts && selectedUser.recentPosts.length > 0 ? (
        //                 <div className="grid grid-cols-3 gap-4">
        //                     {selectedUser.recentPosts.map((post: any) => (
        //                         <div key={post.id} className="rounded-lg overflow-hidden shadow">
        //                             <img
        //                                 src={
        //                                     post?.profile?.image.startsWith('https')
        //                                         ? post?.profile?.image
        //                                         : imageUrl + post?.image
        //                                 }
        //                                 alt={post.title}
        //                                 className="w-full h-48 object-cover"
        //                             />
        //                             <div className="p-3 bg-white">
        //                                 <p className="font-medium text-sm">{post.title}</p>
        //                                 <p className="text-gray-500 text-xs mt-1">{post.date}</p>
        //                             </div>
        //                         </div>
        //                     ))}
        //                 </div>
        //             ) : (
        //                 <p className="text-gray-500 text-center py-8">No posts yet</p>
        //             )}
        //         </div>
        //     ),
        // },
    ];
    console.log(selectedUser);
    return (
        <Modal title="User Details" open={isModalOpen} onCancel={handleModalClose} footer={null} width={600}>
            <Tabs items={tabItems} />
        </Modal>
    );
}
