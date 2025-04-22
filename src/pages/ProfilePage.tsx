
import React, { useState } from 'react';
import { Pen, Mail, User, ChartBar, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
  });

  const [editData, setEditData] = useState({ ...userData });

  const handleSaveProfile = () => {
    setUserData({ ...editData });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  // Mock performance data
  const performanceData = {
    totalInterviews: 12,
    averageScore: 8.2,
    technicalAvg: 8.4,
    languageAvg: 8.0,
    completedQuestions: 240,
    strongestAreas: ['Problem Solving', 'Communication'],
    weakestAreas: ['Technical Depth', 'Conciseness']
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-interview-primary mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Information Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Personal Information</span>
                {!isEditing && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsEditing(true)}
                    className="h-8 w-8 p-0"
                  >
                    <Pen className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
                    <div>
                      <div className="font-medium">Name</div>
                      <div className="text-gray-700">{userData.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-700">{userData.email}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            {isEditing && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleSaveProfile} className="bg-interview-primary hover:bg-interview-secondary">
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
          
          {/* Performance Summary Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>Overview of your interview performance</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <List className="mx-auto h-5 w-5 text-interview-accent mb-1" />
                  <div className="text-xs text-gray-500">Total Interviews</div>
                  <div className="text-xl font-semibold">{performanceData.totalInterviews}</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <ChartBar className="mx-auto h-5 w-5 text-interview-accent mb-1" />
                  <div className="text-xs text-gray-500">Average Score</div>
                  <div className="text-xl font-semibold">{performanceData.averageScore}/10</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="mx-auto h-5 w-5 text-interview-accent mb-1 font-bold flex items-center justify-center">T</div>
                  <div className="text-xs text-gray-500">Technical Avg</div>
                  <div className="text-xl font-semibold">{performanceData.technicalAvg}/10</div>
                </div>
                
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="mx-auto h-5 w-5 text-interview-accent mb-1 font-bold flex items-center justify-center">L</div>
                  <div className="text-xs text-gray-500">Language Avg</div>
                  <div className="text-xl font-semibold">{performanceData.languageAvg}/10</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-3">Strongest Areas</h4>
                  <ul className="space-y-3">
                    {performanceData.strongestAreas.map((area, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-3">Areas for Improvement</h4>
                  <ul className="space-y-3">
                    {performanceData.weakestAreas.map((area, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-sm text-gray-500 mb-3">Overall Progress</h4>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-interview-accent rounded-full" 
                    style={{ width: `${performanceData.averageScore * 10}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
