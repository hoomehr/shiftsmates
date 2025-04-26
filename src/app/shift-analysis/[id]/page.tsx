"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Tab } from '@headlessui/react';
import { FiArrowLeft, FiBarChart2, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiAward, FiTarget, FiLayers } from 'react-icons/fi';
import { Card } from '../../../../theme/3d-card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

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

// Mock data for analyses
const mockPreviousAnalyses = [
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
    currentCareer: "Marketing Specialist",
    targetCareer: "UX Designer",
    matchPercentage: 72,
    transferableSkills: [
      { name: "Creativity", level: 85, transferability: 90 },
      { name: "User Research", level: 70, transferability: 95 },
      { name: "Communication", level: 90, transferability: 85 },
      { name: "Project Management", level: 80, transferability: 75 },
    ],
    skillGaps: [
      { name: "UI Design", importance: 90, currentLevel: 45 },
      { name: "Prototyping", importance: 85, currentLevel: 40 },
      { name: "User Testing", importance: 80, currentLevel: 55 },
      { name: "Design Systems", importance: 75, currentLevel: 30 },
    ]
  },
  {
    id: 3,
    date: "April 15, 2025",
    currentCareer: "Teacher",
    targetCareer: "Instructional Designer",
    matchPercentage: 85,
    transferableSkills: [
      { name: "Curriculum Development", level: 95, transferability: 95 },
      { name: "Communication", level: 90, transferability: 90 },
      { name: "Content Creation", level: 85, transferability: 95 },
      { name: "Assessment Design", level: 90, transferability: 90 },
    ],
    skillGaps: [
      { name: "E-Learning Tools", importance: 90, currentLevel: 60 },
      { name: "Multimedia Production", importance: 85, currentLevel: 50 },
      { name: "LMS Administration", importance: 80, currentLevel: 45 },
      { name: "Project Management", importance: 75, currentLevel: 65 },
    ]
  },
];

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // In a real app, you would fetch the analysis data from an API
    const analysisId = params.id as string;
    const analysisData = mockPreviousAnalyses.find(a => a.id === parseInt(analysisId, 10));
    
    if (analysisData) {
      setAnalysis(analysisData);
    } else {
      // Analysis not found, redirect to analyses page
      router.push('/shift-analysis');
    }
  }, [params.id, router]);

  if (!analysis) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/shift-analysis" 
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Career Shift Analyses
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analysis.currentCareer} → {analysis.targetCareer}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Analysis from {analysis.date}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Match Score:</span>
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{analysis.matchPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className="flex p-1 space-x-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl mb-6 max-w-3xl mx-auto">
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all duration-200 ${selected ? 'bg-white dark:bg-gray-800 shadow text-indigo-700 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-400 hover:bg-white/[0.12] dark:hover:bg-gray-800/[0.12] hover:text-gray-900 dark:hover:text-gray-100'}`
              }
            >
              Analysis Overview
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all duration-200 ${selected ? 'bg-white dark:bg-gray-800 shadow text-indigo-700 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-400 hover:bg-white/[0.12] dark:hover:bg-gray-800/[0.12] hover:text-gray-900 dark:hover:text-gray-100'}`
              }
            >
              Skill Gaps
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all duration-200 ${selected ? 'bg-white dark:bg-gray-800 shadow text-indigo-700 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-400 hover:bg-white/[0.12] dark:hover:bg-gray-800/[0.12] hover:text-gray-900 dark:hover:text-gray-100'}`
              }
            >
              Recommended Courses
            </Tab>
          </Tab.List>
          
          <Tab.Panels className="max-w-5xl mx-auto">
            <Tab.Panel className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
              {/* Analysis Overview Tab Content */}
              <div className="space-y-8">
                {/* 2x2 Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card className="bg-white dark:bg-gray-800 p-4 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)]">
                    <div className="flex items-start">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mr-3">
                        <FiTrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Match Score</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall career compatibility</p>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{analysis.matchPercentage}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 p-4 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)]">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg mr-3">
                        <FiAward className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Top Transferable Skill</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your most valuable asset</p>
                        <div className="flex items-center">
                          <span className="text-lg font-medium text-gray-900 dark:text-white">{analysis.transferableSkills[0].name}</span>
                          <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">{analysis.transferableSkills[0].transferability}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 p-4 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)]">
                    <div className="flex items-start">
                      <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg mr-3">
                        <FiTarget className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Primary Skill Gap</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Focus area for improvement</p>
                        <div className="flex items-center">
                          <span className="text-lg font-medium text-gray-900 dark:text-white">{analysis.skillGaps[0].name}</span>
                          <span className="ml-2 text-sm font-medium text-red-600 dark:text-red-400">+{analysis.skillGaps[0].importance - analysis.skillGaps[0].currentLevel}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 p-4 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)]">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg mr-3">
                        <FiLayers className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Skill Transferability</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Average skill relevance</p>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {Math.round(analysis.transferableSkills.reduce((acc, skill) => acc + skill.transferability, 0) / analysis.transferableSkills.length)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Transferable Skills List */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Transferable Skills
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {analysis.transferableSkills.map((skill, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                            {skill.transferability}% transferable
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <motion.div 
                            className="bg-indigo-600 h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Current proficiency: {skill.level}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Chart */}
                <Card className="bg-white dark:bg-gray-800 p-4 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)] mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Skills Radar Chart
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius="80%" data={analysis.transferableSkills}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Current Level" dataKey="level" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.3} />
                        <Radar name="Transferability" dataKey="transferability" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Analysis Summary
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You have a strong foundation for transitioning from {analysis.currentCareer} to {analysis.targetCareer}. 
                    Your {analysis.transferableSkills[0].name.toLowerCase()} and {analysis.transferableSkills[1].name.toLowerCase()} skills are highly transferable. 
                    Focus on developing skills in {analysis.skillGaps[0].name.toLowerCase()} and {analysis.skillGaps[1].name.toLowerCase()} to increase your match percentage.
                  </p>
                </div>
              </div>
            </Tab.Panel>
            
            <Tab.Panel className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
              {/* Skill Gaps Tab Content */}
              <div className="space-y-8">
                {/* 2x2 Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card className="bg-white dark:bg-gray-800 p-4 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)]">
                    <div className="flex items-start">
                      <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg mr-3">
                        <FiAlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Largest Gap</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Most critical skill to develop</p>
                        <div className="flex items-center">
                          <span className="text-lg font-medium text-gray-900 dark:text-white">{analysis.skillGaps[0].name}</span>
                          <span className="ml-2 text-sm font-medium text-red-600 dark:text-red-400">
                            Gap: {analysis.skillGaps[0].importance - analysis.skillGaps[0].currentLevel}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 p-4 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)]">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg mr-3">
                        <FiTarget className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Average Gap</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall skill development needed</p>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {Math.round(analysis.skillGaps.reduce((acc, skill) => acc + (skill.importance - skill.currentLevel), 0) / analysis.skillGaps.length)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 p-4 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)]">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg mr-3">
                        <FiCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Smallest Gap</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Skill closest to target level</p>
                        <div className="flex items-center">
                          <span className="text-lg font-medium text-gray-900 dark:text-white">{analysis.skillGaps[2].name}</span>
                          <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">
                            Gap: {analysis.skillGaps[2].importance - analysis.skillGaps[2].currentLevel}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 p-4 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)]">
                    <div className="flex items-start">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mr-3">
                        <FiBarChart2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Time to Proficiency</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimated learning time</p>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {Math.round(analysis.skillGaps.reduce((acc, skill) => acc + (skill.importance - skill.currentLevel), 0) / 10)} months
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Skill Gaps List */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Skills to Develop
                  </h3>
                  <div className="space-y-4">
                    {analysis.skillGaps.map((skill, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Importance: {skill.importance}%</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            Gap: {skill.importance - skill.currentLevel}%
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Current Level: {skill.currentLevel}%</span>
                            <span>Target Level: {skill.importance}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 overflow-hidden">
                            <div className="flex h-full">
                              <div 
                                className="bg-green-500 h-2.5" 
                                style={{ width: `${skill.currentLevel}%` }}
                              ></div>
                              <div 
                                className="bg-red-500 h-2.5" 
                                style={{ width: `${skill.importance - skill.currentLevel}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Development Plan</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                            <li>Take specialized courses in {skill.name}</li>
                            <li>Practice through hands-on projects</li>
                            <li>Join communities focused on {skill.name}</li>
                            <li>Consider certification programs</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Development Strategy
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    To successfully transition from {analysis.currentCareer} to {analysis.targetCareer}, focus on developing the skills with the largest gaps first. 
                    We recommend a structured learning approach combining courses, practical projects, and mentorship.
                  </p>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setActiveTab(2)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Recommended Courses
                    </button>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg">
              {/* Recommended Courses Tab Content */}
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recommended Courses</h3>
                  <Link 
                    href="/courses" 
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                  >
                    View All Courses
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Course recommendations based on skill gaps */}
                  {analysis.skillGaps.map((skill, index) => (
                    <Card key={index} className="bg-white dark:bg-gray-800 p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <Link href={`/courses/${index + 1}`} className="block">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 relative">
                            <img 
                              src={`https://images.unsplash.com/photo-162064178${8421 + index * 100}-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80`} 
                              alt={`${skill.name} Course`}
                              className="w-full h-48 md:h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <span>4.{8 - index}</span>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-2/3 p-6">
                            <div className="mb-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mr-2">
                                {analysis.targetCareer}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Recommended
                              </span>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {skill.name} Masterclass for {analysis.targetCareer}s
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              Comprehensive course designed to help you develop essential {skill.name.toLowerCase()} skills required for a successful career as a {analysis.targetCareer}.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {6 + index} weeks
                              </div>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                {index === 0 ? 'Beginner' : index === 1 ? 'Intermediate' : 'Advanced'}
                              </div>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                ${49.99 + index * 20}
                              </div>
                            </div>
                            <div className="mt-auto">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <p className="text-gray-500 dark:text-gray-400">Skill Gap: <span className="font-medium text-red-600 dark:text-red-400">{skill.importance - skill.currentLevel}%</span></p>
                                  </div>
                                </div>
                                <div className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                                  View Course
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>

                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Learning Path Recommendation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Based on your skill gaps, we recommend taking these courses in the following order:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    {analysis.skillGaps.map((skill, index) => (
                      <li key={index} className="ml-2">
                        <span className="font-medium">{skill.name} Masterclass</span> - Addresses your {index === 0 ? 'primary' : index === 1 ? 'secondary' : 'tertiary'} skill gap
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 flex justify-center">
                    <Link
                      href="/courses"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Explore All Courses
                    </Link>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
