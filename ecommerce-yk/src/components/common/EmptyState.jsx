import React from 'react';

export const EmptyState = ({
  title = 'Tidak ada data',
  description = 'Belum ada item yang dapat ditampilkan.',
  icon = null,
  action = null,
  className = ''
}) => {
  return (
    <div className={`py-8 text-center sm:py-12 ${className}`.trim()}>
      <div className="mb-3 text-gray-500 sm:mb-4">
        {icon ? icon : (
          <svg className="mx-auto h-10 w-10 text-gray-400 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>
      <h3 className="text-base font-medium text-gray-900 sm:text-lg">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500 sm:mt-2 sm:text-base">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
