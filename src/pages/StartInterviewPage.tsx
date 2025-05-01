
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Play, Info, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Navbar from '@/components/layout/Navbar';
import { roleOptions } from '@/data/interview-roles';

const StartInterviewPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'technical';
  
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  
  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId);
    const selectedRoleData = roleOptions.find(role => role.id === roleId);
    setRoleDescription(selectedRoleData?.description || '');
  };
  
  const handleStartInterview = () => {
    navigate(`/interview?type=${selectedType}&level=${selectedLevel}&role=${selectedRole}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-interview-primary">Start a New Interview</CardTitle>
              <CardDescription>
                Customize your practice interview experience
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Interview Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Interview Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Interview</SelectItem>
                    <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="text-sm text-gray-500 mt-2">
                  {selectedType === 'technical' ? 
                    'Practice coding challenges, algorithm questions, and technical concepts.' :
                    'Practice situational questions about your past experiences and approaches to work scenarios.'
                  }
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <Label htmlFor="role" className="text-base font-semibold">Select Your Role</Label>
                <Select value={selectedRole} onValueChange={handleRoleChange}>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {roleOptions.map((role) => (
                      <SelectItem key={role.id} value={role.id}>{role.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {roleDescription && (
                  <div className="text-sm text-gray-600 mt-2 p-3 bg-blue-50 rounded-md border border-blue-100">
                    {roleDescription}
                  </div>
                )}
              </div>
              
              {/* Difficulty Level Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label htmlFor="level" className="text-base font-semibold">Difficulty Level</Label>
                </div>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger id="level" className="w-full">
                    <SelectValue placeholder="Select difficulty level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">
                      Beginner
                    </SelectItem>
                    <SelectItem value="mid">
                      Mid Level
                    </SelectItem>
                    <SelectItem value="advanced">
                      Advanced
                    </SelectItem>
                    <SelectItem value="expert">
                      Expert
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="text-sm text-gray-500 mt-2">
                  {selectedLevel === 'beginner' && 
                    'Entry-level questions for juniors or students.'}
                  {selectedLevel === 'mid' && 
                    'Moderate complexity, suitable for 1-3 years of experience.'}
                  {selectedLevel === 'advanced' && 
                    'Challenging questions for senior roles.'}
                  {selectedLevel === 'expert' && 
                    'System design, architecture, leadership, high-level strategy.'}
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full bg-interview-primary hover:bg-interview-secondary"
                onClick={handleStartInterview}
                disabled={!selectedRole || !selectedLevel}
              >
                <Play className="mr-2 h-4 w-4" />
                Start Interview
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StartInterviewPage;
