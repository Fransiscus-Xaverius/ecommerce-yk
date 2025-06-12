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
    <section className="py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <h2 className="display-5 fw-bold mb-3">Stay in Style</h2>
            <p className="lead mb-4">
              Get exclusive offers and be the first to know about new arrivals!
            </p>
            <form
              onSubmit={handleSubmit}
              className="d-flex gap-2 justify-content-center flex-column flex-sm-row"
            >
              <input
                type="email"
                className="form-control form-control-lg rounded-pill"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ maxWidth: "300px" }}
              />
              <button
                type="submit"
                className="btn btn-light btn-lg rounded-pill px-4 fw-bold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
