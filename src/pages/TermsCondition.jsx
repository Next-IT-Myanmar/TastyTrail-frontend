import React, {useEffect} from 'react';

const TermsCondition = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          </div>
          <div className="pb-4">
            <p>Effective Date: July 14, 2025</p>
            <p>Last Updated: July 14, 2025</p>
          </div>
          <div className='pb-4'>
            <p>
            Welcome to MM Tasty Trail! By accessing or using our mobile application and website, 
            you agree to be bound by the following Terms of Use.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Use of Our Services</h2>
              <p>
              You agree to use the app and website only for lawful purposes. 
              You must not misuse or attempt to interfere with the app’s operation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Intellectual Property</h2>
              <p>
              All content, logos, and design elements on this app and website are owned or 
              licensed by us and are protected by copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">User Content</h2>
              <p className="pb-3">
              If you submit restaurant suggestions or reviews:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>You confirm the content is accurate and lawful.</li>
                <li>You grant us permission to use, display, or publish it within the app or website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
              Our app may link to third-party services (e.g., map services, exchange rate APIs). 
              We are not responsible for their content or practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Limitation of Liability</h2>
              <p>
              We strive for accuracy, but we make no guarantees regarding restaurant listings or currency rates. 
              We are not liable for any direct or indirect damages arising from your use of the app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Changes to Terms</h2>
              <p>
              We may update these Terms occasionally. Continued use of the app means you accept any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Contact</h2>
              <p className="pb-3">
              If you have questions or concerns:
              </p>
              <p>Email: customercare@mmtastytrail.com</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;