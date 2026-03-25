import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Zap, Shield, Globe } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 animate-slide-up">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            About <span className="gradient-text">BlockCert</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing credential verification through blockchain technology
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Who We Are</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                BlockCert is a cutting-edge platform that leverages blockchain technology to issue, verify, and secure digital certificates. We empower educational institutions and organizations to create tamper-proof, globally verifiable credentials.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our mission is to eliminate credential fraud, reduce verification time from days to seconds, and provide individuals with ownership of their achievements.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {[
                "Industry-leading blockchain technology",
                "Instant global verification with zero fraud",
                "User-friendly certificate management",
                "Complete data ownership and privacy",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-white text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card rounded-xl p-8 space-y-4 hover:border-primary/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold">Secure & Immutable</h4>
              <p className="text-muted-foreground">
                Cryptographically signed certificates stored on blockchain
              </p>
            </div>

            <div className="glass-card rounded-xl p-8 space-y-4 hover:border-primary/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold">Instant Verification</h4>
              <p className="text-muted-foreground">
                Verify any certificate in seconds with our smart contract
              </p>
            </div>

            <div className="glass-card rounded-xl p-8 space-y-4 hover:border-primary/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold">Global Reach</h4>
              <p className="text-muted-foreground">
                Accessible from anywhere, 24/7 with no geographic limitations
              </p>
            </div>

            <div className="glass-card rounded-xl p-8 space-y-4 hover:border-primary/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold">Complete Control</h4>
              <p className="text-muted-foreground">
                You own your credentials with full data privacy and control
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
