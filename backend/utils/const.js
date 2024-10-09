// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Success Messages
const MESSAGES = {
  USER_REGISTERED_SUCCESSFULLY: "Registration Successful",
  LOGIN_SUCCESSFUL: "Login Successful",
  NOTE_ADDED_SUCCESSFULLY: "Note added successfully",
  NOTE_UPDATED_SUCCESSFULLY: "Note updated successfully",
  NOTES_FETCHED_SUCCESSFULLY: "Notes fetched successfully",
  NOTE_DELETED_SUCCESSFULLY: "Note deleted successfully",
  EMAIL_UPDATED_SUCCESSFULLY: "Email updated successfully",
  FULLNAME_UPDATED_SUCCESSFULLY: "Name updated successfully",
  PHONE_UPDATED_SUCCESSFULLY: "Phone number updated successfully",
  PROFILE_PHOTO_UPDATED_SUCCESSFULLY: "Profile photo updated successfully",
  GOOGLE_AUTH_SUCCESSFUL: "Google authentication successful",
  FEEDBACK_SUBMITTED_SUCCESSFULLY: "Feedback submitted successfully",
};

// Error Messages
const ERROR_MESSAGES = {
  // User Registration Errors
  NAME_REQUIRED: "Name is required",
  INVALID_NAME_FORMAT: "Invalid Name format",
  EMAIL_REQUIRED: "Email is required",
  INVALID_EMAIL_FORMAT: "Invalid Email format",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_UPPERCASE_REQUIRED:
    "Password must include at least one Uppercase letter",
  PASSWORD_LOWERCASE_REQUIRED:
    "Password must include at least one Lowercase letter",
  PASSWORD_SPECIAL_CHAR_REQUIRED:
    "Password must include at least one special character",
  PASSWORD_MIN_LENGTH: "Min password length should be 8",
  USER_ALREADY_EXISTS: "User already exists",
  EMAIL_NOT_VERIFIED: "Email not verified, Please verify your email.",

  // Authentication Errors
  EMAIL_PASSWORD_REQUIRED: "Email and Password are required",
  INVALID_CREDENTIALS: "Invalid Credentials",
  USER_NOT_AUTHENTICATED: "User not authenticated",

  // Note-related Errors
  TITLE_CONTENT_REQUIRED: "Title and Content are required",
  PROVIDE_FIELD_TO_UPDATE: "Please provide at least one field to update",
  NOTE_NOT_FOUND: "Note not found",
  PROVIDE_IS_PINNED_FIELD: "Please provide isPinned field",
  PROVIDE_SEARCH_QUERY: "Please provide at least one field to search",

  // User-related Errors
  USER_NOT_FOUND: "User not found",

  // Google OAuth Errors
  INVALID_GOOGLE_TOKEN: "Invalid Google token",

  // Feedback Errors
  FAILED_TO_SUBMIT_FEEDBACK: "Failed to submit feedback",

  // General Errors
  INTERNAL_SERVER_ERROR: "Internal server error",
};

module.exports = {
  HTTP_STATUS,
  MESSAGES,
  ERROR_MESSAGES,
};
