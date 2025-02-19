import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../api/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../store/actions/roleActions"; // clientActions yerine roleActions'dan import edelim

export default function SignupPage() {
  // state.client yerine state.roles'dan verileri alalım
  const {
    roles,
    loading: rolesLoading,
    error: rolesError,
  } = useSelector((state) => state.roles);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const {
    register,
    handleSubmit, //submit fn
    watch, //input watcher
    reset, //reset form
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      role_id: "3", // Default to Customer role
    },
  });

  const selectedRole = watch("role_id");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

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
        toast.success("Please check your email to activate your account!");
        reset(); // Clear form
        history.push("/login"); // Redirect to home instead of going back
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

  if (rolesLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (rolesError) {
    return toast.error("Roller yüklenemedi!");
  }

  {
    error && toast.error(error);
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center">
      <div className="flex flex-col lg:flex-row gap-12 items-stretch max-w-7xl mx-auto w-full">
        {/* Left Side - Slider */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gradient-to-br from-[#23A6F0] to-[#1a8fd4] rounded-2xl p-10 text-white h-full flex flex-col justify-between">
            <div>
              <div className="aspect-w-16 aspect-h-9 mb-8 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://picsum.photos/800/600"
                  alt="Welcome"
                  className="rounded-xl object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Welcome to Our Store
              </h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Get access to your orders, wishlist, and recommendations.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm opacity-75">
                Already have an account?
                <a
                  href="/login"
                  className="ml-2 underline hover:text-white transition-colors"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#252B42]">
              Create Account
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#737373]">
                    Name
                  </label>
                  <input
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                    className="w-full p-3 border border-[#E6E6E6] rounded-lg text-[#737373]"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#737373]">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full p-3 border border-[#E6E6E6] rounded-lg text-[#737373]"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#737373]">
                    Password
                  </label>
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
                    className="w-full p-3 border border-[#E6E6E6] rounded-lg text-[#737373]"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/*Password Confirm*/}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#737373]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register("passwordConfirm", {
                      required: "Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className="w-full p-3 border border-[#E6E6E6] rounded-lg text-[#737373]"
                    placeholder="Confirm your password"
                  />
                  {errors.passwordConfirm && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.passwordConfirm.message}
                    </p>
                  )}
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#737373]">
                    Role
                  </label>
                  <select
                    {...register("role_id")}
                    className="w-full p-3 border border-[#E6E6E6] rounded-lg text-[#737373]"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conditional Store Fields */}
                {selectedRole === "2" && (
                  <>
                    {/* Store Name */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#737373]">
                        Store Name
                      </label>
                      <input
                        {...register("storeName", {
                          required: "Store name is required",
                          minLength: {
                            value: 3,
                            message: "Store name must be at least 3 characters",
                          },
                        })}
                        className="w-full p-3 border border-[#E6E6E6] rounded-lg text-[#737373]"
                        placeholder="Enter store name"
                      />
                      {errors.storeName && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.storeName.message}
                        </p>
                      )}
                    </div>

                    {/* Store Phone */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#737373]">
                        Store Phone
                      </label>
                      <input
                        {...register("storePhone", {
                          required: "Store phone is required",
                          // pattern: {
                          //   value: /^(\+90|0)?[0-9]{10}$/,
                          //   message: "Invalid Turkish phone number",
                          // },
                        })}
                        className="w-full p-3 border border-[#E6E6E6] rounded-lg text-[#737373]"
                        placeholder="+90 XXX XXX XX XX"
                      />
                      {errors.storePhone && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.storePhone.message}
                        </p>
                      )}
                    </div>

                    {/* Tax ID */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#737373]">
                        Tax ID
                      </label>
                      <input
                        {...register("taxNo", {
                          required: "Tax ID is required",
                          pattern: {
                            value: /^T\d{3}V\d{6}$/,
                            message: "Invalid Tax ID format (TXXXVXXXXXX)",
                          },
                        })}
                        className="w-full p-3 border border-[#E6E6E6] rounded-lg text-[#737373]"
                        placeholder="TXXXVXXXXXX"
                      />
                      {errors.taxNo && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.taxNo.message}
                        </p>
                      )}
                    </div>

                    {/* Bank Account */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[#737373]">
                        Bank Account (IBAN)
                      </label>
                      <input
                        {...register("bankAccount", {
                          required: "IBAN is required",
                          pattern: {
                            value: /^TR\d{2}[0-9A-Z]{22}$/,
                            message: "Invalid IBAN format",
                          },
                        })}
                        className="w-full p-3 border border-[#E6E6E6] rounded-lg text-[#737373]"
                        placeholder="TR..."
                      />
                      {errors.bankAccount && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.bankAccount.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !isValid}
                className="w-full bg-[#23A6F0] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1a8fd4] disabled:bg-[#23A6F0]/50"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
