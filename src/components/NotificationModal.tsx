
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface NotificationModalProps {
  notification: {
    id: string;
    animalType: string;
    timestamp: string;
    image: string;
    location: string;
  };
  open: boolean;
  onClose: () => void;
}

const NotificationModal = ({ notification, open, onClose }: NotificationModalProps) => {
  const navigate = useNavigate();
  
  const viewInTimeline = () => {
    navigate('/timeline');
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-nature-alert">
            <span className="inline-block h-3 w-3 rounded-full bg-nature-alert animate-pulse-alert"></span>
            {notification.animalType} Detected!
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={`https://images.unsplash.com/${notification.image}?auto=format&fit=crop&w=800&q=80`} 
              alt={`${notification.animalType} detected`} 
              className="w-full aspect-video object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{notification.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Detected</p>
              <p className="font-medium">{formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>Dismiss</Button>
          <Button onClick={viewInTimeline}>View in Timeline</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
