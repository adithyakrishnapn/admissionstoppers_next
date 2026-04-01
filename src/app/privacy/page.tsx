import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Privacy Policy | Admissions Topper",
  description: "Read our privacy policy and understand how we protect your educational queries and data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" breadcrumb="Privacy" />
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-lg prose-primary">
          <h2 className="text-3xl font-bold text-secondary mb-6">1. Information Collection</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            At Admissions Topper, we collect personal information such as your name, email address, phone number, and educational background when you register for free counselling or apply through our forms. This helps us tailor our educational consulting services to your exact requirements.
          </p>

          <h2 className="text-3xl font-bold text-secondary mb-6">2. Use of Information</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The data collected is used solely to facilitate the admission process, communicate updates, and provide personalized advice on selecting the best colleges in regions like Bangalore, Mangalore, Kerala, and Tamil Nadu. We do not sell your data to third parties.
          </p>

          <h2 className="text-3xl font-bold text-secondary mb-6">3. Data Security</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We implement advanced security measures to maintain the safety of your personal information. Our platform uses modern encryption standard to protect submitted data, especially documents regarding academic credentials.
          </p>
          
          <h2 className="text-3xl font-bold text-secondary mb-6">4. Contact Us</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            If there are any questions regarding this privacy policy, you may contact us using the information on our Contact page or directly at admissionstopper.edu@gmail.com.
          </p>
        </div>
      </div>
    </>
  );
}
