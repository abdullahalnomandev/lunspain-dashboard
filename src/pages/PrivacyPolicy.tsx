import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  const year = new Date().getFullYear();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#351a57",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-6 text-white flex justify-between items-center">
        <Link to="/">
          <img src="/logo-lunaspin.png" alt="LunaSpin" className="h-10" />
        </Link>
      </div>

      {/* White Card Container */}
      <div className="max-w-[1200px] mx-auto bg-white rounded-t-2xl overflow-hidden shadow-lg">
        {/* Banner */}
        <img
          src="/banner.jpg" // replace with your banner
          alt=""
          className="w-full"
        />

        {/* Content */}
        <div className="px-10 py-12 text-[#11273b]">
          <h1 className="text-3xl font-semibold mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last updated: {year}
          </p>

          <div className="space-y-6 text-[16px] leading-7">
            <p>
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your information when
              you use our website and services.
            </p>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                1. Information We Collect
              </h2>
              <p>
                We may collect personal information such as your name, email
                address, account credentials, and usage data when you register,
                make purchases, or interact with our platform. We also collect
                technical information including IP address, browser type, and
                device information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                2. How We Use Your Information
              </h2>
              <p>
                We use collected information to operate and improve our
                services, process transactions, communicate with users,
                personalize experiences, and maintain platform security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                3. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal data. However, no method of
                transmission over the internet is completely secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                4. Third-Party Services
              </h2>
              <p>
                We may use trusted third-party providers to assist in operating
                our services. These providers only access personal data to
                perform specific tasks on our behalf.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                5. Your Rights
              </h2>
              <p>
                Depending on your location, you may have rights to access,
                update, correct, or delete your personal information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                6. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, contact us at{" "}
                <a
                  href="mailto:support@yourdomain.com"
                  className="text-[#351a57] font-medium underline"
                >
                  support@yourdomain.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1200px] mx-auto bg-[#351a57]  text-[#d7cadd] py-12 text-sm">
        <div className="border-t border-[#d7cadd] pt-6 mb-6"></div>

        <p className="font-semibold text-lg">
          DISCOVER & INSPIRE AT <br /> LUNASPIN.APP
        </p>

        <p className="mt-4 text-xs">
          © {year} Drip Fed Ltd t/a LunaSpin App. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
