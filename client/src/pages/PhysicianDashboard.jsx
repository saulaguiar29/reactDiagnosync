import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Download,
  BarChart3,
  Brain,
  Sparkles,
  FileCheck,
  Users,
  Award,
  Zap,
  Bot,
  X,
  ChevronRight,
  RefreshCw,
  Settings,
  Bell,
  MessageCircle,
  Info,
} from "lucide-react";

const PhysicianDashboard = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeTab, setActiveTab] = useState("findings");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      role: "assistant",
      content: "Hello Dr. Wilson! I'm your AI Medical Assistant. I can help you understand test results, suggest diagnoses, recommend follow-up tests, and explain medical concepts. What would you like to know?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  // Mock data for pending cases
  const pendingCases = [
    {
      id: 1,
      patientId: "P-2024-001",
      patientName: "John D.",
      age: 45,
      gender: "M",
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
          normal: "4,000-11,000/μL",
          value: "15,200/μL",
        },
        {
          type: "normal",
          text: "Hemoglobin within normal range (14.2 g/dL)",
          severity: "low",
          normal: "13.5-17.5 g/dL",
          value: "14.2 g/dL",
        },
        {
          type: "concern",
          text: "Low Platelet Count (120,000/μL)",
          severity: "medium",
          normal: "150,000-400,000/μL",
          value: "120,000/μL",
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
        "Check inflammatory markers (CRP, ESR)",
      ],
      status: "pending",
      previousTests: 3,
      aiDifferentialDiagnosis: [
        { diagnosis: "Bacterial Infection", probability: 65 },
        { diagnosis: "Viral Infection", probability: 25 },
        { diagnosis: "Autoimmune Disorder", probability: 10 },
      ],
    },
    {
      id: 2,
      patientId: "P-2024-002",
      patientName: "Sarah M.",
      age: 52,
      gender: "F",
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
          normal: "Below 100 mg/dL",
          value: "165 mg/dL",
        },
        {
          type: "normal",
          text: "HDL Cholesterol adequate (55 mg/dL)",
          severity: "low",
          normal: "Above 40 mg/dL",
          value: "55 mg/dL",
        },
        {
          type: "concern",
          text: "Total Cholesterol elevated (245 mg/dL)",
          severity: "medium",
          normal: "Below 200 mg/dL",
          value: "245 mg/dL",
        },
      ],
      aiSummary:
        "Lipid panel shows elevated cholesterol levels requiring lifestyle modifications and possible medication consideration.",
      patientExplanation:
        "Your cholesterol levels are higher than recommended. This is manageable through diet, exercise, and potentially medication.",
      recommendations: [
        "Discuss lifestyle modifications",
        "Consider statin therapy",
        "Follow-up in 3 months",
        "Cardiovascular risk assessment",
      ],
      status: "pending",
      previousTests: 2,
      aiDifferentialDiagnosis: [
        { diagnosis: "Hyperlipidemia", probability: 85 },
        { diagnosis: "Familial Hypercholesterolemia", probability: 15 },
      ],
    },
    {
      id: 3,
      patientId: "P-2024-003",
      patientName: "Michael R.",
      age: 38,
      gender: "M",
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
          normal: "0.4-4.0 mIU/L",
          value: "2.1 mIU/L",
        },
        {
          type: "normal",
          text: "Free T4 normal (1.2 ng/dL)",
          severity: "low",
          normal: "0.8-1.8 ng/dL",
          value: "1.2 ng/dL",
        },
        {
          type: "normal",
          text: "Free T3 normal (3.1 pg/mL)",
          severity: "low",
          normal: "2.3-4.2 pg/mL",
          value: "3.1 pg/mL",
        },
      ],
      aiSummary:
        "Thyroid function tests are within normal limits. No immediate concerns identified.",
      patientExplanation:
        "Your thyroid test results look good and are within healthy ranges. Continue monitoring as recommended.",
      recommendations: [
        "Routine follow-up in 6 months",
        "Continue current management",
      ],
      status: "pending",
      previousTests: 1,
      aiDifferentialDiagnosis: [
        { diagnosis: "Euthyroid (Normal)", probability: 95 },
        { diagnosis: "Subclinical Thyroid Disorder", probability: 5 },
      ],
    },
  ];

  const [cases, setCases] = useState(pendingCases);
  const [accuracyRatings, setAccuracyRatings] = useState({});
  const [communicationApproval, setCommunicationApproval] = useState({});

  // Enhanced stats
  const stats = {
    pendingReviews: cases.filter((c) => c.status === "pending").length,
    completedToday: 12,
    completedThisWeek: 47,
    completedThisMonth: 184,
    avgReviewTime: "8.5 min",
    aiAccuracy: "91.2%",
    patientsHelped: 2847,
    criticalCases: 3,
  };

  // AI Knowledge Base Topics
  const aiCapabilities = [
    {
      title: "OCR & Data Extraction",
      description: "Extract text from medical documents, lab reports, and imaging studies",
    },
    {
      title: "Pattern Recognition",
      description: "Identify abnormal values and patterns in test results",
    },
    {
      title: "Differential Diagnosis",
      description: "Suggest possible diagnoses based on symptoms and test results",
    },
    {
      title: "Medical Knowledge Base",
      description: "Access to medical literature, drug interactions, and treatment guidelines",
    },
    {
      title: "Risk Stratification",
      description: "Calculate risk scores and identify high-risk patients",
    },
    {
      title: "Follow-up Recommendations",
      description: "Suggest appropriate follow-up tests and monitoring schedules",
    },
  ];

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

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // Add user message
    const newMessages = [
      ...aiChatMessages,
      { role: "user", content: chatInput },
    ];

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(chatInput);
      setAiChatMessages([
        ...newMessages,
        { role: "assistant", content: aiResponse },
      ]);
    }, 1000);

    setAiChatMessages(newMessages);
    setChatInput("");
  };

  const generateAIResponse = (input) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("wbc") || lowerInput.includes("white blood cell")) {
      return "Elevated WBC count (15,200/μL vs normal 4,000-11,000/μL) suggests an active immune response. Common causes include:\n\n1. Bacterial infections (most likely)\n2. Inflammatory conditions\n3. Stress response\n4. Medications (corticosteroids)\n\nRecommended next steps:\n- Blood culture if infection suspected\n- CRP and ESR for inflammation markers\n- Differential count to identify cell types\n- Follow-up CBC in 1 week";
    }

    if (lowerInput.includes("cholesterol") || lowerInput.includes("ldl")) {
      return "The patient's LDL of 165 mg/dL is significantly elevated (optimal <100 mg/dL). Risk assessment:\n\n• Total cholesterol: 245 mg/dL (high)\n• LDL: 165 mg/dL (high)\n• HDL: 55 mg/dL (acceptable)\n• 10-year cardiovascular risk: Moderate\n\nTreatment approach:\n1. Lifestyle modifications (diet, exercise)\n2. Consider statin therapy (moderate intensity)\n3. Repeat lipid panel in 3 months\n4. Screen for familial hypercholesterolemia if family history present";
    }

    if (lowerInput.includes("capabilities") || lowerInput.includes("what can you do")) {
      return "I can assist with:\n\n✓ Analyzing lab results and identifying abnormalities\n✓ Suggesting differential diagnoses\n✓ Recommending follow-up tests\n✓ Calculating risk scores (ASCVD, CHADS2, etc.)\n✓ Providing treatment guidelines\n✓ Explaining medical concepts\n✓ Drug interaction checking\n✓ Interpreting imaging findings\n\nMy knowledge is based on current medical literature, clinical guidelines, and evidence-based practices. I can help you make more informed decisions, but always apply your clinical judgment.";
    }

    if (lowerInput.includes("thyroid")) {
      return "Patient Michael R.'s thyroid panel is within normal limits:\n\n• TSH: 2.1 mIU/L (normal: 0.4-4.0)\n• Free T4: 1.2 ng/dL (normal: 0.8-1.8)\n• Free T3: 3.1 pg/mL (normal: 2.3-4.2)\n\nInterpretation: Euthyroid state - normal thyroid function. No intervention needed at this time. Consider routine follow-up in 6-12 months or sooner if symptoms develop.";
    }

    if (lowerInput.includes("differential") || lowerInput.includes("diagnosis")) {
      return "For John D.'s case with elevated WBC and low platelets:\n\nDifferential diagnoses (by probability):\n\n1. Acute bacterial infection (65%)\n   - Signs: Fever, elevated WBC, inflammation\n   - Next: Blood cultures, source identification\n\n2. Viral infection (25%)\n   - Signs: Variable WBC, thrombocytopenia\n   - Next: Viral serology, monitor platelet count\n\n3. Early autoimmune process (10%)\n   - Signs: Combined cytopenias\n   - Next: ANA, RF, complement levels\n\nRecommend: Start with infection workup as most likely and treatable cause.";
    }

    // Default responses
    const defaultResponses = [
      "I can help you with that. Could you be more specific about which case or test result you'd like me to analyze?",
      "I'm here to assist with medical analysis. You can ask me about specific lab values, request differential diagnoses, or inquire about treatment guidelines.",
      "I have access to comprehensive medical knowledge. Try asking about specific test results, patient symptoms, or diagnostic considerations.",
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Physician Review Portal
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                AI-Assisted Medical Case Review System
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowStats(!showStats)}
                className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
              <button
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                AI Assistant
              </button>
              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">
                    Dr. Sarah Wilson, MD
                  </p>
                  <p className="text-xs text-gray-500">Internal Medicine</p>
                </div>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <User className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Modal */}
      {showStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Performance Analytics</h2>
                <p className="text-sm text-gray-500 mt-1">Review your productivity and accuracy metrics</p>
              </div>
              <button
                onClick={() => setShowStats(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6">
              {/* Timeframe Selector */}
              <div className="flex gap-2 mb-6">
                {["week", "month", "year"].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTimeframe === timeframe
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <p className="text-sm text-green-700 mb-1">Cases Reviewed</p>
                  <p className="text-3xl font-bold text-green-900">
                    {selectedTimeframe === "week" ? 47 : selectedTimeframe === "month" ? 184 : 2847}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <p className="text-sm text-blue-700 mb-1">Accuracy Rate</p>
                  <p className="text-3xl font-bold text-blue-900">96.2%</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <p className="text-sm text-orange-700 mb-1">Avg Time</p>
                  <p className="text-3xl font-bold text-orange-900">8.5m</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <p className="text-sm text-purple-700 mb-1">AI Agreement</p>
                  <p className="text-3xl font-bold text-purple-900">91.2%</p>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Review Time Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">0-5 minutes</span>
                      <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "35%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">5-10 minutes</span>
                      <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">10+ minutes</span>
                      <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: "20%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">20%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Case Types Reviewed</h3>
                  <div className="space-y-2">
                    {[
                      { type: "Blood Work", count: 42, color: "red" },
                      { type: "Imaging", count: 28, color: "blue" },
                      { type: "Biopsy", count: 15, color: "purple" },
                      { type: "Other", count: 12, color: "gray" },
                    ].map((item) => (
                      <div key={item.type} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.type}</span>
                        <span className="text-sm font-medium text-gray-800">{item.count} cases</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">AI Medical Assistant</h2>
                  <p className="text-sm text-gray-500">Powered by advanced medical AI</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIAssistant(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* AI Capabilities */}
            <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AI Capabilities
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {aiCapabilities.map((capability, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-3 border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
                    onClick={() => setChatInput(`Tell me about ${capability.title}`)}
                  >
                    <p className="text-xs font-semibold text-gray-800">{capability.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{capability.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {aiChatMessages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-4 ${
                      message.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.role === "assistant" && (
                        <Bot className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  "Explain elevated WBC",
                  "What can you do?",
                  "Differential diagnosis",
                  "Treatment guidelines",
                ].map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChatInput(question)}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me about test results, diagnoses, or medical concepts..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <button className="text-orange-600 hover:text-orange-700">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{stats.pendingReviews}</h3>
            <p className="text-sm text-gray-500 mt-1">Pending Reviews</p>
            <div className="mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-red-500" />
              <span className="text-xs text-red-600 font-medium">{stats.criticalCases} critical</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{stats.completedToday}</h3>
            <p className="text-sm text-gray-500 mt-1">Completed Today</p>
            <div className="mt-2 text-xs text-green-600 font-medium">
              {stats.completedThisWeek} this week
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{stats.avgReviewTime}</h3>
            <p className="text-sm text-gray-500 mt-1">Avg Review Time</p>
            <div className="mt-2 text-xs text-blue-600 font-medium">-1.2 min vs last week</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{stats.aiAccuracy}</h3>
            <p className="text-sm text-gray-500 mt-1">AI Accuracy</p>
            <div className="mt-2 text-xs text-purple-600 font-medium">Based on your feedback</div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 border border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Quick Review Mode
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Reports
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Preferences
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last synced: 2 minutes ago</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cases List */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Pending Cases</h2>
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
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
                        ? "bg-indigo-600 text-white"
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
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${
                    selectedCase?.id === caseItem.id
                      ? "bg-indigo-50 border-l-4 border-l-indigo-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {caseItem.patientName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {caseItem.patientId} • {caseItem.age}y/{caseItem.gender}
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
                      {caseItem.uploadDate.split(" ")[0]}
                    </div>
                    <div className="flex items-center gap-1">
                      <Brain className="w-3 h-3" />
                      {caseItem.aiConfidence}%
                    </div>
                  </div>
                  {caseItem.previousTests > 0 && (
                    <div className="mt-2 text-xs text-blue-600 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {caseItem.previousTests} previous tests
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Case Details */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100">
            {selectedCase ? (
              <div className="h-full flex flex-col">
                {/* Case Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {selectedCase.patientName}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedCase.patientId} • {selectedCase.age}y/{selectedCase.gender} • {selectedCase.testType}
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
                  <div className="flex gap-2 border-b border-gray-200">
                    {[
                      { id: "findings", label: "Findings", icon: FileText },
                      { id: "ai-analysis", label: "AI Analysis", icon: Brain },
                      {id: "communication",label: "Communication",icon: MessageSquare,},
                      { id: "accuracy", label: "Accuracy", icon: Star },
                      { id: "review", label: "Review", icon: CheckCircle },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                          activeTab === tab.id
                            ? "border-indigo-600 text-indigo-600"
                            : "border-transparent text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {activeTab === "findings" && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800 mb-1">AI Summary</p>
                            <p className="text-sm text-gray-700">
                              {selectedCase.aiSummary}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <FileCheck className="w-5 h-5 text-indigo-600" />
                          Detailed Findings
                        </h3>
                        <div className="space-y-3">
                          {selectedCase.findings.map((finding, idx) => (
                            <div
                              key={idx}
                              className={`p-4 rounded-xl border-l-4 ${
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
                                <div className="flex-1">
                                  <p className="font-medium text-gray-800 mb-1">
                                    {finding.text}
                                  </p>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>Value: <strong>{finding.value}</strong></span>
                                    <span>Normal: {finding.normal}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Recommended Actions
                        </h3>
                        <ul className="space-y-2">
                          {selectedCase.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === "ai-analysis" && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              AI Differential Diagnosis
                            </h3>
                            <p className="text-sm text-gray-600">
                              Based on test results and pattern recognition
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {selectedCase.aiDifferentialDiagnosis.map((diagnosis, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-lg p-4 border border-gray-200"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-800">
                                  {diagnosis.diagnosis}
                                </span>
                                <span className="text-sm font-semibold text-indigo-600">
                                  {diagnosis.probability}%
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
                                  style={{ width: `${diagnosis.probability}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-purple-600" />
                          AI Confidence Breakdown
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-700">OCR Accuracy</span>
                              <span className="text-sm font-semibold text-gray-800">98%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500"
                                style={{ width: "98%" }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-700">Pattern Recognition</span>
                              <span className="text-sm font-semibold text-gray-800">
                                {selectedCase.aiConfidence}%
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${selectedCase.aiConfidence}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-700">Clinical Relevance</span>
                              <span className="text-sm font-semibold text-gray-800">92%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-500"
                                style={{ width: "92%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setShowAIAssistant(true);
                          setChatInput(`Tell me more about ${selectedCase.patientName}'s case`);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Ask AI Assistant About This Case
                      </button>
                    </div>
                  )}

                  {activeTab === "communication" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Patient-Facing Explanation
                        </h3>
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
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
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
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
                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                              communicationApproval[selectedCase.id]
                                ? "bg-green-600 text-white shadow-lg"
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
                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                              communicationApproval[selectedCase.id] === false
                                ? "bg-red-600 text-white shadow-lg"
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

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Edit Communication (Optional)
                        </h3>
                        <textarea
                          rows="6"
                          placeholder="Customize the patient explanation if needed..."
                          defaultValue={selectedCase.patientExplanation}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "accuracy" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-indigo-600" />
                          Rate AI Analysis Accuracy
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Your feedback helps improve the AI system for future
                          analyses.
                        </p>
                      </div>

                      {[
                        {
                          category: "OCR Accuracy",
                          description: "How well did AI extract text from the document?",
                        },
                        {
                          category: "Interpretation Quality",
                          description: "How accurate was the AI's interpretation?",
                        },
                        {
                          category: "Recommendation Relevance",
                          description: "How relevant were the AI's recommendations?",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="mb-6">
                          <label className="block text-sm font-medium text-gray-800 mb-1">
                            {item.category}
                          </label>
                          <p className="text-xs text-gray-600 mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              defaultValue="85"
                              onChange={(e) =>
                                setAccuracyRatings({
                                  ...accuracyRatings,
                                  [item.category]: e.target.value,
                                })
                              }
                              className="flex-1"
                            />
                            <span className="text-lg font-semibold text-indigo-600 w-12">
                              {accuracyRatings[item.category] || 85}%
                            </span>
                          </div>
                        </div>
                      ))}

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Additional Feedback
                        </label>
                        <textarea
                          rows="4"
                          placeholder="Provide specific feedback about the AI analysis..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        />
                      </div>

                      <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-md">
                        <Send className="w-5 h-5" />
                        Send Feedback to AI System
                      </button>
                    </div>
                  )}

                  {activeTab === "review" && (
                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-800 mb-1">
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
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                          <p className="text-sm text-blue-700 mb-1">
                            AI Confidence
                          </p>
                          <p className="text-3xl font-bold text-blue-900">
                            {selectedCase.aiConfidence}%
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                          <p className="text-sm text-orange-700 mb-1">
                            Priority Level
                          </p>
                          <p className="text-3xl font-bold text-orange-900 capitalize">
                            {selectedCase.priority}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Final Physician Notes (Optional)
                        </label>
                        <textarea
                          rows="4"
                          placeholder="Add any additional notes or instructions for the patient..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => handleApproveCase(selectedCase.id)}
                          className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Approve & Send to Patient
                        </button>
                        <button
                          onClick={() => handleRejectCase(selectedCase.id)}
                          className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                        >
                          <AlertCircle className="w-5 h-5" />
                          Reject & Send Back
                        </button>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-800 mb-1">
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
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
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