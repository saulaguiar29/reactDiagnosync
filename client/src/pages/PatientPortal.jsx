import { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Activity,
  Heart,
  Download,
  Bell,
  BookOpen,
  MessageCircle,
  Phone,
  ChevronDown,
  ChevronUp,
  Info,
  TrendingUp,
  Shield,
} from "lucide-react";

const PatientPortal = () => {
  const [expandedTest, setExpandedTest] = useState(null);
  const [activeTab, setActiveTab] = useState("results");

  // Mock patient data
  const patientInfo = {
    name: "John Doe",
    patientId: "P-2024-001",
    dateOfBirth: "05/15/1985",
    bloodType: "A+",
    lastVisit: "January 15, 2024",
  };

  // Mock test results
  const testResults = [
    {
      id: 1,
      testType: "Complete Blood Count (CBC)",
      date: "2024-01-20",
      status: "Physician Approved",
      aiStatus: "AI Analysis Complete",
      urgency: "Routine",
      summary:
        "Your blood test shows some elevated markers that may indicate your immune system is responding to something.",
      findings: [
        {
          name: "White Blood Cell Count",
          value: "15,200/μL",
          range: "4,000-11,000/μL",
          status: "elevated",
          concern: true,
        },
        {
          name: "Hemoglobin",
          value: "14.2 g/dL",
          range: "13.5-17.5 g/dL",
          status: "normal",
          concern: false,
        },
        {
          name: "Platelet Count",
          value: "120,000/μL",
          range: "150,000-400,000/μL",
          status: "low",
          concern: true,
        },
        {
          name: "Red Blood Cell Count",
          value: "4.8 million/μL",
          range: "4.5-5.5 million/μL",
          status: "normal",
          concern: false,
        },
      ],
      nextSteps: [
        "Learn about white blood cell function and what elevated levels might mean",
        "Understand the importance of platelet counts in blood clotting",
        "Contact your healthcare provider to discuss these results",
        "Keep a record of any symptoms you may be experiencing (fever, fatigue, unusual bruising)",
        "Your doctor may recommend follow-up testing to monitor these levels",
      ],
      physicianNotes:
        "Please schedule a follow-up appointment to discuss these results and potential next steps.",
      downloadUrl: "#",
    },
    {
      id: 2,
      testType: "Lipid Panel (Cholesterol)",
      date: "2024-01-18",
      status: "Physician Approved",
      aiStatus: "AI Analysis Complete",
      urgency: "Routine",
      summary:
        "Your cholesterol levels are higher than recommended. This is manageable through lifestyle changes and your doctor will help create a plan.",
      findings: [
        {
          name: "Total Cholesterol",
          value: "245 mg/dL",
          range: "Below 200 mg/dL",
          status: "elevated",
          concern: true,
        },
        {
          name: "LDL Cholesterol",
          value: "165 mg/dL",
          range: "Below 100 mg/dL",
          status: "elevated",
          concern: true,
        },
        {
          name: "HDL Cholesterol",
          value: "55 mg/dL",
          range: "Above 40 mg/dL",
          status: "normal",
          concern: false,
        },
        {
          name: "Triglycerides",
          value: "125 mg/dL",
          range: "Below 150 mg/dL",
          status: "normal",
          concern: false,
        },
      ],
      nextSteps: [
        "Learn about heart-healthy eating patterns and cholesterol management",
        "Explore the benefits of regular physical activity for heart health",
        "Understand how different types of cholesterol affect your body",
        "Discuss lifestyle modifications with your healthcare provider",
        "Learn about factors that influence cholesterol levels",
      ],
      physicianNotes:
        "Recommend lifestyle modifications. Follow-up in 3 months to reassess.",
      downloadUrl: "#",
    },
    {
      id: 3,
      testType: "Thyroid Function Panel",
      date: "2024-01-15",
      status: "Physician Approved",
      aiStatus: "AI Analysis Complete",
      urgency: "Routine",
      summary:
        "Your thyroid test results look good and are within healthy ranges. Continue monitoring as recommended by your healthcare provider.",
      findings: [
        {
          name: "TSH",
          value: "2.1 mIU/L",
          range: "0.4-4.0 mIU/L",
          status: "normal",
          concern: false,
        },
        {
          name: "Free T4",
          value: "1.2 ng/dL",
          range: "0.8-1.8 ng/dL",
          status: "normal",
          concern: false,
        },
        {
          name: "Free T3",
          value: "3.1 pg/mL",
          range: "2.3-4.2 pg/mL",
          status: "normal",
          concern: false,
        },
      ],
      nextSteps: [
        "Learn about thyroid function and why monitoring is important",
        "Understand what TSH levels indicate about thyroid health",
        "Explore how thyroid hormones affect metabolism and energy",
        "Continue routine monitoring as recommended by your doctor",
        "Keep track of any changes in energy levels or symptoms",
      ],
      physicianNotes:
        "Thyroid function is normal. Continue current management.",
      downloadUrl: "#",
    },
  ];

  const educationalResources = [
    {
      title: "Understanding Your Blood Test Results",
      description:
        "Learn what common blood test markers mean and why they matter for your health.",
      icon: FileText,
      color: "blue",
    },
    {
      title: "Heart Health & Cholesterol",
      description:
        "Discover how lifestyle choices impact your cholesterol levels and cardiovascular health.",
      icon: Heart,
      color: "red",
    },
    {
      title: "Thyroid Health Basics",
      description:
        "Understand your thyroid function and its role in metabolism and energy.",
      icon: Activity,
      color: "purple",
    },
    {
      title: "When to Contact Your Doctor",
      description:
        "Learn which symptoms and test results require immediate medical attention.",
      icon: Phone,
      color: "green",
    },
  ];

  const upcomingAppointments = [
    {
      type: "Follow-up Visit",
      provider: "Dr. Sarah Wilson",
      date: "February 5, 2024",
      time: "10:30 AM",
      location: "Main Clinic, Room 204",
    },
  ];

  const notifications = [
    {
      type: "new_results",
      message: "New test results available for Complete Blood Count",
      time: "2 hours ago",
      unread: true,
    },
    {
      type: "appointment",
      message: "Reminder: Follow-up appointment in 5 days",
      time: "1 day ago",
      unread: true,
    },
    {
      type: "educational",
      message: "New educational resource: Understanding Your Lab Results",
      time: "3 days ago",
      unread: false,
    },
  ];

  const toggleExpand = (testId) => {
    setExpandedTest(expandedTest === testId ? null : testId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                My Health Portal
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                View your test results and health information
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {patientInfo.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Patient ID: {patientInfo.patientId}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 mb-1">
                Educational Platform Notice
              </p>
              <p className="text-sm text-gray-700">
                This platform provides educational information about your test
                results. All results shown here have been reviewed by your
                healthcare provider. Please discuss any questions or concerns
                with your doctor. This system does not diagnose or provide
                medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Results</p>
                <p className="text-3xl font-bold text-purple-600">
                  {testResults.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New Results</p>
                <p className="text-3xl font-bold text-blue-600">1</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Appointments</p>
                <p className="text-3xl font-bold text-green-600">
                  {upcomingAppointments.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resources</p>
                <p className="text-3xl font-bold text-orange-600">
                  {educationalResources.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-8">
              {[
                { id: "results", label: "My Results", icon: FileText },
                { id: "appointments", label: "Appointments", icon: Calendar },
                { id: "education", label: "Learn More", icon: BookOpen },
                {
                  id: "notifications",
                  label: "Notifications",
                  icon: Bell,
                  badge: 2,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-all relative ${
                    activeTab === tab.id
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "results" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Your Test Results
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      All results have been reviewed and approved by your
                      healthcare provider
                    </p>
                  </div>
                </div>

                {testResults.map((test) => (
                  <div
                    key={test.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div
                      className="p-6 cursor-pointer bg-gradient-to-r from-gray-50 to-white"
                      onClick={() => toggleExpand(test.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {test.testType}
                            </h3>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex-shrink-0 whitespace-nowrap">
                              <CheckCircle className="w-3 h-3 inline mr-1" />
                              {test.status}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex-shrink-0 whitespace-nowrap">
                              {test.aiStatus}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {test.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {test.urgency}
                            </div>
                          </div>
                          <p className="text-gray-700 mt-3">{test.summary}</p>
                        </div>
                        <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-all">
                          {expandedTest === test.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    {expandedTest === test.id && (
                      <div className="border-t border-gray-200 bg-white">
                        <div className="p-6 space-y-6">
                          {/* Test Findings */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Your Test Values
                            </h4>
                            <div className="space-y-3">
                              {test.findings.map((finding, idx) => (
                                <div
                                  key={idx}
                                  className={`p-4 rounded-lg border ${
                                    finding.concern
                                      ? "bg-yellow-50 border-yellow-200"
                                      : "bg-green-50 border-green-200"
                                  }`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <p className="font-medium text-gray-900">
                                          {finding.name}
                                        </p>
                                        {finding.concern ? (
                                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                                        ) : (
                                          <CheckCircle className="w-4 h-4 text-green-600" />
                                        )}
                                      </div>
                                      <div className="flex items-center gap-4 text-sm">
                                        <span className="text-gray-700">
                                          <span className="font-medium">
                                            Your Value:
                                          </span>{" "}
                                          {finding.value}
                                        </span>
                                        <span className="text-gray-600">
                                          <span className="font-medium">
                                            Normal Range:
                                          </span>{" "}
                                          {finding.range}
                                        </span>
                                      </div>
                                    </div>
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                        finding.concern
                                          ? "bg-yellow-200 text-yellow-800"
                                          : "bg-green-200 text-green-800"
                                      }`}
                                    >
                                      {finding.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Next Steps */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                              Educational Resources & Next Steps
                            </h4>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                              <ul className="space-y-2">
                                {test.nextSteps.map((step, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-gray-700"
                                  >
                                    <BookOpen className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Physician Notes */}
                          {test.physicianNotes && (
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                Note from Your Provider
                              </h4>
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                  <p className="text-gray-700">
                                    {test.physicianNotes}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-4 pt-4 border-t border-gray-200">
                            <button className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
                              <Download className="w-5 h-5" />
                              Download Results
                            </button>
                            <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                              <MessageCircle className="w-5 h-5" />
                              Message Provider
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Upcoming Appointments
                  </h2>
                  <p className="text-sm text-gray-600">
                    Manage your scheduled visits and follow-ups
                  </p>
                </div>

                {upcomingAppointments.map((apt, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {apt.type}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-700">
                            <User className="w-4 h-4 text-purple-600" />
                            <span>{apt.provider}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            <span>
                              {apt.date} at {apt.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Activity className="w-4 h-4 text-purple-600" />
                            <span>{apt.location}</span>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Health Education Resources
                  </h2>
                  <p className="text-sm text-gray-600">
                    Learn more about your health and test results
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {educationalResources.map((resource, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div
                        className={`w-12 h-12 bg-${resource.color}-100 rounded-lg flex items-center justify-center mb-4`}
                      >
                        <resource.icon
                          className={`w-6 h-6 text-${resource.color}-600`}
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {resource.description}
                      </p>
                      <button className="text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1">
                        Learn More
                        <ChevronDown className="w-4 h-4 rotate-270" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Recent Notifications
                  </h2>
                  <p className="text-sm text-gray-600">
                    Stay updated with your health information
                  </p>
                </div>

                <div className="space-y-3">
                  {notifications.map((notif, idx) => (
                    <div
                      key={idx}
                      className={`border rounded-xl p-4 hover:shadow-lg transition-all ${
                        notif.unread
                          ? "bg-blue-50 border-blue-200"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            notif.type === "new_results"
                              ? "bg-green-100"
                              : notif.type === "appointment"
                              ? "bg-purple-100"
                              : "bg-blue-100"
                          }`}
                        >
                          {notif.type === "new_results" ? (
                            <FileText className="w-5 h-5 text-green-600" />
                          ) : notif.type === "appointment" ? (
                            <Calendar className="w-5 h-5 text-purple-600" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium">
                            {notif.message}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notif.time}
                          </p>
                        </div>
                        {notif.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;
