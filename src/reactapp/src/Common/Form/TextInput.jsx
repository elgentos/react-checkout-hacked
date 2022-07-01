import React from 'react';
import PropTypes from 'prop-types';

export default function TextInput({
  label,
  id,
  name,
  type,
  placeholder,
  className,
  width,
  helpText,
  required,
  isHidden,
  error,
  value,
  onChange,
  ...rest
}) {
  const inputId = id || name;

  return (
    <div className={`mt-2 form-control ${isHidden ? 'hidden' : ''}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={inputId} className="md:text-sm">
            {label}
            {required && <sup> *</sup>}
          </label>
        )}
        <div
          className={`feedback text-sm md:text-xs text-right ${
            error ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {error}
        </div>
      </div>
      <input
        name={name}
        id={inputId}
        value={value}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`form-input max-w-md ${
          error ? 'border-dashed border-red-500' : ''
        } ${className} ${width || 'w-full'}`}
        {...rest}
      />
      <div className="text-xs">{helpText}</div>
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  isHidden: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  id: '',
  label: '',
  width: '',
  helpText: '',
  type: 'text',
  className: '',
  required: false,
  placeholder: '',
  isHidden: false,
  error: false,
};
