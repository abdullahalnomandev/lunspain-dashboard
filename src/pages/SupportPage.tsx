import { Link } from "react-router-dom";

const SupportPage = () => {
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
        {/* Content */}
        <div className="px-10 py-12 text-[#11273b]">
          <h1 className="text-3xl font-semibold mb-2">
            Support Center
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            We're here to help. Get in touch with us for any questions or issues.
          </p>

          <div className="space-y-6 text-[16px] leading-7">
            <div>
              <h2 className="text-xl font-semibold mb-2">1. Contact Support</h2>
              <p>
                You can reach our support team via email at{" "}
                <a
                  href="mailto:support@lunaspin.app"
                  className="text-[#351a57] font-medium underline"
                >
                  support@lunaspin.com
                </a>{" "}
                or through the in-app chat for immediate assistance.
              </p>
              <p className="mt-2">
                For additional inquiries, contact{" "}
                <a
                  href="mailto:chriswatterston@dripfed.design"
                  className="text-[#351a57] font-medium underline"
                >
                  chriswatterston@dripfed.design
                </a>{" "}
                or call us at{" "}
                <a
                  href="tel:+447901660338"
                  className="text-[#351a57] font-medium underline"
                >
                  +44 7901 660338
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. Help Articles</h2>
              <p>
                Browse our collection of help articles and FAQs to find answers
                to common questions:{" "}
                <a
                  href="https://www.lunaspin.app/articles"
                  target="_blank"
                  className="text-[#351a57] font-medium underline"
                  rel="noreferrer"
                >
                  Help Center
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. Reporting Issues</h2>
              <p>
                If you encounter a bug or technical issue, please provide as much
                detail as possible, including screenshots and steps to reproduce
                the problem. This helps us resolve issues faster.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Feedback</h2>
              <p>
                We love hearing from our users! Share your ideas and suggestions
                to help us improve LunaSpin by emailing{" "}
                <a
                  href="mailto:feedback@lunaspin.com"
                  className="text-[#351a57] font-medium underline"
                >
                  feedback@lunaspin.app
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">5. Support Hours</h2>
              <p>
                Our support team is available Monday to Friday, 9 AM – 6 PM
                (GMT+6). We aim to respond to all inquiries within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1200px] mx-auto bg-[#351a57] text-[#d7cadd] py-12 text-sm">
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

export default SupportPage;
