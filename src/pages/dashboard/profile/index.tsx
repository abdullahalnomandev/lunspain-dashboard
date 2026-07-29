import { useEffect, useRef, useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, CameraOutlined } from '@ant-design/icons';
import { Tabs, Button, Input, message, Avatar, Form, Skeleton } from 'antd';
import {
  useProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  PROFILE_QUERY_ARG,
} from '../../../redux/apiSlices/authSlice';
import { imageUrl } from '../../../redux/api/baseApi';
import { IAuthUser } from '../../../types/types';

const profileFormFields = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'Enter your first name',
    rules: [{ required: true, message: 'Please enter your first name!' }]
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter your last name',
    rules: [{ required: true, message: 'Please enter your last name!' }]
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    disabled: true,
    rules: [
      { required: true, message: 'Please enter your email!' },
      { type: 'email', message: 'Please enter a valid email!' }
    ]
  }
];

const passwordFormFields = [
  {
    name: 'currentPassword',
    label: 'Current Password',
    placeholder: 'Enter current password',
    rules: [{ required: true, message: 'Please enter your current password!' }],
    type: 'password'
  },
  {
    name: 'newPassword',
    label: 'New Password',
    placeholder: 'Enter new password',
    rules: [{ required: true, message: 'Please enter your new password!' }],
    type: 'password'
  },
  {
    name: 'confirmPassword',
    label: 'Confirm New Password',
    placeholder: 'Confirm new password',
    dependencies: ['newPassword'],
    type: 'password',
    rules: [
      { required: true, message: 'Please confirm your new password!' },
      ({ getFieldValue }: any) => ({
        validator(_: any, value: string) {
          if (!value || getFieldValue('newPassword') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Passwords do not match!'));
        }
      })
    ]
  }
];

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const getProfileImage = (image?: string) => {
  if (!image) return 'https://i.ibb.co/z5YHLV9/profile.png';
  if (image.startsWith('https')) return image;
  return imageUrl + image;
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('1');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const [profileForm] = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm<PasswordFormValues>();

  const { data: profileResponse, isLoading: isProfileLoading } = useProfileQuery(PROFILE_QUERY_ARG);
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const profile = profileResponse?.data as IAuthUser | undefined;

  useEffect(() => {
    if (!profile) return;

    profileForm.setFieldsValue({
      firstName: profile.profile?.firstName || '',
      lastName: profile.profile?.lastName || '',
      email: profile.email || '',
    });
  }, [profile, profileForm]);

  const handleProfileSubmit = async (values: ProfileFormValues) => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);

    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    try {
      await updateProfile(formData).unwrap();

      message.success('Profile updated successfully!');
      setImageFile(null);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(undefined);
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.error || 'Failed to update profile!';
      message.error(errorMessage);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    event.target.value = '';
  };

  // Pass confirmPassword in the body to changePassword mutation
  const handlePasswordSubmit = async (values: PasswordFormValues) => {
    try {
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }).unwrap();

      message.success('Password changed successfully!');
      passwordForm.resetFields();
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.error || 'Failed to change password!';
      message.error(errorMessage);
    }
  };

  const togglePasswordVisibility = (field: 'currentPassword' | 'newPassword' | 'confirmPassword') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const renderFields = (
    fields: typeof profileFormFields | typeof passwordFormFields,
    isPassword?: boolean
  ) =>
    fields.map((field: any) => {
      if (isPassword) {
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={
              <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            }
            dependencies={field.dependencies}
            rules={field.rules}
          >
            <div className="relative">
              <Input
                size="large"
                type={
                  showPasswords[field.name as keyof typeof showPasswords] ? 'text' : 'password'
                }
                placeholder={field.placeholder}
                className="rounded-lg pr-10"
                autoComplete="off"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => togglePasswordVisibility(field.name as 'currentPassword' | 'newPassword' | 'confirmPassword')}
              >
                {showPasswords[field.name as keyof typeof showPasswords] ? (
                  <EyeOutlined className="text-lg" />
                ) : (
                  <EyeInvisibleOutlined className="text-lg" />
                )}
              </span>
            </div>
          </Form.Item>
        );
      }

      return (
        <Form.Item
          key={field.name}
          name={field.name}
          label={
            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
          }
          rules={field.rules}
        >
          <Input
            size="large"
            placeholder={field.placeholder}
            className="rounded-lg"
            disabled={field.disabled}
            autoComplete={field.name === 'email' ? 'email' : undefined}
          />
        </Form.Item>
      );
    });

  const profileImage = imagePreview || getProfileImage(profile?.profile?.image);

  const tabItems = [
    {
      key: '1',
      label: 'Profile Info',
      children: (
        <div className="space-y-6">
          <div className="flex flex-col items-center ">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="relative">
              {isProfileLoading ? (
                <Skeleton.Avatar active size={120} />
              ) : (
                <Avatar
                  size={120}
                  src={profileImage}
                  className="border-4 border-teal-50"
                />
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-2 cursor-pointer hover:bg-teal-600 transition border-0"
                aria-label="Upload profile image"
              >
                <CameraOutlined className="text-white text-lg" />
              </button>
            </div>
          </div>
          {isProfileLoading ? (
            <Skeleton active paragraph={{ rows: 4 }} />
          ) : (
            <Form
              form={profileForm}
              name="profileForm"
              layout="vertical"
              onFinish={handleProfileSubmit}
              requiredMark={false}
            >
              {renderFields(profileFormFields)}
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={isUpdatingProfile}
                  className="bg-teal-500 hover:bg-teal-600 rounded-lg h-10 text-base font-semibold"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      )
    },
    {
      key: '2',
      label: 'Change Password',
      children: (
        <div className="space-y-6">
          <Form
            form={passwordForm}
            name="passwordForm"
            layout="vertical"
            onFinish={handlePasswordSubmit}
            requiredMark={false}
          >
            {renderFields(passwordFormFields, true)}
            <Form.Item>
              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                loading={isChangingPassword}
                className="bg-teal-500 hover:bg-teal-600 rounded-lg h-12 text-base font-semibold"
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </div>
      )
    }
  ];

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
