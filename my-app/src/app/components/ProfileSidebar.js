"use client";
import { CgProfile } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { LuInstagram } from "react-icons/lu";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";

export default function ProfileSidebar({
  showProfileSidebar,
  setShowProfileSidebar,
  userDetails,
  setShowUpdateForm,
  openTrashModal,
  signOut,
}) {
  return (
    <>
      {showProfileSidebar && (
        <div
          className={`fixed inset-0 z-50 flex justify-end transition-transform duration-300 ${
            showProfileSidebar ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowProfileSidebar(false)}
          />
          <div className="relative bg-white w-full max-w-md h-full p-8 shadow-2xl no-scrollbar overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Your Profile
            </h2>
            {userDetails ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CgProfile className="text-3xl text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {userDetails.username}
                    </h3>
                    <p className="text-sm text-gray-600">{userDetails.email}</p>
                  </div>
                </div>
                {userDetails.phone && (
                  <p className="text-sm text-gray-600">
                    Phone: {userDetails.phone}
                  </p>
                )}
                {userDetails.instagram && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <LuInstagram className="text-pink-600" />
                    <a
                      href={userDetails.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Instagram
                    </a>
                  </p>
                )}
                {userDetails.youtube && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <IoLogoYoutube className="text-red-600" />
                    <a
                      href={userDetails.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      YouTube
                    </a>
                  </p>
                )}
                {userDetails.facebook && (
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <FaFacebook className="text-blue-600" />
                    <a
                      href={userDetails.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Facebook
                    </a>
                  </p>
                )}
                <button
                  onClick={() => setShowUpdateForm(true)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Update Profile
                </button>
                <button
                  onClick={openTrashModal}
                  className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MdDelete />
                  View Trashed Blogs
                </button>
                <button
                  onClick={signOut}
                  className="w-full px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <p className="text-gray-600">Loading profile...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}