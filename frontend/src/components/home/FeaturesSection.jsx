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
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Choose <span className="gradient-text">BlockCert?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of credential verification with our cutting-edge blockchain technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 space-y-4 hover:border-primary/50 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
