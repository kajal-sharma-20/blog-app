"use client";

export default function LoginModal({
  showLoginModal,
  modalAnimation,
  closeLoginModal,
  handleLoginSubmit,
  openModal,
}) {
  return (
    <>
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeLoginModal}
          />
          <div
            className={`relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform ${
              modalAnimation === "fadeIn" ? "animate-fadeIn" : "animate-fadeOut"
            }`}
          >
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Login
            </h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="emailOrphone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email or Phone
                </label>
                <input
                  type="text"
                  id="emailOrphone"
                  name="emailOrphone"
                  className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                  placeholder="Enter your email or phone"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Dont have an account?</span>{" "}
              <button
                onClick={() => {
                  closeLoginModal();
                  setTimeout(() => {
                    openModal();
                  }, 300);
                }}
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}