"use client";

function MyInformation({
  name,
  email,
  age,
  onClick,
}: {
  id: string;
  name: string;
  email?: string;
  age?: number;
  onClick?: () => void;
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
}) {
  return (
    <div
      className="group cursor-pointer rounded-2xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-500/50"
      onClick={onClick}
    >
      {/* Background Shapes for Visual Interest */}
      <div className="absolute top-0 -left-1/4 w-3/4 h-3/4 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-1/4 w-3/4 h-3/4 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Header with Avatar */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
        </div>
        <div className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Name */}
      <h3 className="relative z-10 text-xl font-bold text-gray-800 dark:text-white mb-4 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {name}
      </h3>

      {/* Info */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center text-gray-800 dark:text-white">
          <div className="w-8 h-8 bg-blue-50/30 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Age
            </p>
            <p className="font-semibold">{age} years</p>
          </div>
        </div>

        <div className="flex items-center text-gray-800 dark:text-white">
          <div className="w-8 h-8 bg-green-50/30 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Email
            </p>
            <p className="font-semibold truncate">{email}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-4 pt-4 border-t border-white/20 dark:border-gray-700/50">
        <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
          View Profile →
        </p>
      </div>
    </div>
  );
}

export default MyInformation;
