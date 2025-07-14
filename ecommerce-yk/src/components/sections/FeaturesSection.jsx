import React from "react";
import { Truck, Shield, RefreshCw, Phone } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="text-blue-600" size={30} />,
      title: "Free Shipping",
      description: "Orders above Rp 500k",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Shield className="text-green-600" size={30} />,
      title: "Secure Payment",
      description: "100% Protected",
      bgColor: "bg-green-50",
    },
    {
      icon: <RefreshCw className="text-yellow-600" size={30} />,
      title: "Easy Returns",
      description: "30 Days Policy",
      bgColor: "bg-yellow-50",
    },
    {
      icon: <Phone className="text-red-600" size={30} />,
      title: "24/7 Support",
      description: "Always Here",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="group rounded-lg p-6 text-center transition-all duration-300 hover:bg-gray-50">
              <div
                className={`${feature.bgColor} mb-4 inline-flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110`}
                style={{ width: "70px", height: "70px" }}
              >
                {feature.icon}
              </div>
              <h5 className="mb-2 font-bold text-gray-900">{feature.title}</h5>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
