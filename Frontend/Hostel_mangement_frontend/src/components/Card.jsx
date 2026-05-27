import React from 'react';

const Card = ({
  children,
  className = '',
  shadow = 'md',
  padding = 'md',
  border = false,
  ...props
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-[0_18px_45px_rgba(15,23,42,0.12)]',
    lg: 'shadow-[0_28px_65px_rgba(15,23,42,0.18)]',
    xl: 'shadow-[0_34px_90px_rgba(15,23,42,0.22)]'
  };

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const borderClass = border ? 'border border-white/10' : '';

  return (
    <div
      className={`rounded-[32px] bg-white/5 backdrop-blur-2xl border border-white/10 ${shadowClasses[shadow]} ${paddingClasses[padding]} ${borderClass} ${className} transition-transform duration-300 hover:-translate-y-0.5`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
