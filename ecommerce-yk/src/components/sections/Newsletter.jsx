import React, { useState } from "react";

/**
 * Newsletter Subscription Component
 */
const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <section className="bg-milky-blue py-12 text-white sm:py-16">
      <div className="mx-auto max-w-4xl px-3 text-center sm:px-4 md:px-6">
        <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">Stay in Style</h2>
        <p className="mb-6 text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">Get exclusive offers and be the first to know about new arrivals!</p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <input
            type="email"
            className="w-full rounded-full px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-4 focus:ring-light-gray/50 sm:flex-1 sm:px-6 sm:py-4 sm:text-lg"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full rounded-full bg-white px-6 py-3 text-base font-bold text-milky-blue transition-all duration-300 hover:scale-105 hover:bg-light-gray sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
