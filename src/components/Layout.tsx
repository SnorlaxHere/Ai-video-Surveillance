
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { SidebarTrigger } from "./ui/sidebar";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import NotificationModal from "./NotificationModal";

const Layout = () => {
  const { toast } = useToast();
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState<any>(null);

  // Simulated notification for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification = {
        id: "1",
        animalType: "Deer",
        timestamp: new Date().toISOString(),
        image: "photo-1485833077593-4278bba3f11f",
        location: "Front Yard Camera"
      };
      
      setNotification(newNotification);
      setShowNotification(true);
      
      toast({
        title: "Animal Detected!",
        description: `A deer was detected at ${new Date().toLocaleTimeString()}`,
        variant: "default",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1">
        <div className="p-4 sm:p-6">
          <SidebarTrigger className="mb-4" />
          <Outlet />
        </div>
      </div>
      {showNotification && notification && (
        <NotificationModal
          notification={notification}
          open={showNotification}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default Layout;
