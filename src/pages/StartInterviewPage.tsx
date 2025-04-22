
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/layout/Navbar';

const StartInterviewPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'technical';
  
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedLevel, setSelectedLevel] = useState('mid');
  
  const handleStartInterview = () => {
    navigate(`/interview?type=${selectedType}&level=${selectedLevel}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
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
                <Label className="text-base">Interview Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  <RadioGroup 
                    value={selectedType} 
                    onValueChange={setSelectedType}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem 
                        value="technical" 
                        id="technical" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="technical"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-interview-primary [&:has([data-state=checked])]:border-interview-primary"
                      >
                        <div className="mb-3 rounded-full bg-interview-light p-2">
                          <div className="font-medium text-interview-primary">T</div>
                        </div>
                        <span className="text-sm font-medium">Technical</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="behavioral" 
                        id="behavioral" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="behavioral"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-interview-primary [&:has([data-state=checked])]:border-interview-primary"
                      >
                        <div className="mb-3 rounded-full bg-interview-light p-2">
                          <div className="font-medium text-interview-primary">B</div>
                        </div>
                        <span className="text-sm font-medium">Behavioral</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="text-sm text-gray-500 mt-2">
                  {selectedType === 'technical' ? 
                    'Practice coding challenges, algorithm questions, and technical concepts.' :
                    'Practice situational questions about your past experiences and approaches to work scenarios.'
                  }
                </div>
              </div>
              
              {/* Difficulty Level Selection */}
              <div className="space-y-3">
                <Label htmlFor="level" className="text-base">Difficulty Level</Label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger id="level" className="w-full">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="expert">Expert Level</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="text-sm text-gray-500 mt-2">
                  {selectedLevel === 'entry' && 'Questions suitable for beginners and junior positions.'}
                  {selectedLevel === 'mid' && 'Moderately challenging questions for experienced professionals.'}
                  {selectedLevel === 'expert' && 'Advanced questions for senior-level positions.'}
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full bg-interview-primary hover:bg-interview-secondary"
                onClick={handleStartInterview}
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
