import PageHeader from "@/components/ui/PageHeader";

export const metadata = {
  title: "Frequently Asked Questions | Admissions Topper",
  description: "Find answers to common questions regarding admissions and our services.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "What services does Admissions Topper provide?",
      a: "We provide comprehensive admission guidance, career counselling, and placement assistance for students pursuing engineering, medical, paramedical, and diploma courses across top colleges in India."
    },
    {
      q: "Is the counselling service free?",
      a: "Yes, our initial career counselling and guidance session is completely free. We help you pick the right college based on your budget and academic profile."
    },
    {
      q: "Which regions do you cover?",
      a: "We have strong tie-ups with reputed institutions in Bangalore, Mangalore, Kerala, and Tamil Nadu, ensuring a wide range of options for our students."
    },
    {
      q: "How can I apply for a specific course?",
      a: "You can navigate to the specific course page or select a college of your choice, and click 'Apply Now', or simply fill out our 'Free Counselling' form and our team will get back to you immediately."
    }
  ];

  return (
    <>
      <PageHeader title="FAQs & Help" breadcrumb="FAQ" />
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-secondary mb-3">{faq.q}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
