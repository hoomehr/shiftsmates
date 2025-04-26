"use client";

import React, { useState } from 'react';
import { FiVideo, FiFileText, FiCheckCircle, FiLock, FiChevronDown, FiChevronUp, FiPlay } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentItem {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'assignment' | 'project';
  isLocked: boolean;
  isCompleted: boolean;
}

interface CourseContentListProps {
  content: ContentItem[];
  isEnrolled: boolean;
  onMarkComplete: (contentId: number) => void;
}

export default function CourseContentList({ content, isEnrolled, onMarkComplete }: CourseContentListProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]); // Default to first section expanded

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Group content into sections (in a real app, this would come from the API)
  const sections = [
    {
      id: 1,
      title: "Week 1: Introduction to Machine Learning",
      items: content.slice(0, 4)
    },
    {
      id: 2,
      title: "Week 2: Advanced Techniques",
      items: content.slice(4)
    }
  ];

  const getIconForContentType = (type: string) => {
    switch (type) {
      case 'video':
        return <FiVideo className="text-indigo-500" />;
      case 'quiz':
        return <FiFileText className="text-green-500" />;
      case 'assignment':
        return <FiFileText className="text-orange-500" />;
      case 'project':
        return <FiFileText className="text-blue-500" />;
      default:
        return <FiFileText />;
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video Lecture';
      case 'quiz':
        return 'Quiz';
      case 'assignment':
        return 'Assignment';
      case 'project':
        return 'Project';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      {sections.map(section => (
        <div key={section.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                {section.items.filter(item => item.isCompleted).length} / {section.items.length} completed
              </span>
              {expandedSections.includes(section.id) ? (
                <FiChevronUp className="text-gray-500" />
              ) : (
                <FiChevronDown className="text-gray-500" />
              )}
            </div>
          </button>
          
          <AnimatePresence>
            {expandedSections.includes(section.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {section.items.map((item) => (
                    <div 
                      key={item.id}
                      className={`p-4 flex items-center justify-between ${
                        item.isCompleted 
                          ? 'bg-green-50 dark:bg-green-900/10' 
                          : 'bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          {item.isCompleted ? (
                            <FiCheckCircle className="text-green-500" />
                          ) : item.isLocked ? (
                            <FiLock className="text-gray-400" />
                          ) : (
                            getIconForContentType(item.type)
                          )}
                        </div>
                        <div>
                          <h4 className={`font-medium ${
                            item.isLocked && !isEnrolled 
                              ? 'text-gray-400 dark:text-gray-500' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {item.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span className="mr-3">{getContentTypeLabel(item.type)}</span>
                            <span>{item.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        {item.isCompleted ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Completed
                          </span>
                        ) : item.isLocked ? (
                          isEnrolled ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              Locked
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              Enroll to Unlock
                            </span>
                          )
                        ) : (
                          <button
                            onClick={() => onMarkComplete(item.id)}
                            disabled={!isEnrolled}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FiPlay className="mr-1" />
                            {isEnrolled ? 'Start' : 'Enroll to Start'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
