import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Layout from "../layout/Layout";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/whiteboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Welcome to <span className="text-indigo-600">Scribbly</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-10">
              Create, collaborate and share beautiful diagrams and whiteboard
              sketches with our easy-to-use drawing platform.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleGetStarted}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-lg text-lg font-medium"
              >
                {isAuthenticated ? "Open Whiteboard" : "Get Started"}
              </button>
              <a
                href="#features"
                className="px-8 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-all shadow-md text-lg font-medium"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="text-indigo-500 text-4xl mb-4">✏️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Simple Drawing
                </h3>
                <p className="text-gray-600">
                  Create beautiful diagrams and sketches with our intuitive
                  drawing tools. No design experience needed.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="text-indigo-500 text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Real-time Collaboration
                </h3>
                <p className="text-gray-600">
                  Work together with your team in real-time. Share your
                  whiteboards with anyone, anywhere.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="text-indigo-500 text-4xl mb-4">💾</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Save & Export
                </h3>
                <p className="text-gray-600">
                  Save your work in the cloud and access it from anywhere.
                  Export as PNG, SVG or PDF.
                </p>
              </div>
            </div>
          </div>

          <div id="features" className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to start creating?
            </h2>
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-lg text-lg font-medium"
            >
              {isAuthenticated ? "Open Whiteboard" : "Create Your Account"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
