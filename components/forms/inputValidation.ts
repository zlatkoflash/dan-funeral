


// 1. Define the specific validation types allowed
export type TypeValidationRule = "required" | "email" | "password" | "link";

// 2. Define the structure for your error messages
interface ValidationMessage {
  type: string; // Could be "required", "email", "password_length", etc.
  text: string;
}

// 3. Your error message array
const validationErrorMessages: ValidationMessage[] = [
  {
    type: "required",
    text: "This field cannot be left empty. Please fill it out to continue."
  },
  {
    type: "email",
    text: "Please enter a valid email address, such as user@example.com."
  },
  {
    type: "password_length",
    text: "Your password must be at least 8 characters long."
  },
  {
    type: "password_complexity",
    text: "Password must include at least one uppercase letter, one number, and one special character (e.g., !@#$%^&*)."
  },
  {
    type: "link",
    text: "Please enter a valid link (e.g., https://www.example.com)."
  }
];

// --- Helper Functions for Validation Logic ---

/**
 * Checks for a basic email format using a common regex.
 */
export const isValidEmail = (value: string): boolean => {
  // Basic regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

/**
 * Checks if the password meets minimum length (8) and complexity rules.
 */
const checkPasswordComplexity = (value: string): 'length' | 'complexity' | null => {
  if (value.length < 8) {
    return 'length';
  }

  // Check for complexity: uppercase, number, special char
  const hasUpperCase = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*()]/.test(value);

  if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
    return 'complexity';
  }

  return null; // Password is valid
};

const checkLink = (value: string): boolean => {
  const linkRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  return linkRegex.test(value);
};


// --- Main Validation Function ---

/**
 * Checks a string value against an array of validation rules.
 *
 * @param value The string value to validate (e.g., input field content).
 * @param rules An array of validation rules to apply.
 * @returns The error message string if validation fails, otherwise null.
 */
export function validateString(
  value: string,
  rules: TypeValidationRule[]
): string | null {

  // Create a quick lookup map for messages
  const messageMap = new Map<string, string>();
  validationErrorMessages.forEach(msg => {
    messageMap.set(msg.type, msg.text);
  });

  // 1. Check for 'required' first
  if (rules.includes("required") && value.trim() === "") {
    return messageMap.get("required") ?? "Field is required.";
  }

  // Since 'required' has passed, we only need to check other rules if the value is not empty.
  if (value.trim() !== "") {

    // 2. Check for 'email'
    if (rules.includes("email") && !isValidEmail(value)) {
      return messageMap.get("email") ?? "Invalid email format.";
    }

    // 3. Check for 'password' (which maps to length and complexity)
    if (rules.includes("password")) {
      const passwordErrorType = checkPasswordComplexity(value);

      if (passwordErrorType === 'length') {
        return messageMap.get("password_length") ?? "Password is too short.";
      }

      if (passwordErrorType === 'complexity') {
        return messageMap.get("password_complexity") ?? "Password lacks complexity.";
      }
    }

    if (rules.includes("link")) {
      const linkErrorType = checkLink(value);

      console.log("linkErrorType:", linkErrorType);

      if (!linkErrorType) {
        return messageMap.get("link") ?? "Invalid link format.";
      }
    }
  }

  // If the loop completes without returning an error, the value is valid.
  return null;
}