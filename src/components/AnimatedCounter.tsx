import { useState, useEffect, useRef } from "react";
import { Package, Users, Heart, Star } from "lucide-react";
import "./AnimatedCounter.css";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function Counter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className="counter-number">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export function AnimatedCounterSection() {
  return (
    <div className="stats-section">
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon products">
            <Package size={32} strokeWidth={2} />
          </div>
          <Counter end={1000} suffix="+" />
          <div className="stat-label">Products Sold</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon customers">
            <Users size={32} strokeWidth={2} />
          </div>
          <Counter end={500} suffix="+" />
          <div className="stat-label">Happy Customers</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon reviews">
            <Star size={32} strokeWidth={2} />
          </div>
          <Counter end={150} suffix="+" />
          <div className="stat-label">Orders/month</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon wishlist">
            <Heart size={32} strokeWidth={2} />
          </div>
          <Counter end={750} suffix="+" />
          <div className="stat-label">Items Wishlisted</div>
        </div>
      </div>
    </div>
  );
}
