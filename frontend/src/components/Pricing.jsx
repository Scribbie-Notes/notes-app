import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const Pricing = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return (
    <>
      {location.pathname === "/pricing" && <Navbar userInfo={user} />}
      <section className="px-2 py-12 w-full h-auto">
        <div className="py-4 px-4 mx-auto lg:py-4 lg:px-6 h-[700px]">
          <div className="mx-auto text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
              Designed for business teams like yours
            </h2>
            <p className="mb-5 text-slate-800 sm:text-xl">
              Here at Scribie we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card
              id="#1"
              title="Starter"
              description="Best option for personal use & for your next project."
              price="$29"
              period="/month"
              features={[
                "Individual configuration",
                "No setup, or hidden fees",
                "Team size: 1 developer",
                "Premium support: 6 months",
                "Free updates: 6 months",
              ]}
            />
            <Card
              title="Company"
              description="Relevant for multiple users, extended & premium support."
              price="$99"
              period="/month"
              features={[
                "Individual configuration",
                "No setup, or hidden fees",
                "Team size: 10 developers",
                "Premium support: 24 months",
                "Free updates: 24 months",
              ]}
            />
            <Card
              title="Enterprise"
              description="Best for large scale uses and extended redistribution rights."
              price="$499"
              period="/month"
              features={[
                "Individual configuration",
                "No setup, or hidden fees",
                "Team size: 100+ developers",
                "Premium support: 36 months",
                "Free updates: 36 months",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
};

const Card = ({ id, title, description, price, period, features }) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative h-auto w-full max-w-sm shrink-0 overflow-hidden rounded-xl bg-gray-500 p-8 mb-[10]"
    >
      <div className="relative z-10 text-white">
        <span className="mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-slate-800">
          {title}
        </span>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="my-2 block origin-top-left font-mono text-6xl font-black leading-[1.2]"
        >
          {title}
        </motion.span>
        <p>{description}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-lg text-gray-400">{period}</span>
        </div>
        <ul className="mt-2 space-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index + 1} className="flex items-center">
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-2 mb-2">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white">
        Get it now
      </button>
      <Background />
    </motion.div>
  );
};

const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};

export default Pricing;
