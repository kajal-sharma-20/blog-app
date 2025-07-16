(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/admindashboard/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// "use client";
// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FaBlog, FaTrash } from "react-icons/fa6";
// import { CgProfile } from "react-icons/cg";
// import { FiLogOut, FiEdit } from "react-icons/fi";
// function AdminDashboard() {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const [reportedBlogs, setReportedBlogs] = useState([]);
//   const [allBlogs, setAllBlogs] = useState([]);
//   const [trashedBlogs, setTrashedBlogs] = useState([]);
//   const [view, setView] = useState("reported"); // "reported", "all", or "trash"
//   const [adminDetails, setAdminDetails] = useState(null);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [editProfile, setEditProfile] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [sortBy, setSortBy] = useState("createdAt"); // "createdAt" or "author"
//   const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"
//   const hasRedirected = useRef(false);
//   // Handle redirects in useEffect
//   useEffect(() => {
//     if (hasRedirected.current) return;
//     if (status === "loading") return;
//     if (status === "authenticated" && session?.user?.role !== "admin") {
//       hasRedirected.current = true;
//       router.push("/homepage");
//     } else if (status === "unauthenticated") {
//       hasRedirected.current = true;
//       router.push("/homepage");
//     }
//   }, [status, session, router]);
//   // Fetch admin details
//   useEffect(() => {
//     if (status === "authenticated" && session?.user?.id) {
//       axios
//         .get(`http://localhost:5000/api/user/${session.user.id}`)
//         .then((response) => {
//           console.log("Admin details response:", response.data);
//           setAdminDetails(response.data);
//           setEditProfile({
//             username: response.data.username,
//             email: response.data.email,
//             phone: response.data.phone,
//             password: "",
//           });
//         })
//         .catch((error) => {
//           console.error("Error fetching admin details:", {
//             message: error.message,
//             status: error.response?.status,
//             data: error.response?.data,
//           });
//           toast.error("Failed to fetch admin details");
//         });
//     }
//   }, [status, session]);
//   // Fetch reported blogs
//   useEffect(() => {
//     if (view === "reported") {
//       axios
//         .get("http://localhost:5000/api/reportblogs")
//         .then((response) => {
//           const blogs = Array.isArray(response.data) ? response.data : response.data.blogs || [];
//           console.log("Reported blogs response:", blogs);
//           blogs.forEach((blog, index) => {
//             console.log(`Reported Blog ${index}:`, {
//               id: blog._id,
//               title: blog.title,
//               author: blog.author,
//               username: blog.author?.username,
//               isReported: blog.isReported,
//               reports: blog.reports.length,
//             });
//           });
//           setReportedBlogs(blogs);
//         })
//         .catch((error) => {
//           console.error("Error fetching reported blogs:", {
//             message: error.message,
//             status: error.response?.status,
//             data: error.response?.data,
//           });
//           toast.error("Failed to fetch reported blogs");
//         });
//     }
//   }, [view]);
//   // Fetch all blogs
//   useEffect(() => {
//     if (view === "all") {
//       axios
//         .get("http://localhost:5000/api/bloglist")
//         .then((response) => {
//           const blogs = response.data.blogs || [];
//           console.log("All blogs response:", blogs);
//           blogs.forEach((blog, index) => {
//             console.log(`All Blog ${index}:`, {
//               id: blog._id,
//               title: blog.title,
//               author: blog.author,
//               username: blog.author?.username,
//               category: blog.category,
//               createdAt: blog.createdAt,
//               likes: blog.likes?.length,
//               dislikes: blog.dislikes?.length,
//               reports: blog.reports?.length || 0,
//               isReported: (blog.reports?.length || 0) > 0,
//             });
//           });
//           setAllBlogs(blogs);
//         })
//         .catch((error) => {
//           console.error("Error fetching all blogs:", {
//             message: error.message,
//             status: error.response?.status,
//             data: error.response?.data,
//           });
//           toast.error("Failed to fetch blogs");
//         });
//     }
//   }, [view]);
//   // Fetch trashed blogs
//   useEffect(() => {
//     if (view === "trash") {
//       axios
//         .get("http://localhost:5000/api/admintrash")
//         .then((response) => {
//           const blogs = response.data.blogs || [];
//           console.log("Trashed blogs response:", blogs);
//           blogs.forEach((blog, index) => {
//             console.log(`Trashed Blog ${index}:`, {
//               id: blog._id,
//               title: blog.title,
//               author: blog.author,
//               username: blog.author?.username,
//               category: blog.category,
//               createdAt: blog.createdAt,
//               deletedAt: blog.deletedAt,
//             });
//           });
//           setTrashedBlogs(blogs);
//         })
//         .catch((error) => {
//           console.error("Error fetching trashed blogs:", {
//             message: error.message,
//             status: error.response?.status,
//             data: error.response?.data,
//           });
//           toast.error("Failed to fetch trashed blogs");
//         });
//     }
//   }, [view]);
//   // Sort blogs based on sortBy and sortOrder
//   const sortedBlogs = [...allBlogs].sort((a, b) => {
//     if (sortBy === "author") {
//       const authorA = a.author?.username?.toLowerCase() || "";
//       const authorB = b.author?.username?.toLowerCase() || "";
//       return sortOrder === "asc"
//         ? authorA.localeCompare(authorB)
//         : authorB.localeCompare(authorA);
//     } else {
//       // sortBy === "createdAt"
//       const dateA = new Date(a.createdAt).getTime();
//       const dateB = new Date(b.createdAt).getTime();
//       return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//     }
//   });
//   // Handle deny report
//   const handleDenyReport = async (blogId) => {
//     try {
//       const res = await axios.patch(`http://localhost:5000/api/denyreport/${blogId}`);
//       setReportedBlogs(reportedBlogs.filter((blog) => blog._id !== blogId));
//       toast.success(res.data.message);
//     } catch (error) {
//       console.error("Error denying report:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       toast.error(error.response?.data?.message || "Failed to deny report");
//     }
//   };
//   // Handle delete blog
//   const handleDeleteBlog = async (blogId) => {
//     try {
//       const res = await axios.delete(`http://localhost:5000/api/admindelblog/${blogId}`);
//       if (view === "reported") {
//         setReportedBlogs(reportedBlogs.filter((blog) => blog._id !== blogId));
//       } else if (view === "all") {
//         setAllBlogs(allBlogs.filter((blog) => blog._id !== blogId));
//       }
//       toast.success(res.data.message);
//     } catch (error) {
//       console.error("Error deleting blog:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       toast.error(error.response?.data?.message || "Failed to delete blog");
//     }
//   };
//   // Handle restore blog
//   const handleRestoreBlog = async (blogId) => {
//     try {
//       const res = await axios.put(`http://localhost:5000/api/adminrestore/${blogId}`);
//       setTrashedBlogs(trashedBlogs.filter((blog) => blog._id !== blogId));
//       toast.success(res.data.message);
//     } catch (error) {
//       console.error("Error restoring blog:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       toast.error(error.response?.data?.message || "Failed to restore blog");
//     }
//   };
//   // Handle profile update
//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(`http://localhost:5000/api/update/${session.user.id}`, editProfile);
//       setAdminDetails(res.data.user);
//       setEditProfile({
//         username: res.data.user.username,
//         email: res.data.user.email,
//         phone: res.data.user.phone,
//         password: "",
//       });
//       setShowUpdateForm(false);
//       toast.success(res.data.message);
//     } catch (error) {
//       console.error("Error updating profile:", {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       toast.error(error.response?.data?.message || "Failed to update profile");
//     }
//   };
//   // Show loading state while session is loading
//   if (status === "loading") {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
//         <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-indigo-600" />
//       </div>
//     );
//   }
//   return (
//     <div className="bg-[#fafafa] min-h-screen">
//       {/* Navbar */}
//       <div className="w-full flex justify-between items-center px-6 md:px-12 py-4 shadow-md bg-white">
//         <div className="text-4xl font-bold flex gap-3 items-center">
//           <FaBlog />
//           Admin Dashboard
//         </div>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setView("reported")}
//             className={`px-6 py-2 font-bold text-sm transition ${
//               view === "reported"
//                 ? "bg-black text-white shadow-[4px_4px_0_#000]"
//                 : "border border-black shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000]"
//             }`}
//           >
//             Reported Blogs
//           </button>
//           <button
//             onClick={() => setView("all")}
//             className={`px-6 py-2 font-bold text-sm transition ${
//               view === "all"
//                 ? "bg-black text-white shadow-[4px_4px_0_#000]"
//                 : "border border-black shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000]"
//             }`}
//           >
//             Blog List
//           </button>
//           <button
//             onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//             className="flex items-center gap-2"
//           >
//             <CgProfile className="text-4xl" />
//           </button>
//         </div>
//       </div>
//       {/* Profile Dropdown */}
//       {showProfileDropdown && (
//         <div className="absolute right-6 top-16 bg-white rounded-lg shadow-lg p-6 w-80 z-50">
//           {adminDetails ? (
//             <>
//               <h3 className="text-lg font-bold mb-4">Admin Profile</h3>
//               <p className="text-sm mb-2">
//                 <span className="font-semibold">Username:</span> {adminDetails.username}
//               </p>
//               <p className="text-sm mb-2">
//                 <span className="font-semibold">Email:</span> {adminDetails.email}
//               </p>
//               <p className="text-sm mb-2">
//                 <span className="font-semibold">Phone:</span> {adminDetails.phone}
//               </p>
//               <p className="text-sm mb-2">
//                 <span className="font-semibold">Password:</span> ******
//               </p>
//               <p className="text-sm mb-4">
//                 <span className="font-semibold">Role:</span> {adminDetails.role}
//               </p>
//               <button
//                 onClick={() => {
//                   setView("trash");
//                   setShowProfileDropdown(false);
//                 }}
//                 className="w-full flex items-center justify-center gap-2 bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition mb-4"
//               >
//                 <FaTrash />
//                 View Trash
//               </button>
//               <button
//                 onClick={() => setShowUpdateForm(!showUpdateForm)}
//                 className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4"
//               >
//                 <FiEdit />
//                 {showUpdateForm ? "Cancel Update" : "Update Profile"}
//               </button>
//               {showUpdateForm && (
//                 <form className="space-y-2" onSubmit={handleProfileUpdate}>
//                   <input
//                     type="text"
//                     placeholder="Username"
//                     value={editProfile.username}
//                     onChange={(e) => setEditProfile({ ...editProfile, username: e.target.value })}
//                     className="w-full border p-2 rounded text-sm"
//                   />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     value={editProfile.email}
//                     onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
//                     className="w-full border p-2 rounded text-sm"
//                   />
//                   <input
//                     type="tel"
//                     placeholder="Phone"
//                     value={editProfile.phone}
//                     onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
//                     className="w-full border p-2 rounded text-sm"
//                   />
//                   <input
//                     type="password"
//                     placeholder="New Password (optional)"
//                     value={editProfile.password}
//                     onChange={(e) => setEditProfile({ ...editProfile, password: e.target.value })}
//                     className="w-full border p-2 rounded text-sm"
//                   />
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//                   >
//                     Save Changes
//                   </button>
//                 </form>
//               )}
//               <button
//                 onClick={() => signOut({ callbackUrl: "/homepage" })}
//                 className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mt-4"
//               >
//                 <FiLogOut />
//                 Sign Out
//               </button>
//             </>
//           ) : (
//             <p className="text-center text-gray-600">Loading admin details...</p>
//           )}
//         </div>
//       )}
//       {/* Main Content */}
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         {view === "reported" ? (
//           <>
//             <h2 className="text-3xl font-bold mb-6">Reported Blogs</h2>
//             {reportedBlogs.length > 0 ? (
//               <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//                 {reportedBlogs.map((blog) => (
//                   <div
//                     key={blog._id}
//                     className="border p-5 rounded-lg shadow-md hover:shadow-xl transition bg-white"
//                   >
//                     {blog.thumbnail && (
//                       <img
//                         src={blog.thumbnail}
//                         alt={blog.title}
//                         className="w-full h-48 object-cover rounded-t-lg mb-4"
//                       />
//                     )}
//                     <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
//                     <p className="text-sm text-gray-600 mb-2">
//                       {blog.description.split(" ").slice(0, 20).join(" ")}...
//                     </p>
//                     <p className="text-xs text-gray-500 mb-1">
//                       By {blog.author?.username || "Unknown Author"}
//                     </p>
//                     <p className="text-xs text-gray-400 mb-3">
//                       Reported {blog.reports.length} times
//                     </p>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleDenyReport(blog._id)}
//                         className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//                       >
//                         Deny
//                       </button>
//                       <button
//                         onClick={() => handleDeleteBlog(blog._id)}
//                         className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-600">No reported blogs found.</p>
//             )}
//           </>
//         ) : view === "all" ? (
//           <>
//             <h2 className="text-3xl font-bold mb-6">Blog List</h2>
//             {allBlogs.length > 0 ? (
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4">
//                   <label className="text-sm font-semibold">Sort by:</label>
//                   <select
//                     value={`${sortBy}-${sortOrder}`}
//                     onChange={(e) => {
//                       const [newSortBy, newSortOrder] = e.target.value.split("-");
//                       setSortBy(newSortBy);
//                       setSortOrder(newSortOrder);
//                     }}
//                     className="border p-2 rounded text-sm"
//                   >
//                     <option value="createdAt-desc">Date (Newest First)</option>
//                     <option value="createdAt-asc">Date (Oldest First)</option>
//                     <option value="author-asc">Author (A-Z)</option>
//                     <option value="author-desc">Author (Z-A)</option>
//                   </select>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full border-collapse bg-white shadow-md rounded-lg">
//                     <thead>
//                       <tr className="bg-gray-100"><th className="p-3 text-left text-sm font-semibold text-gray-700">Thumbnail</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Author</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Title</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Category</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Date</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Likes</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Dislikes</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Reports</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Action</th></tr>
//                     </thead>
//                     <tbody>
//                       {sortedBlogs.map((blog) => (
//                         <tr key={blog._id} className="border-b hover:bg-gray-50"><td className="p-3">{blog.thumbnail ? (<img src={blog.thumbnail} alt={blog.title} className="w-10 h-10 rounded-full object-cover" />) : (<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">N/A</div>)}</td><td className="p-3 text-sm text-gray-600">{blog.author?.username || "Unknown Author"}</td><td className="p-3 text-sm text-gray-600">{blog.title}</td><td className="p-3 text-sm text-gray-600">{blog.category || "Uncategorized"}</td><td className="p-3 text-sm text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</td><td className="p-3 text-sm text-gray-600">{blog.likes?.length || 0}</td><td className="p-3 text-sm text-gray-600">{blog.dislikes?.length || 0}</td><td className="p-3 text-sm text-gray-600">{blog.reports?.length || 0}</td><td className="p-3"><button onClick={() => handleDeleteBlog(blog._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm">Delete</button></td></tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-center text-gray-600">No blogs found.</p>
//             )}
//           </>
//         ) : (
//           <>
//             <h2 className="text-3xl font-bold mb-6">Trashed Blogs</h2>
//             {trashedBlogs.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse bg-white shadow-md rounded-lg">
//                   <thead>
//                     <tr className="bg-gray-100"><th className="p-3 text-left text-sm font-semibold text-gray-700">Thumbnail</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Author</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Title</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Category</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Deleted At</th><th className="p-3 text-left text-sm font-semibold text-gray-700">Action</th></tr>
//                   </thead>
//                   <tbody>
//                     {trashedBlogs.map((blog) => (
//                       <tr key={blog._id} className="border-b hover:bg-gray-50"><td className="p-3">{blog.thumbnail ? (<img src={blog.thumbnail} alt={blog.title} className="w-10 h-10 rounded-full object-cover" />) : (<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">N/A</div>)}</td><td className="p-3 text-sm text-gray-600">{blog.author?.username || "Unknown Author"}</td><td className="p-3 text-sm text-gray-600">{blog.title}</td><td className="p-3 text-sm text-gray-600">{blog.category || "Uncategorized"}</td><td className="p-3 text-sm text-gray-600">{new Date(blog.deletedAt).toLocaleDateString()}</td><td className="p-3"><button onClick={() => handleRestoreBlog(blog._id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm">Restore</button></td></tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p className="text-center text-gray-600">No trashed blogs found.</p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// export default AdminDashboard;
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa6/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$cg$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/cg/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module './BlogList'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './ReportedBlogs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function AdminDashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const [reportedBlogs, setReportedBlogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [allBlogs, setAllBlogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [trashedBlogs, setTrashedBlogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("reported"); // "reported", "all", or "trash"
    const [adminDetails, setAdminDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showProfileDropdown, setShowProfileDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showUpdateForm, setShowUpdateForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editProfile, setEditProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        username: "",
        email: "",
        phone: "",
        password: ""
    });
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("createdAt"); // "createdAt" or "author"
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc"); // "asc" or "desc"
    const hasRedirected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Handle redirects in useEffect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (hasRedirected.current) return;
            if (status === "loading") return;
            if (status === "authenticated" && session?.user?.role !== "admin") {
                hasRedirected.current = true;
                router.push("/homepage");
            } else if (status === "unauthenticated") {
                hasRedirected.current = true;
                router.push("/homepage");
            }
        }
    }["AdminDashboard.useEffect"], [
        status,
        session,
        router
    ]);
    // Fetch admin details
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (status === "authenticated" && session?.user?.id) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`http://localhost:5000/api/user/${session.user.id}`).then({
                    "AdminDashboard.useEffect": (response)=>{
                        console.log("Admin details response:", response.data);
                        setAdminDetails(response.data);
                        setEditProfile({
                            username: response.data.username,
                            email: response.data.email,
                            phone: response.data.phone,
                            password: ""
                        });
                    }
                }["AdminDashboard.useEffect"]).catch({
                    "AdminDashboard.useEffect": (error)=>{
                        console.error("Error fetching admin details:", {
                            message: error.message,
                            status: error.response?.status,
                            data: error.response?.data
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to fetch admin details");
                    }
                }["AdminDashboard.useEffect"]);
            }
        }
    }["AdminDashboard.useEffect"], [
        status,
        session
    ]);
    // Fetch reported blogs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (view === "reported") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("http://localhost:5000/api/reportblogs").then({
                    "AdminDashboard.useEffect": (response)=>{
                        const blogs = Array.isArray(response.data) ? response.data : response.data.blogs || [];
                        console.log("Reported blogs response:", blogs);
                        blogs.forEach({
                            "AdminDashboard.useEffect": (blog, index)=>{
                                console.log(`Reported Blog ${index}:`, {
                                    id: blog._id,
                                    title: blog.title,
                                    author: blog.author,
                                    username: blog.author?.username,
                                    isReported: blog.isReported,
                                    reports: blog.reports.length
                                });
                            }
                        }["AdminDashboard.useEffect"]);
                        setReportedBlogs(blogs);
                    }
                }["AdminDashboard.useEffect"]).catch({
                    "AdminDashboard.useEffect": (error)=>{
                        console.error("Error fetching reported blogs:", {
                            message: error.message,
                            status: error.response?.status,
                            data: error.response?.data
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to fetch reported blogs");
                    }
                }["AdminDashboard.useEffect"]);
            }
        }
    }["AdminDashboard.useEffect"], [
        view
    ]);
    // Fetch all blogs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (view === "all") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("http://localhost:5000/api/bloglist").then({
                    "AdminDashboard.useEffect": (response)=>{
                        const blogs = response.data.blogs || [];
                        console.log("All blogs response:", blogs);
                        blogs.forEach({
                            "AdminDashboard.useEffect": (blog, index)=>{
                                console.log(`All Blog ${index}:`, {
                                    id: blog._id,
                                    title: blog.title,
                                    author: blog.author,
                                    username: blog.author?.username,
                                    category: blog.category,
                                    createdAt: blog.createdAt,
                                    likes: blog.likes?.length,
                                    dislikes: blog.dislikes?.length,
                                    reports: blog.reports?.length || 0,
                                    isReported: (blog.reports?.length || 0) > 0
                                });
                            }
                        }["AdminDashboard.useEffect"]);
                        setAllBlogs(blogs);
                    }
                }["AdminDashboard.useEffect"]).catch({
                    "AdminDashboard.useEffect": (error)=>{
                        console.error("Error fetching all blogs:", {
                            message: error.message,
                            status: error.response?.status,
                            data: error.response?.data
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to fetch blogs");
                    }
                }["AdminDashboard.useEffect"]);
            }
        }
    }["AdminDashboard.useEffect"], [
        view
    ]);
    // Fetch trashed blogs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (view === "trash") {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("http://localhost:5000/api/admintrash").then({
                    "AdminDashboard.useEffect": (response)=>{
                        const blogs = response.data.blogs || [];
                        console.log("Trashed blogs response:", blogs);
                        blogs.forEach({
                            "AdminDashboard.useEffect": (blog, index)=>{
                                console.log(`Trashed Blog ${index}:`, {
                                    id: blog._id,
                                    title: blog.title,
                                    author: blog.author,
                                    username: blog.author?.username,
                                    category: blog.category,
                                    createdAt: blog.createdAt,
                                    deletedAt: blog.deletedAt
                                });
                            }
                        }["AdminDashboard.useEffect"]);
                        setTrashedBlogs(blogs);
                    }
                }["AdminDashboard.useEffect"]).catch({
                    "AdminDashboard.useEffect": (error)=>{
                        console.error("Error fetching trashed blogs:", {
                            message: error.message,
                            status: error.response?.status,
                            data: error.response?.data
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to fetch trashed blogs");
                    }
                }["AdminDashboard.useEffect"]);
            }
        }
    }["AdminDashboard.useEffect"], [
        view
    ]);
    // Handle deny report
    const handleDenyReport = async (blogId)=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].patch(`http://localhost:5000/api/denyreport/${blogId}`);
            setReportedBlogs(reportedBlogs.filter((blog)=>blog._id !== blogId));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(res.data.message);
        } catch (error) {
            console.error("Error denying report:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.response?.data?.message || "Failed to deny report");
        }
    };
    // Handle delete blog
    const handleDeleteBlog = async (blogId)=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`http://localhost:5000/api/admindelblog/${blogId}`);
            if (view === "reported") {
                setReportedBlogs(reportedBlogs.filter((blog)=>blog._id !== blogId));
            } else if (view === "all") {
                setAllBlogs(allBlogs.filter((blog)=>blog._id !== blogId));
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(res.data.message);
        } catch (error) {
            console.error("Error deleting blog:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.response?.data?.message || "Failed to delete blog");
        }
    };
    // Handle restore blog
    const handleRestoreBlog = async (blogId)=>{
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`http://localhost:5000/api/adminrestore/${blogId}`);
            setTrashedBlogs(trashedBlogs.filter((blog)=>blog._id !== blogId));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(res.data.message);
        } catch (error) {
            console.error("Error restoring blog:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.response?.data?.message || "Failed to restore blog");
        }
    };
    // Handle profile update
    const handleProfileUpdate = async (e)=>{
        e.preventDefault();
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`http://localhost:5000/api/update/${session.user.id}`, editProfile);
            setAdminDetails(res.data.user);
            setEditProfile({
                username: res.data.user.username,
                email: res.data.user.email,
                phone: res.data.user.phone,
                password: ""
            });
            setShowUpdateForm(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(res.data.message);
        } catch (error) {
            console.error("Error updating profile:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.response?.data?.message || "Failed to update profile");
        }
    };
    // Show loading state while session is loading
    if (status === "loading") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen items-center justify-center bg-[#fafafa]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-10 w-10 animate-spin rounded-full border-4 border-t-indigo-600"
            }, void 0, false, {
                fileName: "[project]/src/app/admindashboard/page.js",
                lineNumber: 766,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admindashboard/page.js",
            lineNumber: 765,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#fafafa] min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex justify-between items-center px-6 md:px-12 py-4 shadow-md bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-4xl font-bold flex gap-3 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaBlog"], {}, void 0, false, {
                                fileName: "[project]/src/app/admindashboard/page.js",
                                lineNumber: 776,
                                columnNumber: 11
                            }, this),
                            "Admin Dashboard"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admindashboard/page.js",
                        lineNumber: 775,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setView("reported"),
                                className: `px-6 py-2 font-bold text-sm transition ${view === "reported" ? "bg-black text-white shadow-[4px_4px_0_#000]" : "border border-black shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000]"}`,
                                children: "Reported Blogs"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admindashboard/page.js",
                                lineNumber: 780,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setView("all"),
                                className: `px-6 py-2 font-bold text-sm transition ${view === "all" ? "bg-black text-white shadow-[4px_4px_0_#000]" : "border border-black shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000]"}`,
                                children: "Blog List"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admindashboard/page.js",
                                lineNumber: 790,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowProfileDropdown(!showProfileDropdown),
                                className: "flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$cg$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CgProfile"], {
                                    className: "text-4xl"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 804,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/admindashboard/page.js",
                                lineNumber: 800,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admindashboard/page.js",
                        lineNumber: 779,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admindashboard/page.js",
                lineNumber: 774,
                columnNumber: 7
            }, this),
            showProfileDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-6 top-16 bg-white rounded-lg shadow-lg p-6 w-80 z-50",
                children: adminDetails ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold mb-4",
                            children: "Admin Profile"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 814,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: "Username:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 816,
                                    columnNumber: 17
                                }, this),
                                " ",
                                adminDetails.username
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 815,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: "Email:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 819,
                                    columnNumber: 17
                                }, this),
                                " ",
                                adminDetails.email
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 818,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: "Phone:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 822,
                                    columnNumber: 17
                                }, this),
                                " ",
                                adminDetails.phone
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 821,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: "Password:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 825,
                                    columnNumber: 17
                                }, this),
                                " ******"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 824,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: "Role:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 828,
                                    columnNumber: 17
                                }, this),
                                " ",
                                adminDetails.role
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 827,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setView("trash");
                                setShowProfileDropdown(false);
                            },
                            className: "w-full flex items-center justify-center gap-2 bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTrash"], {}, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 837,
                                    columnNumber: 17
                                }, this),
                                "View Trash"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 830,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowUpdateForm(!showUpdateForm),
                            className: "w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiEdit"], {}, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 844,
                                    columnNumber: 17
                                }, this),
                                showUpdateForm ? "Cancel Update" : "Update Profile"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 840,
                            columnNumber: 15
                        }, this),
                        showUpdateForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            className: "space-y-2",
                            onSubmit: handleProfileUpdate,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Username",
                                    value: editProfile.username,
                                    onChange: (e)=>setEditProfile({
                                            ...editProfile,
                                            username: e.target.value
                                        }),
                                    className: "w-full border p-2 rounded text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 849,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    placeholder: "Email",
                                    value: editProfile.email,
                                    onChange: (e)=>setEditProfile({
                                            ...editProfile,
                                            email: e.target.value
                                        }),
                                    className: "w-full border p-2 rounded text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 856,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "tel",
                                    placeholder: "Phone",
                                    value: editProfile.phone,
                                    onChange: (e)=>setEditProfile({
                                            ...editProfile,
                                            phone: e.target.value
                                        }),
                                    className: "w-full border p-2 rounded text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 863,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    placeholder: "New Password (optional)",
                                    value: editProfile.password,
                                    onChange: (e)=>setEditProfile({
                                            ...editProfile,
                                            password: e.target.value
                                        }),
                                    className: "w-full border p-2 rounded text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 870,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition",
                                    children: "Save Changes"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 877,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 848,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])({
                                    callbackUrl: "/homepage"
                                }),
                            className: "w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiLogOut"], {}, void 0, false, {
                                    fileName: "[project]/src/app/admindashboard/page.js",
                                    lineNumber: 889,
                                    columnNumber: 17
                                }, this),
                                "Sign Out"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 885,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-600",
                    children: "Loading admin details..."
                }, void 0, false, {
                    fileName: "[project]/src/app/admindashboard/page.js",
                    lineNumber: 894,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admindashboard/page.js",
                lineNumber: 811,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto px-4 py-8",
                children: view === "reported" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReportedBlogs, {
                    reportedBlogs: reportedBlogs,
                    handleDenyReport: handleDenyReport,
                    handleDeleteBlog: handleDeleteBlog
                }, void 0, false, {
                    fileName: "[project]/src/app/admindashboard/page.js",
                    lineNumber: 902,
                    columnNumber: 11
                }, this) : view === "all" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlogList, {
                    allBlogs: allBlogs,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    setSortBy: setSortBy,
                    setSortOrder: setSortOrder,
                    handleDeleteBlog: handleDeleteBlog
                }, void 0, false, {
                    fileName: "[project]/src/app/admindashboard/page.js",
                    lineNumber: 908,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold mb-6",
                            children: "Trashed Blogs"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 918,
                            columnNumber: 13
                        }, this),
                        trashedBlogs.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full border-collapse bg-white shadow-md rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "bg-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-3 text-left text-sm font-semibold text-gray-700",
                                                    children: "Thumbnail"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admindashboard/page.js",
                                                    lineNumber: 924,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-3 text-left text-sm font-semibold text-gray-700",
                                                    children: "Author"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admindashboard/page.js",
                                                    lineNumber: 925,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-3 text-left text-sm font-semibold text-gray-700",
                                                    children: "Title"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admindashboard/page.js",
                                                    lineNumber: 926,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-3 text-left text-sm font-semibold text-gray-700",
                                                    children: "Category"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admindashboard/page.js",
                                                    lineNumber: 927,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-3 text-left text-sm font-semibold text-gray-700",
                                                    children: "Deleted At"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admindashboard/page.js",
                                                    lineNumber: 928,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "p-3 text-left text-sm font-semibold text-gray-700",
                                                    children: "Action"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admindashboard/page.js",
                                                    lineNumber: 929,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admindashboard/page.js",
                                            lineNumber: 923,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admindashboard/page.js",
                                        lineNumber: 922,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: trashedBlogs.map((blog)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b hover:bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-3",
                                                        children: blog.thumbnail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: blog.thumbnail,
                                                            alt: blog.title,
                                                            className: "w-10 h-10 rounded-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admindashboard/page.js",
                                                            lineNumber: 937,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500",
                                                            children: "N/A"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admindashboard/page.js",
                                                            lineNumber: 943,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admindashboard/page.js",
                                                        lineNumber: 935,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-3 text-sm text-gray-600",
                                                        children: blog.author?.username || "Unknown Author"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admindashboard/page.js",
                                                        lineNumber: 948,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-3 text-sm text-gray-600",
                                                        children: blog.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admindashboard/page.js",
                                                        lineNumber: 949,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-3 text-sm text-gray-600",
                                                        children: blog.category || "Uncategorized"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admindashboard/page.js",
                                                        lineNumber: 950,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-3 text-sm text-gray-600",
                                                        children: new Date(blog.deletedAt).toLocaleDateString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admindashboard/page.js",
                                                        lineNumber: 951,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "p-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleRestoreBlog(blog._id),
                                                            className: "bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm",
                                                            children: "Restore"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admindashboard/page.js",
                                                            lineNumber: 953,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admindashboard/page.js",
                                                        lineNumber: 952,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, blog._id, true, {
                                                fileName: "[project]/src/app/admindashboard/page.js",
                                                lineNumber: 934,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admindashboard/page.js",
                                        lineNumber: 932,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admindashboard/page.js",
                                lineNumber: 921,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 920,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-gray-600",
                            children: "No trashed blogs found."
                        }, void 0, false, {
                            fileName: "[project]/src/app/admindashboard/page.js",
                            lineNumber: 966,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/app/admindashboard/page.js",
                lineNumber: 900,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admindashboard/page.js",
        lineNumber: 772,
        columnNumber: 5
    }, this);
}
_s(AdminDashboard, "4PVm+BPSR46Ft3YJhpderUQ1KUE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = AdminDashboard;
const __TURBOPACK__default__export__ = AdminDashboard;
var _c;
__turbopack_context__.k.register(_c, "AdminDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_admindashboard_page_f01e97cd.js.map