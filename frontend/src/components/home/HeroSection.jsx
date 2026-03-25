import { Link } from "react-router-dom";
import { Shield, ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm border border-primary/30">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-white">
              Powered by Blockchain Technology
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
            Secure Digital{" "}
            <span className="gradient-text">Certificates</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Revolutionary blockchain-based certificate platform ensuring authenticity,
            security, and instant verification for educational and professional credentials.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">

            <Link
              to="/issue"
              className="flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              Issue Certificate
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/verify"
              className="flex items-center gap-2 px-8 py-4 rounded-lg border border-primary/50 text-white hover:bg-primary/10 transition-all duration-300"
            >
              Verify Certificate
              <CheckCircle2 className="w-5 h-5" />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}