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
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">Stay in Style</h2>
        <p className="mb-8 text-xl opacity-90">Get exclusive offers and be the first to know about new arrivals!</p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <input
            type="email"
            className="w-full rounded-full px-6 py-4 text-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 sm:flex-1"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full rounded-full bg-white px-8 py-4 text-lg font-bold text-purple-600 transition-all duration-300 hover:scale-105 hover:bg-gray-100 sm:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
