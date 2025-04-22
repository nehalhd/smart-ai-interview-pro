
import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ResponsiveRadar } from '@nivo/radar';

// Mock feedback data
const feedbackData = {
  technicalScore: 7.8,
  languageScore: 8.2,
  overallScore: 8.0,
  strengths: [
    "Strong problem-solving approach with clear breakdown of solutions",
    "Excellent communication of technical concepts in simple terms",
    "Good knowledge of data structures and algorithms"
  ],
  weaknesses: [
    "Could improve depth in some technical answers",
    "Occasional use of filler words when explaining complex topics",
    "Some answers could be more concise"
  ],
  suggestions: [
    "Practice explaining technical concepts more concisely",
    "Expand knowledge on system design principles",
    "Work on eliminating filler words during responses"
  ],
  questionScores: [
    { question: "Q1", score: 9 },
    { question: "Q2", score: 7 },
    { question: "Q3", score: 8 },
    { question: "Q4", score: 6 },
    { question: "Q5", score: 9 },
    { question: "Q6", score: 8 },
    { question: "Q7", score: 8 },
    { question: "Q8", score: 7 },
    { question: "Q9", score: 9 },
    { question: "Q10", score: 8 },
    { question: "Q11", score: 7 },
    { question: "Q12", score: 8 },
    { question: "Q13", score: 9 },
    { question: "Q14", score: 7 },
    { question: "Q15", score: 8 },
    { question: "Q16", score: 7 },
    { question: "Q17", score: 6 },
    { question: "Q18", score: 8 },
    { question: "Q19", score: 9 },
    { question: "Q20", score: 8 },
  ],
  skillRatings: [
    { skill: "Technical Knowledge", technical: 7.8, average: 6.5 },
    { skill: "Problem Solving", technical: 8.2, average: 6.8 },
    { skill: "Communication", technical: 8.0, average: 7.1 },
    { skill: "Clarity", technical: 7.5, average: 6.9 },
    { skill: "Conciseness", technical: 7.2, average: 7.2 },
  ]
};

const FeedbackPage = () => {
  // Transform data for radar chart
  const radarData = [
    {
      category: "Technical",
      value: feedbackData.technicalScore,
    },
    {
      category: "Communication",
      value: feedbackData.languageScore,
    },
    {
      category: "Problem Solving",
      value: 8.4,
    },
    {
      category: "Clarity",
      value: 7.9,
    },
    {
      category: "Structure",
      value: 8.1,
    },
  ];

  const radarChartData = [
    {
      "skill": "Technical",
      "score": feedbackData.technicalScore,
      "fullMark": 10
    },
    {
      "skill": "Communication",
      "score": feedbackData.languageScore,
      "fullMark": 10
    },
    {
      "skill": "Problem Solving",
      "score": 8.4,
      "fullMark": 10
    },
    {
      "skill": "Clarity",
      "score": 7.9,
      "fullMark": 10
    },
    {
      "skill": "Structure",
      "score": 8.1,
      "fullMark": 10
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-interview-primary mb-2">Your Interview Results</h1>
            <p className="text-gray-600">Technical Interview • Mid Level • April 22, 2025</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link to="/dashboard">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/start-interview">
              <Button className="bg-interview-primary hover:bg-interview-secondary">
                Start Another Interview
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-interview-light border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Technical Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end">
                <div className="text-4xl font-bold text-interview-primary">
                  {feedbackData.technicalScore.toFixed(1)}
                </div>
                <div className="text-lg text-gray-500 mb-1 ml-1">/10</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-interview-light border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Language Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end">
                <div className="text-4xl font-bold text-interview-primary">
                  {feedbackData.languageScore.toFixed(1)}
                </div>
                <div className="text-lg text-gray-500 mb-1 ml-1">/10</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-interview-light border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Overall Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end">
                <div className="text-4xl font-bold text-interview-primary">
                  {feedbackData.overallScore.toFixed(1)}
                </div>
                <div className="text-lg text-gray-500 mb-1 ml-1">/10</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Feedback Tabs */}
        <Tabs defaultValue="summary" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="details">Question Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-green-600">
                    <ThumbsUp className="mr-2 h-5 w-5" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feedbackData.strengths.map((strength, index) => (
                      <li key={index} className="flex">
                        <div className="mr-3 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Weaknesses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-red-600">
                    <ThumbsDown className="mr-2 h-5 w-5" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feedbackData.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex">
                        <div className="mr-3 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        </div>
                        <span className="text-gray-700">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-interview-accent">
                    <ChevronRight className="mr-2 h-5 w-5" />
                    Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feedbackData.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex">
                        <div className="mr-3 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-interview-accent"></div>
                        </div>
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="charts" className="pt-6 space-y-8">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Analysis</CardTitle>
                <CardDescription>
                  Breakdown of your performance across different skill areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveRadar
                    data={radarChartData}
                    keys={['score']}
                    indexBy="skill"
                    maxValue={10}
                    margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
                    curve="linearClosed"
                    borderWidth={2}
                    borderColor={{ from: 'color' }}
                    gridLabelOffset={24}
                    dotSize={10}
                    dotColor={{ theme: 'background' }}
                    dotBorderWidth={2}
                    colors={{ scheme: 'blues' }}
                    fillOpacity={0.25}
                    blendMode="multiply"
                    animate={true}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Question by Question Scores</CardTitle>
                <CardDescription>
                  Individual scores for each interview question
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={feedbackData.questionScores}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="question" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#4299E1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Analysis</CardTitle>
                <CardDescription>
                  Detailed feedback for each interview question
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto">
                {feedbackData.questionScores.map((item, index) => (
                  <div key={index} className="mb-6 pb-6 border-b last:border-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-semibold">Question {index + 1}</div>
                      <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
                        item.score >= 8 ? 'bg-green-100 text-green-800' : 
                        item.score >= 6 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        Score: {item.score}/10
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">
                      {index % 2 === 0 ? 
                        "Your answer demonstrated a solid understanding of the core concepts, but could have included more specific examples." :
                        "Great response with clear structure and concise explanations. You effectively communicated the key points."
                      }
                    </p>
                    
                    <div className="text-sm text-gray-500">
                      {index % 3 === 0 ? 
                        <span className="text-green-600 font-medium">Strength: Clear explanation of technical concepts</span> :
                        index % 3 === 1 ?
                        <span className="text-red-600 font-medium">Area to improve: Be more concise in your explanations</span> :
                        <span className="text-interview-accent font-medium">Suggestion: Provide more concrete examples</span>
                      }
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FeedbackPage;
