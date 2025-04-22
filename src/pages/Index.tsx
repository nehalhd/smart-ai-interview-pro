
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-interview-primary mb-4">
                Practice interviews with AI feedback
              </h1>
              <p className="text-lg mb-8 text-gray-700 max-w-md">
                Master your interview skills with personalized AI coaching. Get detailed feedback on your technical and communication abilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/start-interview">
                  <Button size="lg" className="w-full sm:w-auto bg-interview-primary hover:bg-interview-secondary">
                    <Play className="mr-2 h-4 w-4" />
                    Start Interview as Guest
                  </Button>
                </Link>
                <Link to="/auth?tab=login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/auth?tab=signup">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="interview-gradient p-8 rounded-xl shadow-lg">
                <div className="interview-card p-6">
                  <h3 className="text-interview-primary font-medium mb-3">Mock Interview Question</h3>
                  <p className="text-gray-700 mb-4">
                    "Tell me about a challenging situation you faced at work and how you handled it."
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Behavioral • Mid Level</span>
                    <Button size="sm" variant="secondary">Answer</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-interview-primary">
            Practice makes perfect
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="interview-card p-6">
              <div className="w-12 h-12 bg-interview-light rounded-full flex items-center justify-center mb-4">
                <span className="text-interview-primary text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-interview-primary">Choose your focus</h3>
              <p className="text-gray-600">
                Practice technical or behavioral interviews at your skill level.
              </p>
            </div>
            
            <div className="interview-card p-6">
              <div className="w-12 h-12 bg-interview-light rounded-full flex items-center justify-center mb-4">
                <span className="text-interview-primary text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-interview-primary">Answer naturally</h3>
              <p className="text-gray-600">
                Respond through voice or text, just like in a real interview.
              </p>
            </div>
            
            <div className="interview-card p-6">
              <div className="w-12 h-12 bg-interview-light rounded-full flex items-center justify-center mb-4">
                <span className="text-interview-primary text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-interview-primary">Get detailed feedback</h3>
              <p className="text-gray-600">
                Receive personalized insights and tips to improve your performance.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 mt-8">
          <div className="interview-gradient rounded-xl p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-interview-primary">
              Ready to ace your next interview?
            </h2>
            <p className="text-gray-700 mb-6 max-w-lg mx-auto">
              Start practicing today and get valuable feedback to improve your interview skills.
            </p>
            <Link to="/start-interview">
              <Button size="lg" className="bg-interview-primary hover:bg-interview-secondary">
                <Play className="mr-2 h-4 w-4" />
                Start Interview Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Smart AI Interview Coach. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
