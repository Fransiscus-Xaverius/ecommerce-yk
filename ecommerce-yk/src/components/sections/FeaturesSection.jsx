import React from "react";
import { Truck, Shield, RefreshCw, Phone } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="text-milky-blue h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />,
      title: "Free Shipping",
      description: "Orders above Rp 500k",
      bgColor: "bg-milky-blue/10",
    },
    {
      icon: <Shield className="text-green-600 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />,
      title: "Secure Payment",
      description: "100% Protected",
      bgColor: "bg-green-50",
    },
    {
      icon: <RefreshCw className="text-yellow-600 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />,
      title: "Easy Returns",
      description: "30 Days Policy",
      bgColor: "bg-yellow-50",
    },
    {
      icon: <Phone className="text-red-600 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />,
      title: "24/7 Support",
      description: "Always Here",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-4">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="group rounded-lg p-3 text-center transition-all duration-300 hover:bg-gray-50 sm:p-4 md:p-6">
              <div
                className={`${feature.bgColor} mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:mb-3 sm:h-14 sm:w-14 md:mb-4 md:h-16 md:w-16`}
              >
                {feature.icon}
              </div>
              <h5 className="mb-1 text-sm font-bold text-gray-900 sm:mb-2 sm:text-base">{feature.title}</h5>
              <p className="text-xs text-gray-600 sm:text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
