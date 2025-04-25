import React from 'react';
import { Card, CardItem, CardGrid } from './3d-card';
import { FiBookOpen, FiBarChart2, FiUsers } from 'react-icons/fi';

export default function CardDemo() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          ShiftsMates Components
        </h2>
        
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">3D Card Effect</h3>
          <Card className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Career Transition</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Discover your path to a new career with our personalized analysis and course recommendations.
              </p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
          </Card>
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Card Items</h3>
          <CardGrid columns={3} className="max-w-6xl mx-auto">
            <CardItem 
              title="Skill Analysis" 
              description="Identify your transferable skills and discover areas for growth."
              icon={<FiBarChart2 className="w-6 h-6 text-indigo-600" />}
            />
            <CardItem 
              title="Course Recommendations" 
              description="Get personalized course suggestions based on your career goals."
              icon={<FiBookOpen className="w-6 h-6 text-indigo-600" />}
            />
            <CardItem 
              title="Community Support" 
              description="Connect with others who are also transitioning to new careers."
              icon={<FiUsers className="w-6 h-6 text-indigo-600" />}
            />
          </CardGrid>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Responsive Grid</h3>
          <CardGrid columns={2} className="max-w-4xl mx-auto">
            <Card className="bg-white dark:bg-gray-800 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analyze Your Skills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI-powered analysis helps you understand how your current skills translate to new roles.
              </p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Learn New Skills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover the most in-demand skills for your target career and the best courses to learn them.
              </p>
            </Card>
          </CardGrid>
        </div>
      </div>
    </div>
  );
}
