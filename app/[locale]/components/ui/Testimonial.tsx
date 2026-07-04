import React from "react";

interface TestimonialProps {
  quote: string;
  author: string;
  className?: string;
}

export function Testimonial({
  quote,
  author,
  className = "",
}: TestimonialProps) {
  return (
    <div
      className={`bg-background-secondary border-l-4 border-accent rounded-r-xl p-10 ${className}`}
    >
      <blockquote className="text-xl italic text-text-primary leading-relaxed mb-5">
        "{quote}"
      </blockquote>
      <cite className="text-sm text-text-main not-italic font-medium">
        {author}
      </cite>
    </div>
  );
}
