function UnAuthHomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome to the Quiz App
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to access your dashboard.
        </p>
      </div>
    </div>
  );
}

export default UnAuthHomePage;
