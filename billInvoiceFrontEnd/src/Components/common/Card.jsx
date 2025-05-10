import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  title,
  subtitle,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  noPadding = false
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className={`border-b border-gray-200 ${headerClassName} ${!noPadding ? 'px-6 py-4' : ''}`}>
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      <div className={`${bodyClassName} ${!noPadding ? 'px-6 py-4' : ''}`}>
        {children}
      </div>

      {footer && (
        <div className={`border-t border-gray-200 ${!noPadding ? 'px-6 py-4' : ''}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footer: PropTypes.node,
  noPadding: PropTypes.bool
};

export default Card; 