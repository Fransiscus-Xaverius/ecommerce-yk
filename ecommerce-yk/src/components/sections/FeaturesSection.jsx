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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 group hover:bg-gray-50 rounded-lg transition-all duration-300">
              <div
                className={`${feature.bgColor} rounded-full inline-flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                style={{ width: "70px", height: "70px" }}
              >
                {feature.icon}
              </div>
              <h5 className="font-bold text-gray-900 mb-2">{feature.title}</h5>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
