"use client";
import { MdRestore } from "react-icons/md";

export default function TrashModal({
  showTrashModal,
  modalAnimation,
  closeTrashModal,
  sortedTrashedBlogs,
  trashSortBy,
  setTrashSortBy,
  trashSortOrder,
  setTrashSortOrder,
  handleRestoreBlog,
  session,
  openLoginModal,
}) {
  return (
    <>
      {showTrashModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-end p-4 transition-transform duration-300 ${
            modalAnimation === "fadeIn" ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeTrashModal}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md h-[calc(100vh-2rem)] overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Trashed Blogs
            </h2>
            <div className="mb-4 flex gap-4">
              <select
                value={trashSortBy}
                onChange={(e) => setTrashSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 text-sm"
              >
                <option value="deletedAt">Sort by Deleted Date</option>
                <option value="title">Sort by Title</option>
                <option value="category">Sort by Category</option>
              </select>
              <button
                onClick={() =>
                  setTrashSortOrder(trashSortOrder === "asc" ? "desc" : "asc")
                }
                className="px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                {trashSortOrder === "asc" ? "Ascending" : "Descending"}
              </button>
            </div>
            {sortedTrashedBlogs.length === 0 ? (
              <p className="text-gray-600">No trashed blogs found.</p>
            ) : (
              <div className="space-y-4">
                {sortedTrashedBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-md font-semibold text-gray-800">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600">{blog.category}</p>
                      <p className="text-xs text-gray-500">
                        Deleted on{" "}
                        {new Date(blog.deletedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (!session) {
                          openLoginModal();
                          return;
                        }
                        handleRestoreBlog(blog._id);
                      }}
                      className="p-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                    >
                      <MdRestore className="text-lg" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}