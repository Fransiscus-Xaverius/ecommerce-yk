import React from "react";
import { Truck, Shield, RefreshCw, Phone } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="text-primary" size={30} />,
      title: "Free Shipping",
      description: "Orders above Rp 500k",
      bgColor: "bg-primary bg-opacity-10",
    },
    {
      icon: <Shield className="text-success" size={30} />,
      title: "Secure Payment",
      description: "100% Protected",
      bgColor: "bg-success bg-opacity-10",
    },
    {
      icon: <RefreshCw className="text-warning" size={30} />,
      title: "Easy Returns",
      description: "30 Days Policy",
      bgColor: "bg-warning bg-opacity-10",
    },
    {
      icon: <Phone className="text-danger" size={30} />,
      title: "24/7 Support",
      description: "Always Here",
      bgColor: "bg-danger bg-opacity-10",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className="text-center p-3 feature-box rounded">
                <div
                  className={`${feature.bgColor} rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                  style={{ width: "70px", height: "70px" }}
                >
                  {feature.icon}
                </div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted small mb-0">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
