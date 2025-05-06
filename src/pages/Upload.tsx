
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Upload as UploadIcon, Video } from "lucide-react";

const Upload = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [location, setLocation] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles(fileArray);
    }
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select a video file to upload",
        variant: "destructive",
      });
      return;
    }

    if (!location) {
      toast({
        title: "No location selected",
        description: "Please select a camera location",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
          toast({
            title: "Upload complete!",
            description: "Your footage is now being processed for animal detection",
          });
          setFiles([]);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Footage</h1>
        <p className="text-muted-foreground">
          Upload your recorded video footage for animal detection processing
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <Video className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">Drag and drop your footage</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supports MP4, MOV, AVI up to 2GB
            </p>
            <Input 
              type="file" 
              id="footage" 
              className="hidden"
              accept="video/*"
              multiple
              onChange={handleFileChange}
            />
            <Button asChild>
              <Label htmlFor="footage">
                <UploadIcon className="h-4 w-4 mr-2" />
                Select files
              </Label>
            </Button>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium">Selected Files</h3>
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-3 border rounded-md p-3">
                  <Video className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="location">Camera Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select camera location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="front-yard">Front Yard Camera</SelectItem>
                <SelectItem value="backyard">Backyard Camera</SelectItem>
                <SelectItem value="side-gate">Side Gate Camera</SelectItem>
                <SelectItem value="new-camera">+ Add New Camera</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              disabled={uploading || files.length === 0} 
              onClick={handleUpload}
            >
              {uploading ? "Uploading..." : "Process Footage"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-medium">Manage Cameras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Front Yard Camera</div>
                <Camera className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Last upload: 2 hours ago</p>
            </div>
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Backyard Camera</div>
                <Camera className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Last upload: 5 hours ago</p>
            </div>
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Side Gate Camera</div>
                <Camera className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Last upload: 1 day ago</p>
            </div>
            <div className="border border-dashed rounded-md p-4 flex items-center justify-center">
              <Button variant="ghost">+ Add New Camera</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
