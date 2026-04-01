import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Terms & Conditions | Admissions Topper",
  description: "Terms and conditions of using Admissions Topper's educational consultancy services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms & Conditions" breadcrumb="Terms" />
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-lg prose-primary">
          <h2 className="text-3xl font-bold text-secondary mb-6">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            By accessing and using Admissions Topper, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website.
          </p>

          <h2 className="text-3xl font-bold text-secondary mb-6">2. Services Provided</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We offer educational consultancy, career guidance, and assistance in the admission process for courses in engineering, medicine, and diploma programs across prominent universities in India. We do not guarantee admission, which relies entirely on the student's merits and the university's discretion.
          </p>

          <h2 className="text-3xl font-bold text-secondary mb-6">3. User Responsibilities</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            You must provide accurate and complete information during the counselling process. Any discrepancy in academic documents provided may result in termination of our consultancy services and rejection from the respective universities.
          </p>
          
          <h2 className="text-3xl font-bold text-secondary mb-6">4. Modifications</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Admissions Topper reserves the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms and conditions.
          </p>
        </div>
      </div>
    </>
  );
}
