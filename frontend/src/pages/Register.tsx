import React, { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Upload,
  ArrowRight,
  Plus,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { AuthCard } from "../components/ui/AuthCard";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { ThemeSwitcher } from "../components/ui/ThemeSwitcher";
import { useThemeStore } from "../stores/useThemeStore";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .min(2, { message: "Must be at least 2 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .min(2, { message: "Must be at least 2 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
      message: "Invalid phone number format",
    }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  additionalInfo: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { theme } = useThemeStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      additionalInfo: "",
    },
  });

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      profilePhoto: photoPreview ? "data:image/..." : null,
    };
    console.log(`[${theme.toUpperCase()} AUTH] Register Submitted:`, payload);

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
        systemTag={theme === "neo-brutalism" ? "NEO // REGISTRATION" : "SWISS // REGISTRATION.02"}
        className="max-w-2xl"
      >
        {/* Dynamic Header */}
        {theme === "neo-brutalism" && (
          <div className="border-l-8 border-black pl-4 mb-6">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#C4B5FD] text-black font-black text-[10px] uppercase border-2 border-black rotate-[-1deg] mb-2 shadow-[2px_2px_0px_0px_#000]">
              <span>JOIN THE CLUB! ★</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none mb-1">
              REGISTRATION
            </h1>
            <p className="text-xs font-bold text-black/80">
              CREATE YOUR GLOBETROTTER SYSTEM PROFILE
            </p>
          </div>
        )}

        {theme === "swiss" && (
          <div className="border-l-4 border-black pl-4 mb-8">
            <span className="block text-xs font-black text-[#FF3000] tracking-widest uppercase mb-1">
              01. NEW USER ENTRY
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none mb-2">
              REGISTRATION
            </h1>
            <p className="text-xs text-black/70 font-medium uppercase tracking-wide">
              COMPLETE SYSTEM PROFILES AND LOCATION REGISTRY
            </p>
          </div>
        )}

        {theme === "travel-tech" && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF7A59] flex items-center justify-center font-bold font-heading text-white">
                GT
              </div>
              <span className="text-xl font-bold font-heading text-white tracking-tight">
                GlobeTrotter
              </span>
            </div>
            <h1 className="text-2xl font-bold font-heading text-white">
              Register Account
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Fill in your details below to get started
            </p>
          </div>
        )}

        {/* Profile Photo Section */}
        <div className={`p-4 mb-6 ${
          theme === "neo-brutalism"
            ? "border-4 border-black bg-[#FFD93D] shadow-[4px_4px_0px_0px_#000] rotate-[-0.5deg]"
            : theme === "swiss"
            ? "border-2 border-black bg-[#F2F2F2]"
            : "flex flex-col items-center mb-6"
        }`}>
          {theme === "travel-tech" ? (
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-[#1B1E24] border-2 border-dashed border-[#FF7A59]/60 flex items-center justify-center overflow-hidden shadow-lg shadow-black/40">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <Camera className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-medium uppercase">Upload</span>
                    </div>
                  )}
                </div>
                <label htmlFor="profile-photo-input-tt" className="absolute bottom-0 right-0 p-2 bg-[#FF7A59] text-white rounded-full cursor-pointer hover:scale-110 transition-transform">
                  <Upload className="w-3.5 h-3.5" />
                  <input id="profile-photo-input-tt" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
              <span className="text-xs text-gray-400 mt-2">Upload Profile Picture (Optional)</span>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-black">
                  {theme === "neo-brutalism" ? "📸 PROFILE AVATAR" : "[ 01 // PROFILE PHOTO ]"}
                </span>
                <span className="text-[10px] font-mono font-bold text-black/60">OPTIONAL</span>
              </div>

              <div className="flex items-center gap-6">
                <div className={`relative w-24 h-24 bg-white border-4 border-black flex items-center justify-center overflow-hidden shrink-0 ${
                  theme === "neo-brutalism" ? "rotate-[-2deg] shadow-[4px_4px_0px_0px_#000]" : "rounded-none border-2"
                }`}>
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-black">
                      <Plus className="w-6 h-6 mb-1 text-black" />
                      <span className="text-[9px] font-black uppercase tracking-widest">PHOTO</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="profile-photo-input-multi"
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
                      theme === "neo-brutalism"
                        ? "bg-[#FF6B6B] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-black hover:text-white"
                        : "bg-black text-white border-2 border-black hover:bg-[#FF3000]"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>CHOOSE FILE</span>
                    <input id="profile-photo-input-multi" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <p className="text-[10px] text-black/70 font-mono">PNG, JPG, WEBP (MAX 5MB)</p>
                </div>
              </div>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="FIRST NAME"
              placeholder="JOHN"
              leftIcon={<User className={`w-4 h-4 ${theme === "travel-tech" ? "text-gray-400" : "text-black"}`} />}
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <Input
              label="LAST NAME"
              placeholder="DOE"
              leftIcon={<User className={`w-4 h-4 ${theme === "travel-tech" ? "text-gray-400" : "text-black"}`} />}
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="EMAIL ADDRESS"
              type="email"
              placeholder="JOHN.DOE@EXAMPLE.COM"
              leftIcon={<Mail className={`w-4 h-4 ${theme === "travel-tech" ? "text-gray-400" : "text-black"}`} />}
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="PHONE NUMBER"
              placeholder="+1 (555) 019-2834"
              leftIcon={<Phone className={`w-4 h-4 ${theme === "travel-tech" ? "text-gray-400" : "text-black"}`} />}
              error={errors.phone?.message}
              {...register("phone")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="RESIDENT CITY"
              placeholder="NEW YORK"
              leftIcon={<MapPin className={`w-4 h-4 ${theme === "travel-tech" ? "text-gray-400" : "text-black"}`} />}
              error={errors.city?.message}
              {...register("city")}
            />
            <Input
              label="COUNTRY / REGION"
              placeholder="UNITED STATES"
              leftIcon={<Globe className={`w-4 h-4 ${theme === "travel-tech" ? "text-gray-400" : "text-black"}`} />}
              error={errors.country?.message}
              {...register("country")}
            />
          </div>

          <Textarea
            label="ADDITIONAL INFORMATION / BIO"
            placeholder="ENTER TRAVEL PREFERENCES, DIETARY RESTRICTIONS, OR BIO..."
            rows={3}
            error={errors.additionalInfo?.message}
            {...register("additionalInfo")}
          />

          <Button
            type="submit"
            variant="accent"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            rightIcon={theme === "travel-tech" ? <CheckCircle2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            className="mt-6"
          >
            {theme === "neo-brutalism" ? "CREATE ACCOUNT NOW! →" : theme === "swiss" ? "REGISTER ACCOUNT →" : "Register"}
          </Button>
        </form>

        <div className={`mt-8 pt-6 ${
          theme === "travel-tech" ? "border-t border-white/10 text-center" : "border-t-4 border-black flex items-center justify-between"
        }`}>
          {theme === "travel-tech" ? (
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-[#FF7A59] font-semibold hover:underline">
                Log in
              </Link>
            </p>
          ) : (
            <>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/70">
                {theme === "swiss" ? "EXISTING SYSTEM ACCOUNT?" : "ALREADY REGISTERED?"}
              </span>
              <Link
                to="/login"
                className={`text-xs font-black uppercase tracking-widest text-black px-3 py-1.5 transition-colors ${
                  theme === "neo-brutalism"
                    ? "bg-[#FFD93D] border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FF6B6B]"
                    : "border-2 border-black hover:bg-black hover:text-white"
                }`}
              >
                LOG IN →
              </Link>
            </>
          )}
        </div>
      </AuthCard>
    </div>
  );
};

export default Register;
