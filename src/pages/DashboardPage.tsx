
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, List, Clock, Play, ChartBar, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navbar from '@/components/layout/Navbar';

// Mock data for past interviews
const pastInterviews = [
  {
    id: 1,
    type: 'Technical',
    level: 'Mid Level',
    date: '2025-04-18',
    finalScore: 8.2,
  },
  {
    id: 2,
    type: 'Behavioral',
    level: 'Expert Level',
    date: '2025-04-12',
    finalScore: 7.5,
  },
  {
    id: 3,
    type: 'Technical',
    level: 'Entry Level',
    date: '2025-04-05',
    finalScore: 9.1,
  },
  {
    id: 4,
    type: 'Behavioral',
    level: 'Mid Level',
    date: '2025-03-28',
    finalScore: 8.7,
  },
];

const DashboardPage = () => {
  // Mock data for stats
  const totalInterviews = pastInterviews.length;
  const avgScore = (pastInterviews.reduce((sum, interview) => sum + interview.finalScore, 0) / totalInterviews).toFixed(1);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-interview-primary mb-2">Welcome back, User!</h1>
            <p className="text-gray-600">Track your progress and start new interviews</p>
          </div>
          <Link to="/start-interview">
            <Button className="mt-4 md:mt-0 bg-interview-primary hover:bg-interview-secondary">
              <Plus className="mr-2 h-4 w-4" />
              Start New Interview
            </Button>
          </Link>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <List className="h-5 w-5 text-interview-accent mr-2" />
                <span className="text-2xl font-bold">{totalInterviews}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ChartBar className="h-5 w-5 text-interview-accent mr-2" />
                <span className="text-2xl font-bold">{avgScore}/10</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Top Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-700">Technical knowledge</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-gray-700">Response clarity</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Past Interviews Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Past Interviews</CardTitle>
            <CardDescription>
              Review your previous interview sessions and results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Interview Type</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Final Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastInterviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell className="font-medium">{interview.type}</TableCell>
                    <TableCell>{interview.level}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                        {new Date(interview.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`font-semibold ${
                        interview.finalScore >= 8 ? 'text-green-600' : 
                        interview.finalScore >= 6 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {interview.finalScore}/10
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/feedback/${interview.id}`}>
                        <Button variant="ghost" size="sm">
                          View Results
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Quick Start Card */}
        <Card className="interview-gradient border-none mb-8">
          <CardHeader>
            <CardTitle>Ready for another practice session?</CardTitle>
            <CardDescription>
              Continue honing your interview skills with a new session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/start-interview?type=technical">
                <Button className="w-full sm:w-auto bg-interview-primary hover:bg-interview-secondary">
                  <Play className="mr-2 h-4 w-4" />
                  Technical Interview
                </Button>
              </Link>
              <Link to="/start-interview?type=behavioral">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Play className="mr-2 h-4 w-4" />
                  Behavioral Interview
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;
