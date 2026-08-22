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
  Camera,
  Upload,
  Info,
  CheckCircle2,
} from "lucide-react";
import { AuthCard } from "../components/ui/AuthCard";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";

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
    console.log("Registration Form Submitted:", payload);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-bgDark bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(15,110,110,0.25),rgba(255,255,255,0))]">
      <AuthCard
        title="Create Your Account"
        subtitle="Join GlobeTrotter and plan unforgettable journeys"
        className="max-w-2xl"
        showLogo={false}
      >
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold font-heading text-white">
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

        {/* Profile Photo Upload Circle at Top */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-surfaceDark border-2 border-dashed border-accent/60 flex items-center justify-center overflow-hidden shadow-lg shadow-black/40 group-hover:border-accent transition-all duration-300">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-accent transition-colors">
                  <Camera className="w-8 h-8 mb-1" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">
                    Upload
                  </span>
                </div>
              )}
            </div>
            <label
              htmlFor="profile-photo-input"
              className="absolute bottom-0 right-0 p-2 bg-accent text-white rounded-full cursor-pointer hover:bg-accent/90 shadow-md transition-transform transform hover:scale-110 active:scale-95"
              title="Upload Profile Photo"
            >
              <Upload className="w-3.5 h-3.5" />
              <input
                id="profile-photo-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
          <span className="text-xs text-gray-400 mt-2">
            Upload Profile Picture (Optional)
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Two-Column Grid: First Name / Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              leftIcon={<User className="w-4 h-4 text-gray-400" />}
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              leftIcon={<User className="w-4 h-4 text-gray-400" />}
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

          {/* Two-Column Grid: Email / Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Phone Number"
              placeholder="+1 (555) 019-2834"
              leftIcon={<Phone className="w-4 h-4 text-gray-400" />}
              error={errors.phone?.message}
              {...register("phone")}
            />
          </div>

          {/* Two-Column Grid: City / Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="New York"
              leftIcon={<MapPin className="w-4 h-4 text-gray-400" />}
              error={errors.city?.message}
              {...register("city")}
            />
            <Input
              label="Country"
              placeholder="United States"
              leftIcon={<Globe className="w-4 h-4 text-gray-400" />}
              error={errors.country?.message}
              {...register("country")}
            />
          </div>

          {/* Multi-line 'Additional Information' Textarea */}
          <Textarea
            label="Additional Information"
            placeholder="Tell us about your travel preferences, favorite destinations, dietary needs, or bio..."
            rows={3}
            error={errors.additionalInfo?.message}
            {...register("additionalInfo")}
          />

          {/* Primary 'Register' button at bottom */}
          <Button
            type="submit"
            variant="accent"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            className="mt-6"
            rightIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Register
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent font-semibold hover:underline transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
};

export default Register;
