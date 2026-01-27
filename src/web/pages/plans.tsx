import { useState, useEffect } from "react";
import { Link } from "wouter";

const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "29.90",
    period: "/month",
    description: "Perfect for trying out the experience",
    popular: false,
    benefits: [
      "2-for-1 at all partner restaurants",
      "Unlimited monthly uses",
      "Digital membership card",
      "Email support",
      "Cancel anytime",
    ],
  },
  {
    id: "annual",
    name: "Annual",
    price: "299",
    period: "/year",
    description: "Best value for food enthusiasts",
    popular: true,
    savings: "Save 16%",
    benefits: [
      "2-for-1 at all partner restaurants",
      "Unlimited uses all year",
      "Digital membership card",
      "Priority support",
      "Cancel anytime",
      "Exclusive restaurant previews",
      "Birthday bonus offer",
      "Access to VIP events",
    ],
  },
  {
    id: "family",
    name: "Family",
    price: "449",
    period: "/year",
    description: "Share the savings with loved ones",
    popular: false,
    benefits: [
      "2-for-1 for up to 4 members",
      "Unlimited uses for all",
      "4 digital membership cards",
      "Priority support",
      "Cancel anytime",
      "Exclusive restaurant previews",
      "Birthday bonus for all members",
      "Family-friendly venues highlighted",
    ],
  },
];

const FAQS = [
  {
    question: "How does the 2-for-1 offer work?",
    answer: "When you dine at any of our partner restaurants, simply order two main courses and only pay for one. The cheaper or equal-value dish is complimentary. It's that simple – no complicated vouchers, no minimum spend.",
  },
  {
    question: "Can I use my membership at any restaurant, any day?",
    answer: "Yes! Your membership works at all 500+ partner restaurants. Some venues may have specific availability (lunch or dinner), but there are no blackout dates or day-of-week restrictions.",
  },
  {
    question: "How quickly will I see a return on my investment?",
    answer: "Most members save more than their annual fee in just 2-3 restaurant visits. With an average main course costing R$70-150 at our partner restaurants, you're looking at R$70-150 in savings per visit.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel your subscription at any time through your account settings. Your benefits will remain active until the end of your current billing period.",
  },
  {
    question: "How does the Family Plan work?",
    answer: "The Family Plan allows up to 4 people to be registered under one account. Each member gets their own digital card and can use the 2-for-1 benefit independently. Perfect for families or couples who dine together frequently.",
  },
  {
    question: "What if my favorite restaurant isn't a partner?",
    answer: "We're always expanding our network! You can suggest restaurants through our app, and we actively reach out to popular venues. Many of our best partners came from member suggestions.",
  },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-slate-900/20" : "bg-slate-900"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-display text-xl font-bold text-white">Clube Gourmet</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors font-medium">Home</Link>
            <Link href="/restaurants" className="text-slate-300 hover:text-white transition-colors font-medium">Restaurants</Link>
            <Link href="/plans" className="text-emerald-400 font-medium">Plans</Link>
            <Link href="/plans" className="px-6 py-2.5 bg-gradient-to-r from-coral-500 to-coral-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-coral-500/30 transition-all hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-coral-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-sm font-medium">Join 15,000+ Happy Members</span>
        </span>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Choose Your
          <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-coral-400 bg-clip-text text-transparent">
            Savings Plan
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          One dinner out pays for your entire year. Stop paying full price at restaurants you love.
        </p>
      </div>
    </section>
  );
}

interface PlanCardProps {
  plan: typeof PLANS[0];
}

function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className={`relative rounded-3xl p-8 transition-all duration-500 ${
      plan.popular 
        ? "bg-gradient-to-b from-emerald-600 to-emerald-700 text-white scale-105 shadow-2xl shadow-emerald-600/30 lg:-mt-6 lg:mb-6" 
        : "bg-white border border-slate-200 hover:border-emerald-200 hover:shadow-xl"
    }`}>
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 bg-coral-500 text-white text-sm font-bold rounded-full shadow-lg shadow-coral-500/30">
            Most Popular
          </span>
        </div>
      )}

      {/* Savings badge */}
      {plan.savings && (
        <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-sm font-semibold ${
          plan.popular ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
        }`}>
          {plan.savings}
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className={`font-display text-2xl font-bold mb-2 ${plan.popular ? "text-white" : "text-slate-900"}`}>
          {plan.name}
        </h3>
        <p className={`text-sm ${plan.popular ? "text-emerald-100" : "text-slate-500"}`}>
          {plan.description}
        </p>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center gap-1">
          <span className={`text-lg ${plan.popular ? "text-emerald-100" : "text-slate-500"}`}>R$</span>
          <span className={`font-display text-5xl font-bold ${plan.popular ? "text-white" : "text-slate-900"}`}>
            {plan.price}
          </span>
          <span className={plan.popular ? "text-emerald-100" : "text-slate-500"}>
            {plan.period}
          </span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              plan.popular ? "bg-white/20" : "bg-emerald-100"
            }`}>
              <svg className={`w-3 h-3 ${plan.popular ? "text-white" : "text-emerald-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className={plan.popular ? "text-emerald-50" : "text-slate-600"}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
        plan.popular 
          ? "bg-white text-emerald-700 hover:bg-cream-50 hover:shadow-lg"
          : "bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
      }`}>
        Subscribe Now
      </button>

      {plan.id === "annual" && (
        <p className={`text-center text-sm mt-4 ${plan.popular ? "text-emerald-100" : "text-slate-500"}`}>
          Equivalent to just R$24.92/month
        </p>
      )}
    </div>
  );
}

function PricingSection() {
  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-6">Trusted by food lovers across Brazil</p>
          <div className="flex flex-wrap justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💳</span>
              <span className="text-sm font-medium">All Cards Accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              <span className="text-sm font-medium">7-Day Money Back</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ROICalculator() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 lg:p-12 border border-slate-700/50">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              See How Fast You'll Save
            </h2>
            <p className="text-slate-400">
              Average member pays back their subscription in just 2 dinners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-slate-700/30 rounded-2xl">
              <div className="text-4xl font-bold text-emerald-400 mb-2">R$ 75</div>
              <div className="text-slate-300 font-medium mb-1">Average Savings</div>
              <div className="text-slate-500 text-sm">Per restaurant visit</div>
            </div>
            <div className="p-6 bg-slate-700/30 rounded-2xl">
              <div className="text-4xl font-bold text-coral-400 mb-2">4x</div>
              <div className="text-slate-300 font-medium mb-1">Avg Monthly Visits</div>
              <div className="text-slate-500 text-sm">By our members</div>
            </div>
            <div className="p-6 bg-slate-700/30 rounded-2xl">
              <div className="text-4xl font-bold text-amber-400 mb-2">R$ 3,600</div>
              <div className="text-slate-300 font-medium mb-1">Annual Savings</div>
              <div className="text-slate-500 text-sm">On average per member</div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-emerald-600/20 border border-emerald-500/30 rounded-2xl text-center">
            <p className="text-emerald-300 font-medium">
              💡 With the Annual Plan at R$299, you're looking at a <span className="text-white font-bold">12x return</span> on your investment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-semibold text-sm tracking-wider uppercase">FAQ</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mt-4">
            Common Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all ${
                openIndex === index ? "border-emerald-200 shadow-lg shadow-emerald-100/50" : "border-slate-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-8">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  openIndex === index ? "bg-emerald-500 rotate-180" : "bg-slate-100"
                }`}>
                  <svg 
                    className={`w-4 h-4 transition-colors ${openIndex === index ? "text-white" : "text-slate-500"}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}>
                <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4">Still have questions?</p>
          <a href="mailto:support@clubegourmet.com" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjA1IiBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
          Ready to Start Saving?
        </h2>
        <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of food lovers who've discovered the smartest way to enjoy fine dining.
          Your first dinner out will already be worth it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-emerald-700 rounded-full font-semibold text-lg hover:bg-cream-50 hover:shadow-xl transition-all">
            Get Started Today
          </button>
          <Link href="/restaurants" className="px-8 py-4 bg-emerald-500/30 border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-emerald-500/40 transition-all">
            Browse Restaurants
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-display text-xl font-bold text-white">Clube Gourmet</span>
          </Link>
          <p className="text-slate-500 text-sm">
            © 2024 Clube Gourmet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Plans() {
  return (
    <div className="font-sans antialiased min-h-screen">
      <Navbar />
      <HeroSection />
      <PricingSection />
      <ROICalculator />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
