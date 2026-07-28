'use client';
import { Button, Checkbox, ConfigProvider, Form, Input, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/apiSlices/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const onFinish = async (values: { email: string; password: string; remember: boolean }) => {
        try {
            const response = await login({ ...values, auth_provider: 'local' }).unwrap(); // unwrap returns the data or throws error

            // Save token
            if (response?.data?.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/');
                message.success('Login successful!');
                navigate('/');
            } else {
                message.error('Login failed. Please try again.');
            }
        } catch (error: any) {
            // Error from API
            const errorMessage = error?.data?.message || error?.error || 'Something went wrong!';
            message.error(errorMessage);
        }
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
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                    },
                },
            }}
        >
            <div className="flex items-center justify-center h-screen !bg-gradient-to-b !from-[#540D6E] !to-[#13293D]">
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10">
                    <div className="space-y-3 text-center">
                        <h1 className="text-3xl text-[#540D6E] font-medium mt-2">Login to Account</h1>
                    </div>

                    <Form
                        name="login_form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        className="mt-6"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Enter a valid email!' },
                            ]}
                        >
                            <Input placeholder="Enter your email address" className="h-12 px-6" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" className="h-12 px-6" />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-4">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="text-primaryText text-lg">Remember me</Checkbox>
                            </Form.Item>
                            <span
                                className="text-primary text-md cursor-pointer"
                                onClick={() => navigate('/forget-password')}
                            >
                                Forget password
                            </span>
                        </div>

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className="!bg-[#36C9B8] text-white font-medium h-12 w-full flex justify-center items-center"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spin size="small" /> : 'Sign In'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;
