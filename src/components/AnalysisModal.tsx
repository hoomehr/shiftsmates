"use client";

import React, { Fragment } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { FiX, FiBarChart2, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiAward, FiTarget, FiLayers } from 'react-icons/fi';
import { Card } from '../../theme/3d-card';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface AnalysisModalProps {
  isOpen: boolean;
  closeModal: () => void;
  analysis: {
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
  };
}

export default function AnalysisModal({ isOpen, closeModal, analysis }: AnalysisModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analysis.currentCareer} → {analysis.targetCareer}
                  </Dialog.Title>
                  <div className="flex items-center">
                    <div className="mr-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {analysis.matchPercentage}%
                        </span>
                      </div>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Match</span>
                    </div>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={closeModal}
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 dark:bg-gray-700 p-1 mb-6">
                    <Tab
                      className={({ selected }) =>
                        `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all
                        ${
                          selected
                            ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-white/[0.12] dark:hover:bg-gray-600/[0.5] hover:text-gray-900 dark:hover:text-white'
                        }`
                      }
                    >
                      Analysis Overview
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all
                        ${
                          selected
                            ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-white/[0.12] dark:hover:bg-gray-600/[0.5] hover:text-gray-900 dark:hover:text-white'
                        }`
                      }
                    >
                      Skill Gaps
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel className="focus:outline-none">
                      {/* Analysis Overview Tab Content */}
                      {/* 2x2 Card Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                          Your programming and analytical skills are highly transferable. Focus on developing skills in machine learning 
                          and statistical analysis to increase your match percentage.
                        </p>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className="focus:outline-none">
                      {/* Skill Gaps Tab Content */}
                      {/* 2x2 Card Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                                <span className="text-lg font-medium text-indigo-600 dark:text-indigo-400">~6 months</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                      
                      {/* Skills to Develop List */}
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Skills to Develop
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {analysis.skillGaps.map((skill, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                              <span className="text-gray-500 dark:text-gray-400 font-medium">
                                Importance: {skill.importance}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
                              <motion.div 
                                className="bg-indigo-600 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.currentLevel}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                Current level: {skill.currentLevel}%
                              </span>
                              <span className={`flex items-center text-sm ${
                                skill.currentLevel < 50 
                                  ? 'text-red-500 dark:text-red-400' 
                                  : 'text-yellow-500 dark:text-yellow-400'
                              }`}>
                                {skill.currentLevel < 50 
                                  ? <><FiAlertCircle className="mr-1" /> Significant gap</> 
                                  : <><FiCheckCircle className="mr-1" /> Moderate gap</>}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Chart */}
                      <Card className="bg-white dark:bg-gray-800 p-4 shadow-[0_4px_14px_0_rgba(79,70,229,0.25),_0_1px_5px_0_rgba(79,70,229,0.15)] mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Skill Gap Visualization
                        </h3>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={analysis.skillGaps}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar name="Current Level" dataKey="currentLevel" fill="#4F46E5" />
                              <Bar name="Target Level" dataKey="importance" fill="#10B981" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Card>

                      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Recommended Next Steps
                        </h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start">
                            <FiBarChart2 className="mt-1 mr-2 text-indigo-600 dark:text-indigo-400" />
                            <span>Take introductory courses in machine learning and statistical analysis</span>
                          </li>
                          <li className="flex items-start">
                            <FiBarChart2 className="mt-1 mr-2 text-indigo-600 dark:text-indigo-400" />
                            <span>Practice data visualization with tools like Tableau or Power BI</span>
                          </li>
                          <li className="flex items-start">
                            <FiBarChart2 className="mt-1 mr-2 text-indigo-600 dark:text-indigo-400" />
                            <span>Complete projects that demonstrate your ability to work with big data</span>
                          </li>
                        </ul>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
