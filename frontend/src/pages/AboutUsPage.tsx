"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutUsPage() {
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "About Us - QuizX";

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute("data-animate-id");
            if (elementId) {
              setAnimatedElements((prev) => new Set([...prev, elementId]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe all elements with data-animate-id
    const elementsToObserve = document.querySelectorAll("[data-animate-id]");
    elementsToObserve.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const isAnimated = (id: string) => animatedElements.has(id);

  return (
    <div className=" font-montserrat min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <h1
              data-animate-id="hero-title"
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white text-balance transition-all duration-700 ${
                isAnimated("hero-title")
                  ? "opacity-100 transform translate-y-0 animate-bounce"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              About <span className="text-yellow-500 animate-pulse">QuizX</span>
            </h1>
            <p
              data-animate-id="hero-subtitle"
              className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-pretty transition-all duration-700 delay-300 ${
                isAnimated("hero-subtitle")
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              We're passionate about making learning engaging, accessible, and
              fun for everyone through interactive quizzes and challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              data-animate-id="mission-text"
              className={`transition-all duration-700 ${
                isAnimated("mission-text")
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform -translate-x-8"
              }`}
            >
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                At QuizX, we believe that learning should be an exciting
                journey, not a chore. Our mission is to transform the way people
                acquire knowledge by creating engaging, interactive quiz
                experiences that make learning both effective and enjoyable.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We're committed to providing a platform where curiosity thrives,
                knowledge grows, and learners of all backgrounds can challenge
                themselves and discover new interests.
              </p>
            </div>
            <div
              data-animate-id="mission-card"
              className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-yellow-400 hover:shadow-2xl hover:scale-105 transition-all duration-500 ${
                isAnimated("mission-card")
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-8"
              }`}
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Empowering Minds
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Every quiz is designed to spark curiosity and build confidence
                in learners worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div
            data-animate-id="values-header"
            className={`text-center mb-16 transition-all duration-700 ${
              isAnimated("values-header")
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform scale-95"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              data-animate-id="value-1"
              className={`bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg text-center hover:shadow-xl hover:scale-105 transition-all duration-500 border-l-4 border-blue-400 ${
                isAnimated("value-1")
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 hover:animate-pulse transition-all duration-300">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Quality Education
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to providing high-quality, accurate, and
                well-researched content that truly enhances learning.
              </p>
            </div>

            <div
              data-animate-id="value-2"
              className={`bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg text-center hover:shadow-xl hover:scale-105 transition-all duration-500 border-l-4 border-green-400 delay-200 ${
                isAnimated("value-2")
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 hover:animate-pulse transition-all duration-300">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Inclusive Community
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe learning is for everyone, regardless of background,
                age, or experience level.
              </p>
            </div>

            <div
              data-animate-id="value-3"
              className={`bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg text-center hover:shadow-xl hover:scale-105 transition-all duration-500 border-l-4 border-yellow-400 delay-500 ${
                isAnimated("value-3")
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 hover:animate-pulse transition-all duration-300">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We continuously evolve our platform with new features and
                technologies to enhance the learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            data-animate-id="team-content"
            className={`transition-all duration-700 ${
              isAnimated("team-content")
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform scale-95"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white mb-6">
              Built by Learners, for Learners
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Our team consists of educators, developers, and lifelong learners
              who understand the challenges and joys of acquiring new knowledge.
              We're dedicated to creating tools that make learning more
              effective and enjoyable for everyone.
            </p>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-blue-400 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                "We believe that when learning is fun, it becomes unforgettable.
                That's why every feature we build is designed to spark curiosity
                and celebrate the joy of discovery."
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                - The QuizX Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            data-animate-id="cta-content"
            className={`bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 ${
              isAnimated("cta-content")
                ? "opacity-100 transform translate-y-0 "
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join our community of curious minds and start your learning
              journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 hover:scale-110 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform text-lg hover:shadow-2xl "
              >
                Get Started
                <svg
                  className="ml-2 h-5 w-5 inline transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 hover:scale-110 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform text-lg hover:shadow-2xl"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
