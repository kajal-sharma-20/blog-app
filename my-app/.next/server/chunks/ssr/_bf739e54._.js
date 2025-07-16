module.exports = {

"[project]/.next-internal/server/app/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.js [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/homepage/page.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
// "use client";
// import { useState, useEffect, useRef, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { FaBlog } from "react-icons/fa6";
// import { ArrowRight } from "lucide-react";
// import axios from "axios";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { BiSolidLike, BiSolidDislike, BiSolidFlag } from "react-icons/bi";
// import { toast } from "react-toastify";
// import { CgProfile } from "react-icons/cg";
// import { FiEdit, FiLogOut } from "react-icons/fi";
// import { MdDelete, MdRestore } from "react-icons/md";
// function Home() {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const sidebarRef = useRef(null);
//   const trashModalRef = useRef(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [showProfileSidebar, setShowProfileSidebar] = useState(false);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [showTrashModal, setShowTrashModal] = useState(false);
//   const [showPhonePrompt, setShowPhonePrompt] = useState(false);
//   const [selectedBlogId, setSelectedBlogId] = useState(null);
//   const [reportReason, setReportReason] = useState("");
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [trashedBlogs, setTrashedBlogs] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [userDetails, setUserDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [editProfile, setEditProfile] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     instagram: "",
//     youtube: "",
//     facebook: "",
//   });
//   const [errors, setErrors] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     instagram: "",
//     youtube: "",
//     facebook: "",
//   });
//   const [trashSortBy, setTrashSortBy] = useState("deletedAt");
//   const [trashSortOrder, setTrashSortOrder] = useState("desc");
//   // Handle admin redirect
//   useEffect(() => {
//     if (status === "authenticated" && session?.user?.role === "admin") {
//       router.push("/admindashboard");
//     }
//   }, [status, session, router]);
//   // Fetch blogs
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/allblogs")
//       .then((response) => {
//         const reversedBlogs = (response.data.blogs || []).reverse();
//         setBlogs(reversedBlogs);
//         setFilteredBlogs(reversedBlogs);
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error.response?.data || error.message);
//         toast.error("Failed to fetch blogs");
//       });
//   }, []);
//   // Fetch trashed blogs
//   useEffect(() => {
//     if (status === "authenticated" && session?.user?.id) {
//       axios
//         .get(`http://localhost:5000/api/trash/${session.user.id}`)
//         .then((response) => {
//           setTrashedBlogs(response.data.blogs || []);
//         })
//         .catch((error) => {
//           console.error("Error fetching trashed blogs:", error.response?.data || error.message);
//           toast.error("Failed to fetch trashed blogs");
//         });
//     }
//   }, [status, session]);
//   // Fetch user details
//   useEffect(() => {
//     if (status === "authenticated" && session?.user?.id) {
//       axios
//         .get(`http://localhost:5000/api/user/${session.user.id}`)
//         .then((response) => {
//           setUserDetails(response.data);
//           setEditProfile({
//             username: response.data.username || "",
//             email: response.data.email || "",
//             phone: response.data.phone?.replace(/^\+91/, "") || "",
//             password: "",
//             confirmPassword: "",
//             instagram: response.data.instagram || "",
//             youtube: response.data.youtube || "",
//             facebook: response.data.facebook || "",
//           });
//           if (!response.data.phone) {
//             setShowPhonePrompt(true);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching user details:", error.response?.data || error.message);
//           toast.error("Failed to fetch user details");
//         });
//     }
//   }, [status, session]);
//   // Handle outside click to close sidebar and trash modal
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (
//         showProfileSidebar &&
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target)
//       ) {
//         setShowProfileSidebar(false);
//       }
//       if (
//         showTrashModal &&
//         trashModalRef.current &&
//         !trashModalRef.current.contains(event.target)
//       ) {
//         setShowTrashModal(false);
//       }
//     };
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, [showProfileSidebar, showTrashModal]);
//   // Sort trashed blogs
//   const sortedTrashedBlogs = useMemo(() => {
//     return [...trashedBlogs].sort((a, b) => {
//       if (trashSortBy === "title") {
//         const titleA = a.title?.toLowerCase() || "";
//         const titleB = b.title?.toLowerCase() || "";
//         return trashSortOrder === "asc"
//           ? titleA.localeCompare(titleB)
//           : titleB.localeCompare(titleA);
//       } else if (trashSortBy === "category") {
//         const categoryA = a.category?.toLowerCase() || "";
//         const categoryB = b.category?.toLowerCase() || "";
//         return trashSortOrder === "asc"
//           ? categoryA.localeCompare(categoryB)
//           : categoryB.localeCompare(categoryA);
//       } else {
//         // sortBy === "deletedAt"
//         const dateA = new Date(a.deletedAt).getTime();
//         const dateB = new Date(b.deletedAt).getTime();
//         return trashSortOrder === "asc" ? dateA - dateB : dateB - dateA;
//       }
//     });
//   }, [trashedBlogs, trashSortBy, trashSortOrder]);
//   // Filter blogs by category
//   const filterByCategory = (category) => {
//     setActiveCategory(category);
//     if (category === "All") {
//       setFilteredBlogs(blogs);
//     } else {
//       setFilteredBlogs(blogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase()));
//     }
//   };
//   // Modal controls
//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);
//   const openLoginModal = () => setShowLoginModal(true);
//   const closeLoginModal = () => setShowLoginModal(false);
//   const openReportModal = async (blogId) => {
//     if (!session) {
//       toast.warning("Please login first");
//       setShowLoginModal(true);
//       return;
//     }
//     try {
//       const res = await axios.get(`http://localhost:5000/api/blog/${blogId}`);
//       const blog = res.data;
//       const alreadyReported = blog.reports.some((report) => report.userId.toString() === session.user.id);
//       if (alreadyReported) {
//         toast.error("You have already reported this blog");
//         return;
//       }
//       setSelectedBlogId(blogId);
//       setShowReportModal(true);
//     } catch (error) {
//       console.error("Error checking report status:", error.response?.data || error.message);
//       toast.error("Failed to check report status");
//     }
//   };
//   const closeReportModal = () => {
//     setSelectedBlogId(null);
//     setReportReason("");
//     setShowReportModal(false);
//   };
//   const openTrashModal = () => setShowTrashModal(true);
//   const closeTrashModal = () => setShowTrashModal(false);
//   // Handle signup
//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const formData = {
//       username: e.target.username.value,
//       email: e.target.email.value,
//       phone: `+91${e.target.phone.value}`,
//       password: e.target.password.value,
//     };
//     try {
//       await axios.post("http://localhost:5000/api/signup", formData);
//       toast.success("Signup successful! Please login.");
//       setShowModal(false);
//       setShowLoginModal(true);
//     } catch (error) {
//       console.error("Signup error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to sign up");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // Handle login
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const emailOrphone = e.target.emailOrphone.value;
//     const password = e.target.password.value;
//     try {
//       const res = await signIn("credentials", {
//         redirect: false,
//         emailOrphone: /^\d{10}$/.test(emailOrphone) ? `+91${emailOrphone}` : emailOrphone,
//         password,
//       });
//       if (!res?.error) {
//         closeLoginModal();
//         toast.success("Login successful");
//       } else {
//         toast.error("Login failed: " + res.error);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("An unexpected error occurred during login");
//     }
//   };
//   // Handle like
//   const handleLike = async (blogId) => {
//     if (!session) {
//       toast.warning("Please login first");
//       return;
//     }
//     if (!session.user?.id) {
//       console.error("User ID undefined:", session);
//       toast.error("Session invalid. Please log in again.");
//       return;
//     }
//     try {
//       const res = await axios.post(`http://localhost:5000/api/likeblog/${blogId}`, {
//         userId: session.user.id,
//       });
//       const { blog: updatedBlog, message } = res.data;
//       const updatedBlogs = blogs.map((b) =>
//         b._id === blogId ? { ...b, likes: updatedBlog.likes, dislikes: updatedBlog.dislikes } : b
//       );
//       setBlogs(updatedBlogs);
//       setFilteredBlogs(
//         activeCategory === "All"
//           ? updatedBlogs
//           : updatedBlogs.filter((b) => b.category.toLowerCase() === activeCategory.toLowerCase())
//       );
//       toast.success(message);
//     } catch (error) {
//       console.error("Like error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to like blog");
//     }
//   };
//   // Handle dislike
//   const handleDislike = async (blogId) => {
//     if (!session) {
//       toast.warning("Please login first");
//       return;
//     }
//     if (!session.user?.id) {
//       console.error("User ID undefined:", session);
//       toast.error("Session invalid. Please log in again.");
//       return;
//     }
//     try {
//       const res = await axios.post(`http://localhost:5000/api/dislikeblog/${blogId}`, {
//         userId: session.user.id,
//       });
//       const { blog: updatedBlog, message } = res.data;
//       const updatedBlogs = blogs.map((b) =>
//         b._id === blogId ? { ...b, likes: updatedBlog.likes, dislikes: updatedBlog.dislikes } : b
//       );
//       setBlogs(updatedBlogs);
//       setFilteredBlogs(
//         activeCategory === "All"
//           ? updatedBlogs
//           : updatedBlogs.filter((b) => b.category.toLowerCase() === activeCategory.toLowerCase())
//       );
//       toast.success(message);
//     } catch (error) {
//       console.error("Dislike error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to dislike blog");
//     }
//   };
//   // Handle report
//   const handleReport = async (e) => {
//     e.preventDefault();
//     if (!session || !session.user?.id) {
//       toast.warning("Please login first");
//       closeReportModal();
//       return;
//     }
//     if (!reportReason.trim()) {
//       toast.warning("Please provide a reason for reporting");
//       return;
//     }
//     try {
//       const res = await axios.post(`http://localhost:5000/api/report/${selectedBlogId}`, {
//         userId: session.user.id,
//         reason: reportReason,
//       });
//       const updatedBlogs = blogs.map((blog) =>
//         blog._id === selectedBlogId
//           ? { ...blog, reports: [...(blog.reports || []), { userId: session.user.id, reason: reportReason }] }
//           : blog
//       );
//       setBlogs(updatedBlogs);
//       setFilteredBlogs(
//         activeCategory === "All"
//           ? updatedBlogs
//           : updatedBlogs.filter((b) => b.category.toLowerCase() === activeCategory.toLowerCase())
//       );
//       toast.success("Blog reported successfully");
//       closeReportModal();
//     } catch (error) {
//       console.error("Report error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to report blog");
//     }
//   };
//   // Validate input fields
//   const validateField = (name, value) => {
//     const usernameRegex = /^[A-Za-z0-9\s_-]{3,50}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\d{10}$/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     const instagramRegex = /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/;
//     const youtubeRegex = /^https:\/\/(www\.)?youtube\.com\/(channel\/[A-Za-z0-9_-]+|user\/[A-Za-z0-9_-]+|[A-Za-z0-9_-]+)\/?$/;
//     const facebookRegex = /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9._-]+\/?$/;
//     switch (name) {
//       case "username":
//         return usernameRegex.test(value) ? "" : "Username must be 3-50 characters, letters, numbers, spaces, underscores, or hyphens only";
//       case "email":
//         return emailRegex.test(value) ? "" : "Please enter a valid email address";
//       case "phone":
//         return phoneRegex.test(value) ? "" : "Phone number must be exactly 10 digits";
//       case "password":
//         return !value || passwordRegex.test(value)
//           ? ""
//           : "Password must be at least 8 characters, including one uppercase, one lowercase, one number, and one special character (@$!%*?&)";
//       case "confirmPassword":
//         return value === editProfile.password ? "" : "Passwords do not match";
//       case "instagram":
//         return !value || instagramRegex.test(value) ? "" : "Please enter a valid Instagram URL";
//       case "youtube":
//         return !value || youtubeRegex.test(value) ? "" : "Please enter a valid YouTube URL";
//       case "facebook":
//         return !value || facebookRegex.test(value) ? "" : "Please enter a valid Facebook URL";
//       default:
//         return "";
//     }
//   };
//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditProfile((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
//   };
//   // Handle profile update
//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const newErrors = {
//       username: validateField("username", editProfile.username),
//       email: validateField("email", editProfile.email),
//       phone: validateField("phone", editProfile.phone),
//       password: validateField("password", editProfile.password),
//       confirmPassword: validateField("confirmPassword", editProfile.confirmPassword),
//       instagram: validateField("instagram", editProfile.instagram),
//       youtube: validateField("youtube", editProfile.youtube),
//       facebook: validateField("facebook", editProfile.facebook),
//     };
//     setErrors(newErrors);
//     if (Object.values(newErrors).some((error) => error)) {
//       toast.error("Please fix the errors in the form");
//       setIsLoading(false);
//       return;
//     }
//     if (!session?.user?.id) {
//       console.error("User ID undefined:", session);
//       toast.error("Session invalid. Please log in again.");
//       setIsLoading(false);
//       return;
//     }
//     const payload = {
//       username: editProfile.username,
//       email: editProfile.email,
//       phone: `+91${editProfile.phone}`,
//       instagram: editProfile.instagram || "",
//       youtube: editProfile.youtube || "",
//       facebook: editProfile.facebook || "",
//     };
//     if (editProfile.password) {
//       payload.password = editProfile.password;
//     }
//     try {
//       const res = await axios.put(`http://localhost:5000/api/update/${session.user.id}`, payload);
//       setUserDetails(res.data.user);
//       setEditProfile({
//         username: res.data.user.username || "",
//         email: res.data.user.email || "",
//         phone: res.data.user.phone?.replace(/^\+91/, "") || "",
//         password: "",
//         confirmPassword: "",
//         instagram: res.data.user.instagram || "",
//         youtube: res.data.user.youtube || "",
//         facebook: res.data.user.facebook || "",
//       });
//       setErrors({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//         instagram: "",
//         youtube: "",
//         facebook: "",
//       });
//       setShowUpdateForm(false);
//       toast.success(res.data.message || "Profile updated successfully");
//       if (editProfile.password) {
//         await signOut({ redirect: false });
//         setShowLoginModal(true);
//         toast.info("Password updated. Please log in with your new password.");
//       }
//     } catch (error) {
//       console.error("Update error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to update profile");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // Handle phone prompt
//   const handlePhoneSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const phone = `+91${e.target.phone.value}`;
//     if (!session?.user?.id) {
//       console.error("User ID undefined:", session);
//       toast.error("Session invalid. Please log in again.");
//       setIsLoading(false);
//       return;
//     }
//     if (!/^\+91\d{10}$/.test(phone)) {
//       toast.error("Phone number must be exactly 10 digits");
//       setIsLoading(false);
//       return;
//     }
//     try {
//       const res = await axios.put(`http://localhost:5000/api/update/${session.user.id}`, { phone });
//       setUserDetails(res.data.user);
//       setEditProfile((prev) => ({ ...prev, phone: res.data.user.phone?.replace(/^\+91/, "") || "" }));
//       setShowPhonePrompt(false);
//       toast.success("Phone number added successfully");
//     } catch (error) {
//       console.error("Phone update error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to add phone number");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // Handle blog restoration
//   const handleRestoreBlog = async (blogId) => {
//     if (!session || !session.user?.id) {
//       toast.warning("Please login first");
//       return;
//     }
//     try {
//       const res = await axios.put(`http://localhost:5000/api/restore/${blogId}`, {
//         userId: session.user.id,
//       });
//       const restoredBlog = trashedBlogs.find((b) => b._id === blogId);
//       setTrashedBlogs(trashedBlogs.filter((b) => b._id !== blogId));
//       if (restoredBlog) {
//         const updatedBlogs = [...blogs, { ...restoredBlog, deletedAt: null }].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setBlogs(updatedBlogs);
//         setFilteredBlogs(
//           activeCategory === "All"
//             ? updatedBlogs
//             : updatedBlogs.filter((b) => b.category.toLowerCase() === activeCategory.toLowerCase())
//         );
//       }
//       toast.success("Blog restored successfully");
//     } catch (error) {
//       console.error("Restore error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to restore blog");
//     }
//   };
//   // Guard rendering
//   if (status === "loading" || (status === "authenticated" && session?.user?.role === "admin")) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
//         <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-indigo-600" />
//       </div>
//     );
//   }
//   return (
//     <div className="bg-[#fafafa] min-h-screen">
//       {/* Header */}
//       <div className="w-full flex justify-between items-center px-6 md:px-12 py-4">
//         <div className="text-4xl font-bold flex gap-3">
//           <FaBlog />
//           blog
//         </div>
//         <div className="flex items-center gap-4">
//           {!session ? (
//             <button
//               onClick={openModal}
//               className="flex items-center gap-2 px-5 py-2 border border-black font-bold text-sm shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] transition"
//             >
//               Get started <ArrowRight size={16} />
//             </button>
//           ) : (
//             <button
//               onClick={() => setShowProfileSidebar(!showProfileSidebar)}
//               className="flex items-center gap-2"
//             >
//               <CgProfile className="text-4xl" />
//             </button>
//           )}
//         </div>
//       </div>
//       {/* Profile Sidebar */}
//       {showProfileSidebar && (
//         <div
//           ref={sidebarRef}
//           className="fixed right-0 top-0 h-full bg-white rounded-l-lg shadow-lg p-6 w-80 z-50 overflow-y-auto no-scrollbar"
//         >
//           <h3 className="text-lg font-bold mb-4">User Profile</h3>
//           <button
//             onClick={() => setShowUpdateForm(true)}
//             className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4"
//           >
//             <FiEdit />
//             Update Profile
//           </button>
//           <button
//             onClick={() => {
//               setShowProfileSidebar(false);
//               openTrashModal();
//             }}
//             className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition mb-4"
//           >
//             <MdDelete />
//             View Trash
//           </button>
//           <button
//             onClick={() => signOut({ callbackUrl: "/homepage" })}
//             className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
//           >
//             <FiLogOut />
//             Sign Out
//           </button>
//         </div>
//       )}
//       {/* Hero */}
//       <div className="flex flex-col items-center justify-center text-center px-4 mt-20">
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//           Latest Blogs
//         </h2>
//         <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-[600px]">
//           Your thoughts deserve the spotlight — let them shine through your blog.
//         </p>
//         <div className="flex flex-wrap gap-4 justify-center">
//           <button
//             onClick={() => filterByCategory("All")}
//             className={`px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${
//               activeCategory === "All" ? "bg-black text-white" : "hover:shadow-[2px_2px_0_#000]"
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => filterByCategory("Technology")}
//             className={`px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${
//               activeCategory === "Technology" ? "bg-black text-white" : "hover:shadow-[2px_2px_0_#000]"
//             }`}
//           >
//             Technology
//           </button>
//           <button
//             onClick={() => filterByCategory("Lifestyle")}
//             className={`px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${
//               activeCategory === "Lifestyle" ? "bg-black text-white" : "hover:shadow-[2px_2px_0_#000]"
//             }`}
//           >
//             Lifestyle
//           </button>
//           <button
//             onClick={() => filterByCategory("Education")}
//             className={`px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${
//               activeCategory === "Education" ? "bg-black text-white" : "hover:shadow-[2px_2px_0_#000]"
//             }`}
//           >
//             Education
//           </button>
//           <button
//             onClick={() => filterByCategory("Health & Fitness")}
//             className={`px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${
//               activeCategory === "Health & Fitness" ? "bg-black text-white" : "hover:shadow-[2px_2px_0_#000]"
//             }`}
//           >
//             Health & Fitness
//           </button>
//         </div>
//         <div className="mt-8 mb-12">
//           <button
//             onClick={() => (session ? router.push("/homepage/addblog") : openLoginModal())}
//             className="px-6 py-2 bg-black text-white font-bold rounded shadow-xl hover:bg-gray-800 transition"
//           >
//             + Add Blog
//           </button>
//         </div>
//       </div>
//       {/* Blog Cards */}
//       <div className="max-w-5xl mx-auto px-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 pb-12">
//         {filteredBlogs.length > 0 ? (
//           filteredBlogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="border p-5 rounded-lg shadow-md hover:shadow-xl transition"
//             >
//               {blog.thumbnail && (
//                 <img
//                   src={blog.thumbnail}
//                   alt={blog.title}
//                   className="w-full h-48 object-cover rounded-t-lg mb-4"
//                 />
//               )}
//               <h3 className="text-lg font-bold text-white mb-3 px-2 bg-black inline-block">
//                 {blog.category}
//               </h3>
//               <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
//               <p>
//                 {blog.description.split(" ").length > 50
//                   ? blog.description.split(" ").slice(0, 7).join(" ") + "..."
//                   : blog.description}
//                 <button
//                   className="font-bold"
//                   onClick={() => router.push(`/homepage/${blog._id}`)}
//                 >
//                   ...Read More
//                 </button>
//               </p>
//               <p className="text-xs text-gray-500 py-1">
//                 By {blog.author?.username || "Unknown"}
//               </p>
//               <p className="text-xs text-gray-400">
//                 {new Date(blog.createdAt).toLocaleDateString()}
//               </p>
//               <div className="flex items-center gap-2 mt-2">
//                 <button onClick={() => handleLike(blog._id)} className="text-blue-400">
//                   <BiSolidLike />
//                 </button>
//                 <span>{blog.likes?.length || 0}</span>
//                 <button onClick={() => handleDislike(blog._id)} className="text-red-400">
//                   <BiSolidDislike />
//                 </button>
//                 <span>{blog.dislikes?.length || 0}</span>
//                 <button onClick={() => openReportModal(blog._id)} className="text-orange-500">
//                   <BiSolidFlag />
//                 </button>
//                 <span className="text-orange-500">{blog.reports?.length || 0}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-600">
//             No blogs found in this category.
//           </p>
//         )}
//       </div>
//       {/* Signup Modal */}
//       {showModal && (
//         <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md overflow-y-auto max-h-[90vh] no-scrollbar">
//             <h2 className="text-2xl font-bold mb-4 text-center">Create your account</h2>
//             <form className="space-y-4" onSubmit={handleSignupSubmit}>
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   placeholder="e.g., Nenu Sharma"
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Letters, numbers, spaces, underscores, hyphens only</p>
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="e.g., user@example.com"
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <div className="flex items-center">
//                   <span className="inline-block bg-gray-200 text-gray-700 px-3 py-2 rounded-l border border-r-0">+91</span>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="9876543210"
//                     maxLength="10"
//                     pattern="\d{10}"
//                     className="w-full border p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                     onInput={(e) => {
//                       e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
//                     }}
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">Enter exactly 10 digits</p>
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="At least 8 characters"
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Include uppercase, lowercase, number, special character</p>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:bg-gray-400"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Signing Up..." : "Sign Up"}
//               </button>
//               <p className="text-sm text-center">
//                 Already have an account?{" "}
//                 <span
//                   className="underline cursor-pointer"
//                   onClick={() => {
//                     closeModal();
//                     openLoginModal();
//                   }}
//                 >
//                   Login
//                 </span>
//               </p>
//             </form>
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black transition"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}
//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md overflow-y-auto max-h-[90vh] no-scrollbar">
//             <h2 className="text-2xl font-bold mb-4 text-center">Login to your account</h2>
//             <form className="space-y-4" onSubmit={handleLoginSubmit}>
//               <div>
//                 <label htmlFor="emailOrphone" className="block text-sm font-medium text-gray-700">
//                   Email or Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   id="emailOrphone"
//                   name="emailOrphone"
//                   placeholder="Email or 10-digit Phone Number"
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                   onInput={(e) => {
//                     if (/^\d+$/.test(e.target.value)) {
//                       e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
//                     }
//                   }}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="Password"
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
//               >
//                 Login
//               </button>
//             </form>
//             <button
//               onClick={closeLoginModal}
//               className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black transition"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}
//       {/* Update Profile Modal */}
//       {showUpdateForm && (
//         <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md overflow-y-auto max-h-[90vh] no-scrollbar">
//             <h2 className="text-2xl font-bold mb-4 text-center">Update Your Profile</h2>
//             <form className="space-y-4" onSubmit={handleProfileUpdate} noValidate>
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   placeholder="e.g., Nenu Sharma"
//                   value={editProfile.username}
//                   onChange={handleInputChange}
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="e.g., user@example.com"
//                   value={editProfile.email}
//                   onChange={handleInputChange}
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
//               </div>
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <div className="flex items-center">
//                   <span className="inline-block bg-gray-200 text-gray-700 px-3 py-2 rounded-l border border-r-0">+91</span>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="9876543210"
//                     maxLength="10"
//                     pattern="\d{10}"
//                     value={editProfile.phone}
//                     onChange={handleInputChange}
//                     className="w-full border p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                     onInput={(e) => {
//                       e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
//                     }}
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">Enter exactly 10 digits</p>
//                 {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   New Password (optional)
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="Enter new password"
//                   value={editProfile.password}
//                   onChange={handleInputChange}
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">At least 8 characters, including uppercase, lowercase, number, special character</p>
//                 {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
//               </div>
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirm New Password
//                 </label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   placeholder="Confirm new password"
//                   value={editProfile.confirmPassword}
//                   onChange={handleInputChange}
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
//               </div>
//               <div>
//                 <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
//                   Instagram (optional)
//                 </label>
//                 <input
//                   type="text"
//                   id="instagram"
//                   name="instagram"
//                   placeholder="e.g., https://www.instagram.com/username"
//                   value={editProfile.instagram}
//                   onChange={handleInputChange}
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 {errors.instagram && <p className="text-xs text-red-500 mt-1">{errors.instagram}</p>}
//               </div>
//               <div>
//                 <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">
//                   YouTube (optional)
//                 </label>
//                 <input
//                   type="text"
//                   id="youtube"
//                   name="youtube"
//                   placeholder="e.g., https://www.youtube.com/channel/UC..."
//                   value={editProfile.youtube}
//                   onChange={handleInputChange}
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 {errors.youtube && <p className="text-xs text-red-500 mt-1">{errors.youtube}</p>}
//               </div>
//               <div>
//                 <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
//                   Facebook (optional)
//                 </label>
//                 <input
//                   type="text"
//                   id="facebook"
//                   name="facebook"
//                   placeholder="e.g., https://www.facebook.com/username"
//                   value={editProfile.facebook}
//                   onChange={handleInputChange}
//                   className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 {errors.facebook && <p className="text-xs text-red-500 mt-1">{errors.facebook}</p>}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:bg-gray-400"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Saving..." : "Save Changes"}
//               </button>
//             </form>
//             <button
//               onClick={() => setShowUpdateForm(false)}
//               className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black transition"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}
//       {/* Phone Prompt Modal */}
//       {showPhonePrompt && (
//         <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md overflow-y-auto max-h-[90vh] no-scrollbar">
//             <h2 className="text-2xl font-bold mb-4 text-center">Add Your Phone Number</h2>
//             <form className="space-y-4" onSubmit={handlePhoneSubmit}>
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <div className="flex items-center">
//                   <span className="inline-block bg-gray-200 text-gray-700 px-3 py-2 rounded-l border border-r-0">+91</span>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     placeholder="9876543210"
//                     maxLength="10"
//                     pattern="\d{10}"
//                     className="w-full border p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                     onInput={(e) => {
//                       e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
//                     }}
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">Enter exactly 10 digits</p>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:bg-gray-400"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Saving..." : "Save Phone Number"}
//               </button>
//             </form>
//             <button
//               onClick={() => setShowPhonePrompt(false)}
//               className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black transition"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}
//       {/* Report Modal */}
//       {showReportModal && (
//         <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md overflow-y-auto max-h-[90vh] no-scrollbar">
//             <h2 className="text-2xl font-bold mb-4 text-center">Report Blog</h2>
//             <form className="space-y-4" onSubmit={handleReport}>
//               <textarea
//                 placeholder="Reason for reporting"
//                 value={reportReason}
//                 onChange={(e) => setReportReason(e.target.value)}
//                 className="w-full border p-2 rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
//                 >
//                   Submit Report
//                 </button>
//                 <button
//                   type="button"
//                   onClick={closeReportModal}
//                   className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//             <button
//               onClick={closeReportModal}
//               className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black transition"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}
//       {/* Trash Modal */}
//       {showTrashModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
//           <div
//             ref={trashModalRef}
//             className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[90vw] sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar p-6"
//           >
//             <h2 className="text-2xl font-bold mb-4 text-center">Trashed Blogs</h2>
//             <button
//               onClick={closeTrashModal}
//               className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black transition"
//             >
//               ×
//             </button>
//             <div className="flex items-center gap-4 mb-4">
//               <label className="text-sm font-semibold text-gray-700">Sort by:</label>
//               <select
//                 value={`${trashSortBy}-${trashSortOrder}`}
//                 onChange={(e) => {
//                   const [newSortBy, newSortOrder] = e.target.value.split("-");
//                   setTrashSortBy(newSortBy);
//                   setTrashSortOrder(newSortOrder);
//                 }}
//                 className="border border-gray-300 p-2 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition w-full sm:w-auto"
//               >
//                 <option value="deletedAt-desc">Deleted Date (Newest First)</option>
//                 <option value="deletedAt-asc">Deleted Date (Oldest First)</option>
//                 <option value="title-asc">Title (A-Z)</option>
//                 <option value="title-desc">Title (Z-A)</option>
//                 <option value="category-asc">Category (A-Z)</option>
//                 <option value="category-desc">Category (Z-A)</option>
//               </select>
//             </div>
//             {sortedTrashedBlogs.length > 0 ? (
//               <div className="space-y-4">
//                 {sortedTrashedBlogs.map((blog) => (
//                   <div key={blog._id} className="border p-3 rounded-lg shadow-sm">
//                     <h3 className="text-sm font-semibold">{blog.title}</h3>
//                     <p className="text-xs text-gray-600">Category: {blog.category || "Uncategorized"}</p>
//                     <p className="text-xs text-gray-600">
//                       Deleted on: {new Date(blog.deletedAt).toLocaleDateString()}
//                     </p>
//                     <button
//                       onClick={() => handleRestoreBlog(blog._id)}
//                       className="mt-2 flex items-center gap-1 bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700 transition text-sm"
//                     >
//                       <MdRestore />
//                       Restore
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-600 text-center">No blogs in trash</p>
//             )}
//             <button
//               onClick={closeTrashModal}
//               className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-semibold mt-4"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Home;
///////////////////////////////
// "use client";
// import { useState, useEffect, useRef, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { FaBlog } from "react-icons/fa6";
// import { ArrowRight, ChevronDown } from "lucide-react";
// import axios from "axios";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { BiSolidLike, BiSolidDislike, BiSolidFlag } from "react-icons/bi";
// import { toast } from "react-toastify";
// import { CgProfile } from "react-icons/cg";
// import { FiEdit, FiLogOut } from "react-icons/fi";
// import { MdDelete, MdRestore } from "react-icons/md";
// function Home() {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const sidebarRef = useRef(null);
//   const trashModalRef = useRef(null);
//   // State management
//   const [showModal, setShowModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [showProfileSidebar, setShowProfileSidebar] = useState(false);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [showTrashModal, setShowTrashModal] = useState(false);
//   const [showPhonePrompt, setShowPhonePrompt] = useState(false);
//   const [selectedBlogId, setSelectedBlogId] = useState(null);
//   const [reportReason, setReportReason] = useState("");
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [trashedBlogs, setTrashedBlogs] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [userDetails, setUserDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [editProfile, setEditProfile] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     instagram: "",
//     youtube: "",
//     facebook: "",
//   });
//   const [errors, setErrors] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     instagram: "",
//     youtube: "",
//     facebook: "",
//   });
//   const [trashSortBy, setTrashSortBy] = useState("deletedAt");
//   const [trashSortOrder, setTrashSortOrder] = useState("desc");
//   const [modalAnimation, setModalAnimation] = useState("");
//   // Handle admin redirect
//   useEffect(() => {
//     if (status === "authenticated" && session?.user?.role === "admin") {
//       router.push("/admindashboard");
//     }
//   }, [status, session, router]);
//   // Fetch blogs
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/allblogs")
//       .then((response) => {
//         const reversedBlogs = (response.data.blogs || []).reverse();
//         setBlogs(reversedBlogs);
//         setFilteredBlogs(reversedBlogs);
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error.response?.data || error.message);
//         toast.error("Failed to fetch blogs");
//       });
//   }, []);
//   // Fetch trashed blogs
//   useEffect(() => {
//     if (status === "authenticated" && session?.user?.id) {
//       axios
//         .get(`http://localhost:5000/api/trash/${session.user.id}`)
//         .then((response) => {
//           setTrashedBlogs(response.data.blogs || []);
//         })
//         .catch((error) => {
//           console.error("Error fetching trashed blogs:", error.response?.data || error.message);
//           toast.error("Failed to fetch trashed blogs");
//         });
//     }
//   }, [status, session]);
//   // Fetch user details
//   useEffect(() => {
//     if (status === "authenticated" && session?.user?.id) {
//       axios
//         .get(`http://localhost:5000/api/user/${session.user.id}`)
//         .then((response) => {
//           setUserDetails(response.data);
//           setEditProfile({
//             username: response.data.username || "",
//             email: response.data.email || "",
//             phone: response.data.phone?.replace(/^\+91/, "") || "",
//             password: "",
//             confirmPassword: "",
//             instagram: response.data.instagram || "",
//             youtube: response.data.youtube || "",
//             facebook: response.data.facebook || "",
//           });
//           if (!response.data.phone) {
//             setShowPhonePrompt(true);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching user details:", error.response?.data || error.message);
//           toast.error("Failed to fetch user details");
//         });
//     }
//   }, [status, session]);
//   // Handle outside click to close sidebar and trash modal
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (
//         showProfileSidebar &&
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target)
//       ) {
//         setShowProfileSidebar(false);
//       }
//       if (
//         showTrashModal &&
//         trashModalRef.current &&
//         !trashModalRef.current.contains(event.target)
//       ) {
//         setShowTrashModal(false);
//       }
//     };
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, [showProfileSidebar, showTrashModal]);
//   // Sort trashed blogs
//   const sortedTrashedBlogs = useMemo(() => {
//     return [...trashedBlogs].sort((a, b) => {
//       if (trashSortBy === "title") {
//         const titleA = a.title?.toLowerCase() || "";
//         const titleB = b.title?.toLowerCase() || "";
//         return trashSortOrder === "asc"
//           ? titleA.localeCompare(titleB)
//           : titleB.localeCompare(titleA);
//       } else if (trashSortBy === "category") {
//         const categoryA = a.category?.toLowerCase() || "";
//         const categoryB = b.category?.toLowerCase() || "";
//         return trashSortOrder === "asc"
//           ? categoryA.localeCompare(categoryB)
//           : categoryB.localeCompare(categoryA);
//       } else {
//         // sortBy === "deletedAt"
//         const dateA = new Date(a.deletedAt).getTime();
//         const dateB = new Date(b.deletedAt).getTime();
//         return trashSortOrder === "asc" ? dateA - dateB : dateB - dateA;
//       }
//     });
//   }, [trashedBlogs, trashSortBy, trashSortOrder]);
//   // Filter blogs by category
//   const filterByCategory = (category) => {
//     setActiveCategory(category);
//     if (category === "All") {
//       setFilteredBlogs(blogs);
//     } else {
//       setFilteredBlogs(blogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase()));
//     }
//   };
//   // Modal controls with animations
//   const openModal = () => {
//     setModalAnimation("fadeIn");
//     setShowModal(true);
//   };
//   const closeModal = () => {
//     setModalAnimation("fadeOut");
//     setTimeout(() => setShowModal(false), 300);
//   };
//   const openLoginModal = () => {
//     setModalAnimation("fadeIn");
//     setShowLoginModal(true);
//   };
//   const closeLoginModal = () => {
//     setModalAnimation("fadeOut");
//     setTimeout(() => setShowLoginModal(false), 300);
//   };
//   const openReportModal = async (blogId) => {
//     if (!session) {
//       toast.warning("Please login first");
//       setShowLoginModal(true);
//       return;
//     }
//     try {
//       const res = await axios.get(`http://localhost:5000/api/blog/${blogId}`);
//       const blog = res.data;
//       const alreadyReported = blog.reports.some((report) => report.userId.toString() === session.user.id);
//       if (alreadyReported) {
//         toast.error("You have already reported this blog");
//         return;
//       }
//       setSelectedBlogId(blogId);
//       setModalAnimation("fadeIn");
//       setShowReportModal(true);
//     } catch (error) {
//       console.error("Error checking report status:", error.response?.data || error.message);
//       toast.error("Failed to check report status");
//     }
//   };
//   const closeReportModal = () => {
//     setModalAnimation("fadeOut");
//     setTimeout(() => {
//       setSelectedBlogId(null);
//       setReportReason("");
//       setShowReportModal(false);
//     }, 300);
//   };
//   const openTrashModal = () => {
//     setModalAnimation("fadeIn");
//     setShowTrashModal(true);
//   };
//   const closeTrashModal = () => {
//     setModalAnimation("fadeOut");
//     setTimeout(() => setShowTrashModal(false), 300);
//   };
//   // Handle signup
//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const formData = {
//       username: e.target.username.value,
//       email: e.target.email.value,
//       phone: `+91${e.target.phone.value}`,
//       password: e.target.password.value,
//     };
//     try {
//       await axios.post("http://localhost:5000/api/signup", formData);
//       toast.success("Signup successful! Please login.");
//       setShowModal(false);
//       setShowLoginModal(true);
//     } catch (error) {
//       console.error("Signup error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to sign up");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // Handle login
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const emailOrphone = e.target.emailOrphone.value;
//     const password = e.target.password.value;
//     try {
//       const res = await signIn("credentials", {
//         redirect: false,
//         emailOrphone: /^\d{10}$/.test(emailOrphone) ? `+91${emailOrphone}` : emailOrphone,
//         password,
//       });
//       if (!res?.error) {
//         closeLoginModal();
//         toast.success("Login successful");
//       } else {
//         toast.error("Login failed: " + res.error);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("An unexpected error occurred during login");
//     }
//   };
//   // Handle like
//   const handleLike = async (blogId) => {
//     if (!session) {
//       toast.warning("Please login first");
//       return;
//     }
//     if (!session.user?.id) {
//       console.error("User ID undefined:", session);
//       toast.error("Session invalid. Please log in again.");
//       return;
//     }
//     try {
//       const res = await axios.post(`http://localhost:5000/api/likeblog/${blogId}`, {
//         userId: session.user.id,
//       });
//       const { blog: updatedBlog, message } = res.data;
//       const updatedBlogs = blogs.map((b) =>
//         b._id === blogId ? { ...b, likes: updatedBlog.likes, dislikes: updatedBlog.dislikes } : b
//       );
//       setBlogs(updatedBlogs);
//       setFilteredBlogs(
//         activeCategory === "All"
//           ? updatedBlogs
//           : updatedBlogs.filter((b) => b.category.toLowerCase() === activeCategory.toLowerCase())
//       );
//       toast.success(message);
//     } catch (error) {
//       console.error("Like error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to like blog");
//     }
//   };
//   // Handle dislike
//   const handleDislike = async (blogId) => {
//     if (!session) {
//       toast.warning("Please login first");
//       return;
//     }
//     if (!session.user?.id) {
//       console.error("User ID undefined:", session);
//       toast.error("Session invalid. Please log in again.");
//       return;
//     }
//     try {
//       const res = await axios.post(`http://localhost:5000/api/dislikeblog/${blogId}`, {
//         userId: session.user.id,
//       });
//       const { blog: updatedBlog, message } = res.data;
//       const updatedBlogs = blogs.map((b) =>
//         b._id === blogId ? { ...b, likes: updatedBlog.likes, dislikes: updatedBlog.dislikes } : b
//       );
//       setBlogs(updatedBlogs);
//       setFilteredBlogs(
//         activeCategory === "All"
//           ? updatedBlogs
//           : updatedBlogs.filter((b) => b.category.toLowerCase() === activeCategory.toLowerCase())
//       );
//       toast.success(message);
//     } catch (error) {
//       console.error("Dislike error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to dislike blog");
//     }
//   };
//   // Handle report
//   const handleReport = async (e) => {
//     e.preventDefault();
//     if (!session || !session.user?.id) {
//       toast.warning("Please login first");
//       closeReportModal();
//       return;
//     }
//     if (!reportReason.trim()) {
//       toast.warning("Please provide a reason for reporting");
//       return;
//     }
//     try {
//       const res = await axios.post(`http://localhost:5000/api/report/${selectedBlogId}`, {
//         userId: session.user.id,
//         reason: reportReason,
//       });
//       const updatedBlogs = blogs.map((blog) =>
//         blog._id === selectedBlogId
//           ? { ...blog, reports: [...(blog.reports || []), { userId: session.user.id, reason: reportReason }] }
//           : blog
//       );
//       setBlogs(updatedBlogs);
//       setFilteredBlogs(
//         activeCategory === "All"
//           ? updatedBlogs
//           : updatedBlogs.filter((b) => b.category.toLowerCase() === activeCategory.toLowerCase())
//       );
//       toast.success("Blog reported successfully");
//       closeReportModal();
//     } catch (error) {
//       console.error("Report error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to report blog");
//     }
//   };
//   // Validate input fields
//   const validateField = (name, value) => {
//     const usernameRegex = /^[A-Za-z0-9\s_-]{3,50}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\d{10}$/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     const instagramRegex = /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/;
//     const youtubeRegex = /^https:\/\/(www\.)?youtube\.com\/(channel\/[A-Za-z0-9_-]+|user\/[A-Za-z0-9_-]+|[A-Za-z0-9_-]+)\/?$/;
//     const facebookRegex = /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9._-]+\/?$/;
//     switch (name) {
//       case "username":
//         return usernameRegex.test(value) ? "" : "Username must be 3-50 characters, letters, numbers, spaces, underscores, or hyphens only";
//       case "email":
//         return emailRegex.test(value) ? "" : "Please enter a valid email address";
//       case "phone":
//         return phoneRegex.test(value) ? "" : "Phone number must be exactly 10 digits";
//       case "password":
//         return !value || passwordRegex.test(value)
//           ? ""
//           : "Password must be at least 8 characters, including one uppercase, one lowercase, one number, and one special character (@$!%*?&)";
//       case "confirmPassword":
//         return value === editProfile.password ? "" : "Passwords do not match";
//       case "instagram":
//         return !value || instagramRegex.test(value) ? "" : "Please enter a valid Instagram URL";
//       case "youtube":
//         return !value || youtubeRegex.test(value) ? "" : "Please enter a valid YouTube URL";
//       case "facebook":
//         return !value || facebookRegex.test(value) ? "" : "Please enter a valid Facebook URL";
//       default:
//         return "";
//     }
//   };
//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditProfile((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
//   };
//   // Handle profile update
//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const newErrors = {
//       username: validateField("username", editProfile.username),
//       email: validateField("email", editProfile.email),
//       phone: validateField("phone", editProfile.phone),
//       password: validateField("password", editProfile.password),
//       confirmPassword: validateField("confirmPassword", editProfile.confirmPassword),
//       instagram: validateField("instagram", editProfile.instagram),
//       youtube: validateField("youtube", editProfile.youtube),
//       facebook: validateField("facebook", editProfile.facebook),
//     };
//     setErrors(newErrors);
//     if (Object.values(newErrors).some((error) => error)) {
//       toast.error("Please fix the errors in the form");
//       setIsLoading(false);
//       return;
//     }
//     if (!session?.user?.id) {
//       console.error("User ID undefined:", session);
//       toast.error("Session invalid. Please log in again.");
//       setIsLoading(false);
//       return;
//     }
//     const payload = {
//       username: editProfile.username,
//       email: editProfile.email,
//       phone: `+91${editProfile.phone}`,
//       instagram: editProfile.instagram || "",
//       youtube: editProfile.youtube || "",
//       facebook: editProfile.facebook || "",
//     };
//     if (editProfile.password) {
//       payload.password = editProfile.password;
//     }
//     try {
//       const res = await axios.put(`http://localhost:5000/api/update/${session.user.id}`, payload);
//       setUserDetails(res.data.user);
//       setEditProfile({
//         username: res.data.user.username || "",
//         email: res.data.user.email || "",
//         phone: res.data.user.phone?.replace(/^\+91/, "") || "",
//         password: "",
//         confirmPassword: "",
//         instagram: res.data.user.instagram || "",
//         youtube: res.data.user.youtube || "",
//         facebook: res.data.user.facebook || "",
//       });
//       setErrors({
//         username: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//         instagram: "",
//         youtube: "",
//         facebook: "",
//       });
//       setShowUpdateForm(false);
//       toast.success(res.data.message || "Profile updated successfully");
//       if (editProfile.password) {
//         await signOut({ redirect: false });
//         setShowLoginModal(true);
//         toast.info("Password updated. Please log in with your new password.");
//       }
//     } catch (error) {
//       console.error("Update error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to update profile");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // Handle phone prompt
//   const handlePhoneSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const phone = `+91${e.target.phone.value}`;
//     if (!session?.user?.id) {
//       console.error("User ID undefined:", session);
//       toast.error("Session invalid. Please log in again.");
//       setIsLoading(false);
//       return;
//     }
//     if (!/^\+91\d{10}$/.test(phone)) {
//       toast.error("Phone number must be exactly 10 digits");
//       setIsLoading(false);
//       return;
//     }
//     try {
//       const res = await axios.put(`http://localhost:5000/api/update/${session.user.id}`, { phone });
//       setUserDetails(res.data.user);
//       setEditProfile((prev) => ({ ...prev, phone: res.data.user.phone?.replace(/^\+91/, "") || "" }));
//       setShowPhonePrompt(false);
//       toast.success("Phone number added successfully");
//     } catch (error) {
//       console.error("Phone update error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to add phone number");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // Handle blog restoration
//   const handleRestoreBlog = async (blogId) => {
//     if (!session || !session.user?.id) {
//       toast.warning("Please login first");
//       return;
//     }
//     try {
//       const res = await axios.put(`http://localhost:5000/api/restore/${blogId}`, {
//         userId: session.user.id,
//       });
//       const restoredBlog = trashedBlogs.find((b) => b._id === blogId);
//       setTrashedBlogs(trashedBlogs.filter((b) => b._id !== blogId));
//       if (restoredBlog) {
//         const updatedBlogs = [...blogs, { ...restoredBlog, deletedAt: null }].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setBlogs(updatedBlogs);
//         setFilteredBlogs(
//           activeCategory === "All"
//             ? updatedBlogs
//             : updatedBlogs.filter((b) => b.category.toLowerCase() === activeCategory.toLowerCase())
//         );
//       }
//       toast.success("Blog restored successfully");
//     } catch (error) {
//       console.error("Restore error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to restore blog");
//     }
//   };
//   // Guard rendering
//   if (status === "loading" || (status === "authenticated" && session?.user?.role === "admin")) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="flex flex-col items-center justify-center">
//           <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-indigo-600" />
//           <p className="mt-4 text-gray-700 font-medium">Loading...</p>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
//       {/* Animated Background */}
//       <div className="absolute inset-0 z-0 opacity-10">
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-300 via-purple-200 to-pink-200"></div>
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
//         <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>
//       {/* Header */}
//       <div className="relative z-10 w-full flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-sm bg-white/70 shadow-sm">
//         <div className="text-4xl font-bold flex gap-3 items-center group">
//           <FaBlog className="text-indigo-600 group-hover:rotate-12 transition-transform duration-300" />
//           <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">blog</span>
//         </div>
//         <div className="flex items-center gap-4">
//           {!session ? (
//             <button
//               onClick={openModal}
//               className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
//             >
//               Get started <ArrowRight size={16} className="ml-1 animate-pulse" />
//             </button>
//           ) : (
//             <button
//               onClick={() => setShowProfileSidebar(!showProfileSidebar)}
//               className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//             >
//               <CgProfile className="text-2xl" />
//             </button>
//           )}
//         </div>
//       </div>
//       {/* Profile Sidebar */}
//       {showProfileSidebar && (
//         <>
//           <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300" />
//           <div
//             ref={sidebarRef}
//             className="fixed right-0 top-0 h-full bg-white rounded-l-2xl shadow-2xl p-8 w-80 z-50 overflow-y-auto no-scrollbar transform transition-transform duration-500 ease-in-out"
//             style={{ animation: "slideInRight 0.4s forwards" }}
//           >
//             <div className="flex flex-col items-center mb-8">
//               <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl mb-4">
//                 {userDetails?.username?.charAt(0).toUpperCase() || <CgProfile />}
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">{userDetails?.username || "User"}</h3>
//               <p className="text-sm text-gray-500">{userDetails?.email || ""}</p>
//             </div>
//             <div className="space-y-4">
//               <button
//                 onClick={() => setShowUpdateForm(true)}
//                 className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//               >
//                 <FiEdit />
//                 Update Profile
//               </button>
//               <button
//                 onClick={() => {
//                   setShowProfileSidebar(false);
//                   openTrashModal();
//                 }}
//                 className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//               >
//                 <MdDelete />
//                 View Trash
//               </button>
//               <button
//                 onClick={() => signOut({ callbackUrl: "/homepage" })}
//                 className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//               >
//                 <FiLogOut />
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//       {/* Hero */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 mt-16 mb-12">
//         <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 text-transparent bg-clip-text">
//           Latest Blogs
//         </h2>
//         <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-[700px] leading-relaxed">
//           Your thoughts deserve the spotlight — let them shine through your blog.
//         </p>
//         <div className="flex flex-wrap gap-3 justify-center mb-12">
//           {["All", "Technology", "Lifestyle", "Education", "Health & Fitness"].map((category) => (
//             <button
//               key={category}
//               onClick={() => filterByCategory(category)}
//               className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 ${
//                 activeCategory === category
//                 ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
//                 : "bg-white/80 text-gray-700 shadow-md hover:bg-white hover:shadow-lg"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={() => (session ? router.push("/homepage/addblog") : openLoginModal())}
//           className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
//         >
//           + Add Blog
//           <ArrowRight size={16} className="ml-1 animate-pulse" />
//         </button>
//       </div>
//       {/* Blog Grid */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 mb-20">
//         {filteredBlogs.length === 0 ? (
//           <div className="bg-white/80 rounded-2xl p-12 text-center shadow-lg backdrop-blur-sm">
//             <h3 className="text-2xl font-bold text-gray-700 mb-4">No blogs available</h3>
//             <p className="text-gray-600">
//               {activeCategory !== "All"
//                 ? `There are no blogs in the ${activeCategory} category yet.`
//                 : "No blogs have been added yet."}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredBlogs.map((blog) => (
//               <div
//                 key={blog._id}
//                 className="bg-white/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
//               >
//                 <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
//                 {blog.thumbnail ? (
//                       <img
//                         src={blog.thumbnail}
//                         alt={blog.title}
//                         className="w-full h-48 object-cover rounded-t-lg mb-4"
//                       />
//                   ) : (
//                     <FaBlog className="text-white text-6xl opacity-30" />
//                   )}
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
//                       {blog.category}
//                     </span>
//                     <span className="text-gray-500 text-xs">
//                       {new Date(blog.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
//                   <p className="text-gray-600 mb-6 line-clamp-3">{blog.content}</p>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-4">
//                       <button
//                         onClick={() => handleLike(blog._id)}
//                         className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors"
//                       >
//                         <BiSolidLike
//                           className={`${
//                             session?.user?.id && blog.likes?.includes(session.user.id)
//                               ? "text-indigo-600"
//                               : ""
//                           }`}
//                         />
//                         <span>{blog.likes?.length || 0}</span>
//                       </button>
//                       <button
//                         onClick={() => handleDislike(blog._id)}
//                         className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors"
//                       >
//                         <BiSolidDislike
//                           className={`${
//                             session?.user?.id && blog.dislikes?.includes(session.user.id)
//                               ? "text-purple-600"
//                               : ""
//                           }`}
//                         />
//                         <span>{blog.dislikes?.length || 0}</span>
//                       </button>
//                     </div>
//                     <button
//                       onClick={() => openReportModal(blog._id)}
//                       className="text-gray-500 hover:text-red-500 transition-colors"
//                     >
//                       <BiSolidFlag />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 px-6 py-3">
//                   <button
//                     onClick={() => router.push(`/homepage/blogdetails/${blog._id}`)}
//                     className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors"
//                   >
//                     Read more <ArrowRight size={14} className="ml-1" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {/* Signup Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div 
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={closeModal}
//           />
//           <div 
//             className={`relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform ${modalAnimation === "fadeIn" ? "animate-fadeIn" : "animate-fadeOut"}`}
//           >
//             <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
//               Sign Up
//             </h2>
//             <form onSubmit={handleSignupSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                   placeholder="Enter your username"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone
//                 </label>
//                 <div className="flex">
//                   <span className="inline-flex items-center px-3 rounded-l-lg bg-gray-100 text-gray-500 text-sm">
//                     +91
//                   </span>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     className="w-full px-4 py-2 rounded-r-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                     placeholder="10-digit phone number"
//                     pattern="[0-9]{10}"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                   placeholder="Enter your password"
//                   required
//                 />
//               </div>
//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
//                 >
//                   {isLoading ? (
//                     <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
//                   ) : (
//                     "Sign Up"
//                   )}
//                 </button>
//               </div>
//             </form>
//             <div className="mt-6 text-center text-sm">
//               <span className="text-gray-600">Already have an account?</span>{" "}
//               <button
//                 onClick={() => {
//                   closeModal();
//                   setTimeout(() => {
//                     openLoginModal();
//                   }, 300);
//                 }}
//                 className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
//               >
//                 Log In
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div 
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={closeLoginModal}
//           />
//           <div 
//             className={`relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform ${modalAnimation === "fadeIn" ? "animate-fadeIn" : "animate-fadeOut"}`}
//           >
//             <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
//               Login
//             </h2>
//             <form onSubmit={handleLoginSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="emailOrphone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email or Phone
//                 </label>
//                 <input
//                   type="text"
//                   id="emailOrphone"
//                   name="emailOrphone"
//                   className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                   placeholder="Enter your email or phone"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                   placeholder="Enter your password"
//                   required
//                 />
//               </div>
//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//                 >
//                   Login
//                 </button>
//               </div>
//             </form>
//             <div className="mt-6 text-center text-sm">
//               <span className="text-gray-600">Don&apos;t have an account?</span>{" "}
//               <button
//                 onClick={() => {
//                   closeLoginModal();
//                   setTimeout(() => {
//                     openModal();
//                   }, 300);
//                 }}
//                 className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Report Modal */}
//       {showReportModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div 
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={closeReportModal}
//           />
//           <div 
//             className={`relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform ${modalAnimation === "fadeIn" ? "animate-fadeIn" : "animate-fadeOut"}`}
//           >
//             <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
//               Report Blog
//             </h2>
//             <form onSubmit={handleReport} className="space-y-4">
//               <div>
//                 <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
//                   Reason for reporting
//                 </label>
//                 <textarea
//                   id="reason"
//                   name="reason"
//                   value={reportReason}
//                   onChange={(e) => setReportReason(e.target.value)}
//                   className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 min-h-[100px]"
//                   placeholder="Why are you reporting this blog?"
//                   required
//                 />
//               </div>
//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//                 >
//                   Submit Report
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {/* Update Profile Form */}
//       {showUpdateForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div 
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={() => setShowUpdateForm(false)}
//           />
//           <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
//             <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
//               Update Profile
//             </h2>
//             <form onSubmit={handleProfileUpdate} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     value={editProfile.username}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                     required
//                   />
//                   {errors.username && (
//                     <p className="mt-1 text-xs text-red-500">{errors.username}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={editProfile.email}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                     required
//                   />
//                   {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone
//                 </label>
//                 <div className="flex">
//                   <span className="inline-flex items-center px-3 rounded-l-lg bg-gray-100 text-gray-500 text-sm">
//                     +91
//                   </span>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={editProfile.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 rounded-r-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                     placeholder="10-digit phone number"
//                     required
//                   />
//                 </div>
//                 {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                     New Password (optional)
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={editProfile.password}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                   />
//                   {errors.password && (
//                     <p className="mt-1 text-xs text-red-500">{errors.password}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="confirmPassword"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Confirm New Password
//                   </label>
//                   <input
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={editProfile.confirmPassword}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                     disabled={!editProfile.password}
//                   />
//                   {errors.confirmPassword && (
//                     <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
//                   )}
//                 </div>
//               </div>
//               <h3 className="text-lg font-medium text-gray-800 pt-2">Social Media (optional)</h3>
//               <div>
//                 <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
//                   Instagram URL
//                 </label>
//                 <input
//                   type="url"
//                   id="instagram"
//                   name="instagram"
//                   value={editProfile.instagram}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                   placeholder="https://instagram.com/yourusername"
//                 />
//                 {errors.instagram && (
//                   <p className="mt-1 text-xs text-red-500">{errors.instagram}</p>
//                 )}
//               </div>
//               <div>
//                 <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-1">
//                   YouTube URL
//                 </label>
//                 <input
//                   type="url"
//                   id="youtube"
//                   name="youtube"
//                   value={editProfile.youtube}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                   placeholder="https://youtube.com/c/yourchannel"
//                 />
//                 {errors.youtube && <p className="mt-1 text-xs text-red-500">{errors.youtube}</p>}
//               </div>
//               <div>
//                 <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
//                   Facebook URL
//                 </label>
//                 <input
//                   type="url"
//                   id="facebook"
//                   name="facebook"
//                   value={editProfile.facebook}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                   placeholder="https://facebook.com/yourpage"
//                 />
//                 {errors.facebook && (
//                   <p className="mt-1 text-xs text-red-500">{errors.facebook}</p>
//                 )}
//               </div>
//               <div className="flex gap-4 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowUpdateForm(false)}
//                   className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
//                 >
//                   {isLoading ? (
//                     <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
//                   ) : (
//                     "Update Profile"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {/* Phone Prompt */}
//       {showPhonePrompt && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
//           <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
//             <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
//               Add Your Phone Number
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Adding your phone number helps secure your account and allows you to recover your account
//               if you forget your password.
//             </p>
//             <form onSubmit={handlePhoneSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <div className="flex">
//                   <span className="inline-flex items-center px-3 rounded-l-lg bg-gray-100 text-gray-500 text-sm">
//                     +91
//                   </span>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     className="w-full px-4 py-2 rounded-r-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
//                     placeholder="10-digit phone number"
//                     pattern="[0-9]{10}"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
//                 >
//                   {isLoading ? (
//                     <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
//                   ) : (
//                     "Submit"
//                   )}
//                 </button>
//               </div>
//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={() => setShowPhonePrompt(false)}
//                   className="text-gray-500 hover:text-gray-700 font-medium"
//                 >
//                   Skip for now
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {/* Trash Modal */}
//       {showTrashModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div 
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={closeTrashModal}
//           />
//           <div 
//             ref={trashModalRef}
//             className={`relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto transform ${modalAnimation === "fadeIn" ? "animate-fadeIn" : "animate-fadeOut"}`}
//           >
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//               <MdDelete className="text-gray-700" />
//               Trash
//             </h2>
//             <div className="mb-6 flex flex-wrap items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
//                   Sort by:
//                 </label>
//                 <select
//                   id="sortBy"
//                   value={trashSortBy}
//                   onChange={(e) => setTrashSortBy(e.target.value)}
//                   className="px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 text-sm"
//                 >
//                   <option value="deletedAt">Deletion Date</option>
//                   <option value="title">Title</option>
//                   <option value="category">Category</option>
//                 </select>
//               </div>
//               <div className="flex items-center gap-2">
//                 <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">
//                   Order:
//                 </label>
//                 <select
//                   id="sortOrder"
//                   value={trashSortOrder}
//                   onChange={(e) => setTrashSortOrder(e.target.value)}
//                   className="px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 text-sm"
//                 >
//                   <option value="desc">Descending</option>
//                   <option value="asc">Ascending</option>
//                 </select>
//               </div>
//             </div>
//             {sortedTrashedBlogs.length === 0 ? (
//               <div className="bg-gray-50 rounded-xl p-8 text-center">
//                 <MdDelete className="text-gray-400 text-5xl mx-auto mb-4" />
//                 <h3 className="text-xl font-medium text-gray-700 mb-2">Trash is empty</h3>
//                 <p className="text-gray-500">When you delete blogs, they will appear here</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {sortedTrashedBlogs.map((blog) => (
//                   <div
//                     key={blog._id}
//                     className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex flex-col md:flex-row justify-between items-start gap-4">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-1">{blog.title}</h3>
//                         <div className="flex flex-wrap gap-2 mb-2">
//                           <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
//                             {blog.category}
//                           </span>
//                           <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
//                             Deleted: {new Date(blog.deletedAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                         <p className="text-gray-600 text-sm line-clamp-2">{blog.content}</p>
//                       </div>
//                       <button
//                         onClick={() => handleRestoreBlog(blog._id)}
//                         className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//                       >
//                         <MdRestore /> Restore
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={closeTrashModal}
//                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Footer */}
//       <footer className="relative z-10 bg-white/80 backdrop-blur-sm shadow-md py-8 mt-auto">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <div className="text-2xl font-bold mb-4 flex justify-center items-center gap-2">
//             <FaBlog className="text-indigo-600" />
//             <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">blog</span>
//           </div>
//           <p className="text-gray-600 mb-6">
//             Share your thoughts and connect with like-minded individuals.
//           </p>
//           <div className="flex justify-center gap-6">
//             <a
//               href="#"
//               className="text-indigo-500 hover:text-indigo-700 transition-colors"
//               aria-label="Twitter"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
//               </svg>
//             </a>
//             <a
//               href="#"
//               className="text-indigo-500 hover:text-indigo-700 transition-colors"
//               aria-label="Facebook"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
//               </svg>
//             </a>
//             <a
//               href="#"
//               className="text-indigo-500 hover:text-indigo-700 transition-colors"
//               aria-label="Instagram"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//               </svg>
//             </a>
//           </div>
//           <div className="mt-6 text-gray-500 text-sm">
//             &copy; {new Date().getFullYear()} Blog. All rights reserved.
//           </div>
//         </div>
//       </footer>
//       {/* CSS for animations */}
//       <style jsx>{`
//         @keyframes slideInRight {
//           from {
//             transform: translateX(100%);
//           }
//           to {
//             transform: translateX(0);
//           }
//         }
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//         .line-clamp-3 {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeOut {
//           from {
//             opacity: 1;
//             transform: translateY(0);
//           }
//           to {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s forwards;
//         }
//         .animate-fadeOut {
//           animation: fadeOut 0.3s forwards;
//         }
//       `}</style>
//     </div>
//   );
// }
// export default Home;
}}),
"[project]/src/app/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$homepage$2f$page$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/homepage/page.js [app-rsc] (ecmascript)");
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$homepage$2f$page$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/app/page.js",
            lineNumber: 5,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Page;
}}),
"[project]/src/app/page.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.js [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=_bf739e54._.js.map