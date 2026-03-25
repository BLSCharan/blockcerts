import { useState, useEffect, useRef } from "react";

const stats = [
  { value: 50000, label: "Certificates Issued", suffix: "+" },
  { value: 10000, label: "Verified Institutions", suffix: "+" },
  { value: 99.9, label: "Uptime Guarantee", suffix: "%" },
  { value: 0, label: "Fraud Cases", suffix: "" },
];

function Counter({ target, suffix = "", isPercentage = false }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let current = 0;
    const increment = target / 50; // 50 frames for animation
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [hasStarted, target]);

  const displayValue = isPercentage ? count.toFixed(1) : count.toLocaleString();
  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent border-y border-border/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card rounded-lg p-8 text-center space-y-3 hover:border-primary/50 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300">
                <Counter 
                  target={stat.value} 
                  suffix={stat.suffix}
                  isPercentage={stat.label.includes("Uptime")}
                />
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
