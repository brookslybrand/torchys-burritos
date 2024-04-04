import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div>
        <div className="relative">
          <img
            src="torchys-burrito.webp"
            alt="burrito on fire"
            style={{ height: "40rem" }}
            className="w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center space-around">
            <span className="text-white text-9xl font-bold bg-black bg-opacity-50 p-4 uppercase">
              Torchy&apos;s Burritos
            </span>
          </div>
          <div className="absolute top-20 left-0 w-full h-full flex items-center justify-center">
            <Link
              to="/menu"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
            >
              MENU MENUE MENU
            </Link>
          </div>
        </div>
      </div>
      <Link
        to="/menu"
        className="bg-blue-500 text-white font-semibold mt-6 py-4 px-8 rounded hover:bg-blue-700 text-4xl"
      >
        ORDER NOW
      </Link>
    </div>
  );
}
