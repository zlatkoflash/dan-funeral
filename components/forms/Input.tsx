"use client";

import Image from 'next/image';
import React, { useState } from 'react';


import iconEye from './../../assets/images/icon-eye.svg';
import { RichTextEditor } from './RichTextEditor/Index';
import { validateString } from './inputValidation';

// --- Type Definitions ---
// Define the allowed input types
type InputType = 'text' | 'email' | 'password' | 'textarea' | 'tel' | 'url' | 'rich-text-editor' | 'select' | 'time';

// Define the props for the reusable TextInput component
interface TextInputProps {
  id: string;
  label?: string;
  type: InputType;
  value: string;
  placeholder?: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: any) => void;

  // Error message, displayed below the input
  error?: string | null;

  // Custom class names for external styling, applied to the input element
  inputClassName?: string;
  // Custom class names for the overall container
  containerClassName?: string;

  icon?: any,

  errorsCasses?: ("required" | "email" | "password")[],

  disabled?: boolean,

  options?: {
    value: string,
    label: string
  }[],

  maxLength?: number
}




export interface ITextInputSelect {
  options: {
    value: string,
    label: string
  }[],
  onChange: (e: any) => void,
  value: string,
  id: string
}
export const TextInputSelect = (data: ITextInputSelect) => {

  const {
    options,
    value
  } = data;

  {/* Select Element */ }
  return <select
    id={data.id as string}
    name={data.id as string}
    value={value}
    onChange={(e) => {
      data.onChange(e)
      console.log("it is working");
    }}
    // disabled={disabled}
    className={`form-select`}
  >
    {options.map((option, key: number) => (
      <option key={`select-option-${key}`} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
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
  icon = undefined,
  errorsCasses = [],
  disabled = false,
  options = [],
  maxLength = 3000
}) => {


  const hasError = !!error;

  const [passwordIsVisible, set_passwordIsVisible] = useState<boolean>(false);
  const [internalError, set_internalError] = useState<string | null>(null);


  // Dynamically set Bootstrap classes for the input
  const inputClasses = [
    'form-control ', // Base Bootstrap input class
    hasError ? 'is-invalid' : '', // Error state class
    inputClassName, // User-provided custom class
  ].join(' ').trim();

  const inputDetails = {
    id: id,
    // The type is dynamic: text, email, or password
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    className: inputClasses,
    // Native HTML attribute for accessibility in error state
    "aria-describedby": hasError ? `${id}-feedback` : undefined,
  };


  return (
    // Bootstrap class for margin below, combined with user-provided container class
    <div className={` text-input-wrap ${containerClassName} ${icon !== undefined ? 'have-icon' : ''} ${disabled ? 'pointer-events-none pointer-default opacity-50' : ''} `}>
      {
        label !== "" && label !== undefined
          ?
          <label htmlFor={id} className="form-label">
            {label}
          </label>
          :
          <></>
      }


      {/* The input element */}

      {
        (() => {
          if (type === "textarea") return <textarea

            {...inputDetails}

          ></textarea>
          if (type === "rich-text-editor")
            return <RichTextEditor maxLength={maxLength} content={value} onChange={(content: string) => {
              onChange(content)
            }} />
          else if (type === 'select')
            return <TextInputSelect id={id} value={value} options={options} onChange={(e) => {
              onChange(e)
            }} />
          return <div className="input-wrap-final">
            <input
              {...inputDetails}
              {...passwordIsVisible === true && type === "password" ? { type: 'text' } : {}}
              // onKeyUp={(e) => { }}
              onChange={(e) => {
                // onChange is a must, we update the values from out
                onChange(e)
                console.log('validateString(e.target.value, errorsCasses):', validateString(e.target.value, errorsCasses));
                set_internalError(validateString(e.target.value, errorsCasses));

              }}
            />
            {
              type === "password" ?
                <>
                  <button type='button' className={`password-eye-button ${passwordIsVisible === true ? 'cutted' : ""}`} onClick={(e) => {
                    set_passwordIsVisible(!passwordIsVisible)
                  }}>
                    <Image src={iconEye} alt='Password change' />
                  </button>
                </>
                :
                <></>
            }
          </div>
        })()
      }

      {/* Display error message if present */}
      {internalError && (
        <div id={`${id}-feedback`} className="text-danger text-center pt-1">
          {internalError}
        </div>
      )}

      {
        icon !== undefined ?
          <div className="icon">
            <Image src={icon} alt='Icon for input' />
          </div>
          :
          <></>
      }



    </div>
  );
};

// Export the component for use in your application
export default TextInput;