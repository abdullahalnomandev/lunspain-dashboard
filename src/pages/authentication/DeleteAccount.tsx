import { ConfigProvider } from 'antd';

const steps = [
  {
    title: 'Settings & Privacy',
    description: 'Go to your account settings and privacy options.',
    image: '/st-1.png',
  },
  {
    title: 'Privacy Settings',
    description: 'Adjust your privacy settings for your account.',
    image: '/st-2.png',
  },
  {
    title: 'Privacy',
    description: 'Review your privacy options carefully before deletion.',
    image: '/st-3.png',
  },
  {
    title: 'Delete Account',
    description: 'Confirm your account deletion in the final step.',
    image: '/st-4.png',
  },
];

const DeleteAccountSteps = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#083A65',
          colorBgContainer: '#F1F4F9',
        },
      }}
    >
      <div className="min-h-screen bg-gradient-to-b from-[#540D6E] to-[#13293D] flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-bold text-white mb-16 text-center">
          How to Delete Your Account
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-[1000px] w-full">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Bigger image */}
              <img
                src={step.image}
                alt={step.title}
                className="w-full max-w-[300px] h-auto mb-6 object-contain"
              />
              <h2 className="text-2xl font-semibold text-[#540D6E] mb-3">
                {index + 1}. {step.title}
              </h2>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DeleteAccountSteps;
