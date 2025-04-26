"use client";

import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import PreviousAnalysesList from '../../components/PreviousAnalysesList';
import AnalysisModal from '../../components/AnalysisModal';
import NewAnalysisForm, { AnalysisFormData } from '../../components/NewAnalysisForm';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { Card } from '../../../theme/3d-card';

// Define Analysis type to match the data structure
interface Analysis {
  id: number;
  date: string;
  currentCareer: string;
  targetCareer: string;
  matchPercentage: number;
  transferableSkills: {
    name: string;
    level: number;
    transferability: number;
  }[];
  skillGaps: {
    name: string;
    importance: number;
    currentLevel: number;
  }[];
}

export default function ShiftAnalysisPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleViewDetails = (analysis: Analysis) => {
    setSelectedAnalysis(analysis);
    setIsModalOpen(true);
  };

  const handleNewAnalysisSubmit = async (data: AnalysisFormData) => {
    setIsAnalyzing(true);
    
    // Simulate API call to analyze career transition
    console.log('Submitting analysis data:', data);
    
    // In a real application, you would send this data to your backend
    // const response = await fetch('/api/analyze-career', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();
    
    // Simulate a delay for the analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Show the most recent analysis
      const mockNewAnalysis = {
        id: 4,
        date: "April 25, 2025",
        currentCareer: data.currentCareer,
        targetCareer: data.targetCareer,
        matchPercentage: Math.floor(Math.random() * 30) + 60, // Random score between 60-90
        transferableSkills: [
          { name: "Adaptability", level: 85, transferability: 90 },
          { name: "Critical Thinking", level: 80, transferability: 85 },
          { name: "Research", level: 75, transferability: 80 },
          { name: "Communication", level: 90, transferability: 95 },
        ],
        skillGaps: [
          { name: "Industry Knowledge", importance: 90, currentLevel: 40 },
          { name: "Specialized Tools", importance: 85, currentLevel: 35 },
          { name: "Technical Skills", importance: 80, currentLevel: 45 },
          { name: "Certifications", importance: 75, currentLevel: 30 },
        ]
      };
      
      setSelectedAnalysis(mockNewAnalysis);
      setIsModalOpen(true);
    }, 3000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Career Shift Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Analyze your current skills and see how they match with your target career path.
          </p>
        </div>

        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium transition-all hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.4)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.6)] dark:shadow-[0_4px_14px_0_rgba(79,70,229,0.3)] flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" /> New Analysis
          </button>
        </div>

        {showForm && (
          <Card className="bg-white dark:bg-gray-800 p-6 mb-8 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)]">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              New Career Shift Analysis
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="currentCareer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Career
                  </label>
                  <input
                    type="text"
                    id="currentCareer"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. Software Developer"
                  />
                </div>
                <div>
                  <label htmlFor="targetCareer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Career
                  </label>
                  <input
                    type="text"
                    id="targetCareer"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g. Data Scientist"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Top Skills (comma separated)
                </label>
                <textarea
                  id="skills"
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="e.g. Programming, Problem Solving, Communication"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Experience Summary
                </label>
                <textarea
                  id="experience"
                  rows={4}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Briefly describe your work experience..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium transition-all hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.4)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.6)] dark:shadow-[0_4px_14px_0_rgba(79,70,229,0.3)]"
                >
                  Analyze Career Shift
                </button>
              </div>
            </form>
          </Card>
        )}

        {/* Previous Analyses List */}
        <PreviousAnalysesList />
      </div>
    </div>
  );
}
