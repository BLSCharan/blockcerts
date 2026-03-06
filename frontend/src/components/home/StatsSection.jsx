const stats = [
  { value: "50,000+", label: "Certificates Issued" },
  { value: "10,000+", label: "Verified Institutions" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "0", label: "Fraud Cases" },
];

export function StatsSection() {
  return (
    <section className="py-16 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
