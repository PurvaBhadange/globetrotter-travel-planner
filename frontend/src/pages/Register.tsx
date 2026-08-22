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
    console.log("[SWISS AUTH] Registration Form Submitted:", payload);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-white swiss-diagonal">
      <AuthCard
        showLogo={false}
        systemTag="SWISS // REGISTRATION.02"
        className="max-w-2xl"
      >
        {/* Asymmetrical Swiss Header */}
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

        {/* Section 01: Profile Photo Dropzone */}
        <div className="border-2 border-black p-4 mb-6 bg-[#F2F2F2]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-black">
              [ 01 // PROFILE PHOTO ]
            </span>
            <span className="text-[10px] font-mono font-bold text-black/60">OPTIONAL</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 bg-white border-2 border-black rounded-none flex items-center justify-center overflow-hidden shrink-0">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-black">
                  <Plus className="w-6 h-6 mb-1 text-black" />
                  <span className="text-[9px] font-black uppercase tracking-widest">
                    PHOTO
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="profile-photo-input-swiss"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white text-xs font-black uppercase tracking-widest border-2 border-black hover:bg-[#FF3000] hover:text-white cursor-pointer transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>CHOOSE IMAGE FILE</span>
                <input
                  id="profile-photo-input-swiss"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[10px] text-black/70 font-mono">
                ACCEPTED FORMATS: PNG, JPG, WEBP (MAX 5MB)
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 02: Personal Details */}
          <div className="space-y-4">
            <div className="border-b-2 border-black pb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF3000]">
                [ 02 // PERSONAL IDENTIFIER ]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="FIRST NAME"
                placeholder="JOHN"
                leftIcon={<User className="w-4 h-4 text-black" />}
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <Input
                label="LAST NAME"
                placeholder="DOE"
                leftIcon={<User className="w-4 h-4 text-black" />}
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="EMAIL ADDRESS"
                type="email"
                placeholder="JOHN.DOE@EXAMPLE.COM"
                leftIcon={<Mail className="w-4 h-4 text-black" />}
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="PHONE NUMBER"
                placeholder="+1 (555) 019-2834"
                leftIcon={<Phone className="w-4 h-4 text-black" />}
                error={errors.phone?.message}
                {...register("phone")}
              />
            </div>
          </div>

          {/* Section 03: Location & Preferences */}
          <div className="space-y-4">
            <div className="border-b-2 border-black pb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF3000]">
                [ 03 // LOCATION & PREFERENCES ]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="RESIDENT CITY"
                placeholder="NEW YORK"
                leftIcon={<MapPin className="w-4 h-4 text-black" />}
                error={errors.city?.message}
                {...register("city")}
              />
              <Input
                label="COUNTRY / REGION"
                placeholder="UNITED STATES"
                leftIcon={<Globe className="w-4 h-4 text-black" />}
                error={errors.country?.message}
                {...register("country")}
              />
            </div>

            <Textarea
              label="ADDITIONAL INFORMATION / BIO"
              placeholder="ENTER TRAVEL PREFERENCES, DIETARY RESTRICTIONS, OR SYSTEM NOTES..."
              rows={3}
              error={errors.additionalInfo?.message}
              {...register("additionalInfo")}
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            fullWidth
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="mt-6"
          >
            REGISTER ACCOUNT →
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t-2 border-black flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">
            EXISTING SYSTEM ACCOUNT?
          </span>
          <Link
            to="/register"
            className="text-xs font-black uppercase tracking-widest text-black hover:bg-black hover:text-white px-3 py-1.5 transition-colors border-2 border-black"
          >
            LOG IN →
          </Link>
        </div>
      </AuthCard>
    </div>
  );
};

export default Register;
