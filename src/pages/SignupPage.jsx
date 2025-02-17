import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../api/axios";

export default function SignupPage() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_id: "2", // Default to Customer role
    },
  });

  const selectedRole = watch("role_id");

  // Fetch roles
  useEffect(() => {
    api
      .get("/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => setError(err.message));
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData =
        selectedRole === "3"
          ? {
              name: data.name,
              email: data.email,
              password: data.password,
              role_id: data.role_id,
              store: {
                name: data.storeName,
                phone: data.storePhone,
                tax_no: data.taxNo,
                bank_account: data.bankAccount,
              },
            }
          : {
              name: data.name,
              email: data.email,
              password: data.password,
              role_id: data.role_id,
            };

      await api.post("/signup", formData);
      alert("You need to click link in email to activate your account!");
      history.goBack();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block mb-2">Name</label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must include numbers, lowercase, uppercase and special characters",
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
          {selectedRole === "3" && (
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
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
