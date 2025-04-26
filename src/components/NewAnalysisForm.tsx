"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiLink, FiTag, FiBriefcase, FiTarget } from 'react-icons/fi';
import { Card } from '../../theme/3d-card';

// Define skills and industries for tag selection
const skillOptions = [
  'JavaScript', 'Python', 'React', 'Node.js', 'Data Analysis', 
  'Machine Learning', 'Project Management', 'UX/UI Design', 
  'Marketing', 'Sales', 'Customer Service', 'Leadership',
  'Communication', 'Problem Solving', 'Teamwork'
];

const industryOptions = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing',
  'E-commerce', 'Manufacturing', 'Retail', 'Consulting', 'Media',
  'Non-profit', 'Government', 'Entertainment', 'Transportation'
];

interface NewAnalysisFormProps {
  onSubmit: (data: AnalysisFormData) => void;
  isLoading?: boolean;
}

export interface AnalysisFormData {
  currentCareer: string;
  targetCareer: string;
  resumeFile?: File;
  linkedinUrl?: string;
  skills: string[];
  industries: string[];
  yearsOfExperience?: number;
  additionalNotes?: string;
}

export default function NewAnalysisForm({ onSubmit, isLoading = false }: NewAnalysisFormProps) {
  const [formData, setFormData] = useState<AnalysisFormData>({
    currentCareer: '',
    targetCareer: '',
    skills: [],
    industries: [],
    yearsOfExperience: undefined,
    additionalNotes: ''
  });
  
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFileName(file.name);
      setFormData(prev => ({ ...prev, resumeFile: file }));
    }
  };

  const handleTagToggle = (tag: string, type: 'skills' | 'industries') => {
    setFormData(prev => {
      const currentTags = [...prev[type]];
      if (currentTags.includes(tag)) {
        return { ...prev, [type]: currentTags.filter(t => t !== tag) };
      } else {
        return { ...prev, [type]: [...currentTags, tag] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="bg-white dark:bg-gray-800 p-8 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          New Career Analysis
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Fill in the details below to get personalized career transition insights
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Career */}
          <div>
            <label htmlFor="currentCareer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Career
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiBriefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="currentCareer"
                name="currentCareer"
                type="text"
                required
                value={formData.currentCareer}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="e.g. Software Developer"
              />
            </div>
          </div>

          {/* Target Career */}
          <div>
            <label htmlFor="targetCareer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Target Career
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiTarget className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="targetCareer"
                name="targetCareer"
                type="text"
                required
                value={formData.targetCareer}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="e.g. Data Scientist"
              />
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Upload Resume/CV (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl">
            <div className="space-y-1 text-center">
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="resumeFile"
                  className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="resumeFile"
                    name="resumeFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {resumeFileName || "PDF, DOC, DOCX up to 10MB"}
              </p>
            </div>
          </div>
        </div>

        {/* LinkedIn URL */}
        <div>
          <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            LinkedIn Profile URL (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLink className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              value={formData.linkedinUrl || ''}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>

        {/* Years of Experience */}
        <div>
          <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Years of Experience
          </label>
          <input
            id="yearsOfExperience"
            name="yearsOfExperience"
            type="number"
            min="0"
            max="50"
            value={formData.yearsOfExperience || ''}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Skills Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Your Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map(skill => (
              <button
                key={skill}
                type="button"
                onClick={() => handleTagToggle(skill, 'skills')}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  formData.skills.includes(skill)
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <FiTag className="mr-1 h-4 w-4" />
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Industry Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Relevant Industries
          </label>
          <div className="flex flex-wrap gap-2">
            {industryOptions.map(industry => (
              <button
                key={industry}
                type="button"
                onClick={() => handleTagToggle(industry, 'industries')}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  formData.industries.includes(industry)
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <FiTag className="mr-1 h-4 w-4" />
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Additional Notes (Optional)
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            rows={4}
            value={formData.additionalNotes || ''}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Any additional information about your career goals or background"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium transition-all hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.4)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.6)] dark:shadow-[0_4px_14px_0_rgba(79,70,229,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Start Analysis'}
          </button>
        </div>
      </form>
    </Card>
  );
}
