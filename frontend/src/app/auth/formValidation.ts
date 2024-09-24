import * as Yup from "yup";

//Common Validation which we are using in the every form
const commonValidationSchema = {
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .max(50, "Email cannot exceed 50 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(10, "Password cannot exceed 10 characters"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  terms: Yup.boolean().oneOf([true], "*").required("*"),
};

// Signup validation schema
export const signUpValidationSchema = Yup.object({
  ...commonValidationSchema,
  firstName: Yup.string()
    .required("First name is required")
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(10, "First name cannot exceed 10 characters"),

  lastName: Yup.string()
    .required("Last name is required")
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(10, "Last name cannot exceed 10 characters"),
});

// Signin validation schema
export const signInValidationSchema = Yup.object({
  email: commonValidationSchema.email,
  password: commonValidationSchema.password,
  // Add specific fields for sign-in if needed
});

// Forgot password validation schema
export const forgotPasswordValidationSchema = Yup.object({
  email: commonValidationSchema.email,
});

// Change password validation schema
export const changePasswordValidationSchema = Yup.object({
  password: commonValidationSchema.password,
  confirmPassword: commonValidationSchema.confirmPassword,
});

// Reset password validation schema
export const resetPasswordValidationSchema = Yup.object({
  email: commonValidationSchema.email,
  newPassword: commonValidationSchema.password,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

// Confirm email validation schema
export const confirmEmailValidationSchema = Yup.object({
  email: commonValidationSchema.email,
});
