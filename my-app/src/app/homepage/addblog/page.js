"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddBlogPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Lifestyle",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!thumbnail) {
      toast.error("Please upload a thumbnail", {
        hideProgressBar: true,
        autoClose: 3000,
        position: "top-right",
      });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("thumbnail", thumbnail);
    formData.append("author", session?.user?.id);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/createblog`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      toast.success("Blog created successfully!", {
        hideProgressBar: true,
        autoClose: 2000,
        position: "top-right",
      });
      router.push("/homepage");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Something went wrong!", {
        hideProgressBar: true,
        autoClose: 2000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/homepage");
  };

  // Guard rendering for unauthenticated users
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/homepage");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="relative max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          X
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create New Blog Post
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-3 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter your blog title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Write your blog content..."
              value={form.description}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-y"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg p-3 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="Lifestyle">Lifestyle</option>
              <option value="Technology">Technology</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Thumbnail Image
            </label>
            <input
              id="thumbnail"
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 text-gray-900 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white hover:file:opacity-90 shadow-sm"
              required
            />
            {thumbnail && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {thumbnail.name}
              </p>
            )}
          </div>

          <div className="flex justify-center pt-4 space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting ? "Submitting..." : "Submit Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}