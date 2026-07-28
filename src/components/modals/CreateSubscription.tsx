import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { CiCircleMinus } from 'react-icons/ci';
import { FaCircleCheck } from 'react-icons/fa6';
import { GoPlusCircle } from 'react-icons/go';
import { useCreatePackageMutation, useEditPackageMutation } from '../../redux/apiSlices/packageSlice';
import Swal from 'sweetalert2';
import { IPackage } from '../../types/types';

const CreateSubscription = ({ open, setOpen, items }: { open: boolean, setOpen: (open: boolean) => void, items: IPackage | undefined }) => {
    const [createPackage, { isLoading }]=useCreatePackageMutation()
    const [updatePackage,{isLoading:updateLoading}]=useEditPackageMutation()
    const [form] = Form.useForm()

    useEffect(() => {
        if (items) {
            form.setFieldsValue({ title: items?.title, price: items?.price, features: items?.features, description: items?.description })
        }
    }, [items, form])


    const onFinish =async (values: any) => {
        const packagel:IPackage={
            ...values,
            billingCycle:"add-on",
        }
        
        

        if(!items){
            const result =  await createPackage(packagel).unwrap()
        

        if(!result.error){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Package has been updated',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setOpen(false)
                form.resetFields()
            }).catch((error) => {
                console.log(error)
             
            })
        }
        else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: result.error,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setOpen(false)
                form.resetFields()
            }).catch((error) => {
                console.log(error)
             
            })
        }
        }
        else{
            const result =  await updatePackage({data:packagel,id:items?._id}).unwrap()
            if(!result.error){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Package has been updated',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setOpen(false)
                    form.resetFields()
                }).catch((error) => {
                    console.log(error)
                 
                })
            }
            else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: result.error,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setOpen(false)
                    form.resetFields()
                }).catch((error) => {
                    console.log(error)
                 
                })
            }
        }
        
    };

    return (
        <div>
            <Modal
                centered
                open={open}
                onCancel={() => {
                    // null;
                    form.resetFields()
                    setOpen(false);
                }}
                width={500}
                footer={false}
            >
                <div className="">
                    <h1
                        className="font-semibold text-[#555555] text-xl"
                        style={{ marginBottom: "10px", marginTop: "8px" }}
                    >
                        {"Update Subscription"}
                    </h1>
                    <Form layout="vertical" form={form} onFinish={onFinish} className='p-3 '>
                        <div>
                            <Form.Item
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Package Name",
                                    },
                                ]}
                                
                                label={<p className="text-[#6D6D6D]"> Package Name</p>}
                            >
                                <Input
                                    className="w-[100%] border outline-none px-3 py-[8px]"
                                    type="text"
                                />
                            </Form.Item>

                            <Form.Item
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Package Price ",
                                    },
                                ]}
                                label={<p className="text-[#6D6D6D]"> Package Price</p>}
                            >
                                <Input
                                    className="w-[100%] border outline-none px-3 py-[8px]"
                                    type="text"
                                />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input Package Price ",
                                    },
                                ]}
                                label={<p className="text-[#6D6D6D]"> Package Description</p>}
                            >
                                <Input
                                    className="w-[100%] border outline-none px-3 py-[8px]"
                                    type="text"
                                />
                            </Form.Item>


                            <p className="text-[#6D6D6D]"> Features</p>
                            <Form.Item
                                style={{ border: "1px solid #E7EBED", borderRadius: 8 }}
                                className='p-2'
                            >
                                <Form.List name={"features"}  >
                                    {
                                        (fields, { add, remove }) => (
                                            <>
                                                {
                                                    fields.map((field, index) => {
                                                        return (
                                                            <Form.Item
                                                                required={false}
                                                                key={index}
                                                                className="w-full"
                                                                style={{ marginBottom: 0 }}
                                                            >
                                                                <div className='flex items-center mb-2 gap-[30px] w-full'>
                                                                    <Form.Item
                                                                        name={field.name}
                                                                        fieldKey={field.fieldKey}
                                                                        validateTrigger={['onChange', 'onBlur']}
                                                                        style={{ marginBottom: 0 }}
                                                                        className='w-full'
                                                                    >
                                                                        <Input
                                                                            style={{
                                                                                width: "100%",
                                                                                height: 40,
                                                                                border: "1px solid #E7EBED",
                                                                                background: "transparent",
                                                                                borderRadius: "none",
                                                                                outline: "none",
                                                                                color: "#415D71",
                                                                            }}
                                                                            placeholder='Enter Package Services'
                                                                            className='roboto-regular text-sm leading-5'
                                                                            prefix={<FaCircleCheck size={20} style={{ marginRight: 5 }} color='#12354E' />}
                                                                        />
                                                                    </Form.Item>
                                                                    <div>
                                                                        {
                                                                            fields.length > 0 ? (
                                                                                <CiCircleMinus
                                                                                    size={30}
                                                                                    className="dynamic lete-button cursor-pointer text-[#D7263D]"
                                                                                    onClick={() => remove(field.name)}
                                                                                />
                                                                            )
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Form.Item>
                                                        )
                                                    })
                                                }

                                                <Form.Item
                                                    style={{ width: "100%", margin: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}
                                                >
                                                    <GoPlusCircle
                                                        size={30}
                                                        color='#12354E'
                                                        onClick={() => add()}
                                                    />
                                                </Form.Item>
                                            </>
                                        )
                                    }
                                </Form.List>
                            </Form.Item>

                        </div>


                        <Form.Item className="text-center mt-8">
                            <Button onClick={()=> form.submit()} loading={isLoading || updateLoading} className=' bg-primary text-white w-[120px] h-[42px] rounded-lg'>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default CreateSubscription;