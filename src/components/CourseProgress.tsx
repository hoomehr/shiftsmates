"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CourseProgressProps {
  progress: number;
}

export default function CourseProgress({ progress }: CourseProgressProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Progress</span>
        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <motion.div 
          className="bg-indigo-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {progress < 100 ? 'Keep going!' : 'Completed!'}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {progress === 0 ? 'Not started' : progress === 100 ? 'Completed' : 'In progress'}
        </span>
      </div>
    </div>
  );
}
