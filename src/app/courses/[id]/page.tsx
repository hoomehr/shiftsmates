"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FiArrowLeft, FiStar, FiClock, FiDollarSign, FiTag, FiBookOpen, FiCheck, FiLock, FiPlay, FiDownload, FiUser, FiCalendar } from 'react-icons/fi';
import { Card } from '../../../../theme/3d-card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CourseProgress from '../../../components/CourseProgress';
import CourseContentList from '../../../components/CourseContentList';

// Define types for course data
interface CourseContent {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'assignment' | 'project';
  isLocked: boolean;
  isCompleted: boolean;
}

interface Resource {
  title: string;
  type: string;
  url: string;
}

interface Instructor {
  name: string;
  title: string;
  image: string;
  bio: string;
}

interface Course {
  id: number;
  title: string;
  provider: string;
  description: string;
  longDescription: string;
  rating: number;
  reviews: number;
  duration: string;
  level: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
  instructor: Instructor;
  enrollmentStatus: string;
  enrolledStudents: number;
  lastUpdated: string;
  language: string;
  certificate: boolean;
  prerequisites: string[];
  whatYouWillLearn: string[];
  content: CourseContent[];
  resources: Resource[];
}

// Mock data for a single course
const mockCourseData: Record<number, Course> = {
  1: {
    id: 1,
    title: "Machine Learning Fundamentals",
    provider: "DataCamp",
    description: "Learn the basics of machine learning algorithms and implementation with Python. This comprehensive course covers everything from data preprocessing to model deployment, with hands-on projects and real-world applications.",
    longDescription: "Machine learning is transforming industries across the globe. This course provides a solid foundation in machine learning concepts and techniques, with a focus on practical implementation using Python. You'll learn how to preprocess data, select appropriate algorithms, train and evaluate models, and deploy them in production environments. Through hands-on projects, you'll gain experience solving real-world problems and develop a portfolio to showcase your skills to potential employers.",
    rating: 4.8,
    reviews: 1245,
    duration: "6 weeks",
    level: "Beginner",
    price: 49.99,
    category: "data-science",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    tags: ["Python", "Machine Learning", "AI", "Data Science"],
    instructor: {
      name: "Dr. Sarah Johnson",
      title: "Data Science Lead at TechCorp",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      bio: "Dr. Johnson has over 10 years of experience in machine learning and data science. She has worked on projects for Fortune 500 companies and has published numerous research papers in top AI conferences."
    },
    enrollmentStatus: "Open",
    enrolledStudents: 3245,
    lastUpdated: "2025-03-15",
    language: "English",
    certificate: true,
    prerequisites: ["Basic Python knowledge", "Understanding of statistics", "Algebra fundamentals"],
    whatYouWillLearn: [
      "Understand the fundamentals of machine learning algorithms",
      "Preprocess and clean data for model training",
      "Implement supervised and unsupervised learning algorithms",
      "Evaluate model performance and tune hyperparameters",
      "Deploy machine learning models to production",
      "Apply machine learning to solve real-world problems"
    ],
    content: [
      {
        id: 1,
        title: "Introduction to Machine Learning",
        duration: "45 minutes",
        type: "video",
        isLocked: false,
        isCompleted: true
      },
      {
        id: 2,
        title: "Data Preprocessing Techniques",
        duration: "1 hour",
        type: "video",
        isLocked: false,
        isCompleted: true
      },
      {
        id: 3,
        title: "Supervised Learning Algorithms",
        duration: "1.5 hours",
        type: "video",
        isLocked: false,
        isCompleted: false
      },
      {
        id: 4,
        title: "Week 1 Quiz",
        duration: "30 minutes",
        type: "quiz",
        isLocked: false,
        isCompleted: false
      },
      {
        id: 5,
        title: "Unsupervised Learning",
        duration: "1 hour",
        type: "video",
        isLocked: true,
        isCompleted: false
      },
      {
        id: 6,
        title: "Model Evaluation and Validation",
        duration: "1 hour",
        type: "video",
        isLocked: true,
        isCompleted: false
      },
      {
        id: 7,
        title: "Week 2 Assignment",
        duration: "2 hours",
        type: "assignment",
        isLocked: true,
        isCompleted: false
      },
      {
        id: 8,
        title: "Final Project",
        duration: "4 hours",
        type: "project",
        isLocked: true,
        isCompleted: false
      }
    ],
    resources: [
      {
        title: "Python for Data Science Cheat Sheet",
        type: "pdf",
        url: "#"
      },
      {
        title: "Machine Learning Algorithms Comparison",
        type: "pdf",
        url: "#"
      },
      {
        title: "Dataset for Final Project",
        type: "dataset",
        url: "#"
      }
    ]
  },
  // Add more courses as needed
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real app, you would fetch the course data from an API
    const courseId = params.id as string;
    const courseData = mockCourseData[parseInt(courseId, 10)];
    
    if (courseData) {
      setCourse(courseData);
      
      // Check if user is enrolled (in a real app, this would be a backend check)
      if (status === 'authenticated') {
        setIsEnrolled(true);
        
        // Calculate progress
        const completedItems = courseData.content.filter((item: CourseContent) => item.isCompleted).length;
        const totalItems = courseData.content.length;
        setProgress(Math.round((completedItems / totalItems) * 100));
      }
    } else {
      // Course not found, redirect to courses page
      router.push('/courses');
    }
  }, [params.id, status, router]);

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (status === 'unauthenticated') {
      // Redirect to login page
      router.push('/login?redirect=' + encodeURIComponent(`/courses/${params.id}`));
      return;
    }
    
    // In a real app, you would call an API to enroll the user
    setIsEnrolled(true);
  };

  const handleMarkAsComplete = (contentId: number) => {
    // In a real app, you would call an API to mark the content as complete
    const updatedContent = course.content.map((item: CourseContent) => {
      if (item.id === contentId) {
        return { ...item, isCompleted: true };
      }
      return item;
    });
    
    setCourse({ ...course, content: updatedContent });
    
    // Recalculate progress
    const completedItems = updatedContent.filter((item: CourseContent) => item.isCompleted).length;
    const totalItems = updatedContent.length;
    setProgress(Math.round((completedItems / totalItems) * 100));
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/courses" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
            <FiArrowLeft className="mr-2" />
            Back to Courses
          </Link>
        </div>

        {/* Course header */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center space-x-2 mb-2">
                {course.tags.map((tag: string, index: number) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mr-2 mb-2">
                    <FiTag className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
              <div className="flex flex-wrap items-center text-white/90 text-sm gap-4">
                <div className="flex items-center">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span>{course.rating}</span>
                  <span className="ml-1">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <FiUser className="mr-1" />
                  <span>{course.enrolledStudents} students</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-1" />
                  <span>Updated {course.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 px-1 ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  } font-medium text-sm sm:text-base transition-colors`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`pb-4 px-1 ${
                    activeTab === 'content'
                      ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  } font-medium text-sm sm:text-base transition-colors`}
                >
                  Course Content
                </button>
                <button
                  onClick={() => setActiveTab('instructor')}
                  className={`pb-4 px-1 ${
                    activeTab === 'instructor'
                      ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  } font-medium text-sm sm:text-base transition-colors`}
                >
                  Instructor
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="mb-8">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="prose dark:prose-invert max-w-none mb-8">
                    <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                    <p className="text-gray-700 dark:text-gray-300">{course.longDescription}</p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.whatYouWillLearn.map((item: string, index: number) => (
                        <li key={index} className="flex items-start mb-2">
                          <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
                    <ul className="space-y-2">
                      {course.prerequisites.map((item: string, index: number) => (
                        <li key={index} className="flex items-start mb-2">
                          <FiCheck className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {isEnrolled && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4">Resources</h3>
                      <div className="space-y-3">
                        {course.resources.map((resource: Resource, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg mb-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center">
                              <FiDownload className="text-indigo-500 mr-3" />
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{resource.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{resource.type}</p>
                              </div>
                            </div>
                            <a 
                              href={resource.url} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <FiDownload className="mr-1" />
                              Download
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'content' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CourseContentList 
                    content={course.content}
                    isEnrolled={isEnrolled}
                    onMarkComplete={handleMarkAsComplete}
                  />
                </motion.div>
              )}

              {activeTab === 'instructor' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <img 
                      src={course.instructor.image} 
                      alt={course.instructor.name} 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{course.instructor.name}</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 mb-3">{course.instructor.title}</p>
                      <p className="text-gray-700 dark:text-gray-300">{course.instructor.bio}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 overflow-hidden sticky top-20">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </div>
                  {isEnrolled && (
                    <div className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                      Enrolled
                    </div>
                  )}
                </div>

                {isEnrolled ? (
                  <>
                    <CourseProgress progress={progress} />
                    <button
                      onClick={() => setActiveTab('content')}
                      className="w-full mt-4 flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      <FiPlay className="mr-2" />
                      Continue Learning
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Enroll Now
                  </button>
                )}

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Level</span>
                    <span className="text-gray-900 dark:text-white font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Duration</span>
                    <span className="text-gray-900 dark:text-white font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Language</span>
                    <span className="text-gray-900 dark:text-white font-medium">{course.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Certificate</span>
                    <span className="text-gray-900 dark:text-white font-medium">{course.certificate ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
