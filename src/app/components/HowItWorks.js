import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import HeroSection from "./HeroSection";

const steps = [
  {
    number: 1,
    title: "One-Click Permission",
    description: `Your audience subscribes to your calendar with one tap — no logins, no forms, no friction.
                  They want to hear from you, so they give you permission to reach them where they actually look every day.`,
    image: "/images/step1.png",
    imageAlt: "",
    badges: ["🎧 Music releases", "✂️ Appointment reminders", "🛍️ Flash sales"],
  },
  {
    number: 2,
    title: "Create & Schedule",
    description: `Add your content — drops, deadlines, events, or promotions — with media, links, and smart reminders. 
                  Everything syncs automatically across Google, Apple, and Outlook calendars.`,
    image: "/images/step2.png",
    imageAlt: "",
    features: [
      "Rich media support (images, videos, links)",
      "Cross-platform sync (Google, Apple, Outlook)",
      "Automated reminder sequences",
    ],
  },
  {
    number: 3,
    title: "Track & Convert",
    description: `Events appear in their calendars with built-in visibility and engagement tracking. 
                  See what works, optimize what doesn’t, and watch your conversion rates soar.`,
    image: "/images/step3.png",
    imageAlt: "",
    results: [
      { name: "DJ Mixmaster", result: "+42% album release engagement" },
      {
        name: "Premium Styles Salon",
        result: "No-shows dropped from 28% to 7%",
      },
      { name: "Urban Boutique", result: "5x more traffic than social posts" },
    ],
  },
];

export function HowItWorks() {
  return (
    <HeroSection id="how" className="py-24">
      <div className="text-center mb-20">
        <Typography
          variant="h2"
          className="text-black mb-4 text-4xl md:text-5xl font-bold tracking-tight"
        >
          How It Works
        </Typography>
        <Typography
          variant="lead"
          className="text-xl text-gray-600  max-w-3xl mx-auto"
        >
          Three simple steps to transform how you reach your audience — no
          complexity, just results.
        </Typography>
      </div>

      <div className="space-y-32">
        {steps.map((step, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-16 items-center">
            {/* Alternate image position */}
            {index % 2 === 1 && (
              <div className="order-2 md:order-1">
                <div className="h-80 w-full bg-gray-200 rounded-3xl shadow-inner flex items-center justify-center text-gray-500 text-lg"></div>
              </div>
            )}

            {/* Text Content */}
            <div
              className={`space-y-6 ${
                index % 2 === 1 ? "order-1 md:order-2" : ""
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-[#C9FF57] text-black font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center">
                  {step.number}
                </span>
                <Typography
                  variant="h4"
                  className="text-3xl font-semibold text-gray-900"
                >
                  {step.title}
                </Typography>
              </div>
              <Typography className="text-gray-500 font-medium text-lg leading-relaxed">
                {step.description}
              </Typography>

              {/* Conditional content rendering based on step data */}
              {step.badges && (
                <Card className="bg-gray-50  p-6 rounded-lg">
                  <Typography
                    variant="small"
                    className="text-gray-500 font-medium mb-2"
                  >
                    Perfect for:
                  </Typography>
                  <div className="flex flex-wrap gap-3">
                    {step.badges.map((badge, i) => (
                      <span
                        key={i}
                        className="bg-white text-black px-3 py-1 rounded-full text-sm"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </Card>
              )}

              {step.features && (
                <div className="space-y-3">
                  {step.features.map((feature, i) => (
                    <div className="flex items-center gap-3" key={i}>
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <Typography className="text-gray-600 ">
                        {feature}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}

              {step.results && (
                <Card className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <Typography
                    variant="small"
                    className="text-gray-500 font-medium"
                  >
                    Real Results:
                  </Typography>
                  {step.results.map((result, i) => (
                    <div className="flex items-center gap-3" key={i}>
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400  rounded-full" />
                      <div>
                        <Typography className="text-sm font-medium text-gray-600">
                          {result.name}
                        </Typography>
                        <Typography className="text-xs text-gray-500">
                          {result.result}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </Card>
              )}
            </div>

            {/* Image for even index */}
            {index % 2 === 0 && (
              <div>
                <div className="h-80 w-full bg-gray-200 rounded-3xl shadow-inner flex items-center justify-center text-gray-500 text-lg">
  
</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </HeroSection>
  );
}
