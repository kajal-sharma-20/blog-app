"use client";

export default function UpdateProfileForm({
  showUpdateForm,
  setShowUpdateForm,
  editProfile,
  setEditProfile,
  errors,
  setErrors,
  handleProfileUpdate,
  validateField,
  isLoading,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  return (
    <>
      {showUpdateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowUpdateForm(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Update Profile
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editProfile.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editProfile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number (optional)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg bg-gray-100 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editProfile.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-r-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                    placeholder="10-digit phone number"
                    pattern="[0-9]{10}"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password (optional)
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={editProfile.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                  placeholder="Enter new password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={editProfile.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Instagram (optional)
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={editProfile.instagram}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                  placeholder="https://instagram.com/yourprofile"
                />
                {errors.instagram && (
                  <p className="text-red-500 text-xs mt-1">{errors.instagram}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="youtube"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  YouTube (optional)
                </label>
                <input
                  type="url"
                  id="youtube"
                  name="youtube"
                  value={editProfile.youtube}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                  placeholder="https://youtube.com/yourchannel"
                />
                {errors.youtube && (
                  <p className="text-red-500 text-xs mt-1">{errors.youtube}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Facebook (optional)
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={editProfile.facebook}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                  placeholder="https://facebook.com/yourprofile"
                />
                {errors.facebook && (
                  <p className="text-red-500 text-xs mt-1">{errors.facebook}</p>
                )}
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}