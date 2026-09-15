const legalContent = {
  terms: {
    title: "Terms of Service",
    intro:
      "These terms apply when you browse, create an account, or make a purchase through RST Store.",
    sections: [
      {
        heading: "Using RST Store",
        body: "Please provide accurate account and order information and use the store only for lawful purposes. You are responsible for activity completed through your account.",
      },
      {
        heading: "Orders and payments",
        body: "Submitting an order is a request to buy the selected items. Prices, availability, and order acceptance may change before an order is confirmed. Payment is processed through the payment method selected at checkout.",
      },
      {
        heading: "Questions",
        body: "For questions about an order or these terms, sign in and contact us through the Support Center.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "This policy explains how RST Store handles information used to provide shopping and account services.",
    sections: [
      {
        heading: "Information we use",
        body: "We use the account, contact, shipping, order, and support information you provide to manage your account, fulfil purchases, and respond to requests.",
      },
      {
        heading: "How information is shared",
        body: "Information is shared only as needed to process orders and payments, deliver purchases, operate the store, or meet legal obligations.",
      },
      {
        heading: "Your choices",
        body: "You can review and update account details from your profile. For privacy questions or requests, sign in and contact us through the Support Center.",
      },
    ],
  },
};

const LegalScreen = ({ type }) => {
  const content = legalContent[type];

  return (
    <main className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl rounded-xl bg-slate-50 p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {content.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {content.intro}
        </p>
        <div className="mt-8 space-y-7">
          {content.sections.map(({ heading, body }) => (
            <section key={heading}>
              <h2 className="text-lg font-semibold text-slate-900">{heading}</h2>
              <p className="mt-2 leading-7 text-slate-600">{body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
};

export const TermsOfServiceScreen = () => <LegalScreen type="terms" />;

export const PrivacyPolicyScreen = () => <LegalScreen type="privacy" />;
