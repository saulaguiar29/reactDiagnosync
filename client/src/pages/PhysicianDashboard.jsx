import React, { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Activity,
  TrendingUp,
  MessageSquare,
  Star,
  Send,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Filter,
  Search,
} from "lucide-react";

const PhysicianDashboard = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState("findings");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for pending cases
  const pendingCases = [
    {
      id: 1,
      patientId: "P-2024-001",
      patientName: "John D.",
      testType: "Blood Work - CBC",
      uploadDate: "2024-01-20 09:45 AM",
      aiConfidence: 94,
      priority: "high",
      urgency: "Urgent",
      findings: [
        {
          type: "concern",
          text: "Elevated White Blood Cell Count (15,200/μL)",
          severity: "high",
        },
        {
          type: "normal",
          text: "Hemoglobin within normal range (14.2 g/dL)",
          severity: "low",
        },
        {
          type: "concern",
          text: "Low Platelet Count (120,000/μL)",
          severity: "medium",
        },
      ],
      aiSummary:
        "Analysis suggests potential infection or inflammatory response. Recommend follow-up testing and physician evaluation.",
      patientExplanation:
        "Your blood test shows some elevated markers that may indicate your immune system is responding to something. We recommend discussing these results with your healthcare provider.",
      recommendations: [
        "Repeat CBC in 1 week",
        "Consider infection workup",
        "Monitor symptoms",
      ],
      status: "pending",
    },
    {
      id: 2,
      patientId: "P-2024-002",
      patientName: "Sarah M.",
      testType: "Cholesterol Panel",
      uploadDate: "2024-01-20 10:30 AM",
      aiConfidence: 91,
      priority: "medium",
      urgency: "Routine",
      findings: [
        {
          type: "concern",
          text: "Elevated LDL Cholesterol (165 mg/dL)",
          severity: "medium",
        },
        {
          type: "normal",
          text: "HDL Cholesterol adequate (55 mg/dL)",
          severity: "low",
        },
        {
          type: "concern",
          text: "Total Cholesterol elevated (245 mg/dL)",
          severity: "medium",
        },
      ],
      aiSummary:
        "Lipid panel shows elevated cholesterol levels requiring lifestyle modifications and possible medication consideration.",
      patientExplanation:
        "Your cholesterol levels are higher than recommended. This is manageable through diet, exercise, and potentially medication - your doctor will help create a plan.",
      recommendations: [
        "Discuss lifestyle modifications",
        "Consider statin therapy",
        "Follow-up in 3 months",
      ],
      status: "pending",
    },
    {
      id: 3,
      patientId: "P-2024-003",
      patientName: "Michael R.",
      testType: "Thyroid Panel",
      uploadDate: "2024-01-20 11:15 AM",
      aiConfidence: 88,
      priority: "low",
      urgency: "Routine",
      findings: [
        {
          type: "normal",
          text: "TSH within normal range (2.1 mIU/L)",
          severity: "low",
        },
        { type: "normal", text: "Free T4 normal (1.2 ng/dL)", severity: "low" },
        { type: "normal", text: "Free T3 normal (3.1 pg/mL)", severity: "low" },
      ],
      aiSummary:
        "Thyroid function tests are within normal limits. No immediate concerns identified.",
      patientExplanation:
        "Your thyroid test results look good and are within healthy ranges. Continue monitoring as recommended by your healthcare provider.",
      recommendations: [
        "Routine follow-up in 6 months",
        "Continue current management",
      ],
      status: "pending",
    },
  ];

  const [cases, setCases] = useState(pendingCases);
  const [accuracyRatings, setAccuracyRatings] = useState({});
  const [communicationApproval, setCommunicationApproval] = useState({});

  const stats = {
    pendingReviews: cases.filter((c) => c.status === "pending").length,
    completedToday: 12,
    avgReviewTime: "8.5 min",
    aiAccuracy: "91.2%",
  };

  const handleApproveCase = (caseId) => {
    setCases(
      cases.map((c) => (c.id === caseId ? { ...c, status: "approved" } : c))
    );
    alert("Case approved and sent to patient portal!");
    setSelectedCase(null);
  };

  const handleRejectCase = (caseId) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (reason) {
      setCases(
        cases.map((c) =>
          c.id === caseId
            ? { ...c, status: "rejected", rejectionReason: reason }
            : c
        )
      );
      setSelectedCase(null);
    }
  };

  const filteredCases = cases
    .filter((c) => filterPriority === "all" || c.priority === filterPriority)
    .filter((c) => c.status === "pending")
    .filter(
      (c) =>
        searchQuery === "" ||
        c.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.testType.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Physician Review Portal
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                AI-Assisted Medical Case Review System
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  Dr. Sarah Wilson, MD
                </p>
                <p className="text-xs text-gray-500">Internal Medicine</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Reviews</p>
                <p className="text-3xl font-bold text-orange-600">
                  {stats.pendingReviews}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed Today</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.completedToday}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Review Time</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.avgReviewTime}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">AI Accuracy</p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.aiAccuracy}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cases List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Pending Cases
                </h2>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  {filteredCases.length}
                </span>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by patient or test..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Priority Filter */}
              <div className="flex gap-2">
                {["all", "high", "medium", "low"].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setFilterPriority(priority)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      filterPriority === priority
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
              {filteredCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  onClick={() => setSelectedCase(caseItem)}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-all ${
                    selectedCase?.id === caseItem.id
                      ? "bg-blue-50 border-l-4 border-l-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">
                        {caseItem.patientName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {caseItem.patientId}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        caseItem.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : caseItem.priority === "medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {caseItem.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {caseItem.testType}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {caseItem.uploadDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {caseItem.aiConfidence}% AI
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Case Details */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200">
            {selectedCase ? (
              <div className="h-full flex flex-col">
                {/* Case Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedCase.patientName}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedCase.patientId} • {selectedCase.testType}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedCase.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : selectedCase.priority === "medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {selectedCase.urgency}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        AI: {selectedCase.aiConfidence}%
                      </span>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-4 border-b border-gray-200">
                    {[
                      { id: "findings", label: "Findings", icon: FileText },
                      {
                        id: "communication",
                        label: "Communication",
                        icon: MessageSquare,
                      },
                      { id: "accuracy", label: "Accuracy", icon: Star },
                      { id: "review", label: "Review", icon: CheckCircle },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                          activeTab === tab.id
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {activeTab === "findings" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          AI Analysis Summary
                        </h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-gray-700">
                            {selectedCase.aiSummary}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Detailed Findings
                        </h3>
                        <div className="space-y-3">
                          {selectedCase.findings.map((finding, idx) => (
                            <div
                              key={idx}
                              className={`p-4 rounded-lg border-l-4 ${
                                finding.severity === "high"
                                  ? "bg-red-50 border-red-500"
                                  : finding.severity === "medium"
                                  ? "bg-orange-50 border-orange-500"
                                  : "bg-green-50 border-green-500"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {finding.type === "concern" ? (
                                  <AlertCircle
                                    className={`w-5 h-5 mt-0.5 ${
                                      finding.severity === "high"
                                        ? "text-red-600"
                                        : "text-orange-600"
                                    }`}
                                  />
                                ) : (
                                  <CheckCircle className="w-5 h-5 mt-0.5 text-green-600" />
                                )}
                                <p className="text-gray-700">{finding.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          AI Recommendations
                        </h3>
                        <ul className="space-y-2">
                          {selectedCase.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span className="text-gray-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === "communication" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Patient-Facing Explanation
                        </h3>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                          <p className="text-gray-700">
                            {selectedCase.patientExplanation}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">
                          This is what the patient will see on their portal.
                          Review and approve or edit as needed.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Communication Status
                        </h3>
                        <div className="flex gap-4">
                          <button
                            onClick={() =>
                              setCommunicationApproval({
                                ...communicationApproval,
                                [selectedCase.id]: true,
                              })
                            }
                            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                              communicationApproval[selectedCase.id]
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <ThumbsUp className="w-5 h-5" />
                              Approve Communication
                            </div>
                          </button>
                          <button
                            onClick={() =>
                              setCommunicationApproval({
                                ...communicationApproval,
                                [selectedCase.id]: false,
                              })
                            }
                            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                              communicationApproval[selectedCase.id] === false
                                ? "bg-red-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <ThumbsDown className="w-5 h-5" />
                              Needs Revision
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "accuracy" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Rate AI Analysis Accuracy
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Your feedback helps improve the AI system for future
                          analyses.
                        </p>
                      </div>

                      {[
                        "OCR Accuracy",
                        "Interpretation Quality",
                        "Recommendation Relevance",
                      ].map((category, idx) => (
                        <div key={idx}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {category}
                          </label>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              defaultValue="85"
                              onChange={(e) =>
                                setAccuracyRatings({
                                  ...accuracyRatings,
                                  [category]: e.target.value,
                                })
                              }
                              className="flex-1"
                            />
                            <span className="text-lg font-semibold text-blue-600 w-12">
                              {accuracyRatings[category] || 85}%
                            </span>
                          </div>
                        </div>
                      ))}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Feedback
                        </label>
                        <textarea
                          rows="4"
                          placeholder="Provide specific feedback about the AI analysis..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Feedback to AI System
                      </button>
                    </div>
                  )}

                  {activeTab === "review" && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900 mb-1">
                              Review Summary
                            </p>
                            <p className="text-sm text-gray-700">
                              You are about to{" "}
                              {communicationApproval[selectedCase.id]
                                ? "approve"
                                : "finalize"}{" "}
                              this case. The patient will receive the results
                              and communication you've reviewed.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">
                            AI Confidence
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            {selectedCase.aiConfidence}%
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">
                            Priority Level
                          </p>
                          <p className="text-2xl font-bold text-orange-600 capitalize">
                            {selectedCase.priority}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Final Physician Notes (Optional)
                        </label>
                        <textarea
                          rows="4"
                          placeholder="Add any additional notes or instructions for the patient..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => handleApproveCase(selectedCase.id)}
                          className="flex-1 py-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Approve & Send to Patient
                        </button>
                        <button
                          onClick={() => handleRejectCase(selectedCase.id)}
                          className="flex-1 py-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                        >
                          <AlertCircle className="w-5 h-5" />
                          Reject & Send Back
                        </button>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900 mb-1">
                              Educational Software Notice
                            </p>
                            <p className="text-sm text-gray-700">
                              This is demonstration software. All
                              recommendations are educational and must be
                              verified by licensed healthcare professionals
                              before patient communication.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a Case to Review
                  </h3>
                  <p className="text-gray-600">
                    Choose a pending case from the list to begin your review
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicianDashboard;
