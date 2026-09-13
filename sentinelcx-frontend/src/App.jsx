import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  AlertTriangle,
  GitBranch,
  Brain,
  BarChart3,
  Search,
  Bell,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Activity,
  ShieldAlert,
  Zap,
} from "lucide-react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [customers, setCustomers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [crises, setCrises] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [aiActions, setAiActions] = useState([]);
  const [aiInsight, setAiInsight] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/customers`)
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Customers error:", err));

    fetch(`${API_URL}/api/tickets`)
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error("Tickets error:", err));

    fetch(`${API_URL}/api/crises`)
      .then((res) => res.json())
      .then((data) => setCrises(data))
      .catch((err) => console.error("Crises error:", err));

    fetch(`${API_URL}/api/complaints`)
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error("Complaints error:", err));

    fetch(`${API_URL}/api/ai-actions`)
      .then((res) => res.json())
      .then((data) => setAiActions(data))
      .catch((err) => console.error("AI actions error:", err));

    fetch(`${API_URL}/api/ai-insights`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setAiInsight(data.insight);
        }
      })
      .catch((err) => console.error("AI insights error:", err));
  }, []);

  const totalCustomers = customers.length;
  const totalTickets = tickets.length;
  const activeCrises = crises.filter(
    (crisis) =>
      crisis.status &&
      crisis.status.toLowerCase() !== "resolved" &&
      crisis.status.toLowerCase() !== "closed"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) =>
      ticket.status &&
      ticket.status.toLowerCase() === "resolved"
  ).length;

  const customerHealth =
    totalCustomers > 0
      ? Math.round(
          ((totalCustomers - activeCrises) / totalCustomers) * 100
        )
      : 0;

  const supportHealth =
    totalTickets > 0
      ? Math.round((resolvedTickets / totalTickets) * 100)
      : 0;

  const getRiskClass = (level) => {
    if (!level) return "medium";

    const value = level.toLowerCase();

    if (value === "critical") return "critical";
    if (value === "high") return "high";
    if (value === "medium") return "medium";
    return "low";
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo-icon">
            <ShieldAlert size={24} />
          </div>

          <div>
            <h2>SentinelCX</h2>
            <span>Customer Intelligence</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-title">MAIN</p>

          <SidebarItem
            icon={<LayoutDashboard size={19} />}
            text="Dashboard"
            active={activePage === "Dashboard"}
            onClick={() => setActivePage("Dashboard")}
          />

          <SidebarItem
            icon={<Users size={19} />}
            text="Customers"
            active={activePage === "Customers"}
            onClick={() => setActivePage("Customers")}
          />

          <SidebarItem
            icon={<MessageSquare size={19} />}
            text="Support Inbox"
            active={activePage === "Support Inbox"}
            onClick={() => setActivePage("Support Inbox")}
          />

          <SidebarItem
            icon={<AlertTriangle size={19} />}
            text="Crisis Center"
            active={activePage === "Crisis Center"}
            onClick={() => setActivePage("Crisis Center")}
          />

          <p className="nav-title second-title">INTELLIGENCE</p>

          <SidebarItem
            icon={<GitBranch size={19} />}
            text="Root Causes"
            active={activePage === "Root Causes"}
            onClick={() => setActivePage("Root Causes")}
          />

          <SidebarItem
            icon={<Brain size={19} />}
            text="AI Actions"
            active={activePage === "AI Actions"}
            onClick={() => setActivePage("AI Actions")}
          />

          <SidebarItem
            icon={<BarChart3 size={19} />}
            text="Analytics"
            active={activePage === "Analytics"}
            onClick={() => setActivePage("Analytics")}
          />
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot"></span>
            <span>AI Engine Online</span>
          </div>

          <div className="user-profile">
            <div className="avatar">G</div>

            <div>
              <strong>Admin</strong>
              <small>SentinelCX</small>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* HEADER */}
        <header className="top-header">
          <div className="page-heading">
            <h1>{activePage}</h1>
            <p>
              {activePage === "Dashboard" &&
                "Real-time customer experience intelligence"}
              {activePage === "Customers" &&
                "Monitor your customer ecosystem"}
              {activePage === "Support Inbox" &&
                "Manage customer support signals"}
              {activePage === "Crisis Center" &&
                "Detect and respond to customer crises"}
              {activePage === "Root Causes" &&
                "Understand what's driving customer issues"}
              {activePage === "AI Actions" &&
                "AI-generated recommendations and actions"}
              {activePage === "Analytics" &&
                "Customer experience performance overview"}
            </p>
          </div>

          <div className="header-actions">
            <div className="search-box">
              <Search size={18} />
              <input placeholder="Search..." />
            </div>

            <button className="notification-btn">
              <Bell size={19} />
              <span></span>
            </button>

            <div className="header-avatar">G</div>
          </div>
        </header>

        {/* DASHBOARD */}
        {activePage === "Dashboard" && (
          <div className="page-content">
            {/* AI BANNER */}
            <section className="ai-banner">
              <div className="ai-banner-icon">
                <Brain size={26} />
              </div>

              <div className="ai-banner-content">
                <div className="ai-banner-title">
                  <span>AI Intelligence Active</span>
                  <span className="live-pill">LIVE</span>
                </div>

                <p>
                  SentinelCX is continuously analyzing customer signals,
                  support tickets, orders and crisis patterns.
                </p>
              </div>

              {aiInsight && (
                <div className="ai-banner-score">
                  <span>Risk Score</span>
                  <strong>{aiInsight.risk_score}/100</strong>
                </div>
              )}
            </section>

            {/* STATS */}
            <section className="stats-grid">
              <StatCard
                title="Total Customers"
                value={totalCustomers}
                icon={<Users size={21} />}
                trend="+12%"
                trendUp={true}
              />

              <StatCard
                title="Support Tickets"
                value={totalTickets}
                icon={<MessageSquare size={21} />}
                trend="+8%"
                trendUp={true}
              />

              <StatCard
                title="Active Crises"
                value={activeCrises}
                icon={<AlertTriangle size={21} />}
                trend="Live"
                warning={activeCrises > 0}
              />

              <StatCard
                title="Customer Health"
                value={`${customerHealth}%`}
                icon={<Activity size={21} />}
                trend="+4%"
                trendUp={true}
              />
            </section>

            {/* MAIN DASHBOARD GRID */}
            <div className="dashboard-grid">
              {/* AI INTELLIGENCE */}
              <section className="panel ai-intelligence-panel">
                <div className="panel-header">
                  <div>
                    <h2>
                      <Brain size={20} />
                      Live AI Intelligence
                    </h2>
                    <p>Multi-signal reasoning engine</p>
                  </div>

                  <span className="live-indicator">
                    <span></span> Live
                  </span>
                </div>

                {aiInsight ? (
                  <div className="ai-insight-content">
                    <div className="insight-title-row">
                      <div>
                        <h3>{aiInsight.title}</h3>
                        <span
                          className={`risk-badge ${getRiskClass(
                            aiInsight.risk_level
                          )}`}
                        >
                          {aiInsight.risk_level} Risk
                        </span>
                      </div>

                      <div className="risk-score">
                        <strong>{aiInsight.risk_score}</strong>
                        <span>/100</span>
                      </div>
                    </div>

                    <div className="signal-grid">
                      <div className="signal-card">
                        <Clock size={17} />
                        <span>Delayed Orders</span>
                        <strong>
                          {aiInsight.signal?.delayed_orders ?? 0}
                        </strong>
                      </div>

                      <div className="signal-card">
                        <AlertTriangle size={17} />
                        <span>High Priority</span>
                        <strong>
                          {aiInsight.signal?.high_priority_tickets ?? 0}
                        </strong>
                      </div>

                      <div className="signal-card">
                        <XCircle size={17} />
                        <span>Cancelled</span>
                        <strong>
                          {aiInsight.signal?.cancelled_orders ?? 0}
                        </strong>
                      </div>

                      <div className="signal-card">
                        <ShieldAlert size={17} />
                        <span>Active Crises</span>
                        <strong>
                          {aiInsight.signal?.active_crises ?? 0}
                        </strong>
                      </div>
                    </div>

                    <div className="reasoning-box">
                      <div className="reasoning-heading">
                        <Brain size={16} />
                        <span>AI Reasoning</span>
                      </div>

                      <p>{aiInsight.reasoning}</p>
                    </div>

                    <div className="recommendation-box">
                      <div className="recommendation-heading">
                        <Zap size={16} />
                        <span>Recommended Action</span>
                      </div>

                      <p>{aiInsight.recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <Brain size={30} />
                    <p>Analyzing customer signals...</p>
                  </div>
                )}
              </section>

              {/* CRISIS */}
              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h2>
                      <AlertTriangle size={20} />
                      Live Customer Crisis
                    </h2>
                    <p>Priority situations detected</p>
                  </div>

                  <button
                    className="view-all-btn"
                    onClick={() => setActivePage("Crisis Center")}
                  >
                    View all <ChevronRight size={15} />
                  </button>
                </div>

                {crises.length > 0 ? (
                  <div className="crisis-list">
                    {crises.slice(0, 4).map((crisis, index) => (
                      <div className="crisis-item" key={crisis.id || index}>
                        <div className="crisis-icon">
                          <AlertTriangle size={18} />
                        </div>

                        <div className="crisis-info">
                          <strong>
                            {crisis.title ||
                              crisis.issue ||
                              "Customer Crisis"}
                          </strong>

                          <span>
                            {crisis.description ||
                              crisis.status ||
                              "Requires attention"}
                          </span>
                        </div>

                        <span
                          className={`priority ${
                            crisis.priority?.toLowerCase() || "medium"
                          }`}
                        >
                          {crisis.priority || "Medium"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <CheckCircle size={30} />
                    <p>No active crises detected</p>
                  </div>
                )}
              </section>
            </div>

            {/* BOTTOM GRID */}
            <div className="dashboard-grid bottom-grid">
              {/* ROOT CAUSES */}
              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h2>
                      <GitBranch size={20} />
                      Top Root Causes
                    </h2>
                    <p>Leading customer complaints</p>
                  </div>

                  <button
                    className="view-all-btn"
                    onClick={() => setActivePage("Root Causes")}
                  >
                    View all <ChevronRight size={15} />
                  </button>
                </div>

                <div className="root-cause-list">
                  {complaints.length > 0 ? (
                    complaints.slice(0, 5).map((complaint, index) => (
                      <RootCause
                        key={complaint.id || index}
                        title={
                          complaint.category ||
                          complaint.name ||
                          complaint.complaint_category ||
                          "Customer Issue"
                        }
                        count={
                          complaint.count ||
                          complaint.total ||
                          complaint.frequency ||
                          0
                        }
                        percentage={
                          complaint.percentage ||
                          complaint.percent ||
                          0
                        }
                      />
                    ))
                  ) : (
                    <div className="empty-state">
                      <GitBranch size={30} />
                      <p>No complaint data available</p>
                    </div>
                  )}
                </div>
              </section>

              {/* AI ACTIONS */}
              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h2>
                      <Zap size={20} />
                      AI Actions
                    </h2>
                    <p>Recommended next steps</p>
                  </div>

                  <button
                    className="view-all-btn"
                    onClick={() => setActivePage("AI Actions")}
                  >
                    View all <ChevronRight size={15} />
                  </button>
                </div>

                <div className="action-list">
                  {aiActions.length > 0 ? (
                    aiActions.slice(0, 4).map((action, index) => (
                      <ActionItem
                        key={action.id || index}
                        action={
                          action.action ||
                          action.title ||
                          action.recommendation ||
                          "Recommended action"
                        }
                        priority={action.priority || "Medium"}
                        status={action.status || "Pending"}
                      />
                    ))
                  ) : (
                    <div className="empty-state">
                      <Zap size={30} />
                      <p>No AI actions available</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* CUSTOMERS */}
        {activePage === "Customers" && (
          <div className="page-content">
            <section className="panel full-panel">
              <div className="panel-header">
                <div>
                  <h2>
                    <Users size={20} />
                    Customer Directory
                  </h2>
                  <p>{customers.length} customers in the system</p>
                </div>
              </div>

              {customers.length > 0 ? (
                <div className="data-table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Segment</th>
                      </tr>
                    </thead>

                    <tbody>
                      {customers.map((customer, index) => (
                        <tr key={customer.id || index}>
                          <td>
                            <div className="table-user">
                              <div className="small-avatar">
                                {(customer.name || "C")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <strong>
                                {customer.name ||
                                  customer.customer_name ||
                                  "Customer"}
                              </strong>
                            </div>
                          </td>

                          <td>
                            {customer.email || "—"}
                          </td>

                          <td>
                            <span className="status-badge active">
                              {customer.status || "Active"}
                            </span>
                          </td>

                          <td>
                            {customer.segment || customer.type || "Standard"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <Users size={35} />
                  <p>No customers found</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* SUPPORT INBOX */}
        {activePage === "Support Inbox" && (
          <div className="page-content">
            <section className="panel full-panel">
              <div className="panel-header">
                <div>
                  <h2>
                    <MessageSquare size={20} />
                    Support Inbox
                  </h2>
                  <p>Customer support signals</p>
                </div>
              </div>

              {tickets.length > 0 ? (
                <div className="ticket-list">
                  {tickets.map((ticket, index) => (
                    <div
                      className="ticket-card"
                      key={ticket.id || index}
                    >
                      <div className="ticket-icon">
                        <MessageSquare size={18} />
                      </div>

                      <div className="ticket-content">
                        <div className="ticket-top">
                          <strong>
                            {ticket.subject ||
                              ticket.title ||
                              "Customer Support Ticket"}
                          </strong>

                          <span
                            className={`priority ${
                              ticket.priority?.toLowerCase() || "medium"
                            }`}
                          >
                            {ticket.priority || "Medium"}
                          </span>
                        </div>

                        <p>
                          {ticket.description ||
                            ticket.message ||
                            ticket.issue ||
                            "No description available"}
                        </p>

                        <div className="ticket-meta">
                          <span>
                            Status: {ticket.status || "Open"}
                          </span>

                          {ticket.customer_name && (
                            <span>
                              Customer: {ticket.customer_name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <MessageSquare size={35} />
                  <p>No support tickets found</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* CRISIS CENTER */}
        {activePage === "Crisis Center" && (
          <div className="page-content">
            <section className="panel full-panel">
              <div className="panel-header">
                <div>
                  <h2>
                    <AlertTriangle size={20} />
                    Crisis Center
                  </h2>
                  <p>Customer issues requiring attention</p>
                </div>
              </div>

              {crises.length > 0 ? (
                <div className="crisis-list large">
                  {crises.map((crisis, index) => (
                    <div
                      className="crisis-item"
                      key={crisis.id || index}
                    >
                      <div className="crisis-icon">
                        <AlertTriangle size={19} />
                      </div>

                      <div className="crisis-info">
                        <strong>
                          {crisis.title ||
                            crisis.issue ||
                            "Customer Crisis"}
                        </strong>

                        <span>
                          {crisis.description ||
                            crisis.status ||
                            "Requires attention"}
                        </span>
                      </div>

                      <span
                        className={`priority ${
                          crisis.priority?.toLowerCase() || "medium"
                        }`}
                      >
                        {crisis.priority || "Medium"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <CheckCircle size={35} />
                  <p>No active crises detected</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ROOT CAUSES */}
        {activePage === "Root Causes" && (
          <div className="page-content">
            <section className="panel full-panel">
              <div className="panel-header">
                <div>
                  <h2>
                    <GitBranch size={20} />
                    Root Cause Analysis
                  </h2>
                  <p>
                    AI-assisted analysis of customer complaint patterns
                  </p>
                </div>
              </div>

              {complaints.length > 0 ? (
                <div className="root-cause-grid">
                  {complaints.map((complaint, index) => (
                    <div
                      className="root-cause-card"
                      key={complaint.id || index}
                    >
                      <div className="root-cause-card-icon">
                        <GitBranch size={19} />
                      </div>

                      <div>
                        <h3>
                          {complaint.category ||
                            complaint.name ||
                            complaint.complaint_category ||
                            "Customer Issue"}
                        </h3>

                        <p>
                          {complaint.count ||
                            complaint.total ||
                            complaint.frequency ||
                            0}{" "}
                          reported cases
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <GitBranch size={35} />
                  <p>No root cause data available</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* AI ACTIONS */}
        {activePage === "AI Actions" && (
          <div className="page-content">
            <section className="panel full-panel">
              <div className="panel-header">
                <div>
                  <h2>
                    <Brain size={20} />
                    AI Reasoning Engine
                  </h2>
                  <p>
                    Recommendations generated from multiple customer
                    data sources
                  </p>
                </div>

                {aiInsight && (
                  <span
                    className={`risk-badge ${getRiskClass(
                      aiInsight.risk_level
                    )}`}
                  >
                    {aiInsight.risk_level} Risk
                  </span>
                )}
              </div>

              {aiInsight ? (
                <div className="ai-actions-content">
                  <div className="large-insight-card">
                    <div className="large-insight-header">
                      <div>
                        <h3>{aiInsight.title}</h3>

                        <p>
                          Generated using:
                          {aiInsight.data_sources?.join(", ") ||
                            "multiple data sources"}
                        </p>
                      </div>

                      <div className="large-risk-score">
                        {aiInsight.risk_score}
                        <small>/100</small>
                      </div>
                    </div>

                    <div className="reasoning-box">
                      <div className="reasoning-heading">
                        <Brain size={17} />
                        <span>Reasoning</span>
                      </div>

                      <p>{aiInsight.reasoning}</p>
                    </div>

                    <div className="recommendation-box">
                      <div className="recommendation-heading">
                        <Zap size={17} />
                        <span>Recommended Action</span>
                      </div>

                      <p>{aiInsight.recommendation}</p>
                    </div>

                    <div className="insight-details">
                      <div>
                        <span>Affected Hub</span>
                        <strong>
                          {aiInsight.affected_hub || "Multiple"}
                        </strong>
                      </div>

                      <div>
                        <span>Affected Customers</span>
                        <strong>
                          {aiInsight.affected_customers ?? 0}
                        </strong>
                      </div>

                      <div>
                        <span>Leading Complaint</span>
                        <strong>
                          {aiInsight.signal?.leading_complaint ||
                            "None detected"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="action-section">
                    <h3>AI Actions</h3>

                    {aiActions.length > 0 ? (
                      <div className="action-list">
                        {aiActions.map((action, index) => (
                          <ActionItem
                            key={action.id || index}
                            action={
                              action.action ||
                              action.title ||
                              action.recommendation ||
                              "Recommended action"
                            }
                            priority={action.priority || "Medium"}
                            status={action.status || "Pending"}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <Zap size={30} />
                        <p>No AI actions available</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <Brain size={35} />
                  <p>AI reasoning engine is analyzing the data...</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ANALYTICS */}
        {activePage === "Analytics" && (
          <div className="page-content">
            <section className="stats-grid">
              <StatCard
                title="Customers"
                value={totalCustomers}
                icon={<Users size={21} />}
                trend="Live"
              />

              <StatCard
                title="Support Tickets"
                value={totalTickets}
                icon={<MessageSquare size={21} />}
                trend="Live"
              />

              <StatCard
                title="Active Crises"
                value={activeCrises}
                icon={<AlertTriangle size={21} />}
                trend="Live"
                warning={activeCrises > 0}
              />

              <StatCard
                title="Ticket Resolution"
                value={`${supportHealth}%`}
                icon={<CheckCircle size={21} />}
                trend="Calculated"
              />
            </section>

            <div className="analytics-grid">
              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h2>
                      <BarChart3 size={20} />
                      Experience Health
                    </h2>
                    <p>Current customer experience indicators</p>
                  </div>
                </div>

                <div className="analytics-list">
                  <AnalyticsItem
                    title="Customer Health"
                    value={`${customerHealth}%`}
                    percentage={customerHealth}
                  />

                  <AnalyticsItem
                    title="Support Resolution"
                    value={`${supportHealth}%`}
                    percentage={supportHealth}
                  />

                  <AnalyticsItem
                    title="Crisis Control"
                    value={
                      activeCrises === 0
                        ? "100%"
                        : `${Math.max(
                            0,
                            100 - activeCrises * 10
                          )}%`
                    }
                    percentage={
                      activeCrises === 0
                        ? 100
                        : Math.max(0, 100 - activeCrises * 10)
                    }
                  />
                </div>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h2>
                      <TrendingUp size={20} />
                      AI Risk Overview
                    </h2>
                    <p>Latest intelligence assessment</p>
                  </div>
                </div>

                {aiInsight ? (
                  <div className="analytics-risk">
                    <div className="analytics-risk-score">
                      <strong>{aiInsight.risk_score}</strong>
                      <span>/100</span>
                    </div>

                    <div>
                      <span
                        className={`risk-badge ${getRiskClass(
                          aiInsight.risk_level
                        )}`}
                      >
                        {aiInsight.risk_level} Risk
                      </span>

                      <p>{aiInsight.title}</p>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <Brain size={30} />
                    <p>Risk analysis unavailable</p>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* SIDEBAR ITEM */
function SidebarItem({ icon, text, active, onClick }) {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

/* STAT CARD */
function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  warning,
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">{icon}</div>

        <span
          className={`stat-trend ${
            warning
              ? "warning"
              : trendUp
              ? "up"
              : ""
          }`}
        >
          {trend}
        </span>
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
    </div>
  );
}

/* ROOT CAUSE */
function RootCause({ title, count, percentage }) {
  const safePercentage =
    Number(percentage) > 0
      ? Math.min(100, Number(percentage))
      : 0;

  return (
    <div className="root-cause-item">
      <div className="root-cause-info">
        <div>
          <strong>{title}</strong>
          <span>{count} cases</span>
        </div>

        <strong>{safePercentage}%</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${safePercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

/* AI ACTION */
function ActionItem({ action, priority, status }) {
  return (
    <div className="action-item">
      <div className="action-icon">
        <Zap size={17} />
      </div>

      <div className="action-content">
        <strong>{action}</strong>

        <div className="action-meta">
          <span
            className={`priority ${
              priority?.toLowerCase() || "medium"
            }`}
          >
            {priority}
          </span>

          <span className="action-status">
            {status}
          </span>
        </div>
      </div>

      <ChevronRight size={17} />
    </div>
  );
}

/* ANALYTICS ITEM */
function AnalyticsItem({ title, value, percentage }) {
  return (
    <div className="analytics-item">
      <div className="analytics-item-top">
        <span>{title}</span>
        <strong>{value}</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${Math.min(
              100,
              Math.max(0, Number(percentage) || 0)
            )}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;