
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-xl px-4">
          <div className="relative mb-8">
            <svg
              className="w-24 h-24 mx-auto text-myrobot-orange"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">404</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-myrobot-navy">Page Not Found</h1>
          <p className="text-xl text-myrobot-gray mb-8">
            Oops! It seems like the robot you're looking for has wandered off.
            Let's help you find your way back.
          </p>
          <Link to="/">
            <Button className="btn-primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
