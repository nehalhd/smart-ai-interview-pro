
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mic, Type, ArrowRight, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock questions for the interview
const technicalQuestions = [
  "Explain the difference between let, const, and var in JavaScript.",
  "What is the time complexity of a binary search algorithm?",
  "Describe how React's virtual DOM works.",
  "Explain the concept of closure in JavaScript.",
  "What is the difference between a stack and a queue?",
  "How would you optimize a slow SQL query?",
  "Explain the box model in CSS.",
  "What is a RESTful API?",
  "Describe the principles of object-oriented programming.",
  "What are promises in JavaScript and how do they work?",
  "Explain the concept of inheritance in programming.",
  "What's the difference between HTTP and HTTPS?",
  "Describe how you would implement a linked list.",
  "What is the purpose of the 'this' keyword in JavaScript?",
  "How does CSS specificity work?",
  "What is the difference between == and === in JavaScript?",
  "Explain what a hash table is and its use cases.",
  "How does event bubbling work in JavaScript?",
  "What are closures in JavaScript?",
  "Describe the concept of memoization.",
];

const behavioralQuestions = [
  "Tell me about a time when you had to meet a tight deadline.",
  "Describe a situation where you had to work with a difficult team member.",
  "How do you handle criticism of your work?",
  "Tell me about a time you showed leadership skills.",
  "Describe how you prioritize tasks when you have multiple projects.",
  "Tell me about a time you failed and what you learned from it.",
  "How do you handle stress in the workplace?",
  "Describe a situation where you had to make a difficult decision.",
  "Tell me about a time when you went above and beyond at work.",
  "How do you deal with disagreements on your team?",
  "Tell me about a time you received constructive feedback and how you responded.",
  "Describe a situation where you had to adapt to a significant change.",
  "Tell me about a time you had to learn something new in a short period.",
  "How do you handle working under pressure?",
  "Describe a project that you're particularly proud of.",
  "Tell me about a time you had to handle multiple responsibilities at once.",
  "How do you approach solving complex problems?",
  "Describe a situation where you had to influence someone to accept your ideas.",
  "Tell me about a time when you had to resolve a conflict in a team.",
  "How do you maintain work-life balance?",
];

const InterviewPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const interviewType = searchParams.get('type') || 'technical';
  const interviewLevel = searchParams.get('level') || 'mid';
  
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [useVoice, setUseVoice] = useState(true);
  const [answers, setAnswers] = useState<string[]>(new Array(20).fill(''));
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const questions = interviewType === 'technical' ? technicalQuestions : behavioralQuestions;
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    setTimeLeft(120);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleMicToggle = () => {
    if (isRecording) {
      // Stop recording logic would go here
      toast({
        title: "Recording stopped",
        description: "Your answer has been captured.",
      });
      setIsRecording(false);
      
      // Simulate recording transcript
      const mockTranscript = "This is a simulated voice answer that would come from speech recognition.";
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = mockTranscript;
      setAnswers(newAnswers);
    } else {
      // Start recording logic would go here
      toast({
        title: "Recording started",
        description: "Speak your answer clearly.",
      });
      setIsRecording(true);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsRecording(false);
    } else {
      setIsSubmitting(true);
      
      // Simulate submitting the interview
      setTimeout(() => {
        navigate('/feedback');
      }, 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-interview-primary">Smart AI Interview Coach</h1>
            <div className="text-sm font-medium text-gray-500">
              {interviewType === 'technical' ? 'Technical' : 'Behavioral'} Interview • {
                interviewLevel === 'entry' ? 'Entry Level' : 
                interviewLevel === 'mid' ? 'Mid Level' : 'Expert Level'
              }
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        {isSubmitting ? (
          <Card className="mb-8 p-8 text-center">
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-interview-light flex items-center justify-center">
                  <Check className="h-8 w-8 text-interview-primary" />
                </div>
                <h2 className="text-2xl font-bold">Submitting your interview...</h2>
                <p className="text-gray-500">We're analyzing your responses and preparing your feedback.</p>
                <Progress value={70} className="w-full max-w-md" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  Time left: {formatTime(timeLeft)}
                </span>
              </div>
              <Progress value={progress} />
            </div>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-6">
                  {questions[currentQuestionIndex]}
                </h2>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="voice-mode" 
                      checked={useVoice} 
                      onCheckedChange={setUseVoice}
                    />
                    <Label htmlFor="voice-mode">
                      {useVoice ? 'Voice Answer' : 'Text Answer'}
                    </Label>
                  </div>
                </div>
                
                {useVoice ? (
                  <div className="border rounded-lg p-8 text-center">
                    <Button
                      onClick={handleMicToggle}
                      className={`h-16 w-16 rounded-full ${
                        isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-interview-accent hover:bg-interview-secondary'
                      }`}
                    >
                      <Mic className={`h-8 w-8 ${isRecording ? 'text-white animate-pulse' : 'text-white'}`} />
                    </Button>
                    <div className="mt-4 text-gray-600">
                      {isRecording ? 'Recording... Click to stop' : 'Click to start recording your answer'}
                    </div>
                    
                    {answers[currentQuestionIndex] && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                        <div className="text-sm font-medium mb-1">Transcript:</div>
                        <p className="text-gray-700">{answers[currentQuestionIndex]}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <Textarea
                    placeholder="Type your answer here..."
                    className="min-h-[200px]"
                    value={answers[currentQuestionIndex]}
                    onChange={handleTextChange}
                  />
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleNextQuestion}
                className="bg-interview-primary hover:bg-interview-secondary"
                disabled={!answers[currentQuestionIndex]}
              >
                {currentQuestionIndex < totalQuestions - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Submit Interview
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default InterviewPage;
