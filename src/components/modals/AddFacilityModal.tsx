import { Button, Form, Input, Modal } from "antd";
import {useState } from "react";
import { PiImageThin } from "react-icons/pi";
import { useCreateFacilityMutation } from "../../redux/apiSlices/facilitySlice";
import { errorType } from "../../pages/authentication/Login";
import Swal from "sweetalert2";

const AddFacilityModal = ({ isOpen, setIsOpen }: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) => {

    const [form] = Form.useForm();
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const [createFacility, { isLoading,error}] = useCreateFacilityMutation();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    // useEffect(() => {
        
    // }, [isSuccess]);

    const OnFinish = async () => {
        const formData = new FormData();
        formData.append("name", form.getFieldValue("name"));
        if (imgFile) {
            formData.append("image", imgFile);
        }

        const result=await createFacility(formData).unwrap();
        
        if (result) {
            setIsOpen(false);
            form.resetFields();
            setImgFile(null);
            setImageUrl(undefined);
        }
        if(error){
            const errorMessage =
                (error as errorType)?.data?.errorMessages
                    ? (error as errorType)?.data?.errorMessages.map((msg: { message: string }) => msg?.message).join("\n")
                    : (error as errorType)?.data?.message || "Something went wrong. Please try again.";
            Swal.fire({
                title: "Failed to Login",
                text: errorMessage,
                icon: "error",
                timer: 1500,
                showConfirmButton: false
            })
        }
    }

    return (
        <Modal
            title={<p className="text-xl text-primary font-semibold mb-3">Add facility </p>}
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
                form.resetFields();
                setImgFile(null);
                setImageUrl(undefined);
            }}
            footer={null}
            width="500px"
            centered
        >
            <Form form={form} onFinish={OnFinish} layout="vertical">
                <Form.Item label={<p className="text-[14px] font-medium"> Facility Name </p>} name="name" rules={[{ required: true }]}>
                    <Input placeholder="Enter Facility Name" style={{ height: 42 }} />
                </Form.Item>

                <div className="py-[4px] w-full">
                    <p className="text-[14px] font-medium py-1 mb-2">Facility logo</p>
                    <label htmlFor="image" className="p-3 border border-[#BABABA] rounded-lg bg-white cursor-pointer block">
                        <div className="flex justify-center items-center w-full h-[180px] ">
                            {imageUrl ? (
                                <img src={imageUrl} style={{ height: "170px", width: "240px", borderRadius: 10, objectFit: "contain" }} alt="class" />
                            ) : (
                                <PiImageThin className="text-8xl text-[#666666]" />
                            )}
                        </div>
                    </label>
                    <div className="hidden">
                        <input id="image" type="file" accept="image/*" onChange={handleChange} className=" hidden" />
                    </div>

                </div>

                <Form.Item>
                    <div className="flex justify-end w-full mt-5">
                        <Button type="primary" loading={isLoading} htmlType="submit" style={{ height: 40, width: "200px" }}>
                            Save
                        </Button>
                    </div>
                </Form.Item>

            </Form>

        </Modal>
    );
};

export default AddFacilityModal;