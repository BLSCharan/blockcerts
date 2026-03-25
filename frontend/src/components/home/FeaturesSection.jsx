import { Shield, Zap, FileCheck, Key, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Certificates stored on immutable blockchain for ultimate security and verification.",
  },
  {
    icon: Zap,
    title: "Instant Verification",
    description: "Verify any certificate in seconds with our advanced blockchain technology.",
  },
  {
    icon: FileCheck,
    title: "Digital Certificates",
    description: "Issue tamper-proof digital certificates that are globally recognized.",
  },
  {
    icon: Key,
    title: "Cryptographic Proof",
    description: "Each certificate is cryptographically signed and hash-verified.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Access and verify certificates from anywhere in the world, 24/7.",
  },
  {
    icon: Lock,
    title: "Fraud Prevention",
    description: "Immutable records prevent any tampering or fraudulent certificates.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4 animate-slide-up">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Why Choose <span className="gradient-text">BlockCert?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the future of credential verification with cutting-edge blockchain technology and enterprise-grade security
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group glass-card rounded-xl p-8 space-y-4 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 animate-fade-in hover:shadow-lg hover:shadow-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon Container */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{feature.title}</h3>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                
                {/* Accent Line */}
                <div className="h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-12 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
