"use client";

import Image from 'next/image';
import React, { useState } from 'react';


import iconEye from './../../assets/images/icon-eye.svg';
import { RichTextEditor } from './RichTextEditor/Index';
import { TypeValidationRule, validateString } from './inputValidation';
import InputPhoneNumber from './InputPhoneNumber';

// --- Type Definitions ---
// Define the allowed input types
type InputType = 'text' | 'email' | 'password' | 'textarea' | 'tel' | 'url' | 'rich-text-editor' | 'select' | 'time' | 'stripe-element';

// Define the props for the reusable TextInput component
export interface TextInputProps {
  id: string;
  label?: string;
  type: InputType;
  value: string;
  placeholder?: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: any) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  // Error message, displayed below the input
  error?: string | null;

  // Custom class names for external styling, applied to the input element
  inputClassName?: string;
  // Custom class names for the overall container
  containerClassName?: string;

  icon?: any,

  errorsCasses?: TypeValidationRule[],
  // showError?: boolean,
  // showErrorAlways?: boolean,

  disabled?: boolean,

  options?: {
    value: string,
    label: string
  }[],

  maxLength?: number,

  autoComplete?: string,

  ref?: any,

  childrenAfterInput?: React.ReactNode,

  stripeElement?: React.ReactNode
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
  onFocus,
  onBlur,
  onKeyDown,
  error,
  inputClassName = '',
  containerClassName = '',
  icon = undefined,
  errorsCasses = [],
  disabled = false,
  options = [],
  maxLength = 3000,
  autoComplete = "off",
  ref,
  childrenAfterInput = undefined,
  stripeElement = undefined
  /*showError = false,
  showErrorAlways = false*/
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

  const autoCompleteDetails: any = autoComplete !== undefined ? { autoComplete } : {};


  const inputObjectProps = {
    // 1. Spread initial details
    ...inputDetails,

    // 2. Handle Password Visibility Toggle
    type: (type === "password" && passwordIsVisible) ? 'text' : type,

    // 3. Merged Change Handler
    onChange: (e: any) => {
      onChange(e); // External update
      const error = validateString(e.target.value, errorsCasses);
      console.log("input check for error:", error);
      if (internalError !== null) {
        set_internalError(null);
      }
      /*const error = validateString(e.target.value, errorsCasses);
      set_internalError(error); // Internal validation*/
    },

    // 4. Standard Events
    onFocus: onFocus,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      /*if (showErrorAlways) {
        const error = validateString(e.target.value, errorsCasses);
        set_internalError(error);
      }*/
      // console.log("Blur event...", e.target.value);
      const error = validateString(e.target.value, errorsCasses);
      set_internalError(error); // Internal validation
    },
    onKeyDown: onKeyDown,

    // 5. AutoComplete Logic
    ...autoCompleteDetails,
    // If autoCompleteDetails doesn't contain the 'autoComplete' key specifically:
    // autoComplete: autoComplete ?? "de",
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
          if (type === "stripe-element") {
            return <div className="stripe-input-container">
              {stripeElement}
            </div>;
          }
          else if (type === "textarea") return <textarea

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
          else if (type === "tel") {
            return <InputPhoneNumber telProps={inputObjectProps} />
          }
          return <div className={`input-wrap-final ${childrenAfterInput !== undefined ? 'have-children-after-input' : ''}`}>
            <input
              ref={ref}
              {...inputObjectProps}
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
            {
              childrenAfterInput !== undefined ?
                childrenAfterInput
                :
                <></>
            }
          </div>
        })()
      }

      {/* Display error message if present */}
      {internalError
        // && (showError || showErrorAlways)
        && (
          <div id={`${id}-feedback`} className="input-error-message text-danger text-center pt-1">
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


export const GLOBAL_STRIPE_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: 'black',
      fontFamily: '"Inter", "Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#aab7c4',
      },
      // padding: "15px 32px"
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};