import React, { useEffect } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, Controller, Form } from "react-hook-form";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer, toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Joi from "joi";

import useApiRequest from "../../hooks/useApiRequest";

const validationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
  }),
  whatsapp: Joi.string().required().messages({
    "string.empty": "WhatsApp number is required",
  }),
  message: Joi.string().required().messages({
    "string.empty": "Message is required",
  }),
});

const defaultValues = {
  email: "",
  whatsapp: "",
  message: "",
};

/**
 * Newsletter Subscription Component
 */
const Newsletter = () => {
  // Form setup with Joi validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(validationSchema),
    defaultValues,
  });

  // Product mutation
  const {
    mutate: mutateNewsletter,
    isLoading: isMutating,
    response: newsletterResponse,
  } = useApiRequest({
    url: "/api/newsletter",
    method: "POST",
  });

  useEffect(() => {
    if (newsletterResponse) {
      toast.success(newsletterResponse.data.message);
      reset();
    }
  }, [newsletterResponse, reset]);

  const onSubmit = (data) => {
    console.log(data);
    mutateNewsletter(data, {
      onError: () => {
        toast.error("Newsletter subscription failed");
      },
    });
  };

  return (
    <section className="bg-milky-blue py-12 text-white sm:py-16">
      <div className="mx-auto max-w-4xl px-3 text-center sm:px-4 md:px-6">
        <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">Stay in Style</h2>
        <p className="mb-6 text-base opacity-90 sm:mb-8 sm:text-lg md:text-xl">
          Get exclusive offers and be the first to know about new arrivals!
        </p>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Form control={control} onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <input
                      {...field}
                      type="email"
                      name="email"
                      id="email"
                      className="w-full rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-4 focus:ring-light-gray/50"
                      placeholder="Email address"
                    />
                    {errors.email && (
                      <div className="mt-2 rounded-md bg-white/70 p-2">
                        <p className="text-xs text-red-400">{errors.email.message}</p>
                      </div>
                    )}
                  </div>
                )}
              />

              <Controller
                name="whatsapp"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <input
                      {...field}
                      type="tel"
                      name="whatsapp"
                      id="whatsapp"
                      className="w-full rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-4 focus:ring-light-gray/50"
                      placeholder="WhatsApp number"
                    />
                    {errors.whatsapp && (
                      <div className="mt-2 rounded-md bg-white/70 p-2">
                        <p className="text-xs text-red-400">{errors.whatsapp.message}</p>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <textarea
                    {...field}
                    name="message"
                    id="message"
                    rows="4"
                    className="w-full rounded-lg px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-4 focus:ring-light-gray/50"
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && (
                    <div className="mt-2 rounded-md bg-white/70 p-2">
                      <p className="text-xs text-red-400">{errors.message.message}</p>
                    </div>
                  )}
                </div>
              )}
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-white px-6 py-3 text-base font-bold text-milky-blue transition-all duration-300 hover:scale-105 hover:bg-light-gray"
            >
              {isMutating ? <Loader2 className="mx-auto animate-spin" /> : "Send Message"}
            </button>
          </Form>
        </ErrorBoundary>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Newsletter;
