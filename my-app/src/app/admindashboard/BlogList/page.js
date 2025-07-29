"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { BiSolidLike, BiSolidDislike, BiSolidFlag } from "react-icons/bi";

function BlogList({ allBlogs, sortBy, sortOrder, setSortBy, setSortOrder, handleDeleteBlog }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const modalRef = useRef(null);

  // Sort blogs based on sortBy and sortOrder
  const sortedBlogs = useMemo(() => {
    return [...allBlogs].sort((a, b) => {
      if (sortBy === "author") {
        const authorA = a.author?.username?.toLowerCase() || "";
        const authorB = b.author?.username?.toLowerCase() || "";
        return sortOrder === "asc"
          ? authorA.localeCompare(authorB)
          : authorB.localeCompare(authorA);
      } else {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
    });
  }, [allBlogs, sortBy, sortOrder]);

  // Modal controls
  const openModal = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  // Handle outside click to close modal
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showModal && modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showModal]);

  // Truncate description to first three words
  const getTruncatedDescription = (description) => {
    if (!description) return "No description...";
    const words = description.trim().split(/\s+/);
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : description + "...";
  };

  // Handle row click, excluding delete button
  const handleRowClick = (e, blog) => {
    if (e.target.closest("button")) return;
    openModal(blog);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-8 text-indigo-600">Blog Collection</h2>
      {allBlogs.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-gray-700">Sort by:</label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split("-");
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
              className="bg-white border-0 px-4 py-2 rounded-xl text-sm shadow-md"
            >
              <option value="createdAt-desc">Date (Newest First)</option>
              <option value="createdAt-asc">Date (Oldest First)</option>
              <option value="author-asc">Author (A-Z)</option>
              <option value="author-desc">Author (Z-A)</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-xl rounded-xl">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="p-3 text-left text-sm font-medium">Thumbnail</th>
                  <th className="p-3 text-left text-sm font-medium">Author</th>
                  <th className="p-3 text-left text-sm font-medium">Title</th>
                  <th className="p-3 text-left text-sm font-medium">Category</th>
                  <th className="p-3 text-left text-sm font-medium">Description</th>
                  <th className="p-3 text-left text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedBlogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={(e) => handleRowClick(e, blog)}
                  >
                    <td className="p-3">
                      {blog.thumbnail ? (
                        <img
                          src={blog.thumbnail}
                          alt={blog.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-sm text-gray-600">{blog.author?.username || "Unknown Author"}</td>
                    <td className="p-3 text-sm text-gray-800">{blog.title}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
                        {blog.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{getTruncatedDescription(blog.description)}</td>
                    <td className="p-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBlog(blog._id);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-10 rounded-xl text-center">
          <p className="text-gray-600 text-lg">No blogs found.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl"
            >
              ×
            </button>

            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center">
                {selectedBlog.author?.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">{selectedBlog.author?.username || "Unknown Author"}</p>
                <p className="text-xs text-gray-500">{selectedBlog.category || "Uncategorized"}</p>
              </div>
            </div>

            {/* Image */}
            {selectedBlog.thumbnail && (
              <img
                src={selectedBlog.thumbnail}
                alt={selectedBlog.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-indigo-600 mb-3">{selectedBlog.title}</h2>
              <p className="text-gray-700 text-sm mb-6">{selectedBlog.description}</p>

              {/* Engagement Metrics */}
              <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                  <BiSolidLike className="text-blue-500" />
                  <span>{selectedBlog.likes?.length || 0}</span>
                </div>
                <div className="flex items-center gap-1 bg-red-50 px-3 py-1 rounded-full">
                  <BiSolidDislike className="text-red-500" />
                  <span>{selectedBlog.dislikes?.length || 0}</span>
                </div>
                <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                  <BiSolidFlag className="text-orange-500" />
                  <span>{selectedBlog.reports?.length || 0}</span>
                </div>
              </div>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-5">
                Posted on {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Close Button (Bottom) */}
            <div className="p-5">
              <button
                onClick={closeModal}
                className="w-full bg-indigo-500 text-white px-4 py-3 rounded-xl text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogList;
