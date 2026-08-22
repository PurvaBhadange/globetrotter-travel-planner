import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ArrowRight, Compass, Flame } from "lucide-react";
import { AuthCard } from "../components/ui/AuthCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { ThemeSwitcher } from "../components/ui/ThemeSwitcher";
import { useThemeStore } from "../stores/useThemeStore";

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
  const { theme } = useThemeStore();

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
    console.log(`[${theme.toUpperCase()} AUTH] Login Submitted:`, data);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  const getContainerBg = () => {
    if (theme === "neo-brutalism") return "bg-[#FFFDF5] neo-halftone";
    if (theme === "swiss") return "bg-white swiss-diagonal";
    return "bg-[#111318] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(15,110,110,0.25),rgba(255,255,255,0))]";
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-8 ${getContainerBg()}`}>
      <ThemeSwitcher />

      <AuthCard
        showLogo={theme === "travel-tech"}
        systemTag={theme === "neo-brutalism" ? "NEO // SIGN-IN" : "SWISS // AUTH.01"}
        className="max-w-md"
      >
        {/* Dynamic Header for Neo-brutalism & Swiss */}
        {theme === "neo-brutalism" && (
          <div className="border-l-8 border-black pl-4 mb-6">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FFD93D] text-black font-black text-[10px] uppercase border-2 border-black rotate-[1deg] mb-2">
              <Flame className="w-3 h-3 text-[#FF6B6B]" />
              <span>STEP 01: AUTHENTICATE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none mb-1">
              LOG IN!
            </h1>
            <p className="text-xs font-bold text-black/80">
              ENTER SYSTEM CREDENTIALS BELOW
            </p>
          </div>
        )}

        {theme === "swiss" && (
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
        )}

        {theme === "travel-tech" && (
          <div className="flex justify-center -mt-2 mb-6">
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#0F6E6E] via-teal-500 to-[#FF7A59] p-0.5 shadow-xl shadow-[#0F6E6E]/30">
              <div className="w-full h-full bg-[#1B1E24] rounded-full flex items-center justify-center text-[#FF7A59]">
                <Compass className="w-8 h-8" />
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label={theme === "swiss" ? "01 / USERNAME OR EMAIL" : "USERNAME OR EMAIL"}
            placeholder={theme === "neo-brutalism" ? "WANDERLUSTER" : "user@example.com"}
            leftIcon={<User className={`w-4 h-4 ${theme === "travel-tech" ? "text-gray-400" : "text-black"}`} />}
            error={errors.username?.message}
            {...register("username")}
          />

          <div>
            <Input
              label={theme === "swiss" ? "02 / SYSTEM PASSWORD" : "PASSWORD"}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              leftIcon={<Lock className={`w-4 h-4 ${theme === "travel-tech" ? "text-gray-400" : "text-black"}`} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`focus:outline-none cursor-pointer ${
                    theme === "travel-tech" ? "text-gray-400 hover:text-white" : "text-black hover:text-[#FF6B6B]"
                  }`}
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
                className={`text-xs font-bold ${
                  theme === "neo-brutalism"
                    ? "text-black hover:bg-[#FFD93D] px-1 border border-black uppercase text-[10px] tracking-wider"
                    : theme === "swiss"
                    ? "text-black font-extrabold uppercase tracking-widest text-[10px] hover:text-[#FF3000]"
                    : "text-[#FF7A59] hover:underline"
                }`}
              >
                {theme === "swiss" ? "[ RESET PASSWORD ]" : "Forgot password?"}
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
            {theme === "neo-brutalism" ? "LET'S GO! →" : theme === "swiss" ? "LOG IN TO SYSTEM" : "Log In"}
          </Button>
        </form>

        <div className={`mt-8 pt-6 ${
          theme === "travel-tech" ? "border-t border-white/10 text-center" : "border-t-4 border-black flex items-center justify-between"
        }`}>
          {theme === "travel-tech" ? (
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#FF7A59] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          ) : (
            <>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/70">
                {theme === "swiss" ? "NO ACCOUNT RECORDED?" : "NEW AROUND HERE?"}
              </span>
              <Link
                to="/register"
                className={`text-xs font-black uppercase tracking-widest text-black px-3 py-1.5 transition-colors ${
                  theme === "neo-brutalism"
                    ? "bg-[#FFD93D] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FF6B6B]"
                    : "border-2 border-black hover:bg-black hover:text-white"
                }`}
              >
                SIGN UP →
              </Link>
            </>
          )}
        </div>
      </AuthCard>
    </div>
  );
};

export default Login;
