import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import HeroSection from "./HeroSection";

// Updated CheckIcon to accept isHighlighted prop
function CheckIcon({ isHighlighted }) {
  return (
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
  );
}

const PricingCard = ({
  title,
  price,
  features,
  isHighlighted = false,
  buttonTitle,
}) => {
  return (
    <Card
      color={isHighlighted ? undefined : "white"}
      variant="gradient"
      className={`relative w-full p-8 ${
        isHighlighted
          ? "max-w-[24rem] scale-105 z-10 text-black border-2 border-limeCustom mt-2"
          : "max-w-[20rem] bg-white text-black border-2 border-gray-200"
      }`}
    >
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-limeCustom text-black text-xs font-semibold px-3 py-1 rounded-full  shadow-md">
          Most Popular
        </div>
      )}
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color="black"
          className="font-bold uppercase text-2xl"
        >
          {title}
        </Typography>
        <Typography
          variant="h1"
          color="black"
          className="mt-6 flex justify-center gap-0 text-4xl font-bold"
        >
          {price}
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4">
              <span
                className={`rounded-full  p-1 ${
                  isHighlighted ? "border-green-500" : "border-green-500"
                }`}
              >
                <CheckIcon isHighlighted={isHighlighted} />
              </span>
              <Typography className="font-normal">{feature}</Typography>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          className={`normal-case font-semibold hover:scale-[1.02] focus:scale-[1.02] active:scale-100 border border-black text-black 
    ${
      isHighlighted
        ? "bg-limeCustom hover:bg-limeCustom text-black border-none" // Highlighted card button
        : "bg-white hover:bg-black hover:text-white"
    } 
  `}
          ripple={false}
          fullWidth={true}
        >
          {buttonTitle}
        </Button>
      </CardFooter>
    </Card>
  );
};

export function PricingSection() {
  const pricingPlans = [
    {
      title: "Starter",
      price: "Free",
      features: [
        "Up to 50 subscribers",
        "5 calendar events/month",
        "Basic analytics",
      ],
      buttonTitle: "Get Started Free",
    },
    {
      title: "Professional",
      price: "£49/mo",
      features: [
        "Up to 5,000 subscribers",
        "Unlimited calendar events",
        "Advanced analytics & insights",
        "Custom branding",
      ],
      isHighlighted: true,
      buttonTitle: "Start Professional",
    },
    {
      title: "Enterprise Custom",
      price: "",
      features: [
        "Unlimited subscribers",
        "API access",
        "Account manager",
        "Custom integrations",
      ],
      buttonTitle: "Contact Sales",
    },
  ];

  return (
    <HeroSection
      id="pricing"
      className="my-12 p-8 min-h-screen flex flex-col justify-center items-center py-6"
    >
      <Typography
        variant="h1"
        className="text-center mb-6 font-bold text-gray-900"
      >
        Simple, Scalable Pricing
      </Typography>
      <Typography variant="lead" className="text-center mb-8 text-gray-600">
        Choose the plan that fits your audience size and needs.
      </Typography>

      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:gap-6 items-center justify-center gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.title}
              className={`w-full pl-2 flex items-center justify-center ${
                plan.isHighlighted ? "md:w-1/2 lg:w-1/4" : "md:w-1/3 lg:w-1/4"
              }`}
            >
              <PricingCard
                title={plan.title}
                price={plan.price}
                features={plan.features}
                isHighlighted={plan.isHighlighted}
                buttonTitle={plan.buttonTitle}
              />
            </div>
          ))}
        </div>
      </div>
    </HeroSection>
  );
}
