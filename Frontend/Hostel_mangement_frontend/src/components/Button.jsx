import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_18px_60px_rgba(59,130,246,0.24)] hover:brightness-110',
    secondary: 'bg-white/10 text-white border border-white/10 hover:bg-white/15',
    danger: 'bg-[rgba(239,68,68,0.15)] text-[#FCA5A5] border border-[rgba(239,68,68,0.4)] hover:bg-[rgba(239,68,68,0.25)]',
    success: 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-[0_18px_60px_rgba(34,197,94,0.28)] hover:brightness-110',
    assign: 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-[0_18px_60px_rgba(59,130,246,0.28)] hover:brightness-110',
    outline: 'border border-blue-500/20 text-blue-100 hover:bg-white/5'
  };

  const baseClasses = 'font-semibold rounded-3xl transition duration-250 ease-out flex items-center justify-center';
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
