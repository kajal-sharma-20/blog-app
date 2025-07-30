"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaBlog } from "react-icons/fa6";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { BiSolidLike, BiSolidDislike, BiSolidFlag } from "react-icons/bi";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import LoginModal from "../components/LoginModal.js";
import SignupModal from "../components/SignupModal.js";
import ProfileSidebar from "../components/ProfileSidebar.js";
import UpdateProfileForm from "../components/UpdateProfileForm.js";
import TrashModal from "../components/TrashModal.js";
import ReportModal from "../components/ReportModal.js";
import { LuInstagram } from "react-icons/lu";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";

function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // State management
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [trashedBlogs, setTrashedBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editProfile, setEditProfile] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    instagram: "",
    youtube: "",
    facebook: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    instagram: "",
    youtube: "",
    facebook: "",
  });
  const [trashSortBy, setTrashSortBy] = useState("deletedAt");
  const [trashSortOrder, setTrashSortOrder] = useState("desc");
  const [modalAnimation, setModalAnimation] = useState("");

  // Fetch blogs
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/allblogs`)
      .then((response) => {
        const reversedBlogs = (response.data.blogs || []).reverse();
        setBlogs(reversedBlogs);
        setFilteredBlogs(reversedBlogs);
      })
      .catch((error) => {
        console.error(
          "Error fetching blogs:",
          error.response?.data || error.message
        );
        toast.error("Failed to fetch blogs");
      });
  }, []);

  // Fetch trashed blogs
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trash/${session.user.id}`)
        .then((response) => {
          setTrashedBlogs(response.data.blogs || []);
        })
        .catch((error) => {
          console.error(
            "Error fetching trashed blogs:",
            error.response?.data || error.message
          );
          toast.error("Failed to fetch trashed blogs");
        });
    }
  }, [status, session]);

  // Fetch user details
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${session.user.id}`)
        .then((response) => {
          setUserDetails(response.data);
          setEditProfile({
            username: response.data.username || "",
            email: response.data.email || "",
            phone: response.data.phone?.replace(/^\+91/, "") || "",
            password: "",
            confirmPassword: "",
            instagram: response.data.instagram || "",
            youtube: response.data.youtube || "",
            facebook: response.data.facebook || "",
          });
        })
        .catch((error) => {
          console.error(
            "Error fetching user details:",
            error.response?.data || error.message
          );
          toast.error("Failed to fetch user details");
        });
    }
  }, [status, session]);

  // Redirect admins to /admindashboard
  useEffect(() => {
    console.log("Session:", session); // Debug log
    if (status === "authenticated" && session?.user?.role === "admin") {
      setTimeout(() => router.push("/admindashboard"), 100); // Add delay
    }
  }, [status, session, router]);

  // Sort trashed blogs
  const sortedTrashedBlogs = useMemo(() => {
    return [...trashedBlogs].sort((a, b) => {
      if (trashSortBy === "title") {
        const titleA = a.title?.toLowerCase() || "";
        const titleB = b.title?.toLowerCase() || "";
        return trashSortOrder === "asc"
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      } else if (trashSortBy === "category") {
        const categoryA = a.category?.toLowerCase() || "";
        const categoryB = b.category?.toLowerCase() || "";
        return trashSortOrder === "asc"
          ? categoryA.localeCompare(categoryB)
          : categoryB.localeCompare(categoryA);
      } else {
        const dateA = new Date(a.deletedAt).getTime();
        const dateB = new Date(b.deletedAt).getTime();
        return trashSortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
    });
  }, [trashedBlogs, trashSortBy, trashSortOrder]);

  // Filter blogs by category
  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter(
          (blog) => blog.category.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  // Modal controls with animations
  const openModal = () => {
    setModalAnimation("fadeIn");
    setShowModal(true);
  };

  const closeModal = () => {
    setModalAnimation("fadeOut");
    setTimeout(() => setShowModal(false), 300);
  };

  const openLoginModal = () => {
    setModalAnimation("fadeIn");
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setModalAnimation("fadeOut");
    setTimeout(() => setShowLoginModal(false), 300);
  };

  const openReportModal = async (blogId) => {
    if (!session) {
      openLoginModal();
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${blogId}`
      );
      const blog = res.data;
      const alreadyReported = blog.reports.some(
        (report) => report.userId.toString() === session.user.id
      );
      if (alreadyReported) {
        toast.error("You have already reported this blog");
        return;
      }
      setSelectedBlogId(blogId);
      setModalAnimation("fadeIn");
      setShowReportModal(true);
    } catch (error) {
      console.error(
        "Error checking report status:",
        error.response?.data || error.message
      );
      toast.error("Failed to check report status");
    }
  };

  const closeReportModal = () => {
    setModalAnimation("fadeOut");
    setTimeout(() => {
      setSelectedBlogId(null);
      setReportReason("");
      setShowReportModal(false);
    }, 300);
  };

  const openTrashModal = () => {
    setModalAnimation("fadeIn");
    setShowTrashModal(true);
  };

  const closeTrashModal = () => {
    setModalAnimation("fadeOut");
    setTimeout(() => setShowTrashModal(false), 300);
  };

  // Handle signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      phone: `+91${e.target.phone.value}`,
      password: e.target.password.value,
    };
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`,
        formData
      );
      toast.success("Signup successful! Please login.");
      setShowModal(false);
      setShowLoginModal(true);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const emailOrphone = e.target.emailOrphone.value;
    const password = e.target.password.value;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        emailOrphone: /^\d{10}$/.test(emailOrphone)
          ? `+91${emailOrphone}`
          : emailOrphone,
        password,
      });
      console.log("signIn response:", res); // Debug
      if (!res?.error) {
        closeLoginModal();
        toast.success("Login successful");
      } else {
        toast.error("Login failed: " + res.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred during login");
    }
  };

  // Handle like
  const handleLike = async (blogId) => {
    if (!session) {
      openLoginModal();
      return;
    }
    if (!session.user?.id) {
      console.error("User ID undefined:", session);
      toast.error("Session invalid. Please log in again.");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/likeblog/${blogId}`,
        {
          userId: session.user.id,
        }
      );
      const { blog: updatedBlog } = res.data;
      const updatedBlogs = blogs.map((b) =>
        b._id === blogId
          ? { ...b, likes: updatedBlog.likes, dislikes: updatedBlog.dislikes }
          : b
      );
      setBlogs(updatedBlogs);
      setFilteredBlogs(
        activeCategory === "All"
          ? updatedBlogs
          : updatedBlogs.filter(
              (b) => b.category.toLowerCase() === activeCategory.toLowerCase()
            )
      );
    } catch (error) {
      console.error("Like error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to like blog");
    }
  };

  // Handle dislike
  const handleDislike = async (blogId) => {
    if (!session) {
      openLoginModal();
      return;
    }
    if (!session.user?.id) {
      console.error("User ID undefined:", session);
      toast.error("Session invalid. Please log in again.");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dislikeblog/${blogId}`,
        {
          userId: session.user.id,
        }
      );
      const { blog: updatedBlog } = res.data;
      const updatedBlogs = blogs.map((b) =>
        b._id === blogId
          ? { ...b, likes: updatedBlog.likes, dislikes: updatedBlog.dislikes }
          : b
      );
      setBlogs(updatedBlogs);
      setFilteredBlogs(
        activeCategory === "All"
          ? updatedBlogs
          : updatedBlogs.filter(
              (b) => b.category.toLowerCase() === activeCategory.toLowerCase()
            )
      );
    } catch (error) {
      console.error("Dislike error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to dislike blog");
    }
  };

  // Handle report
  const handleReport = async (e) => {
    e.preventDefault();
    if (!session || !session.user?.id) {
      openLoginModal();
      closeReportModal();
      return;
    }
    if (!reportReason.trim()) {
      toast.warning("Please provide a reason for reporting");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/report/${selectedBlogId}`,
        {
          userId: session.user.id,
          reason: reportReason,
        }
      );
      const updatedBlogs = blogs.map((blog) =>
        blog._id === selectedBlogId
          ? {
              ...blog,
              reports: [
                ...(blog.reports || []),
                { userId: session.user.id, reason: reportReason },
              ],
            }
          : blog
      );
      setBlogs(updatedBlogs);
      setFilteredBlogs(
        activeCategory === "All"
          ? updatedBlogs
          : updatedBlogs.filter(
              (b) => b.category.toLowerCase() === activeCategory.toLowerCase()
            )
      );
      toast.success("Blog reported successfully");
      closeReportModal();
    } catch (error) {
      console.error("Report error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to report blog");
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {
      username: validateField("username", editProfile.username),
      email: validateField("email", editProfile.email),
      phone: validateField("phone", editProfile.phone),
      password: validateField("password", editProfile.password),
      confirmPassword: validateField(
        "confirmPassword",
        editProfile.confirmPassword
      ),
      instagram: validateField("instagram", editProfile.instagram),
      youtube: validateField("youtube", editProfile.youtube),
      facebook: validateField("facebook", editProfile.facebook),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Please fix the errors in the form");
      setIsLoading(false);
      return;
    }

    if (!session?.user?.id) {
      console.error("User ID undefined:", session);
      toast.error("Session invalid. Please log in again.");
      setIsLoading(false);
      return;
    }

    const payload = {
      username: editProfile.username,
      email: editProfile.email,
      phone: editProfile.phone ? `+91${editProfile.phone}` : "",
      instagram: editProfile.instagram || "",
      youtube: editProfile.youtube || "",
      facebook: editProfile.facebook || "",
    };
    if (editProfile.password) {
      payload.password = editProfile.password;
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/update/${session.user.id}`,
        payload
      );
      setUserDetails(res.data.user);
      setEditProfile({
        username: res.data.user.username || "",
        email: res.data.user.email || "",
        phone: res.data.user.phone?.replace(/^\+91/, "") || "",
        password: "",
        confirmPassword: "",
        instagram: res.data.user.instagram || "",
        youtube: res.data.user.youtube || "",
        facebook: res.data.user.facebook || "",
      });
      setErrors({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        instagram: "",
        youtube: "",
        facebook: "",
      });

      setShowUpdateForm(false);
      toast.success(res.data.message || "Profile updated successfully");

      if (editProfile.password) {
        await signOut({ redirect: false });
        setShowLoginModal(true);
        toast.info("Password updated. Please log in with your new password.");
      }
    } catch (error) {
      console.error("Update error:", {
        message: error.message,
        response: error.response,
        data: error.response?.data,
      });
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle blog restoration
  const handleRestoreBlog = async (blogId) => {
    if (!session || !session.user?.id) {
      openLoginModal();
      return;
    }
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/restore/${blogId}`,
        {
          userId: session.user.id,
        }
      );
      const restoredBlog = trashedBlogs.find((b) => b._id === blogId);
      setTrashedBlogs(trashedBlogs.filter((b) => b._id !== blogId));
      if (restoredBlog) {
        const updatedBlogs = [
          ...blogs,
          { ...restoredBlog, deletedAt: null },
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(updatedBlogs);
        setFilteredBlogs(
          activeCategory === "All"
            ? updatedBlogs
            : updatedBlogs.filter(
                (b) => b.category.toLowerCase() === activeCategory.toLowerCase()
              )
        );
      }
      toast.success("Blog restored successfully");
    } catch (error) {
      console.error("Restore error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to restore blog");
    }
  };

  // Validate input fields
  const validateField = (name, value) => {
    const usernameRegex = /^[A-Za-z0-9\s_-]{3,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const instagramRegex =
      /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/;
    const youtubeRegex =
      /^https:\/\/(www\.)?youtube\.com\/(channel\/[A-Za-z0-9_-]+|user\/[A-Za-z0-9_-]+|[A-Za-z0-9_-]+)\/?$/;
    const facebookRegex =
      /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9._-]+\/?$/;

    switch (name) {
      case "username":
        return usernameRegex.test(value)
          ? ""
          : "Username must be 3-50 characters, letters, numbers, spaces, underscores, or hyphens only";
      case "email":
        return emailRegex.test(value)
          ? ""
          : "Please enter a valid email address";
      case "phone":
        return !value || phoneRegex.test(value)
          ? ""
          : "Phone number must be exactly 10 digits";
      case "password":
        return !value || passwordRegex.test(value)
          ? ""
          : "Password must be at least 8 characters, including one uppercase, one lowercase, one number, and one special character (@$!%*?&)";
      case "confirmPassword":
        return value === editProfile.password ? "" : "Passwords do not match";
      case "instagram":
        return !value || instagramRegex.test(value)
          ? ""
          : "Please enter a valid Instagram URL";
      case "youtube":
        return !value || youtubeRegex.test(value)
          ? ""
          : "Please enter a valid YouTube URL";
      case "facebook":
        return !value || facebookRegex.test(value)
          ? ""
          : "Please enter a valid Facebook URL";
      default:
        return "";
    }
  };

  // Guard rendering
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex flex-col items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-indigo-600" />
          <p className="mt-4 text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-sm bg-white/70 shadow-sm">
        <div className="text-4xl font-bold flex gap-3 items-center group">
          <FaBlog className="text-indigo-600 group-hover:rotate-12 transition-transform duration-300" />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            BlogVerse
          </span>
        </div>
        <div className="flex items-center gap-4">
          {!session ? (
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get started{" "}
              <ArrowRight size={16} className="ml-1 animate-pulse" />
            </button>
          ) : (
            <button
              onClick={() => setShowProfileSidebar(!showProfileSidebar)}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <CgProfile className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      {/* Modals and Sidebar */}
      <SignupModal
        showModal={showModal}
        modalAnimation={modalAnimation}
        closeModal={closeModal}
        handleSignupSubmit={handleSignupSubmit}
        openLoginModal={openLoginModal}
        isLoading={isLoading}
      />
      <LoginModal
        showLoginModal={showLoginModal}
        modalAnimation={modalAnimation}
        closeLoginModal={closeLoginModal}
        handleLoginSubmit={handleLoginSubmit}
        openModal={openModal}
      />
      <ProfileSidebar
        showProfileSidebar={showProfileSidebar}
        setShowProfileSidebar={setShowProfileSidebar}
        userDetails={userDetails}
        setShowUpdateForm={setShowUpdateForm}
        openTrashModal={openTrashModal}
        signOut={() => signOut({ callbackUrl: "/homepage" })}
      />
      <UpdateProfileForm
        showUpdateForm={showUpdateForm}
        setShowUpdateForm={setShowUpdateForm}
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        errors={errors}
        setErrors={setErrors}
        handleProfileUpdate={handleProfileUpdate}
        validateField={validateField}
        isLoading={isLoading}
        session={session}
        setShowLoginModal={setShowLoginModal}
      />
      <TrashModal
        showTrashModal={showTrashModal}
        modalAnimation={modalAnimation}
        closeTrashModal={closeTrashModal}
        sortedTrashedBlogs={sortedTrashedBlogs}
        trashSortBy={trashSortBy}
        setTrashSortBy={setTrashSortBy}
        trashSortOrder={trashSortOrder}
        setTrashSortOrder={setTrashSortOrder}
        handleRestoreBlog={handleRestoreBlog}
        session={session}
        openLoginModal={openLoginModal}
      />
      <ReportModal
        showReportModal={showReportModal}
        modalAnimation={modalAnimation}
        closeReportModal={closeReportModal}
        handleReport={handleReport}
        reportReason={reportReason}
        setReportReason={setReportReason}
        session={session}
        openLoginModal={openLoginModal}
      />

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-16 mb-12">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 text-transparent bg-clip-text">
          Latest Blogs
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-[700px] leading-relaxed">
          Your thoughts deserve the spotlight — let them shine through your
          blog.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => filterByCategory("All")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 ${
              activeCategory === "All"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white/80 text-gray-700 shadow-md hover:bg-white hover:shadow-lg"
            }`}
          >
            All
          </button>
          <button
            onClick={() => filterByCategory("Technology")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 ${
              activeCategory === "Technology"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white/80 text-gray-700 shadow-md hover:bg-white hover:shadow-lg"
            }`}
          >
            Technology
          </button>
          <button
            onClick={() => filterByCategory("Lifestyle")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 ${
              activeCategory === "Lifestyle"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white/80 text-gray-700 shadow-md hover:bg-white hover:shadow-lg"
            }`}
          >
            Lifestyle
          </button>
          <button
            onClick={() => filterByCategory("Education")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 ${
              activeCategory === "Lifestyle"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white/80 text-gray-700 shadow-md hover:bg-white hover:shadow-lg"
            }`}
          >
            Education
          </button>
          <button
            onClick={() => filterByCategory("Health & Fitness")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 ${
              activeCategory === "Health & Fitness"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white/80 text-gray-700 shadow-md hover:bg-white hover:shadow-lg"
            }`}
          >
            Health & Fitness
          </button>
        </div>
        <button
          onClick={() =>
            session ? router.push("/homepage/addblog") : openLoginModal()
          }
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
        >
          + Add Blog
          <ArrowRight size={16} className="ml-1 animate-pulse" />
        </button>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        {filteredBlogs.length === 0 ? (
          <div className="bg-white/80 rounded-2xl p-12 text-center shadow-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              No blogs available
            </h3>
            <p className="text-gray-600">
              {activeCategory !== "All"
                ? `There are no blogs in the ${activeCategory} category yet.`
                : "No blogs have been added yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => router.push(`/homepage/${blog._id}`)}
                className="bg-white/80 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm cursor-pointer flex flex-col"
              >
                <div className="h-36 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  {blog.thumbnail ? (
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-36 object-cover rounded-t-xl"
                    />
                  ) : (
                    <FaBlog className="text-white text-4xl opacity-30" />
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {blog.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {blog.description
                      ? blog.description.split(" ").slice(0, 15).join(" ") +
                        (blog.description.split(" ").length > 15 ? "..." : "")
                      : "No description available"}
                    <span className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors ml-1">
                      Read more
                    </span>
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(blog._id);
                        }}
                        className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        <BiSolidLike
                          className={`${
                            session?.user?.id &&
                            blog.likes?.includes(session.user.id)
                              ? "text-indigo-600"
                              : ""
                          }`}
                        />
                        <span>{blog.likes?.length || 0}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDislike(blog._id);
                        }}
                        className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        <BiSolidDislike
                          className={`${
                            session?.user?.id &&
                            blog.dislikes?.includes(session.user.id)
                              ? "text-purple-600"
                              : ""
                          }`}
                        />
                        <span>{blog.dislikes?.length || 0}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openReportModal(blog._id);
                        }}
                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <BiSolidFlag />
                        <span>{blog.reports?.length || 0}</span>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-gray-500 text-sm">
                    By {blog.author?.username || "Unknown"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm shadow-md py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4 flex justify-center items-center gap-2">
            <FaBlog className="text-indigo-600" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              BlogVerse
            </span>
          </div>
          <p className="text-gray-600 mb-6">
            Share your thoughts and connect with like-minded individuals.
          </p>
          <div className="flex justify-center gap-6">
            <button className="p-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm">
              <IoLogoYoutube className="text-red-600" />
              <span>YouTube</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm">
              <FaFacebook className="text-blue-600" />
              <span>Facebook</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm">
              <LuInstagram className="text-pink-600" />
              <span>Instagram</span>
            </button>
          </div>
          <div className="mt-6 text-gray-500 text-sm">
            © {new Date().getFullYear()} Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
