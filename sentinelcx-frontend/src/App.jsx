import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  AlertTriangle,
  BarChart3,
  Settings,
  Search,
  Bell,
  ShieldCheck,
  TrendingUp,
  Activity,
  Brain,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [customers, setCustomers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [crises, setCrises] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [aiActions, setAiActions] = useState([]);

  const [aiInsight, setAiInsight] = useState(null);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiError, setAiError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) =>
        console.error("Error fetching customers:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) =>
        console.error("Error fetching tickets:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/crises")
      .then((response) => response.json())
      .then((data) => setCrises(data))
      .catch((error) =>
        console.error("Error fetching crises:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/complaints")
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) =>
        console.error("Error fetching complaints:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/ai-actions")
      .then((response) => response.json())
      .then((data) => setAiActions(data))
      .catch((error) =>
        console.error("Error fetching AI actions:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/ai-insights")
      .then((response) => {
        if (!response.ok) {
          throw new Error("AI insight request failed");
        }

        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setAiInsight(data.insight);
        }

        setAiLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching AI insight:", error);
        setAiError(true);
        setAiLoading(false);
      });
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Customers", icon: Users },
    { name: "Support Inbox", icon: MessageSquare },
    { name: "Crisis Center", icon: AlertTriangle },
    { name: "Root Causes", icon: BarChart3 },
    { name: "AI Actions", icon: Brain },
    { name: "Analytics", icon: TrendingUp },
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h2>SentinelCX</h2>
            <p>Customer Intelligence</p>
          </div>
        </div>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`menu-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => setActivePage(item.name)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">

          <button className="menu-item">
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <div className="ai-status">
            <div className="status-dot"></div>

            <div>
              <strong>AI System Online</strong>
              <small>Monitoring customers</small>
            </div>
          </div>

        </div>

      </aside>

      {/* MAIN */}

      <main className="main">

        {/* HEADER */}

        <header className="header">

          <div>
            <h1>{activePage}</h1>

            <p>
              {activePage === "Dashboard"
                ? "Real-time customer experience intelligence"
                : `Manage ${activePage.toLowerCase()}`}
            </p>
          </div>

          <div className="header-right">

            <div className="search-box">
              <Search size={18} />

              <input placeholder="Search customers..." />
            </div>

            <button className="icon-button">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>

            <div className="profile">

              <div className="avatar">
                A
              </div>

              <div>
                <strong>Admin</strong>
                <small>Administrator</small>
              </div>

            </div>

          </div>

        </header>

        {/* ================================================= */}
        {/* DASHBOARD */}
        {/* ================================================= */}

        {activePage === "Dashboard" && (
          <>

            {/* AI BANNER */}

            <section className="ai-banner">

              <div className="ai-banner-icon">
                <Brain size={28} />
              </div>

              <div>
                <h3>
                  AI Customer Intelligence is Active
                </h3>

                <p>
                  SentinelCX is continuously monitoring customer
                  interactions, orders, sentiment and support patterns.
                </p>
              </div>

              <div className="monitoring">
                <Activity size={18} />
                Live Monitoring
              </div>

            </section>

            {/* STATS */}

            <section className="stats-grid">

              <StatCard
                title="Total Customers"
                value={customers.length}
                change="+8.2%"
                icon={<Users size={24} />}
              />

              <StatCard
                title="Healthy Customers"
                value="9,841"
                change="78.8%"
                icon={<ShieldCheck size={24} />}
              />

              <StatCard
                title="At Risk"
                value="1,923"
                change="+4.6%"
                icon={<Activity size={24} />}
              />

              <StatCard
                title="Critical"
                value="719"
                change="+2.1%"
                icon={<AlertTriangle size={24} />}
              />

            </section>

            {/* ================================================= */}
            {/* NEW LIVE AI INTELLIGENCE PANEL */}
            {/* ================================================= */}

            <section className="section">

              <div className="section-header">

                <div>
                  <h2>
                    🧠 Live AI Intelligence
                  </h2>

                  <p>
                    AI reasoning across multiple customer experience signals
                  </p>
                </div>

                <span className="status executed">
                  AI ACTIVE
                </span>

              </div>

              <div className="crisis-card">

                {aiLoading && (
                  <div className="empty-page">

                    <Brain size={40} />

                    <h2>
                      AI is analyzing signals...
                    </h2>

                    <p>
                      Checking orders, tickets, complaints and crises.
                    </p>

                  </div>
                )}

                {aiError && !aiLoading && (
                  <div className="empty-page">

                    <AlertTriangle size={40} />

                    <h2>
                      AI insight unavailable
                    </h2>

                    <p>
                      Make sure the SentinelCX backend is running.
                    </p>

                  </div>
                )}

                {aiInsight && !aiLoading && (

                  <>

                    {/* AI RISK HEADER */}

                    <div className="crisis-top">

                      <div>

                        <span className="critical-label">
                          {aiInsight.risk_level || "RISK"}
                        </span>

                        <h2>
                          {aiInsight.title}
                        </h2>

                        <p>
                          SentinelCX identified this risk by
                          reasoning across multiple live data sources.
                        </p>

                      </div>

                      <div className="crisis-score">

                        <span>
                          AI Risk Score
                        </span>

                        <strong>
                          {aiInsight.risk_score}%
                        </strong>

                      </div>

                    </div>

                    {/* SIGNALS */}

                    <div className="crisis-stats">

                      <div>
                        <span>
                          Delayed Orders
                        </span>

                        <strong>
                          {aiInsight.signal?.delayed_orders ?? 0}
                        </strong>
                      </div>

                      <div>
                        <span>
                          High Priority Tickets
                        </span>

                        <strong>
                          {aiInsight.signal?.high_priority_tickets ?? 0}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Active Crises
                        </span>

                        <strong>
                          {aiInsight.signal?.active_crises ?? 0}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Cancelled Orders
                        </span>

                        <strong>
                          {aiInsight.signal?.cancelled_orders ?? 0}
                        </strong>
                      </div>

                    </div>

                    {/* REASONING */}

                    <div className="crisis-action">

                      <div>

                        <strong>
                          🧠 Why did AI detect this?
                        </strong>

                        <p>
                          {aiInsight.reasoning}
                        </p>

                      </div>

                    </div>

                    {/* RECOMMENDATION */}

                    <div className="crisis-action">

                      <div>

                        <strong>
                          🎯 AI Recommendation
                        </strong>

                        <p>
                          {aiInsight.recommendation}
                        </p>

                      </div>

                      <button
                        className="primary-button"
                        onClick={() =>
                          setActivePage("AI Actions")
                        }
                      >
                        View AI Actions
                      </button>

                    </div>

                    {/* AFFECTED AREA */}

                    <div className="action-item">

                      <div className="action-icon">
                        <Target size={19} />
                      </div>

                      <div className="action-content">

                        <strong>
                          Affected Area
                        </strong>

                        <small>
                          {aiInsight.affected_hub || "Multiple areas"}
                        </small>

                      </div>

                    </div>

                    {/* DATA SOURCES */}

                    <div className="ai-data-sources">

                      <strong>
                        🔗 Data Sources Used
                      </strong>

                      <div className="source-list">

                        {aiInsight.data_sources?.map(
                          (source, index) => (
                            <span key={index}>
                              ✓ {source}
                            </span>
                          )
                        )}

                      </div>

                    </div>

                  </>

                )}

              </div>

            </section>

            {/* ================================================= */}
            {/* LIVE CUSTOMER CRISIS */}
            {/* ================================================= */}

            <section className="section">

              <div className="section-header">

                <div>
                  <h2>
                    🚨 Live Customer Crisis
                  </h2>

                  <p>
                    AI detected a potential system-wide issue
                  </p>
                </div>

                <button
                  className="view-button"
                  onClick={() =>
                    setActivePage("Crisis Center")
                  }
                >
                  View Crisis
                </button>

              </div>

              <div className="crisis-card">

                <div className="crisis-top">

                  <div>

                    <span className="critical-label">
                      CRITICAL
                    </span>

                    <h2>
                      Delivery Hub Disruption
                    </h2>

                    <p>
                      AI detected an abnormal increase in delayed
                      deliveries from <strong>BLR-HUB-04</strong>.
                    </p>

                  </div>

                  <div className="crisis-score">

                    <span>
                      Risk Score
                    </span>

                    <strong>
                      {aiInsight?.risk_score
                        ? `${aiInsight.risk_score}%`
                        : "82%"}
                    </strong>

                  </div>

                </div>

                <div className="crisis-stats">

                  <div>
                    <span>
                      Affected Customers
                    </span>

                    <strong>
                      {aiInsight?.affected_customers ?? 73}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Predicted Complaints
                    </span>

                    <strong>
                      41
                    </strong>
                  </div>

                  <div>
                    <span>
                      Escalation Risk
                    </span>

                    <strong>
                      {aiInsight?.risk_score
                        ? `${aiInsight.risk_score}%`
                        : "82%"}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Revenue Risk
                    </span>

                    <strong>
                      ₹1.8L
                    </strong>
                  </div>

                </div>

                <div className="crisis-action">

                  <div>

                    <strong>
                      AI Recommendation
                    </strong>

                    <p>
                      {aiInsight?.recommendation ||
                        "Notify affected customers, prioritize delayed orders, offer eligible compensation and investigate the delivery hub."}
                    </p>

                  </div>

                  <button
                    className="primary-button"
                    onClick={() =>
                      setActivePage("AI Actions")
                    }
                  >
                    Investigate Crisis
                  </button>

                </div>

              </div>

            </section>

            {/* BOTTOM GRID */}

            <div className="bottom-grid">

              {/* ROOT CAUSES */}

              <section className="panel">

                <div className="panel-header">

                  <div>

                    <h2>
                      Top Root Causes
                    </h2>

                    <p>
                      AI analysis of complaints
                    </p>

                  </div>

                </div>

                <RootCause
                  name="Delivery Delays"
                  percentage="32%"
                  width="32%"
                />

                <RootCause
                  name="Payment Failures"
                  percentage="21%"
                  width="21%"
                />

                <RootCause
                  name="Product Defects"
                  percentage="17%"
                  width="17%"
                />

                <RootCause
                  name="Refund Delays"
                  percentage="11%"
                  width="11%"
                />

              </section>

              {/* AI ACTIONS */}

              <section className="panel">

                <div className="panel-header">

                  <div>

                    <h2>
                      AI Actions
                    </h2>

                    <p>
                      Recent autonomous decisions
                    </p>

                  </div>

                </div>

                <ActionItem
                  title="Proactive delivery notification"
                  customer="73 customers"
                  status="Executed"
                />

                <ActionItem
                  title="Priority ticket escalation"
                  customer="27 customers"
                  status="Executed"
                />

                <ActionItem
                  title="Compensation recommendation"
                  customer="18 customers"
                  status="Pending"
                />

                <ActionItem
                  title="Logistics investigation"
                  customer="BLR-HUB-04"
                  status="Pending"
                />

              </section>

            </div>

          </>
        )}

        {/* ================================================= */}
        {/* CUSTOMERS */}
        {/* ================================================= */}

        {activePage === "Customers" && (
          <div className="panel">

            <div className="panel-header">

              <div>

                <h2>
                  Customer List
                </h2>

                <p>
                  Customers from SentinelCX database
                </p>

              </div>

            </div>

            {customers.map((customer) => (

              <div
                className="action-item"
                key={customer.id}
              >

                <div className="action-icon">
                  <Users size={18} />
                </div>

                <div className="action-content">

                  <strong>
                    {customer.name}
                  </strong>

                  <small>
                    {customer.email}
                  </small>

                </div>

                <span className="status executed">
                  {customer.status}
                </span>

              </div>

            ))}

          </div>
        )}

        {/* ================================================= */}
        {/* SUPPORT INBOX */}
        {/* ================================================= */}

        {activePage === "Support Inbox" && (
          <div className="panel">

            <div className="panel-header">

              <div>

                <h2>
                  Support Inbox
                </h2>

                <p>
                  Customer support tickets from SentinelCX database
                </p>

              </div>

              <span className="status executed">
                {tickets.length} Tickets
              </span>

            </div>

            {tickets.length === 0 ? (

              <div className="empty-page">

                <MessageSquare size={40} />

                <h2>
                  No tickets found
                </h2>

                <p>
                  No support tickets are available in the database.
                </p>

              </div>

            ) : (

              tickets.map((ticket) => (

                <div
                  className="action-item"
                  key={ticket.id}
                >

                  <div className="action-icon">
                    <MessageSquare size={18} />
                  </div>

                  <div className="action-content">

                    <strong>
                      {ticket.subject}
                    </strong>

                    <small>
                      Customer: {ticket.customer_name}
                    </small>

                    <small>
                      {ticket.description}
                    </small>

                  </div>

                  <span
                    className={`status ${
                      ticket.priority
                        ? ticket.priority.toLowerCase()
                        : "pending"
                    }`}
                  >
                    {ticket.priority || "Normal"}
                  </span>

                </div>

              ))

            )}

          </div>
        )}

        {/* ================================================= */}
        {/* CRISIS CENTER */}
        {/* ================================================= */}

        {activePage === "Crisis Center" && (
          <div className="panel">

            <div className="panel-header">

              <div>

                <h2>
                  🚨 Crisis Center
                </h2>

                <p>
                  Active customer experience crises detected by SentinelCX
                </p>

              </div>

              <span className="status executed">
                {crises.length} Crisis
              </span>

            </div>

            {crises.length === 0 ? (

              <div className="empty-page">

                <ShieldCheck size={40} />

                <h2>
                  No Active Crises
                </h2>

                <p>
                  SentinelCX has not detected any active customer crisis.
                </p>

              </div>

            ) : (

              crises.map((crisis) => (

                <div
                  className="crisis-card"
                  key={crisis.id}
                >

                  <div className="crisis-top">

                    <div>

                      <span className="critical-label">
                        {crisis.status || "ACTIVE"}
                      </span>

                      <h2>
                        {crisis.title ||
                          crisis.name ||
                          crisis.crisis_type ||
                          "Customer Crisis"}
                      </h2>

                      <p>
                        {crisis.description ||
                          crisis.details ||
                          "AI detected an abnormal customer experience pattern."}
                      </p>

                    </div>

                    <div className="crisis-score">

                      <span>
                        Risk Score
                      </span>

                      <strong>
                        {crisis.risk_score
                          ? `${crisis.risk_score}%`
                          : "—"}
                      </strong>

                    </div>

                  </div>

                  <div className="crisis-stats">

                    <div>
                      <span>
                        Affected Customers
                      </span>

                      <strong>
                        {crisis.affected_customers ||
                          crisis.affected_count ||
                          "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Predicted Complaints
                      </span>

                      <strong>
                        {crisis.predicted_complaints || "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Escalation Risk
                      </span>

                      <strong>
                        {crisis.escalation_risk
                          ? `${crisis.escalation_risk}%`
                          : "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Revenue Risk
                      </span>

                      <strong>
                        {crisis.revenue_risk || "—"}
                      </strong>
                    </div>

                  </div>

                  <div className="crisis-action">

                    <div>

                      <strong>
                        AI Recommendation
                      </strong>

                      <p>
                        {crisis.recommendation ||
                          crisis.ai_recommendation ||
                          "Review affected customers and take proactive action."}
                      </p>

                    </div>

                    <button className="primary-button">
                      Investigate Crisis
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>
        )}

        {/* ================================================= */}
        {/* ROOT CAUSES */}
        {/* ================================================= */}

        {activePage === "Root Causes" && (
          <div className="panel">

            <div className="panel-header">

              <div>

                <h2>
                  🔍 Root Causes
                </h2>

                <p>
                  Complaint categories from SentinelCX database
                </p>

              </div>

              <span className="status executed">
                {complaints.length} Categories
              </span>

            </div>

            {complaints.length === 0 ? (

              <div className="empty-page">

                <BarChart3 size={40} />

                <h2>
                  No Complaint Data
                </h2>

                <p>
                  No complaint categories are available.
                </p>

              </div>

            ) : (

              complaints.map((complaint, index) => (

                <div
                  className="root-cause"
                  key={complaint.id || index}
                >

                  <div className="root-info">

                    <span>
                      {complaint.category ||
                        complaint.name ||
                        complaint.complaint_category ||
                        complaint.title ||
                        "Complaint Category"}
                    </span>

                    <strong>
                      {complaint.percentage
                        ? `${complaint.percentage}%`
                        : complaint.count || 0}
                    </strong>

                  </div>

                  <div className="progress">

                    <div
                      style={{
                        width: `${Math.min(
                          Number(complaint.percentage) || 10,
                          100
                        )}%`,
                      }}
                    ></div>

                  </div>

                </div>

              ))

            )}

          </div>
        )}

        {/* ================================================= */}
        {/* AI ACTIONS */}
        {/* ================================================= */}

        {activePage === "AI Actions" && (
          <>

            <div className="panel">

              <div className="panel-header">

                <div>

                  <h2>
                    🧠 AI Reasoning Engine
                  </h2>

                  <p>
                    SentinelCX is reasoning across multiple customer
                    experience data sources
                  </p>

                </div>

                <span className="status executed">
                  AI ACTIVE
                </span>

              </div>

              {aiLoading && (

                <div className="empty-page">

                  <Brain size={40} />

                  <h2>
                    AI is analyzing signals...
                  </h2>

                  <p>
                    Checking orders, support tickets, complaints and crises.
                  </p>

                </div>

              )}

              {aiError && !aiLoading && (

                <div className="empty-page">

                  <AlertTriangle size={40} />

                  <h2>
                    AI insight unavailable
                  </h2>

                  <p>
                    Make sure the SentinelCX backend is running.
                  </p>

                </div>

              )}

              {aiInsight && !aiLoading && (

                <>

                  <div className="ai-insight-header">

                    <div>

                      <span className="critical-label">
                        {aiInsight.risk_level || "RISK"}
                      </span>

                      <h2>
                        {aiInsight.title}
                      </h2>

                    </div>

                    <div className="crisis-score">

                      <span>
                        AI Risk Score
                      </span>

                      <strong>
                        {aiInsight.risk_score}%
                      </strong>

                    </div>

                  </div>

                  <div className="crisis-stats">

                    <div>
                      <span>
                        Delayed Orders
                      </span>

                      <strong>
                        {aiInsight.signal?.delayed_orders ?? 0}
                      </strong>
                    </div>

                    <div>
                      <span>
                        High Priority Tickets
                      </span>

                      <strong>
                        {aiInsight.signal?.high_priority_tickets ?? 0}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Active Crises
                      </span>

                      <strong>
                        {aiInsight.signal?.active_crises ?? 0}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Cancelled Orders
                      </span>

                      <strong>
                        {aiInsight.signal?.cancelled_orders ?? 0}
                      </strong>
                    </div>

                  </div>

                  <div className="crisis-action">

                    <div>

                      <strong>
                        🧠 Why SentinelCX detected this
                      </strong>

                      <p>
                        {aiInsight.reasoning}
                      </p>

                    </div>

                  </div>

                  <div className="crisis-action">

                    <div>

                      <strong>
                        🎯 AI Recommendation
                      </strong>

                      <p>
                        {aiInsight.recommendation}
                      </p>

                    </div>

                    <button className="primary-button">
                      Take Action
                    </button>

                  </div>

                  <div className="action-item">

                    <div className="action-icon">
                      <Target size={19} />
                    </div>

                    <div className="action-content">

                      <strong>
                        Affected Area
                      </strong>

                      <small>
                        {aiInsight.affected_hub}
                      </small>

                    </div>

                  </div>

                  <div className="ai-data-sources">

                    <strong>
                      🔗 Data Sources Used for Reasoning
                    </strong>

                    <div className="source-list">

                      {aiInsight.data_sources?.map(
                        (source, index) => (

                          <span key={index}>
                            ✓ {source}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                </>

              )}

            </div>

            <div className="panel">

              <div className="panel-header">

                <div>

                  <h2>
                    🤖 AI Actions
                  </h2>

                  <p>
                    Autonomous decisions generated by SentinelCX
                  </p>

                </div>

                <span className="status executed">
                  {aiActions.length} Actions
                </span>

              </div>

              {aiActions.length === 0 ? (

                <div className="empty-page">

                  <Brain size={40} />

                  <h2>
                    No AI Actions
                  </h2>

                  <p>
                    No AI actions are available in the database.
                  </p>

                </div>

              ) : (

                aiActions.map((action, index) => {

                  const actionStatus =
                    action.status ||
                    action.action_status ||
                    "Pending";

                  const isExecuted =
                    actionStatus.toLowerCase() === "executed" ||
                    actionStatus.toLowerCase() === "completed";

                  return (

                    <div
                      className="action-item"
                      key={action.id || index}
                    >

                      <div className="action-icon">

                        {isExecuted ? (
                          <CheckCircle size={19} />
                        ) : (
                          <Clock size={19} />
                        )}

                      </div>

                      <div className="action-content">

                        <strong>
                          {action.action ||
                            action.action_name ||
                            action.title ||
                            action.recommendation ||
                            "AI Recommended Action"}
                        </strong>

                        <small>
                          {action.reason ||
                            action.description ||
                            action.details ||
                            "AI identified this action based on customer experience signals."}
                        </small>

                        {action.affected_customers && (

                          <small>
                            Affected Customers:{" "}
                            {action.affected_customers}
                          </small>

                        )}

                      </div>

                      <span
                        className={`status ${
                          isExecuted
                            ? "executed"
                            : "pending"
                        }`}
                      >
                        {actionStatus}
                      </span>

                    </div>

                  );

                })

              )}

            </div>

          </>
        )}

        {/* ================================================= */}
        {/* ANALYTICS */}
        {/* ================================================= */}

        {activePage === "Analytics" && (
          <>

            <section className="stats-grid">

              <StatCard
                title="Total Customers"
                value={customers.length}
                change="Live"
                icon={<Users size={24} />}
              />

              <StatCard
                title="Support Tickets"
                value={tickets.length}
                change="Live"
                icon={<MessageSquare size={24} />}
              />

              <StatCard
                title="Active Crises"
                value={crises.length}
                change="Live"
                icon={<AlertTriangle size={24} />}
              />

              <StatCard
                title="AI Actions"
                value={aiActions.length}
                change="Live"
                icon={<Brain size={24} />}
              />

            </section>

            <div className="bottom-grid">

              <section className="panel">

                <div className="panel-header">

                  <div>

                    <h2>
                      Customer Health
                    </h2>

                    <p>
                      Current customer risk distribution
                    </p>

                  </div>

                </div>

                <div className="analytics-row">

                  <div>

                    <span className="analytics-label">
                      Healthy
                    </span>

                    <strong>
                      78.8%
                    </strong>

                    <div className="analytics-bar">

                      <div
                        style={{
                          width: "78.8%",
                        }}
                      ></div>

                    </div>

                  </div>

                </div>

                <div className="analytics-row">

                  <div>

                    <span className="analytics-label">
                      At Risk
                    </span>

                    <strong>
                      15.4%
                    </strong>

                    <div className="analytics-bar">

                      <div
                        style={{
                          width: "15.4%",
                        }}
                      ></div>

                    </div>

                  </div>

                </div>

                <div className="analytics-row">

                  <div>

                    <span className="analytics-label">
                      Critical
                    </span>

                    <strong>
                      5.8%
                    </strong>

                    <div className="analytics-bar">

                      <div
                        style={{
                          width: "5.8%",
                        }}
                      ></div>

                    </div>

                  </div>

                </div>

              </section>

              <section className="panel">

                <div className="panel-header">

                  <div>

                    <h2>
                      System Activity
                    </h2>

                    <p>
                      SentinelCX intelligence overview
                    </p>

                  </div>

                </div>

                <AnalyticsItem
                  icon={<Users size={20} />}
                  title="Customers monitored"
                  value={customers.length}
                />

                <AnalyticsItem
                  icon={<MessageSquare size={20} />}
                  title="Support tickets analyzed"
                  value={tickets.length}
                />

                <AnalyticsItem
                  icon={<AlertTriangle size={20} />}
                  title="Crisis signals detected"
                  value={crises.length}
                />

                <AnalyticsItem
                  icon={<Brain size={20} />}
                  title="AI decisions generated"
                  value={aiActions.length}
                />

              </section>

            </div>

            <section className="panel analytics-full">

              <div className="panel-header">

                <div>

                  <h2>
                    Complaint Analysis
                  </h2>

                  <p>
                    Major customer experience problem areas
                  </p>

                </div>

              </div>

              {complaints.length === 0 ? (

                <p>
                  No complaint analytics available.
                </p>

              ) : (

                complaints.map((complaint, index) => {

                  const percentage =
                    Number(complaint.percentage) || 10;

                  return (

                    <div
                      className="analytics-complaint"
                      key={complaint.id || index}
                    >

                      <div>

                        <strong>
                          {complaint.category ||
                            complaint.name ||
                            complaint.complaint_category ||
                            complaint.title ||
                            "Complaint"}
                        </strong>

                        <span>
                          {complaint.count || ""}
                        </span>

                      </div>

                      <div className="analytics-bar">

                        <div
                          style={{
                            width: `${Math.min(
                              percentage,
                              100
                            )}%`,
                          }}
                        ></div>

                      </div>

                      <strong>
                        {complaint.percentage
                          ? `${complaint.percentage}%`
                          : ""}
                      </strong>

                    </div>

                  );

                })

              )}

            </section>

          </>
        )}

        {/* FALLBACK */}

        {activePage !== "Dashboard" &&
          activePage !== "Customers" &&
          activePage !== "Support Inbox" &&
          activePage !== "Crisis Center" &&
          activePage !== "Root Causes" &&
          activePage !== "AI Actions" &&
          activePage !== "Analytics" && (

            <div className="empty-page">

              <Brain size={48} />

              <h2>
                {activePage}
              </h2>

              <p>
                This module will be connected next.
              </p>

            </div>

          )}

      </main>

    </div>
  );
}


/* ================================================= */
/* STAT CARD */
/* ================================================= */

function StatCard({
  title,
  value,
  change,
  icon,
}) {
  return (

    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span>
          {change}
        </span>

      </div>

      <p>
        {title}
      </p>

      <h2>
        {value}
      </h2>

    </div>
  );
}


/* ================================================= */
/* ROOT CAUSE */
/* ================================================= */

function RootCause({
  name,
  percentage,
  width,
}) {
  return (

    <div className="root-cause">

      <div className="root-info">

        <span>
          {name}
        </span>

        <strong>
          {percentage}
        </strong>

      </div>

      <div className="progress">

        <div
          style={{
            width: width,
          }}
        ></div>

      </div>

    </div>
  );
}


/* ================================================= */
/* AI ACTION */
/* ================================================= */

function ActionItem({
  title,
  customer,
  status,
}) {
  return (

    <div className="action-item">

      <div className="action-icon">
        <Brain size={18} />
      </div>

      <div className="action-content">

        <strong>
          {title}
        </strong>

        <small>
          {customer}
        </small>

      </div>

      <span
        className={`status ${status.toLowerCase()}`}
      >
        {status}
      </span>

    </div>
  );
}


/* ================================================= */
/* ANALYTICS ITEM */
/* ================================================= */

function AnalyticsItem({
  icon,
  title,
  value,
}) {
  return (

    <div className="action-item">

      <div className="action-icon">
        {icon}
      </div>

      <div className="action-content">

        <strong>
          {title}
        </strong>

      </div>

      <strong>
        {value}
      </strong>

    </div>
  );
}


export default App;