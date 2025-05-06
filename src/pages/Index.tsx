
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dog } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-nature-green-light to-background p-4">
      <div className="max-w-3xl text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <Dog className="h-16 w-16 text-nature-green-dark" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nature-green-dark">
          CritterWatch Alert
        </h1>
        
        <p className="text-xl md:text-2xl text-secondary">
          AI-powered wildlife detection for your property
        </p>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
          <ul className="text-left space-y-3 mb-6">
            <li className="flex items-start">
              <span className="bg-nature-green-dark text-white rounded-full p-1 mr-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span><strong>Smart Detection:</strong> AI identifies animals in your recorded footage</span>
            </li>
            <li className="flex items-start">
              <span className="bg-nature-green-dark text-white rounded-full p-1 mr-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span><strong>Instant Alerts:</strong> Get notified when wildlife enters your property</span>
            </li>
            <li className="flex items-start">
              <span className="bg-nature-green-dark text-white rounded-full p-1 mr-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span><strong>Video Library:</strong> Review and manage all detected wildlife events</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="bg-nature-green-dark hover:bg-nature-green-dark/90">
            <Link to="/dashboard">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/upload">Upload Footage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
