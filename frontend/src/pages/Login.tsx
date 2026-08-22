import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
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
    console.log("[SWISS AUTH] Login Form Submitted:", data);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-white swiss-diagonal">
      <AuthCard
        showLogo={false}
        systemTag="SWISS // AUTH.01"
        className="max-w-md"
      >
        {/* Asymmetrical Swiss Header */}
        <div className="border-l-4 border-black pl-4 mb-8">
          <span className="block text-xs font-black text-[#FF3000] tracking-widest uppercase mb-1">
            01. IDENTIFICATION
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none mb-2">
            LOG IN
          </h1>
          <p className="text-xs text-black/70 font-medium uppercase tracking-wide">
            ENTER CREDENTIALS TO ACCESS SYSTEM
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="01 / USERNAME OR EMAIL"
            placeholder="e.g. WANDERLUST"
            leftIcon={<User className="w-4 h-4 text-black" />}
            error={errors.username?.message}
            {...register("username")}
          />

          <div>
            <Input
              label="02 / SYSTEM PASSWORD"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4 text-black" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-black hover:text-[#FF3000] transition-colors focus:outline-none cursor-pointer"
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
            <div className="flex justify-end mt-2">
              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Forgot Password clicked");
                }}
                className="text-[10px] text-black font-extrabold uppercase tracking-widest hover:text-[#FF3000] transition-colors"
              >
                [ RESET PASSWORD ]
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="mt-2"
          >
            LOG IN TO SYSTEM
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-black flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">
            NO ACCOUNT RECORDED?
          </span>
          <Link
            to="/register"
            className="text-xs font-black uppercase tracking-widest text-black hover:bg-black hover:text-white px-3 py-1.5 transition-colors border-2 border-black"
          >
            REGISTER →
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};

export default Login;
