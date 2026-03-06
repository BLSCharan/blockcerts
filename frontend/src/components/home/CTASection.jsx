import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative glass-card rounded-2xl p-12 md:p-16 text-center overflow-hidden">

          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>

            <p className="text-muted-foreground">
              Join thousands of institutions already using BlockCert to issue and verify certificates securely.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              <Link
                to="/issue"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition"
              >
                Issue Your First Certificate
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/about"
                className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-secondary transition"
              >
                Learn More
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}