"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
export default function UpdateBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Lifestyle",
  });
  const [thumbnail, setThumbnail] = useState(null); // for new file
  const [thumbnailName, setThumbnailName] = useState(""); // for showing name
  const [loading, setLoading] = useState(true);

  // Fetch blog data on mount
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${id}`)
        .then((response) => {
          const data = response.data;
          setForm({
            title: data.title || "",
            description: data.description || "",
            category: data.category || "Lifestyle",
          });

          // Extract image file name from path
          if (data.thumbnail) {
            const parts = data.thumbnail.split("/");
            const name = parts[parts.length - 1];
            setThumbnailName(name);
          }

          setLoading(false);
        })
       .catch((error) => {
        console.error("Error fetching blog:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        toast.error("Failed to load blog data");
        setLoading(false); // Avoid redirecting here
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    formData.append("userId", session?.user?.id); // This will be compared in backend

    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success("Blog updated successfully!");
      router.push("/homepage");
  
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert("You are not allowed to edit this blog");
        router.push("/homepage");
      } else {
        alert(err.response?.data?.message || err.message || "Something went wrong");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading blog data...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-[#fafafa] shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Update Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full border-2 border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 bg-white"
            >
              <option value="Lifestyle">Lifestyle</option>
              <option value="Technology">Technology</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Thumbnail</label>
            <div className="flex items-center gap-2">
              <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer text-sm text-gray-700 hover:bg-gray-300">
                Choose File
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-600">
                {thumbnailName || "No file chosen"}
              </span>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
