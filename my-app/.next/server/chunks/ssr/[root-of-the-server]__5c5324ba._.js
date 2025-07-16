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
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/src/app/homepage/page.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { FaBlog } from "react-icons/fa6";
// import { ArrowRight } from "lucide-react";
// import axios from "axios";
// import { signIn } from "next-auth/react";
// function Home() {
//   const router = useRouter();
//   const [showModal, setShowModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/allblogs")
//       .then((response) => {
//         const reversedBlogs = (response.data.blogs || []).reverse();
//         setBlogs(reversedBlogs);
//         setFilteredBlogs(reversedBlogs); // Show all by default
//       })
//       .catch((error) => {
//         console.error("Error fetching blogs:", error);
//       });
//   }, []);
//   const filterByCategory = (category) => {
//     setActiveCategory(category);
//     if (category === "All") {
//       setFilteredBlogs(blogs);
//     } else {
//       const filtered = blogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase());
//       setFilteredBlogs(filtered);
//     }
//   };
//   // Modal control
//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);
//   const openLoginModal = () => setShowLoginModal(true);
//   const closeLoginModal = () => setShowLoginModal(false);
//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       username: e.target.username.value,
//       email: e.target.email.value,
//       password: e.target.password.value,
//       phone: e.target.phone.value,
//       instagram: e.target.instagram.value,
//       youtube: e.target.youtube.value,
//       facebook: e.target.facebook.value,
//     };
//     axios
//       .post("http://localhost:5000/api/signup", formData)
//       .then(() => {
//         setShowModal(false);
//         setShowLoginModal(true);
//       })
//       .catch((error) => {
//         console.error("Signup Error:", error);
//       });
//   };
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const emailOrphone = e.target.emailOrphone.value;
//     const password = e.target.password.value;
//     const res = await signIn("credentials", {
//       redirect: false,
//       emailOrphone,
//       password,
//     });
//     if (!res?.error) {
//       closeLoginModal();
//       router.push("/homepage");
//     } else {
//       console.log("Login error:", res.error);
//     }
//   };
//   return (
//     <div className="bg-[#fafafa] min-h-screen">
//       {/* Header */}
//       <div className="w-full flex justify-between items-center px-6 md:px-12 py-4">
//         <div className="text-4xl font-bold flex gap-3">
//           <FaBlog />
//           blog
//         </div>
//         <button
//           onClick={openModal}
//           className="flex items-center gap-2 px-5 py-2 border border-black font-bold text-sm shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] transition"
//         >
//           Get started <ArrowRight size={16} />
//         </button>
//       </div>
//       {/* Hero */}
//       <div className="flex flex-col items-center justify-center text-center px-4 mt-20">
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//           Latest Blogs
//         </h2>
//         <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-[600px]">
//           Your thoughts deserve the spotlight — let them shine through your
//           blog.
//         </p>
//         <div className="flex flex-wrap gap-4 justify-center">
//   <button
//     onClick={() => filterByCategory("All")}
//     className={`px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${
//       activeCategory === "All" ? "bg-black text-white" : "border-black"
//     }`}
//   >
//     All
//   </button>
//   <button
//     onClick={() => filterByCategory("Technology")}
//     className={`px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${
//       activeCategory === "Technology" ? "bg-black text-white" : "border-black"
//     }`}
//   >
//     Technology
//   </button>
//   <button
//     onClick={() => filterByCategory("Lifestyle")}
//     className={`px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${
//       activeCategory === "Lifestyle" ? "bg-black text-white" : "border-black"
//     }`}
//   >
//     Lifestyle
//   </button>
//   <button
//     onClick={() => filterByCategory("Education")}
//     className={`px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${
//       activeCategory === "Education" ? "bg-black text-white" : "border-black"
//     }`}
//   >
//     Education
//   </button>
//   <button
//     onClick={() => filterByCategory("Health & Fitness")}
//     className={`px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${
//       activeCategory === "Health & Fitness" ? "bg-black text-white" : "border-black"
//     }`}
//   >
//     Health & Fitness
//   </button>
// </div>
//         <div className="mt-8 mb-12">
//           <button
//             onClick={() => router.push("/homepage/addblog")}
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
//               <h3 className="text-lg font-bold text-white mb-3 px-2 bg-black inline-block">{blog.category}</h3>
//               <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
//               <p className="text-sm text-gray-700 mb-2">{blog.description}</p>
//               <p className="text-xs text-gray-500">
//                 By {blog.author?.username || "Unknown Author"}
//               </p>
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
//           <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-2xl font-bold mb-4 text-center">
//               Create your account
//             </h2>
//             <form className="space-y-4" onSubmit={handleSignupSubmit}>
//               <input type="text" placeholder="Username" name="username" className="w-full border p-2 rounded" />
//               <input type="email" placeholder="Email" name="email" className="w-full border p-2 rounded" />
//               <input type="password" placeholder="Password" name="password" className="w-full border p-2 rounded" />
//               <input type="tel" placeholder="Phone Number" name="phone" className="w-full border p-2 rounded" />
//               <input type="text" placeholder="Instagram Link" name="instagram" className="w-full border p-2 rounded" />
//               <input type="text" placeholder="YouTube Link" name="youtube" className="w-full border p-2 rounded" />
//               <input type="text" placeholder="Facebook Link" name="facebook" className="w-full border p-2 rounded" />
//               <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
//                 Sign Up
//               </button>
//               <p className="text-sm text-center">
//                 Already have an account?{" "}
//                 <span className="underline cursor-pointer" onClick={() => { closeModal(); openLoginModal(); }}>
//                   Login
//                 </span>
//               </p>
//             </form>
//             <button onClick={closeModal} className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black transition">×</button>
//           </div>
//         </div>
//       )}
//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-2xl font-bold mb-4 text-center">Login to your account</h2>
//             <form className="space-y-4" onSubmit={handleLoginSubmit}>
//               <input type="text" placeholder="Email or Phone Number" name="emailOrphone" className="w-full border p-2 rounded" />
//               <input type="password" placeholder="Password" name="password" className="w-full border p-2 rounded" />
//               <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
//                 Login
//               </button>
//             </form>
//             <button onClick={closeLoginModal} className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black transition">×</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Home;
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa6/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-rsc] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
function Home() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showLoginModal, setShowLoginModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [blogs, setBlogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredBlogs, setFilteredBlogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("All");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get("http://localhost:5000/api/allblogs").then((response)=>{
            const reversedBlogs = (response.data.blogs || []).reverse();
            setBlogs(reversedBlogs);
            setFilteredBlogs(reversedBlogs); // Show all by default
        }).catch((error)=>{
            console.error("Error fetching blogs:", error);
        });
    }, []);
    const filterByCategory = (category)=>{
        setActiveCategory(category);
        if (category === "All") {
            setFilteredBlogs(blogs);
        } else {
            const filtered = blogs.filter((blog)=>blog.category.toLowerCase() === category.toLowerCase());
            setFilteredBlogs(filtered);
        }
    };
    // Modal control
    const openModal = ()=>setShowModal(true);
    const closeModal = ()=>setShowModal(false);
    const openLoginModal = ()=>setShowLoginModal(true);
    const closeLoginModal = ()=>setShowLoginModal(false);
    const handleSignupSubmit = (e)=>{
        e.preventDefault();
        const formData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            phone: e.target.phone.value,
            instagram: e.target.instagram.value,
            youtube: e.target.youtube.value,
            facebook: e.target.facebook.value
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].post("http://localhost:5000/api/signup", formData).then(()=>{
            setShowModal(false);
            setShowLoginModal(true);
        }).catch((error)=>{
            console.error("Signup Error:", error);
        });
    };
    const handleLoginSubmit = async (e)=>{
        e.preventDefault();
        const emailOrphone = e.target.emailOrphone.value;
        const password = e.target.password.value;
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signIn"])("credentials", {
            redirect: false,
            emailOrphone,
            password
        });
        if (!res?.error) {
            closeLoginModal();
            router.push("/homepage");
        } else {
            console.log("Login error:", res.error);
        }
    };
    const LikeButton = ({ blogId, initialLikes })=>{
        const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useSession"])();
        const userId = session?.user?.id;
        const [likes, setLikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(initialLikes || 0);
        const [liked, setLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
        const handleLike = async ()=>{
            if (!userId || liked) return;
            try {
                const res = await fetch(`/api/blogs/like/${blogId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId
                    })
                });
                const data = await res.json();
                if (res.ok) {
                    setLikes(data.totalLikes);
                    setLiked(true);
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.error("Error liking blog", err);
            }
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleLike,
            className: `px-4 py-2 rounded border ${liked ? "bg-black text-white" : "bg-white text-black"}`,
            children: [
                "❤️ Like (",
                likes,
                ")"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/homepage/page.js",
            lineNumber: 373,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#fafafa] min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex justify-between items-center px-6 md:px-12 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-4xl font-bold flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FaBlog"], {}, void 0, false, {
                                fileName: "[project]/src/app/homepage/page.js",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this),
                            "blog"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/homepage/page.js",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: openModal,
                        className: "flex items-center gap-2 px-5 py-2 border border-black font-bold text-sm shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] transition",
                        children: [
                            "Get started ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/app/homepage/page.js",
                                lineNumber: 394,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/homepage/page.js",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/homepage/page.js",
                lineNumber: 385,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center text-center px-4 mt-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
                        children: "Latest Blogs"
                    }, void 0, false, {
                        fileName: "[project]/src/app/homepage/page.js",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg md:text-xl text-gray-700 mb-8 max-w-[600px]",
                        children: "Your thoughts deserve the spotlight — let them shine through your blog."
                    }, void 0, false, {
                        fileName: "[project]/src/app/homepage/page.js",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4 justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>filterByCategory("All"),
                            className: `px-6 py-2 border font-bold text-sm shadow-[4px_4px_0_#000] transition ${activeCategory === "All" ? "bg-black text-white" : "border-black"}`,
                            children: "All"
                        }, void 0, false, {
                            fileName: "[project]/src/app/homepage/page.js",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/homepage/page.js",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 mb-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push("/homepage/addblog"),
                            className: "px-6 py-2 bg-black text-white font-bold rounded shadow-xl hover:bg-gray-800 transition",
                            children: "+ Add Blog"
                        }, void 0, false, {
                            fileName: "[project]/src/app/homepage/page.js",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/homepage/page.js",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/homepage/page.js",
                lineNumber: 399,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto px-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 pb-12",
                children: filteredBlogs.length > 0 ? filteredBlogs.map((blog)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border p-5 rounded-lg shadow-md hover:shadow-xl transition",
                        children: [
                            blog.thumbnail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: blog.thumbnail,
                                alt: blog.title,
                                className: "w-full h-48 object-cover rounded-t-lg mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/homepage/page.js",
                                lineNumber: 438,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-white mb-3 px-2 bg-black inline-block",
                                children: blog.category
                            }, void 0, false, {
                                fileName: "[project]/src/app/homepage/page.js",
                                lineNumber: 444,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold mb-2",
                                children: blog.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/homepage/page.js",
                                lineNumber: 445,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-700 mb-2",
                                children: blog.description
                            }, void 0, false, {
                                fileName: "[project]/src/app/homepage/page.js",
                                lineNumber: 446,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: [
                                    "By ",
                                    blog.author?.username || "Unknown Author"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/homepage/page.js",
                                lineNumber: 447,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(LikeButton, {
                                blogId: blog._id,
                                initialLikes: blog.likes
                            }, void 0, false, {
                                fileName: "[project]/src/app/homepage/page.js",
                                lineNumber: 450,
                                columnNumber: 15
                            }, this)
                        ]
                    }, blog._id, true, {
                        fileName: "[project]/src/app/homepage/page.js",
                        lineNumber: 433,
                        columnNumber: 13
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center col-span-full text-gray-600",
                    children: "No blogs found in this category."
                }, void 0, false, {
                    fileName: "[project]/src/app/homepage/page.js",
                    lineNumber: 454,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/homepage/page.js",
                lineNumber: 430,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/homepage/page.js",
        lineNumber: 383,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Home;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__5c5324ba._.js.map