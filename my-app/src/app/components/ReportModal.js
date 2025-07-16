"use client";

export default function ReportModal({
  showReportModal,
  modalAnimation,
  closeReportModal,
  handleReport,
  reportReason,
  setReportReason,
}) {
  return (
    <>
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeReportModal}
          />
          <div
            className={`relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform ${
              modalAnimation === "fadeIn" ? "animate-fadeIn" : "animate-fadeOut"
            }`}
          >
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Report Blog
            </h2>
            <form onSubmit={handleReport} className="space-y-4">
              <div>
                <label
                  htmlFor="reportReason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason for Reporting
                </label>
                <textarea
                  id="reportReason"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                  placeholder="Enter the reason for reporting this blog"
                  rows={4}
                  required
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}