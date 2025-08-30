import axios from "axios";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface Profile {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    age?: number;
  };
  bio?: string;
  profilePicture?: string;
  skills: Skill[];
  github?: string;
  linkedin?: string;
  portfolioUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileFormData {
  bio: string;
  github: string;
  linkedin: string;
  portfolioUrl: string;
  skills: Skill[];
}

interface EditProfileFormProps {
  profile: Profile;
  onCancel: () => void;
  onSuccess: () => void;
  isAdmin?: boolean;
  targetUserId?: string; // For admin editing other users
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  profile,
  onCancel,
  onSuccess,
  isAdmin = false,
  targetUserId,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      bio: profile.bio || "",
      github: profile.github || "",
      linkedin: profile.linkedin || "",
      portfolioUrl: profile.portfolioUrl || "",
      skills: profile.skills || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const addSkill = () => {
    append({ name: "", level: "Beginner" });
  };

  const removeSkill = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");

      // Determine the endpoint based on whether it's admin editing or user editing
      const endpoint =
        isAdmin && targetUserId
          ? `http://localhost:3000/api/admin/edit/${targetUserId}`
          : "http://localhost:3000/users/profile/me";

      await axios.put(endpoint, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Profile updated successfully");
      onSuccess(); // Call the success callback
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    reset({
      bio: profile.bio || "",
      github: profile.github || "",
      linkedin: profile.linkedin || "",
      portfolioUrl: profile.portfolioUrl || "",
      skills: profile.skills || [],
    });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isAdmin ? `Edit ${profile.user.name}'s Profile` : "Edit Profile"}
          </h2>
          {isAdmin && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Admin Mode
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              {...register("bio", {
                maxLength: {
                  value: 500,
                  message: "Bio must be less than 500 characters",
                },
              })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Tell us about yourself..."
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                {...register("github", {
                  pattern: {
                    value: /^https?:\/\/(www\.)?github\.com\/.+/,
                    message: "Please enter a valid GitHub URL",
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://github.com/username"
              />
              {errors.github && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.github.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                {...register("linkedin", {
                  pattern: {
                    value: /^https?:\/\/(www\.)?linkedin\.com\/.+/,
                    message: "Please enter a valid LinkedIn URL",
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://linkedin.com/in/username"
              />
              {errors.linkedin && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.linkedin.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Portfolio URL
            </label>
            <input
              type="url"
              {...register("portfolioUrl", {
                pattern: {
                  value: /^https?:\/\/.+\..+/,
                  message: "Please enter a valid URL",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://yourportfolio.com"
            />
            {errors.portfolioUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.portfolioUrl.message}
              </p>
            )}
          </div>

          {/* Skills Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Skills
              </label>
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm transition duration-200"
              >
                Add Skill
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start space-x-4">
                  <div className="flex-1">
                    <input
                      {...register(`skills.${index}.name`, {
                        required: "Skill name is required",
                        minLength: {
                          value: 2,
                          message: "Skill name must be at least 2 characters",
                        },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Skill name"
                    />
                    {errors.skills?.[index]?.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.skills[index]?.name?.message}
                      </p>
                    )}
                  </div>
                  <select
                    {...register(`skills.${index}.level`)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {fields.length === 0 && (
              <p className="text-gray-500 text-sm italic">
                No skills added yet. Click "Add Skill" to get started.
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            type="submit"
            disabled={loading || !isDirty}
            className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="px-8 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
