import "../assets/css/myInformation.css";

function MyInformation({
  id,
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
    <div className="w-full h-full">
      <div
        className="group cursor-pointer h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={onClick}
      >
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all duration-300 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div className="text-gray-400 group-hover:text-yellow-500 transition-colors duration-300">
              <svg
                className="w-6 h-6"
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

          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white truncate group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
            {name}
          </h2>

          <div className="space-y-3 flex-grow">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
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
                <p className="text-sm font-medium">Age</p>
                <p className="text-lg font-semibold">{age} years old</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm font-semibold truncate">{email}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Click to view profile
              </span>
              {/* <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyInformation;
