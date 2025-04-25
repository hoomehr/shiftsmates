import Image from "next/image";
import Link from "next/link";
import { FiBarChart2, FiBookOpen, FiUsers, FiArrowRight } from "react-icons/fi";
import { Card, CardItem, CardGrid } from "../../theme/3d-card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Navigate Your <span className="text-indigo-600 dark:text-indigo-400">Career Transition</span> Journey
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              ShiftsMates helps you analyze your skills, identify gaps, and find the right courses to make your career transition successful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/shift-analysis"
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium transition-all hover:bg-indigo-700 shadow-[0_4px_14px_0_rgba(79,70,229,0.4)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.6)] dark:shadow-[0_4px_14px_0_rgba(79,70,229,0.3)] flex items-center justify-center gap-2"
              >
                Start Your Analysis <FiArrowRight className="ml-1" />
              </Link>
              <Link 
                href="/courses"
                className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-medium border border-indigo-200 transition-all hover:bg-indigo-50 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.15)] dark:bg-gray-800 dark:text-indigo-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:shadow-[0_4px_14px_0_rgba(0,0,0,0.3)]"
              >
                Explore Courses
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <Card className="w-full max-w-md p-1 bg-white dark:bg-gray-800">
              <Image
                src="/career-transition.svg"
                alt="Career Transition Illustration"
                width={500}
                height={400}
                className="w-full h-auto"
                priority
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How ShiftsMates Helps Your Career Transition
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides all the tools you need to successfully transition to a new career path.
            </p>
          </div>

          <CardGrid columns={3} className="max-w-6xl mx-auto" gap="2rem">
            <CardItem 
              title="Skill Analysis" 
              description="Identify your transferable skills and discover areas for growth with our AI-powered analysis."
              icon={<FiBarChart2 className="w-6 h-6 text-indigo-600" />}
              className="shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.3)]"
            />
            <CardItem 
              title="Course Recommendations" 
              description="Get personalized course suggestions based on your career goals and skill gaps."
              icon={<FiBookOpen className="w-6 h-6 text-indigo-600" />}
              className="shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.3)]"
            />
            <CardItem 
              title="Community Support" 
              description="Connect with others who are also transitioning to new careers and share experiences."
              icon={<FiUsers className="w-6 h-6 text-indigo-600" />}
              className="shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_0_rgba(79,70,229,0.3)]"
            />
          </CardGrid>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600 dark:bg-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Career Transition?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals who have successfully transitioned to new careers with ShiftsMates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="px-8 py-4 rounded-xl bg-white text-indigo-600 font-medium transition-all hover:bg-gray-100 shadow-[0_4px_14px_0_rgba(255,255,255,0.3)] hover:shadow-[0_6px_20px_0_rgba(255,255,255,0.5)] flex items-center justify-center"
            >
              Create Free Account
            </Link>
            <Link 
              href="/login"
              className="px-8 py-4 rounded-xl bg-transparent text-white font-medium border border-white/30 transition-all hover:bg-white/10 shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_0_rgba(255,255,255,0.2)] flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} ShiftsMates. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
