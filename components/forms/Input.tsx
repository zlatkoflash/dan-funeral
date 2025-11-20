import React from 'react';

// --- Type Definitions ---

// Define the allowed input types
type InputType = 'text' | 'email' | 'password';

// Define the props for the reusable TextInput component
interface TextInputProps {
  id: string;
  label: string;
  type: InputType;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Error message, displayed below the input
  error?: string | null;

  // Custom class names for external styling, applied to the input element
  inputClassName?: string;
  // Custom class names for the overall container
  containerClassName?: string;
}

// --- Reusable Input Component ---

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type,
  value,
  placeholder = '',
  onChange,
  error,
  inputClassName = '',
  containerClassName = '',
}) => {
  const hasError = !!error;

  // Dynamically set Bootstrap classes for the input
  const inputClasses = [
    'form-control ', // Base Bootstrap input class
    hasError ? 'is-invalid' : '', // Error state class
    inputClassName, // User-provided custom class
  ].join(' ').trim();

  return (
    // Bootstrap class for margin below, combined with user-provided container class
    <div className={` text-input-wrap ${containerClassName} `}>
      {
        label !== ""
          ?
          <label htmlFor={id} className="form-label">
            {label}
          </label>
          :
          <></>
      }


      {/* The input element */}
      <input
        id={id}
        // The type is dynamic: text, email, or password
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={inputClasses}
        // Native HTML attribute for accessibility in error state
        aria-describedby={hasError ? `${id}-feedback` : undefined}
      />

      {/* Display error message if present */}
      {hasError && (
        <div id={`${id}-feedback`} className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

// Export the component for use in your application
export default TextInput;