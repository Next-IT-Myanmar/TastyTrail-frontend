import React, { useEffect } from 'react';

const PrivacyPolicy = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          </div>
          <div className="pb-4">
            <p>Effective Date: July 14, 2025</p>
            <p>Last Updated: July 14, 2025</p>
          </div>
          <div className='pb-4'>
            <p>
              At MM Trasty Trail, your privacy is important to us. This Privacy Policy explains how we collect, use, and 
              protect your information when you use our mobile application and website.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Information We Collect</h2>
              <p className='pb-3'>
                We may collect the following information:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Personal Information: We are not collecting any data.</li>
                <li>Location Information: If you allow location access, we may use it to show Myanmar restaurants.</li>
                <li>Device Information: Browser type, device type, and IP address for analytics purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">How We Use Your Information</h2>
              <p className='pb-3'>
                We use the collected data to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide app functionality (e.g., find restaurants)</li>
                <li>Improve user experience and app performance</li>
                <li>Analyze user interaction for improvement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Sharing Your Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell or rent your personal information. We may share it with trusted service providers 
                who help us operate the app and site, under strict confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Cookies and Tracking</h2>
              <p className='pb-3'>
                We use cookies on our website for:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Analytics (Google Analytics or similar tools)</li>
                <li>User experience enhancements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Data Security</h2>
              <p className="pb-3">
                We implement security measures to protect your data from unauthorized access, 
                but please understand that no digital platform is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Your Rights</h2>
              <p className="pb-3">
                You may:
              </p>
              <p>Request to view or delete your personal data</p>
              <p>Opt out of communications at any time</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
              <p className="pb-3">
                If you have questions, please contact us at:
              </p>
              <p>Email: legal@mmtastytrail.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;