
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your app settings and preferences
        </p>
      </div>

      <Tabs defaultValue="notifications">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="detection">Detection Settings</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Notifications</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notification Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts when animals are detected
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Daily Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily summary of all detections
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sound Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Play a sound when notifications arrive
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Notification Preferences</h4>
                
                <div className="space-y-1">
                  <Label htmlFor="deer-pref">Deer Notifications</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="deer-pref" defaultChecked />
                    <span className="text-sm text-muted-foreground">Enabled</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="cat-pref">Cat Notifications</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="cat-pref" defaultChecked />
                    <span className="text-sm text-muted-foreground">Enabled</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="dog-pref">Dog Notifications</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="dog-pref" defaultChecked />
                    <span className="text-sm text-muted-foreground">Enabled</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detection" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Detection Settings</CardTitle>
              <CardDescription>
                Configure AI detection behavior and sensitivity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="confidence">Detection Confidence Threshold</Label>
                  <div className="flex items-center gap-4">
                    <Input id="confidence" type="range" min="60" max="95" defaultValue="75" className="w-full" />
                    <span className="w-12 text-right">75%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Higher values reduce false positives but might miss some animals
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="min-size">Minimum Animal Size</Label>
                  <div className="flex items-center gap-4">
                    <Input id="min-size" type="range" min="5" max="50" defaultValue="15" className="w-full" />
                    <span className="w-12 text-right">15%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Percentage of frame that animal must occupy to trigger detection
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Detect Animal Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="detect-deer" defaultChecked />
                    <Label htmlFor="detect-deer">Deer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="detect-cat" defaultChecked />
                    <Label htmlFor="detect-cat">Cats</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="detect-dog" defaultChecked />
                    <Label htmlFor="detect-dog">Dogs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="detect-other" />
                    <Label htmlFor="detect-other">Other Wildlife</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Advanced Settings</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Night Vision Enhancement</h4>
                      <p className="text-xs text-muted-foreground">
                        Improve detection in low-light conditions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Motion Pre-filtering</h4>
                      <p className="text-xs text-muted-foreground">
                        Only analyze video segments with motion
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Multi-animal Detection</h4>
                      <p className="text-xs text-muted-foreground">
                        Detect multiple animals in the same frame
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                <p className="text-xs text-muted-foreground">
                  Used for notification alerts
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Data Storage</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Auto-delete old footage</p>
                    <p className="text-xs text-muted-foreground">
                      Automatically delete footage older than 30 days
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
