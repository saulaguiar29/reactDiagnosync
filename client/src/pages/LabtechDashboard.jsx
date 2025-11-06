import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  CheckCircle,
  Clock,
  Activity,
  TrendingUp,
  Eye,
  AlertCircle,
} from "lucide-react";

const LabTechDashboard = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Lab Technician Portal
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Upload and analyze medical documents
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Lab Tech User</span>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">2,847</h3>
            <p className="text-sm text-gray-500 mt-1">Total Analyses</p>
            <span className="text-xs text-green-600 font-medium">+12% this month</span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">7</h3>
            <p className="text-sm text-gray-500 mt-1">Physician Review Queue</p>
            <span className="text-xs text-blue-600 font-medium">-3 today</span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">89.2%</h3>
            <p className="text-sm text-gray-500 mt-1">AI Confidence Avg</p>
            <span className="text-xs text-green-600 font-medium">+2.4%</span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">12</h3>
            <p className="text-sm text-gray-500 mt-1">Patients Notified</p>
            <span className="text-xs text-blue-600 font-medium">Today</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Upload Medical Documents
              </h2>
            </div>

            {!uploading ? (
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                  <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-800 mb-2">
                    {selectedFile
                      ? selectedFile.name
                      : "Drag and drop or click to upload"}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports: MRI, CT, X-Ray, Blood Work, Biopsy reports (PDF, DICOM, JPG)
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
                    className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium cursor-pointer transition-colors shadow-md"
                  >
                    Choose File
                  </label>
                </div>

                {selectedFile && (
                  <button
                    onClick={simulateUpload}
                    className="w-full mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors shadow-md"
                  >
                    Start AI Analysis
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
                    <span className="font-medium text-gray-800">
                      {currentStep}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round(uploadProgress)}% Complete
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-gray-600 text-sm">
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
                          idx <= steps.indexOf(currentStep) ? "font-medium text-gray-800" : ""
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
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Today's Activity
              </h2>
            </div>
            <div className="space-y-4">
              <ChartBar label="Blood Work" value={85} color="red" />
              <ChartBar label="MRI Scans" value={62} color="indigo" />
              <ChartBar label="CT Scans" value={45} color="blue" />
              <ChartBar label="X-Rays" value={38} color="green" />
              <ChartBar label="Biopsies" value={22} color="orange" />
            </div>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Recent Analyses
              </h2>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors">
              View All <Eye className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left border-b border-gray-200">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Document
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Confidence
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Urgency
                  </th>
                </tr>
              </thead>
              <tbody>
                {uploadedDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-800">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {doc.type}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
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
                        <span className="text-sm font-medium text-gray-800">
                          {doc.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
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

const ChartBar = ({ label, value, color }) => {
  const colors = {
    red: "bg-red-500",
    indigo: "bg-indigo-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-800">{value}</span>
      </div>
      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full ${colors[color]} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    completed: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Completed",
    },
    physician_review: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      label: "Physician Review",
    },
    pending: {
      bg: "bg-blue-100",
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