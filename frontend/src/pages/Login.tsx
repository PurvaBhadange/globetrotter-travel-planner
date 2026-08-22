import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, Compass } from "lucide-react";
import { AuthCard } from "../components/ui/AuthCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username or email is required" })
    .min(3, { message: "Must be at least 3 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    console.log("Login Form Submitted:", data);

    // Simulate async submission stub
    setTimeout(() => {
      setIsSubmitting(false);
      // Stubbed success navigation or user notice
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bgDark bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(15,110,110,0.25),rgba(255,255,255,0))]">
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to your GlobeTrotter account"
      >
        {/* Top photo/logo circle styling from Screen 1 */}
        <div className="flex justify-center -mt-2 mb-6">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-primary via-teal-500 to-accent p-1 shadow-xl shadow-primary/30 group">
            <div className="w-full h-full bg-surfaceDark rounded-full flex items-center justify-center overflow-hidden">
              <Compass className="w-10 h-10 text-accent transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Username or Email"
            placeholder="e.g. wanderlust or user@example.com"
            leftIcon={<User className="w-4 h-4 text-gray-400" />}
            error={errors.username?.message}
            {...register("username")}
          />

          <div>
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4 text-gray-400" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              error={errors.password?.message}
              {...register("password")}
            />
            <div className="flex justify-end mt-1.5">
              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Forgot Password clicked");
                }}
                className="text-xs text-accent hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            className="mt-2"
          >
            Log In
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-accent font-semibold hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
};

export default Login;
