import React, { useState } from "react";

/**
 * Newsletter Subscription Component
 */
const Newsletter = () => {
  const [formData, setFormData] = useState({
    email: "",
    whatsapp: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submission:", formData);
    setFormData({
      email: "",
      whatsapp: "",
      message: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="bg-milky-blue py-12 text-white sm:py-16">
      <div className="mx-auto max-w-4xl px-3 text-center sm:px-4 md:px-6">
        <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">Stay in Style</h2>
        <p className="mb-6 text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">Get exclusive offers and be the first to know about new arrivals!</p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-lg space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="email"
              name="email"
              className="w-full rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-4 focus:ring-light-gray/50"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="whatsapp"
              className="w-full rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-4 focus:ring-light-gray/50"
              placeholder="WhatsApp number"
              value={formData.whatsapp}
              onChange={handleInputChange}
              required
            />
          </div>
          <textarea
            name="message"
            rows="4"
            className="w-full rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-4 focus:ring-light-gray/50"
            placeholder="Your message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full rounded-lg bg-white px-6 py-3 text-base font-bold text-milky-blue transition-all duration-300 hover:scale-105 hover:bg-light-gray"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
