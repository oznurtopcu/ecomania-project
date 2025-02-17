import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../api/axios";

export default function SignupPage() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRolesLoading, setIsRolesLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_id: "3", // Default to Customer role
    },
  });

  const selectedRole = watch("role_id");

  // Fetch roles with proper error handling
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsRolesLoading(true);
        const response = await api.get("/roles");
        if (response.data) {
          setRoles(response.data.reverse());
        }
      } catch (err) {
        setError("Failed to load roles. Please try again later.");
      } finally {
        setIsRolesLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData =
        selectedRole === "2"
          ? {
              name: data.name.trim(),
              email: data.email.toLowerCase().trim(),
              password: data.password,
              role_id: data.role_id,
              store: {
                name: data.storeName.trim(),
                phone: data.storePhone.trim(),
                tax_no: data.taxNo.trim().toUpperCase(),
                bank_account: data.bankAccount.trim().toUpperCase(),
              },
            }
          : {
              name: data.name.trim(),
              email: data.email.toLowerCase().trim(),
              password: data.password,
              role_id: data.role_id,
            };

      const response = await api.post("/signup", formData);

      if (response.data) {
        alert("Please check your email to activate your account!");
        reset(); // Clear form
        history.push("/"); // Redirect to home instead of going back
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isRolesLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && (
          <div
            role="alert"
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name must be less than 50 characters",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must contain at least one uppercase letter",
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) ||
                    "Password must contain at least one lowercase letter",
                  hasNumber: (value) =>
                    /[0-9]/.test(value) ||
                    "Password must contain at least one number",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "Password must contain at least one special character",
                },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full p-2 border rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block mb-2">Role</label>
            <select
              {...register("role_id")}
              className="w-full p-2 border rounded"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Store Fields (Conditional) */}
          {selectedRole === "2" && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Store Name</label>
                <input
                  {...register("storeName", {
                    required: "Store name is required",
                    minLength: {
                      value: 3,
                      message: "Store name must be at least 3 characters",
                    },
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.storeName && (
                  <p className="text-red-500 text-sm">
                    {errors.storeName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">Store Phone</label>
                <input
                  {...register("storePhone", {
                    required: "Store phone is required",
                    pattern: {
                      value: /^(\+90|0)?[0-9]{10}$/,
                      message: "Invalid Turkish phone number",
                    },
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="+90..."
                />
                {errors.storePhone && (
                  <p className="text-red-500 text-sm">
                    {errors.storePhone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2">Tax ID</label>
                <input
                  {...register("taxNo", {
                    required: "Tax ID is required",
                    pattern: {
                      value: /^T\d{3}V\d{6}$/,
                      message: "Invalid Tax ID format (TXXXVXXXXXX)",
                    },
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="TXXXVXXXXXX"
                />
                {errors.taxNo && (
                  <p className="text-red-500 text-sm">{errors.taxNo.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2">Bank Account (IBAN)</label>
                <input
                  {...register("bankAccount", {
                    required: "IBAN is required",
                    pattern: {
                      value: /^TR\d{2}[0-9A-Z]{22}$/,
                      message: "Invalid IBAN format",
                    },
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="TR..."
                />
                {errors.bankAccount && (
                  <p className="text-red-500 text-sm">
                    {errors.bankAccount.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
