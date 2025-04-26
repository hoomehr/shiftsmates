"use client";

import React, { useState } from 'react';
import { FiBarChart2, FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi';
import { Card } from '../../theme/3d-card';
import AnalysisModal from './AnalysisModal';

// Mock data for previous analyses
const mockPreviousAnalyses: Analysis[] = [
  {
    id: 1,
    date: "April 25, 2025",
    currentCareer: "Software Developer",
    targetCareer: "Data Scientist",
    matchPercentage: 68,
    transferableSkills: [
      { name: "Programming", level: 90, transferability: 95 },
      { name: "Problem Solving", level: 85, transferability: 90 },
      { name: "Analytical Thinking", level: 80, transferability: 95 },
      { name: "Database Management", level: 75, transferability: 80 },
    ],
    skillGaps: [
      { name: "Machine Learning", importance: 95, currentLevel: 40 },
      { name: "Statistical Analysis", importance: 90, currentLevel: 50 },
      { name: "Data Visualization", importance: 85, currentLevel: 60 },
      { name: "Big Data Technologies", importance: 80, currentLevel: 35 },
    ]
  },
  {
    id: 2,
    date: "April 20, 2025",
    currentCareer: "Marketing Manager",
    targetCareer: "UX Designer",
    matchPercentage: 62,
    transferableSkills: [
      { name: "Creativity", level: 85, transferability: 90 },
      { name: "User Research", level: 70, transferability: 85 },
      { name: "Communication", level: 90, transferability: 80 },
      { name: "Project Management", level: 85, transferability: 75 },
    ],
    skillGaps: [
      { name: "UI Design", importance: 95, currentLevel: 45 },
      { name: "Prototyping", importance: 90, currentLevel: 40 },
      { name: "User Testing", importance: 85, currentLevel: 55 }, // Fixed: added currentLevel instead of transferability
      { name: "Design Tools", importance: 80, currentLevel: 30 },
    ]
  },
  {
    id: 3,
    date: "April 15, 2025",
    currentCareer: "Teacher",
    targetCareer: "Instructional Designer",
    matchPercentage: 78,
    transferableSkills: [
      { name: "Curriculum Development", level: 90, transferability: 95 },
      { name: "Communication", level: 95, transferability: 90 },
      { name: "Content Creation", level: 85, transferability: 90 },
      { name: "Assessment Design", level: 80, transferability: 85 },
    ],
    skillGaps: [
      { name: "E-Learning Tools", importance: 90, currentLevel: 60 },
      { name: "Multimedia Production", importance: 85, currentLevel: 50 },
      { name: "LMS Administration", importance: 80, currentLevel: 45 },
      { name: "Project Management", importance: 75, currentLevel: 60 },
    ]
  }
];

// Define the Analysis type
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
    transferability?: number; // Optional for backward compatibility
  }[];
}

export default function PreviousAnalysesList() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAnalysisModal = (analysis: Analysis) => {
    setSelectedAnalysis(analysis);
    setIsModalOpen(true);
  };

  const closeAnalysisModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Previous Analyses
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockPreviousAnalyses.map((analysis) => (
          <Card 
            key={analysis.id} 
            className="bg-white dark:bg-gray-800 overflow-hidden shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)]"
          >
            <div className="p-6 relative group">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {analysis.currentCareer} <FiArrowRight className="inline mx-1" /> {analysis.targetCareer}
              </h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiCalendar className="mr-2" />
                  <span>{analysis.date}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiUser className="mr-2" />
                  <span>Current: {analysis.currentCareer}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiBarChart2 className="mr-2" />
                  <span>Target: {analysis.targetCareer}</span>
                </div>
              </div>
              
              {/* Match Percentage Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Match Score</span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{analysis.matchPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${analysis.matchPercentage}%` }}
                  />
                </div>
              </div>
              
              {/* View Details Button (visible on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center p-6">
                <button
                  onClick={() => openAnalysisModal(analysis)}
                  className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium transition-all hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.4)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.6)] dark:shadow-[0_4px_14px_0_rgba(79,70,229,0.3)]"
                >
                  View Details
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {selectedAnalysis && (
        <AnalysisModal
          isOpen={isModalOpen}
          closeModal={closeAnalysisModal}
          analysis={selectedAnalysis}
        />
      )}
    </div>
  );
}
