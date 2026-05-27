import React, { useEffect } from 'react';

const Alert = ({ type = 'info', message, onClose = null, duration = 5000 }) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-50 border border-green-200 text-green-800',
    error: 'bg-red-50 border border-red-200 text-red-800',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border border-blue-200 text-blue-800'
  };

  const iconStyles = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg ${typeStyles[type]}`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="text-xl mr-3 font-bold">{iconStyles[type]}</span>
        <div className="flex-1">{message}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 font-bold hover:opacity-70 transition"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
