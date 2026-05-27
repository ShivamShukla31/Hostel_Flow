import React from 'react';

const ProblemTracker = ({ status }) => {
  const phases = [
    { key: 'Pending', label: 'Submitted', color: 'bg-yellow-500', textColor: 'text-yellow-700' },
    { key: 'Approved by Rector', label: 'Approved', color: 'bg-blue-500', textColor: 'text-blue-700' },
    { key: 'Assigned to Worker', label: 'Assigned', color: 'bg-purple-500', textColor: 'text-purple-700' },
    { key: 'In Progress', label: 'In Progress', color: 'bg-orange-500', textColor: 'text-orange-700' },
    { key: 'Completed', label: 'Completed', color: 'bg-green-500', textColor: 'text-green-700' },
    { key: 'Closed', label: 'Closed', color: 'bg-gray-500', textColor: 'text-gray-700' }
  ];

  const getCurrentPhaseIndex = () => {
    return phases.findIndex(phase => phase.key === status);
  };

  const currentIndex = getCurrentPhaseIndex();
  const normalizedStatus = String(status).trim();

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        {phases.map((phase, index) => {
          const isClosedMarked = (normalizedStatus === 'Completed' && phase.key === 'Closed') || normalizedStatus === 'Closed';
          const isCompleted = index < currentIndex || isClosedMarked;
          const isCurrent = index === currentIndex && !isClosedMarked;
          const phaseColor = phase.key === 'Closed' && normalizedStatus === 'Completed' ? 'bg-green-500' : phase.color;
          const phaseTextColor = phase.key === 'Closed' && normalizedStatus === 'Completed' ? 'text-green-700' : phase.textColor;

          return (
            <div key={phase.key} className="flex flex-col items-center flex-1">
              {/* Phase Circle */}
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? `${phaseColor} shadow-lg`
                      : isCurrent
                      ? `${phaseColor} shadow-lg animate-pulse`
                      : 'bg-gray-300'
                  }`}
                >
                  {isCompleted ? '✓' : isCurrent ? '●' : '○'}
                </div>

                {/* Connecting Line */}
                {index < phases.length - 1 && (
                  <div
                    className={`absolute top-1/2 left-8 w-full h-1 -translate-y-1/2 transition-all duration-500 ${
                      index < currentIndex || (normalizedStatus === 'Completed' && phase.key === 'Completed') || normalizedStatus === 'Closed'
                        ? 'bg-green-400'
                        : 'bg-gray-300'
                    }`}
                    style={{ width: 'calc((100% - 2rem) / 5)' }}
                  />
                )}
              </div>

              {/* Phase Label */}
              <div className="mt-2 text-center min-w-0 flex-1">
                <p
                  className={`text-xs sm:text-sm font-medium transition-colors duration-300 truncate ${
                    isCompleted || isCurrent ? phaseTextColor : 'text-gray-500'
                  }`}
                >
                  {phase.label}
                </p>
                {isCurrent && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1 animate-bounce"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Description */}
      <div className="mt-4 text-center">
        <p className="text-sm sm:text-base text-gray-600">
          Current Status: <span className="font-semibold text-gray-800">{status}</span>
        </p>
      </div>
    </div>
  );
};

export default ProblemTracker;