"use client";

import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FiSearch, FiFilter, FiStar, FiClock, FiDollarSign, FiBookOpen } from 'react-icons/fi';
import { Card } from '../../../theme/3d-card';
import { motion } from 'framer-motion';

// Mock data for demonstration
const mockCourses = [
  {
    id: 1,
    title: "Machine Learning Fundamentals",
    provider: "DataCamp",
    rating: 4.8,
    reviews: 1245,
    duration: "6 weeks",
    level: "Beginner",
    price: 49.99,
    matchScore: 95,
    category: "data-science",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 2,
    title: "Statistical Analysis with Python",
    provider: "Coursera",
    rating: 4.6,
    reviews: 987,
    duration: "8 weeks",
    level: "Intermediate",
    price: 79.99,
    matchScore: 90,
    category: "data-science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    title: "Data Visualization Mastery",
    provider: "Udemy",
    rating: 4.7,
    reviews: 1532,
    duration: "4 weeks",
    level: "Beginner",
    price: 59.99,
    matchScore: 85,
    category: "data-science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 4,
    title: "Big Data Technologies",
    provider: "edX",
    rating: 4.5,
    reviews: 876,
    duration: "10 weeks",
    level: "Advanced",
    price: 99.99,
    matchScore: 80,
    category: "data-science",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 5,
    title: "Project Management Fundamentals",
    provider: "LinkedIn Learning",
    rating: 4.6,
    reviews: 1245,
    duration: "4 weeks",
    level: "Beginner",
    price: 39.99,
    matchScore: 75,
    category: "business",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 6,
    title: "Leadership and Management",
    provider: "Coursera",
    rating: 4.7,
    reviews: 987,
    duration: "6 weeks",
    level: "Intermediate",
    price: 69.99,
    matchScore: 70,
    category: "business",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 7,
    title: "UX Design Principles",
    provider: "Udemy",
    rating: 4.8,
    reviews: 1532,
    duration: "8 weeks",
    level: "Beginner",
    price: 49.99,
    matchScore: 65,
    category: "design",
    image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
  },
  {
    id: 8,
    title: "UI Design with Figma",
    provider: "Skillshare",
    rating: 4.5,
    reviews: 876,
    duration: "6 weeks",
    level: "Intermediate",
    price: 59.99,
    matchScore: 60,
    category: "design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [levelFilters, setLevelFilters] = useState({
    beginner: true,
    intermediate: true,
    advanced: true,
  });

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'business', name: 'Business' },
    { id: 'design', name: 'Design' },
  ];

  const filteredCourses = mockCourses
    .filter(course => 
      (selectedCategory === 'all' || course.category === selectedCategory) &&
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       course.provider.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (course.price >= priceRange[0] && course.price <= priceRange[1]) &&
      ((course.level === 'Beginner' && levelFilters.beginner) ||
       (course.level === 'Intermediate' && levelFilters.intermediate) ||
       (course.level === 'Advanced' && levelFilters.advanced))
    )
    .sort((a, b) => b.matchScore - a.matchScore);

  const toggleLevelFilter = (level: keyof typeof levelFilters) => {
    setLevelFilters({
      ...levelFilters,
      [level]: !levelFilters[level]
    });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Recommended Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Courses tailored to help you bridge the skill gaps in your career transition.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Search courses by title or provider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium border border-gray-300 dark:border-gray-700 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] flex items-center gap-2"
            >
              <FiFilter className="w-5 h-5" /> Filters
            </button>
          </div>

          {showFilters && (
            <Card className="mt-4 p-6 bg-white dark:bg-gray-800 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Course Level</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={levelFilters.beginner}
                        onChange={() => toggleLevelFilter('beginner')}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Beginner</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={levelFilters.intermediate}
                        onChange={() => toggleLevelFilter('intermediate')}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Intermediate</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={levelFilters.advanced}
                        onChange={() => toggleLevelFilter('advanced')}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Advanced</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        <Tab.Group onChange={(index) => setSelectedCategory(categories[index].id)}>
          <Tab.List className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-8 overflow-x-auto">
            {categories.map((category) => (
              <Tab
                key={category.id}
                className={({ selected }) =>
                  `w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all
                  ${
                    selected
                      ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/[0.12] dark:hover:bg-gray-700/[0.5] hover:text-gray-900 dark:hover:text-white'
                  }`
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {categories.map((category, idx) => (
              <Tab.Panel key={idx} className="focus:outline-none">
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="h-full bg-white dark:bg-gray-800 overflow-hidden shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.3)]">
                          <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700">
                            <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
                              {course.matchScore}% Match
                            </div>
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              {course.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              {course.provider}
                            </p>
                            <div className="flex items-center mb-4">
                              <div className="flex items-center mr-2">
                                <FiStar className="h-4 w-4 text-yellow-400" />
                                <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                                  {course.rating}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({course.reviews} reviews)
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              <div className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                                <FiClock className="h-3 w-3 mr-1" />
                                {course.duration}
                              </div>
                              <div className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                                <FiBookOpen className="h-3 w-3 mr-1" />
                                {course.level}
                              </div>
                              <div className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                                <FiDollarSign className="h-3 w-3 mr-1" />
                                ${course.price}
                              </div>
                            </div>
                            <button className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium transition-all hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.4)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.6)] dark:shadow-[0_4px_14px_0_rgba(79,70,229,0.3)]">
                              View Course
                            </button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      No courses found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
