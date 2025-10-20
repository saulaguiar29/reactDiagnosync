import React, { useState } from "react";
import {
  Activity,
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Moon,
  Sun,
  Brain,
  FileCheck,
  Zap,
  Eye,
} from "lucide-react";

const LabTechDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([
    {
      id: 1,
      name: "MRI_Brain_Scan_2024.pdf",
      type: "MRI",
      status: "completed",
      confidence: 94,
      date: "2024-01-15",
      urgency: "low",
    },
    {
      id: 2,
      name: "Blood_Work_Panel_Full.pdf",
      type: "Blood Work",
      status: "completed",
      confidence: 89,
      date: "2024-01-15",
      urgency: "medium",
    },
    {
      id: 3,
      name: "CT_Chest_Scan.pdf",
      type: "CT Scan",
      status: "physician_review",
      confidence: 87,
      date: "2024-01-14",
      urgency: "high",
    },
  ]);

  const steps = [
    "Uploading document...",
    "Extracting text and images...",
    "Analyzing medical data...",
    "Identifying key findings...",
    "Calculating confidence scores...",
    "Generating recommendations...",
    "Preparing physician review...",
    "Complete!",
  ];

  const simulateUpload = () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex <= steps.length) {
        setCurrentStep(steps[stepIndex - 1]);
        setUploadProgress((stepIndex / steps.length) * 100);

        if (stepIndex === steps.length) {
          setTimeout(() => {
            setUploading(false);
            setUploadProgress(0);
            setCurrentStep("");
            setUploadedDocs([
              {
                id: Date.now(),
                name: selectedFile.name,
                type: selectedFile.name.includes("MRI") ? "MRI" : "Blood Work",
                status: "completed",
                confidence: Math.floor(Math.random() * 15) + 85,
                date: new Date().toISOString().split("T")[0],
                urgency: "low",
              },
              ...uploadedDocs,
            ]);
            setSelectedFile(null);
          }, 1000);
          clearInterval(interval);
        }
      }
    }, 800);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const bgClass = darkMode
    ? "bg-gray-900"
    : "bg-gradient-to-br from-purple-50 via-blue-50 to-white";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-300" : "text-gray-600";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${cardBg} shadow-lg border-b ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${textPrimary}`}>
                Diagnosync
              </h1>
              <p className={`text-xs ${textSecondary}`}>
                AI Clinical Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`text-sm ${textSecondary}`}>
              Lab Technician Portal
            </span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              } hover:scale-110 transition-transform`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FileText className="w-6 h-6" />}
            title="Total Analyses"
            value="2,847"
            trend="+12%"
            color="purple"
            darkMode={darkMode}
          />
          <StatCard
            icon={<Activity className="w-6 h-6" />}
            title="Physician Review Queue"
            value="7"
            trend="-3 today"
            color="blue"
            darkMode={darkMode}
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="AI Confidence Avg"
            value="89.2%"
            trend="+2.4%"
            color="green"
            darkMode={darkMode}
          />
          <StatCard
            icon={<CheckCircle className="w-6 h-6" />}
            title="Patients Notified"
            value="12"
            trend="Today"
            color="indigo"
            darkMode={darkMode}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div
            className={`lg:col-span-2 ${cardBg} rounded-xl shadow-lg p-6 border ${borderColor}`}
          >
            <div className="flex items-center gap-2 mb-6">
              <Upload className={`w-5 h-5 ${textPrimary}`} />
              <h2 className={`text-xl font-semibold ${textPrimary}`}>
                Upload Medical Documents
              </h2>
            </div>

            {!uploading ? (
              <div>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center ${
                    darkMode
                      ? "border-gray-600 bg-gray-700/30"
                      : "border-purple-200 bg-purple-50"
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <p className={`text-lg font-medium mb-2 ${textPrimary}`}>
                    {selectedFile
                      ? selectedFile.name
                      : "Drag and drop or click to upload"}
                  </p>
                  <p className={`text-sm ${textSecondary} mb-4`}>
                    Supports: MRI, CT, X-Ray, Blood Work, Biopsy reports (PDF,
                    DICOM, JPG)
                  </p>
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png,.dcm"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium cursor-pointer hover:shadow-lg transition-all"
                  >
                    Choose File
                  </label>
                </div>

                {selectedFile && (
                  <button
                    onClick={simulateUpload}
                    className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    Start AI Analysis
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-blue-900/30" : "bg-blue-50"
                  } border-l-4 border-blue-600`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
                    <span className={`font-medium ${textPrimary}`}>
                      {currentStep}
                    </span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    } overflow-hidden`}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className={`text-sm ${textSecondary} mt-2`}>
                    {Math.round(uploadProgress)}% Complete
                  </p>
                </div>

                <div
                  className={`grid grid-cols-2 gap-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  } text-sm`}
                >
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {idx < steps.indexOf(currentStep) ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : idx === steps.indexOf(currentStep) ? (
                        <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-400" />
                      )}
                      <span
                        className={
                          idx <= steps.indexOf(currentStep) ? "font-medium" : ""
                        }
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats Chart */}
          <div
            className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderColor}`}
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className={`w-5 h-5 ${textPrimary}`} />
              <h2 className={`text-xl font-semibold ${textPrimary}`}>
                Today's Activity
              </h2>
            </div>
            <div className="space-y-4">
              <ChartBar
                label="Blood Work"
                value={85}
                color="red"
                darkMode={darkMode}
              />
              <ChartBar
                label="MRI Scans"
                value={62}
                color="purple"
                darkMode={darkMode}
              />
              <ChartBar
                label="CT Scans"
                value={45}
                color="blue"
                darkMode={darkMode}
              />
              <ChartBar
                label="X-Rays"
                value={38}
                color="green"
                darkMode={darkMode}
              />
              <ChartBar
                label="Biopsies"
                value={22}
                color="orange"
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>

        {/* Recent Documents */}
        <div
          className={`mt-8 ${cardBg} rounded-xl shadow-lg p-6 border ${borderColor}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileCheck className={`w-5 h-5 ${textPrimary}`} />
              <h2 className={`text-xl font-semibold ${textPrimary}`}>
                Recent Analyses
              </h2>
            </div>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
              View All <Eye className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  } text-left`}
                >
                  <th
                    className={`px-4 py-3 text-sm font-semibold ${textPrimary}`}
                  >
                    Document
                  </th>
                  <th
                    className={`px-4 py-3 text-sm font-semibold ${textPrimary}`}
                  >
                    Type
                  </th>
                  <th
                    className={`px-4 py-3 text-sm font-semibold ${textPrimary}`}
                  >
                    Status
                  </th>
                  <th
                    className={`px-4 py-3 text-sm font-semibold ${textPrimary}`}
                  >
                    Confidence
                  </th>
                  <th
                    className={`px-4 py-3 text-sm font-semibold ${textPrimary}`}
                  >
                    Date
                  </th>
                  <th
                    className={`px-4 py-3 text-sm font-semibold ${textPrimary}`}
                  >
                    Urgency
                  </th>
                </tr>
              </thead>
              <tbody>
                {uploadedDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className={`border-b ${borderColor} hover:${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    } transition-colors`}
                  >
                    <td className={`px-4 py-3 ${textPrimary}`}>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm ${textSecondary}`}>
                      {doc.type}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={doc.status} darkMode={darkMode} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex-1 h-2 rounded-full ${
                            darkMode ? "bg-gray-700" : "bg-gray-200"
                          } overflow-hidden`}
                        >
                          <div
                            className={`h-full ${
                              doc.confidence >= 90
                                ? "bg-green-500"
                                : doc.confidence >= 85
                                ? "bg-yellow-500"
                                : "bg-orange-500"
                            }`}
                            style={{ width: `${doc.confidence}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${textPrimary}`}>
                          {doc.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-sm ${textSecondary}`}>
                      {doc.date}
                    </td>
                    <td className="px-4 py-3">
                      <UrgencyBadge urgency={doc.urgency} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend, color, darkMode }) => {
  const colors = {
    purple: "from-purple-600 to-purple-700",
    blue: "from-blue-600 to-blue-700",
    green: "from-green-600 to-green-700",
    indigo: "from-indigo-600 to-indigo-700",
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-lg p-6 border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } hover:shadow-xl transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white`}
        >
          {icon}
        </div>
        <span
          className={`text-xs font-medium ${
            trend.includes("+") ? "text-green-600" : "text-blue-600"
          }`}
        >
          {trend}
        </span>
      </div>
      <h3
        className={`mt-4 text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {value}
      </h3>
      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        {title}
      </p>
    </div>
  );
};

const ChartBar = ({ label, value, color, darkMode }) => {
  const colors = {
    red: "bg-red-500",
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          {label}
        </span>
        <span
          className={`text-sm font-medium ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {value}
        </span>
      </div>
      <div
        className={`w-full h-2 rounded-full ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        } overflow-hidden`}
      >
        <div
          className={`h-full ${colors[color]} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const StatusBadge = ({ status, darkMode }) => {
  const styles = {
    completed: {
      bg: darkMode ? "bg-green-900/30" : "bg-green-100",
      text: "text-green-700",
      label: "Completed",
    },
    physician_review: {
      bg: darkMode ? "bg-yellow-900/30" : "bg-yellow-100",
      text: "text-yellow-700",
      label: "Physician Review",
    },
    pending: {
      bg: darkMode ? "bg-blue-900/30" : "bg-blue-100",
      text: "text-blue-700",
      label: "Pending",
    },
  };

  const style = styles[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
    >
      {status === "completed" ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <Clock className="w-3 h-3" />
      )}
      {style.label}
    </span>
  );
};

const UrgencyBadge = ({ urgency }) => {
  const styles = {
    low: { bg: "bg-gray-100", text: "text-gray-700", label: "Low" },
    medium: { bg: "bg-orange-100", text: "text-orange-700", label: "Medium" },
    high: { bg: "bg-red-100", text: "text-red-700", label: "High" },
  };

  const style = styles[urgency];
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
    >
      {urgency === "high" && <AlertCircle className="w-3 h-3" />}
      {style.label}
    </span>
  );
};

export default LabTechDashboard;
