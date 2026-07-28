import { Button, Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import {
    useCreateTagMutation,
    useGetCategoriesQuery,
    useUpdateTagMutation,
} from '../../../redux/apiSlices/tagSlice';
import { ITag } from '../../../types/types';

type TagModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedTag: ITag | null;
};

const getCategoryId = (category: ITag['category']) => {
    if (!category) return undefined;
    return typeof category === 'string' ? category : category._id;
};

export default function TagModal({ isOpen, onClose, selectedTag }: TagModalProps) {
    const [form] = Form.useForm();
    const { data: categories } = useGetCategoriesQuery({});
    const [createTag, { isLoading: isCreating }] = useCreateTagMutation();
    const [updateTag, { isLoading: isUpdating }] = useUpdateTagMutation();

    const categoryOptions =
        categories?.data?.map((category: { _id: string; name: string }) => ({
            value: category._id,
            label: category.name,
        })) || [];

    useEffect(() => {
        if (selectedTag) {
            form.setFieldsValue({
                name: selectedTag.name,
                short_code: selectedTag.short_code,
                category: getCategoryId(selectedTag.category),
            });
        } else {
            form.resetFields();
        }
    }, [selectedTag, form, isOpen]);

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    const onFinish = async (values: { name: string; short_code?: string; category?: string }) => {
        const payload = {
            name: values.name,
            short_code: values.short_code,
            category: values.category,
        };

        try {
            if (selectedTag) {
                await updateTag({ id: selectedTag._id, data: payload }).unwrap();
                Swal.fire('Updated!', 'Tag has been updated successfully.', 'success');
            } else {
                await createTag(payload).unwrap();
                Swal.fire('Created!', 'Tag has been created successfully.', 'success');
            }
            handleClose();
        } catch {
            Swal.fire('Error!', 'Failed to save tag.', 'error');
        }
    };

    return (
        <Modal
            title={selectedTag ? 'Edit Tag' : 'Create Tag'}
            open={isOpen}
            onCancel={handleClose}
            footer={null}
            width={500}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={onFinish} className="pt-2">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter tag name' }]}
                >
                    <Input placeholder="Tag name" />
                </Form.Item>

                <Form.Item className="mb-0 text-right">
                    <Button onClick={handleClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={isCreating || isUpdating}>
                        {selectedTag ? 'Update' : 'Create'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
