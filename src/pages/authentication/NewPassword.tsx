import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router';

const NewPassword = () => {
    const navigate = useNavigate();
    // const searchParams = new URLSearchParams(window.location.search);
    // const token = searchParams.get("token");

    const onFinish = async (values: { password: string; confirmPassword: string }) => {
        // const token = values.password ==: values.confirmPassword
        // if (token) {
        //     navigate('/verify-otp', { state: { token: token } });
        // }
        // console.log('Received values of form: ', values);
        console.log(values);
        navigate('/login');
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#083A65',

                    colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 10,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div
                className="flex items-center justify-center h-screen !bg-gradient-to-b !from-[#540D6E] !to-[#13293D]"
                style={{}}
            >
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10 ">
                    <div className=" max-w-md mx-auto space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2 text-[#540D6E]">Set a new password</h1>
                        <p>Create a new password. Ensure it differs from previous ones for security</p>
                    </div>

                    <Form
                        name="normal_NewPassword"
                        className="NewPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    New Password
                                </label>
                            }
                            name="new_password"
                            rules={[{ required: true, message: 'Please input new password!' }]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className=" h-12 px-6" />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Confirm Password
                                </label>
                            }
                            name="confirm_password"
                            rules={[{ required: true, message: 'Please input confirm password!' }]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                    backgroundColor: '#36C9B8',
                                    color: '#fff',
                                }}
                            >
                                Update Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
