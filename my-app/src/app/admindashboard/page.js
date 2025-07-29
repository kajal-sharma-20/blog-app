"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBlog, FaTrash } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import BlogList from "./BlogList/page.js";
import ReportedBlogs from "./ReportedBlogs/page.js";

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [reportedBlogs, setReportedBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [trashedBlogs, setTrashedBlogs] = useState([]);
  const [view, setView] = useState("reported"); // "reported", "all", or "trash"
  const [adminDetails, setAdminDetails] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("createdAt-desc");
  const hasRedirected = useRef(false);
  const dropdownRef = useRef(null);

  // Handle redirects
  useEffect(() => {
    if (hasRedirected.current) return;
    if (status === "loading") return;

    if (status === "authenticated" && session?.user?.role !== "admin") {
      hasRedirected.current = true;
      router.push("/homepage");
    } else if (status === "unauthenticated") {
      hasRedirected.current = true;
      router.push("/homepage");
    }
  }, [status, session, router]);

  // Fetch admin details
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${session.user.id}`)
        .then((response) => {
          setAdminDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching admin details:", error);
          toast.error("Error");
        });
    }
  }, [status, session]);

  // Fetch reported blogs
  useEffect(() => {
    if (view === "reported") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reportblogs`)
        .then((response) => {
          const blogs = Array.isArray(response.data) ? response.data : response.data.blogs || [];
          setReportedBlogs(blogs);
        })
        .catch((error) => {
          console.error("Error fetching reported blogs:", error);
          toast.error("Error");
        });
    }
  }, [view]);

  // Fetch all blogs
  useEffect(() => {
    if (view === "all") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bloglist`)
        .then((response) => {
          const blogs = Array.isArray(response.data) ? response.data : response.data.blogs || [];
          setAllBlogs(blogs);
        })
        .catch((error) => {
          console.error("Error fetching all blogs:", error);
          toast.error("Error");
        });
    }
  }, [view]);

  // Fetch trashed blogs
  useEffect(() => {
    if (view === "trash" && session?.user?.id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admintrash`, {
          params: { adminId: session.user.id },
        })
        .then((response) => {
          const blogs = Array.isArray(response.data) ? response.data : response.data.blogs || [];
          setTrashedBlogs(blogs);
        })
        .catch((error) => {
          console.error("Error fetching trashed blogs:", error);
          toast.error("Error");
        });
    }
  }, [view, session]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showProfileDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showProfileDropdown]);

  // Handle deny report
  const handleDenyReport = async (blogId) => {
    try {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/denyreport/${blogId}`);
      setReportedBlogs(reportedBlogs.filter((blog) => blog._id !== blogId));
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error denying report:", error);
      toast.error("Error");
    }
  };

  // Handle delete blog
  const handleDeleteBlog = async (blogId) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admindelblog/${blogId}`, {
        data: { adminId: session.user.id },
      });
      if (view === "reported") {
        setReportedBlogs(reportedBlogs.filter((blog) => blog._id !== blogId));
      } else if (view === "all") {
        setAllBlogs(allBlogs.filter((blog) => blog._id !== blogId));
      }
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error");
    }
  };

  // Handle restore blog
  const handleRestoreBlog = async (blogId) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/adminrestore/${blogId}`);
      setTrashedBlogs(trashedBlogs.filter((blog) => blog._id !== blogId));
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error restoring blog:", error);
      toast.error("Error");
    }
  };

  // Sort trashed blogs
  const sortedTrashedBlogs = [...trashedBlogs].sort((a, b) => {
    const [sortBy, sortOrder] = sortOption.split("-");
    if (sortBy === "author") {
      const authorA = a.author?.username || "";
      const authorB = b.author?.username || "";
      return sortOrder === "asc" ? authorA.localeCompare(authorB) : authorB.localeCompare(authorA);
    } else {
      const dateA = new Date(a.deletedAt || a.createdAt);
      const dateB = new Date(b.deletedAt || b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
  });

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-indigo-600 border-indigo-200"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="text-3xl font-bold flex gap-3 items-center text-indigo-600">
          <FaBlog />
          Admin Dashboard
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("reported")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              view === "reported" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            Reported Blogs
          </button>
          <button
            onClick={() => setView("all")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              view === "all" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            Blog List
          </button>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="p-2 rounded-full bg-gray-100"
          >
            <CgProfile className="text-2xl text-indigo-600" />
          </button>
        </div>
      </div>

      {/* Profile Dropdown */}
      {showProfileDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-6 top-16 bg-white rounded-lg shadow-md p-4 w-64 z-50"
        >
          <h3 className="text-lg font-bold mb-3 text-gray-800">
           Admin Profile
          </h3>
          <div className="space-y-2 mb-3">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Email:</span> {adminDetails?.email || "N/A"}
            </p>
            {adminDetails?.phone && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Phone:</span> {adminDetails.phone}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setView("trash");
              setShowProfileDropdown(false);
            }}
            className="w-full bg-amber-500 text-white py-2 rounded-lg mb-2"
          >
            <FaTrash className="inline mr-2" />
            View Trash
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/homepage" })}
            className="w-full bg-red-500 text-white py-2 rounded-lg"
          >
            <FiLogOut className="inline mr-2" />
            Sign Out
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8" key={view}>
        {view === "reported" ? (
          <ReportedBlogs
            reportedBlogs={reportedBlogs}
            handleDenyReport={handleDenyReport}
            handleDeleteBlog={handleDeleteBlog}
          />
        ) : view === "all" ? (
          <BlogList
            allBlogs={allBlogs}
            sortBy={sortOption.split("-")[0]}
            sortOrder={sortOption.split("-")[1]}
            setSortBy={(by) => setSortOption(`${by}-${sortOption.split("-")[1]}`)}
            setSortOrder={(order) => setSortOption(`${sortOption.split("-")[0]}-${order}`)}
            handleDeleteBlog={handleDeleteBlog}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-indigo-600">Trashed Blogs</h2>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border p-2 rounded-lg text-sm bg-white"
              >
                <option value="createdAt-asc">Date (Ascending)</option>
                <option value="createdAt-desc">Date (Descending)</option>
                <option value="author-asc">Author (Ascending)</option>
                <option value="author-desc">Author (Descending)</option>
              </select>
            </div>
            {sortedTrashedBlogs.length > 0 ? (
              <div className="overflow-x-auto rounded-xl">
                <table className="w-full bg-white rounded-xl">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 text-left text-sm font-semibold text-gray-700">Thumbnail</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-700">Author</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-700">Title</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-700">Category</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-700">Deleted At</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTrashedBlogs.map((blog) => (
                      <tr key={blog._id} className="border-b">
                        <td className="p-4">
                          {blog.thumbnail ? (
                            <img
                              src={blog.thumbnail}
                              alt={blog.title}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                              N/A
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-sm text-gray-700">{blog.author?.username || "Unknown Author"}</td>
                        <td className="p-4 text-sm text-gray-700">{blog.title}</td>
                        <td className="p-4 text-sm text-gray-700">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            {blog.category || "Uncategorized"}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-700">
                          {blog.deletedAt ? new Date(blog.deletedAt).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleRestoreBlog(blog._id)}
                            className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            Restore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-12 bg-white rounded-xl">
                <div className="text-5xl text-gray-300 mb-4">
                  <FaTrash className="mx-auto" />
                </div>
                <p className="text-gray-600 text-lg">No trashed blogs found.</p>
                <p className="text-gray-500 text-sm mt-2">When blogs are deleted, they will appear here.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
