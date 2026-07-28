import { Button, Form, Input, InputNumber, Modal, Select, Switch } from 'antd';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useCreateCouponMutation, useUpdateCouponMutation } from '../../../redux/apiSlices/couponSlice';
import { ICoupon } from '../../../types/types';

type CouponModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedCoupon: ICoupon | null;
};

export default function CouponModal({ isOpen, onClose, selectedCoupon }: CouponModalProps) {
    const [form] = Form.useForm();
    const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
    const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();

    useEffect(() => {
        if (selectedCoupon) {
            form.setFieldsValue({
                code: selectedCoupon.code,
                type: selectedCoupon.type,
                value: selectedCoupon.value,
                active: selectedCoupon.active,
            });
        } else {
            form.resetFields();
            form.setFieldsValue({ active: true, type: 'percent' });
        }
    }, [selectedCoupon, form, isOpen]);

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    const onFinish = async (values: {
        code: string;
        type: 'percent' | 'fixed';
        value: number;
        active: boolean;
    }) => {
        const payload = {
            code: values.code,
            type: values.type,
            value: values.value,
            active: values.active,
        };

        try {
            if (selectedCoupon) {
                await updateCoupon({ id: selectedCoupon._id, data: payload }).unwrap();
                Swal.fire('Updated!', 'Coupon has been updated successfully.', 'success');
            } else {
                await createCoupon(payload).unwrap();
                Swal.fire('Created!', 'Coupon has been created successfully.', 'success');
            }
            handleClose();
        } catch {
            Swal.fire('Error!', 'Failed to save coupon.', 'error');
        }
    };

    return (
        <Modal
            title={selectedCoupon ? 'Edit Coupon' : 'Create Coupon'}
            open={isOpen}
            onCancel={handleClose}
            footer={null}
            width={500}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={onFinish} className="pt-2">
                <Form.Item
                    name="code"
                    label="Code"
                    rules={[{ required: true, message: 'Please enter coupon code' }]}
                >
                    <Input placeholder="Coupon code" />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Please select coupon type' }]}
                >
                    <Select
                        placeholder="Select type"
                        options={[
                            { value: 'percent', label: 'Percent' },
                            { value: 'fixed', label: 'Fixed' },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="value"
                    label="Value"
                    rules={[{ required: true, message: 'Please enter coupon value' }]}
                >
                    <InputNumber className="w-full" min={0} placeholder="Value" />
                </Form.Item>

                <Form.Item name="active" label="Active" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item className="mb-0 text-right">
                    <Button onClick={handleClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={isCreating || isUpdating}>
                        {selectedCoupon ? 'Update' : 'Create'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
