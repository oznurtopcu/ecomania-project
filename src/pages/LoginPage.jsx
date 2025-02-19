import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
                Welcome Back!
              </h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Sign in to access your account and continue shopping.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm opacity-75">
                Don't have an account?
                <a
                  href="/signup"
                  className="ml-2 underline hover:text-white transition-colors"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#252B42]">
              Login
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <div className="space-y-5">
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
              </div>

              <button
                type="submit"
                className="w-full bg-[#23A6F0] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1a8fd4]"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
