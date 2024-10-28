import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/modal/sign-in-modal";
import PromoCard from "@/components/cards/promo-card";

export default function Home() {
  return (
    <>
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: 'url("/background.png")', height: "50vh" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010818] z-0"></div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <SignInModal />
            <h1 className="text-white text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              AI Content Generator
            </h1>
            <p className="text-white mb-5">
              Generate AI content for your blog, website, or social media with a
              single click and more
            </p>
            <Link href="/dashboard">
              <Button variant="outline">Get started</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <PromoCard
              title="Extensive Template Library"
              description="Choose from over 10 versatile templates designed for 
a range of projects."
              link="/dashboard"
            />
            <PromoCard
              title="Highly Customizable"
              description="Easily tailor components to fit your specific needs 
and extend functionalities."
              link="/dashboard"
            />
            <PromoCard
              title="No Cost Involved"
              description="Access all features and components with comprehensive 
documentation at no cost."
              link="/dashboard"
            />
            <PromoCard
              title="Round-the-Clock Support"
              description="Get assistance any time with our dedicated 24/7 
customer support team."
              link="/dashboard"
            />
          </div>
        </div>
      </div>

      <footer className="py-4 text-center border-t-2">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Generative AI Seven. All rights
          reserved.{" "}
        </p>
      </footer>
    </>
  );
}
