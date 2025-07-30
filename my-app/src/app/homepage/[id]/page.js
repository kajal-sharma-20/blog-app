"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LuInstagram } from "react-icons/lu";
import { FaFacebook, FaBlog, FaEdit, FaTrash, FaArrowLeft} from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

function BlogDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [blog, setBlog] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Animation states
  const [contentVisible, setContentVisible] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  const toggleBookmark = () => setIsBookmarked(!isBookmarked);
  const toggleShareMenu = () => setShowShareMenu(!showShareMenu);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${id}`)
        .then((response) => {
          setBlog(response.data);
          console.log("Session and Blog Data:", {
            userId: session?.user?.id,
            status,
            authorId: response.data?.author?._id,
          });
          
          // Add a slight delay before showing content to allow for animations
          setTimeout(() => {
            setContentVisible(true);
          }, 100);
        })
        .catch((error) => {
          console.error("Error fetching blog details:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
          });
          toast.error("Failed to load blog");
        });
    }
  }, [id, session]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const emailOrphone = e.target.emailOrphone.value;
    const password = e.target.password.value;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        emailOrphone,
        password,
      });

      if (!res?.error) {
        closeLoginModal();
      } else {
        console.error("Login error:", res.error);
        toast.error("Login failed: " + res.error);
      }
    } catch (error) {
      console.error("Login attempt error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      toast.error("An unexpected error occurred during login");
    }
  };

  const handleDelete = async () => {
    if (!session) {
      toast.warning("Please login first");
      openLoginModal();
      return;
    }

    if (!blog?.author?._id || session.user.id !== blog.author._id) {
      toast.error("You are not authorized to delete this blog");
      return;
    }

    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${id}`, {
        data: { userId: session.user.id },
      });

      toast.success("Blog deleted successfully");
      router.push("/homepage");
    } catch (error) {
      console.error("Delete blog error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      const errorMessage = error.response?.data?.message || "Failed to delete blog";
      toast.error(errorMessage);
    }
  };

  if (status === "loading" || !blog) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="w-16 h-16 relative">
          <div className="w-16 h-16 rounded-full border-4 border-t-pink-500 border-r-blue-500 border-b-pink-500 border-l-blue-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaBlog className="text-gray-400 text-lg animate-pulse" />
          </div>
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">Loading amazing content...</p>
      </div>
    );
  }

  const { title, description, content, author, thumbnail } = blog;

  // Format date - assuming you'd have a createdAt field
  const formattedDate = blog.createdAt 
    ? new Date(blog.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'Recently published';

  // Calculate estimated reading time - about 200 words per minute
  const wordCount = content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="bg-white min-h-screen relative">
      {/* Header - Fixed navigation */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white shadow-md py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.push("/homepage")}
              className={`flex items-center gap-2 font-semibold transition-all duration-300 ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              <FaArrowLeft className="text-sm" />
              <span className="text-sm">Back to Blogs</span>
            </button>
          </div>
          
          <div className={`text-xl font-bold flex items-center gap-2 ${
            isScrolled ? "text-gray-800" : "text-white"
          }`}>
            <FaBlog />
            <span>Blogger</span>
          </div>
          
          <div className="flex items-center gap-3">
            {session?.user?.id && blog?.author?._id && session.user.id === blog.author._id && (
              <div className="flex items-center gap-2 animate-fadeIn">
                <button
                  onClick={() => router.push(`/homepage/update/${blog._id}`)}
                  className="relative overflow-hidden px-4 py-2 rounded-full flex items-center gap-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <FaEdit />
                  <span>Edit</span>
                  <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                </button>
                <button
                  onClick={handleDelete}
                  className="relative overflow-hidden px-4 py-2 rounded-full flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <FaTrash />
                  <span>Delete</span>
                  <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Full-width cover image or gradient */}
        <div className="w-full h-[60vh] bg-gradient-to-r from-pink-500 to-blue-500 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
            <div className="absolute top-20 right-20 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-white opacity-5 rounded-full"></div>
            <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-white opacity-10 rounded-full"></div>
          </div>
          
          {/* Content over the background */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto animate-fadeUp">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                {title}
              </h1>
              <div className="flex items-center justify-center gap-2 text-white/80 text-sm mb-6">
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  {author?.username?.[0]?.toUpperCase() || 'A'}
                </div>
                <div>
                  <p className="text-white font-medium text-left">
                    {author?.username || "Unknown Author"}
                  </p>
                  <p className="text-white/70 text-xs text-left">
                    Author
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className={`max-w-3xl mx-auto px-4 -mt-20 relative z-10 transition-all duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Floating thumbnail if available */}
        {thumbnail && (
          <div className="w-full h-72 mb-10 rounded-xl overflow-hidden shadow-2xl animate-fadeUp" style={{animationDelay: "0.3s"}}>
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}
        
        {/* Blog description */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 animate-fadeUp" style={{animationDelay: "0.4s"}}>
          <p className="text-xl text-gray-700 leading-relaxed font-light">{description}</p>
        </div>
        
       
      </section>
      
      {/* Author section */}
      <section className="max-w-3xl mx-auto px-4 mb-16 animate-fadeUp" style={{animationDelay: "0.7s"}}>
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            About the Author
          </h3>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
              {author?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-800">
                {author?.username || "Unknown Author"}
              </h4>
              <p className="text-gray-600 mb-4">
                {author?.bio || "This author hasn't added a bio yet."}
              </p>
              
              <div className="flex gap-3">
                {author?.youtube && (
                  <a 
                    href={author.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <IoLogoYoutube className="text-red-500 text-xl" />
                  </a>
                )}
                {author?.instagram && (
                  <a 
                    href={author.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <LuInstagram className="text-pink-600 text-xl" />
                  </a>
                )}
                {author?.facebook && (
                  <a 
                    href={author.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <FaFacebook className="text-blue-600 text-xl" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold flex items-center gap-2">
              <FaBlog />
              <span>Blogger</span>
            </div>
            
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Blogger. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-md animate-scaleIn">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500"></div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Login to Your Account
            </h2>
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="Email or Phone Number"
                name="emailOrphone"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <button
                type="submit"
                className="w-full relative overflow-hidden py-3 rounded-lg font-semibold text-white group transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-blue-500 group-hover:from-pink-600 group-hover:to-blue-600 transition-all duration-300"></span>
                <span className="relative">Login</span>
              </button>
            </form>
            <button
              onClick={closeLoginModal}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600 transition"
            >
              ×
            </button>
          </div>
        </div>
      )}

      </div>
  );
}

export default BlogDetail;
