import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative glass-card rounded-2xl p-8 md:p-16 overflow-hidden">

          {/* Background glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">

            {/* Heading */}
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-white">Get Started Today</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to Secure Your{" "}
                <span className="gradient-text">Credentials?</span>
              </h2>

              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Join thousands of institutions already using BlockCert to issue, manage, and verify certificates securely. Start for free today.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              <Link
                to="/issue"
                className="flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              >
                Issue Your First Certificate
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/verify"
                className="px-8 py-4 rounded-lg border border-primary/50 text-white hover:bg-primary/10 transition-all duration-300 font-semibold"
              >
                Learn More
              </Link>

            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/30">
              {[
                { number: "100%", label: "Blockchain Secured" },
                { number: "<1s", label: "Instant Verification" },
                { number: "24/7", label: "Always Available" }
              ].map((item, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-3xl font-bold gradient-text">{item.number}</div>
                  <p className="text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}