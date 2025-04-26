"use client";

import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { FiSearch, FiFilter, FiStar, FiClock, FiDollarSign, FiTag, FiExternalLink } from 'react-icons/fi';
import { Card } from '../../../theme/3d-card';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  provider: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  level: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
}

// Mock data for demonstration
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Machine Learning Fundamentals",
    provider: "DataCamp",
    description: "Learn the basics of machine learning algorithms and implementation with Python.",
    rating: 4.8,
    reviews: 1245,
    duration: "6 weeks",
    level: "Beginner",
    price: 49.99,
    category: "data-science",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    tags: ["Python", "Machine Learning", "AI", "Data Science"]
  },
  {
    id: 2,
    title: "Statistical Analysis with Python",
    provider: "Coursera",
    description: "Master statistical concepts and their implementation using Python libraries.",
    rating: 4.6,
    reviews: 987,
    duration: "8 weeks",
    level: "Intermediate",
    price: 79.99,
    category: "data-science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    tags: ["Python", "Statistics", "Data Analysis", "Pandas"]
  },
  {
    id: 3,
    title: "Data Visualization Mastery",
    provider: "Udemy",
    description: "Create compelling visualizations to communicate insights effectively.",
    rating: 4.7,
    reviews: 1532,
    duration: "4 weeks",
    level: "Beginner",
    price: 59.99,
    category: "data-science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    tags: ["Tableau", "D3.js", "Data Visualization", "Storytelling"]
  },
  {
    id: 4,
    title: "Big Data Technologies",
    provider: "edX",
    description: "Learn to work with large datasets using Hadoop, Spark, and other big data tools.",
    rating: 4.5,
    reviews: 876,
    duration: "10 weeks",
    level: "Advanced",
    price: 99.99,
    category: "data-science",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    tags: ["Hadoop", "Spark", "Big Data", "Cloud Computing"]
  },
  {
    id: 5,
    title: "Project Management Fundamentals",
    provider: "LinkedIn Learning",
    description: "Master the essentials of project management to lead teams effectively.",
    rating: 4.6,
    reviews: 1245,
    duration: "4 weeks",
    level: "Beginner",
    price: 39.99,
    category: "business",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    tags: ["Project Management", "Leadership", "Agile", "Scrum"]
  },
  {
    id: 6,
    title: "Leadership and Management",
    provider: "Coursera",
    description: "Develop essential leadership skills to manage teams and drive organizational success.",
    rating: 4.7,
    reviews: 987,
    duration: "6 weeks",
    level: "Intermediate",
    price: 69.99,
    category: "business",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    tags: ["Leadership", "Management", "Team Building", "Strategy"]
  },
  {
    id: 7,
    title: "UX Design Principles",
    provider: "Udemy",
    description: "Learn the fundamentals of user experience design to create intuitive, user-friendly products.",
    rating: 4.8,
    reviews: 1532,
    duration: "8 weeks",
    level: "Beginner",
    price: 49.99,
    category: "design",
    image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    tags: ["UX Design", "User Research", "Wireframing", "Prototyping"]
  },
  {
    id: 8,
    title: "UI Design with Figma",
    provider: "Skillshare",
    description: "Master UI design using Figma to create beautiful and functional interfaces.",
    rating: 4.5,
    reviews: 876,
    duration: "6 weeks",
    level: "Intermediate",
    price: 59.99,
    category: "design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    tags: ["Figma", "UI Design", "Interface Design", "Design Systems"]
  },
  {
    id: 9,
    title: "Introduction to Web Development",
    provider: "freeCodeCamp",
    description: "Learn the basics of HTML, CSS, and JavaScript to build websites.",
    rating: 4.9,
    reviews: 2345,
    duration: "8 weeks",
    level: "Beginner",
    price: 0,
    category: "programming",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    tags: ["HTML", "CSS", "JavaScript", "Web Development"]
  }
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses);
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'business', name: 'Business' },
    { id: 'design', name: 'Design' },
    { id: 'programming', name: 'Programming' }
  ];

  // Filter courses based on search query, category, price, and level
  useEffect(() => {
    let result = [...mockCourses];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((course: Course) => 
        course.title.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query) ||
        course.tags.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((course: Course) => course.category === selectedCategory);
    }

    // Filter by price
    if (priceFilter === 'free') {
      result = result.filter((course: Course) => course.price === 0);
    } else if (priceFilter === 'paid') {
      result = result.filter((course: Course) => course.price > 0);
    }

    // Filter by level
    if (levelFilter !== 'all') {
      result = result.filter((course: Course) => course.level.toLowerCase().includes(levelFilter.toLowerCase()));
    }

    setFilteredCourses(result);
  }, [searchQuery, selectedCategory, priceFilter, levelFilter]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Recommended Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover courses tailored to help you bridge skill gaps and accelerate your career transition
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Search courses by title, description, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {/* Price Filter */}
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>

              {/* Level Filter */}
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        <Tab.Group onChange={(index) => setSelectedCategory(categories[index].id)}>
          <Tab.List className="flex p-1 space-x-1 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl mb-8 overflow-x-auto">
            {categories.map((category) => (
              <Tab
                key={category.id}
                className={({ selected }) =>
                  `px-4 py-2.5 text-sm font-medium leading-5 text-indigo-700 dark:text-indigo-200 rounded-lg whitespace-nowrap
                  ${selected
                    ? 'bg-white dark:bg-gray-800 shadow'
                    : 'hover:bg-white/[0.12] dark:hover:bg-gray-700/[0.5] hover:text-indigo-800 dark:hover:text-indigo-100'}`
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {categories.map((category, idx) => (
              <Tab.Panel key={idx} className="focus:outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Course Grid */}
                  {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCourses
                        .filter((course: Course) => category.id === 'all' || course.category === category.id)
                        .map((course: Course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        No courses found matching your criteria. Try adjusting your filters.
                      </p>
                    </div>
                  )}
                </motion.div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 overflow-hidden h-full flex flex-col group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <FiStar className="text-yellow-400 mr-1" />
          <span>{course.rating}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">({course.reviews})</span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{course.title}</h3>
          </div>
          
          <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">{course.provider}</p>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {course.description}
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1 mb-3">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
              >
                <FiTag className="mr-1 h-3 w-3" />
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                +{course.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center">
              <FiClock className="mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <FiDollarSign className="mr-1" />
              <span>{course.price === 0 ? 'Free' : `$${course.price}`}</span>
            </div>
            <div className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
              {course.level}
            </div>
          </div>
          
          <div className="mt-4 relative overflow-hidden">
            <Link 
              href={`/courses/${course.id}`}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform translate-y-full group-hover:translate-y-0 duration-300 ease-in-out"
            >
              <FiExternalLink className="mr-2" />
              View Course
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
