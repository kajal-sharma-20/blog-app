"use client";
import { useState, useEffect, useRef } from "react";
import { BiShieldX, BiTrash, BiCheckShield } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";

function ReportedBlogs({ reportedBlogs, handleDenyReport, handleDeleteBlog }) {
  const [sortOption, setSortOption] = useState("reports-desc");
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sorting function
  const sortedBlogs = [...reportedBlogs].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "reports-asc":
        return a.reports.length - b.reports.length;
      case "reports-desc":
        return b.reports.length - a.reports.length;
      case "date-asc":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "date-desc":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  // Toggle expanded description
  const toggleExpand = (blogId) => {
    setExpandedBlog(expandedBlog === blogId ? null : blogId);
  };

  // Sort options configuration
  const sortOptions = [
    { value: "reports-desc", label: "Most Reports" },
    { value: "reports-asc", label: "Fewest Reports" },
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
    { value: "date-desc", label: "Newest" },
    { value: "date-asc", label: "Oldest" },
  ];

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle sort option selection
  const handleSortSelect = (value) => {
    setSortOption(value);
    setIsDropdownOpen(false);
  };

  // Get the label of the current sort option
  const currentSortLabel = sortOptions.find((option) => option.value === sortOption)?.label || "Most Reports";

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-rose-600">Flagged Content Review</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Sort by:</span>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-xl py-2 px-4 text-sm text-gray-600 shadow-md hover:bg-gray-100 transition-colors"
            >
              <span>{currentSortLabel}</span>
              <FiChevronDown className={`text-lg transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      sortOption === option.value
                        ? "bg-purple-100 text-purple-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {sortedBlogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedBlogs.map((blog) => (
            <div key={blog._id} className="rounded-xl bg-white shadow-md">
              {/* Blog thumbnail */}
              <div className="w-full h-48">
                {blog.thumbnail ? (
                  <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              {/* Author info */}
              <div className="p-3 flex items-center">
                <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs">
                  {blog.author?.username?.[0]?.toUpperCase() || "?"}
                </div>
                <span className="ml-2 text-xs text-gray-800">{blog.author?.username || "Unknown Author"}</span>
              </div>

              {/* Blog content */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-3 text-gray-800">{blog.title}</h3>
                <p className={`text-sm text-gray-600 ${expandedBlog === blog._id ? "" : "line-clamp-3"}`}>
                  {blog.description}
                </p>
                {blog.description && blog.description.split(" ").length > 20 && (
                  <button
                    onClick={() => toggleExpand(blog._id)}
                    className="text-xs text-purple-600 hover:text-purple-800 mt-1"
                  >
                    {expandedBlog === blog._id ? "Show less" : "Read more"}
                  </button>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 mt-4">
                  <div className="flex items-center">
                    <BiShieldX className="text-red-500 mr-1" />
                    <span>Flagged content</span>
                  </div>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDenyReport(blog._id)}
                    className="flex-1 bg-emerald-500 text-white py-2 rounded-lg flex items-center justify-center gap-1"
                  >
                    <BiCheckShield className="text-lg" />
                    <span>Deny</span>
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-1"
                  >
                    <BiTrash className="text-lg" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
            <BiCheckShield className="text-3xl text-purple-500" />
          </div>
          <p className="text-lg text-gray-600">No reported content to review</p>
          <p className="text-sm text-gray-500 mt-2">All flagged blogs have been processed</p>
        </div>
      )}
    </>
  );
}

export default ReportedBlogs;
