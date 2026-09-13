const pool = require("./src/config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SentinelCX Backend is running!",
    status: "success",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    service: "SentinelCX API",
    status: "healthy",
  });
});

const PORT = process.env.PORT || 5000;


// ======================================================
// DATABASE TEST
// ======================================================

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      status: "success",
      message: "PostgreSQL connected!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});


// ======================================================
// CUSTOMERS
// ======================================================

app.get("/api/customers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch customers",
    });
  }
});


// ======================================================
// ORDERS
// ======================================================

app.get("/api/orders", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        orders.*,
        customers.name AS customer_name,
        products.name AS product_name,
        delivery_hubs.hub_code
      FROM orders
      JOIN customers 
        ON orders.customer_id = customers.id
      JOIN products 
        ON orders.product_id = products.id
      JOIN delivery_hubs 
        ON orders.hub_id = delivery_hubs.id
      ORDER BY orders.id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch orders",
    });
  }
});


// ======================================================
// SUPPORT TICKETS
// ======================================================

app.get("/api/tickets", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        tickets.*,
        customers.name AS customer_name
      FROM tickets
      JOIN customers 
        ON tickets.customer_id = customers.id
      ORDER BY tickets.id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch tickets",
    });
  }
});


// ======================================================
// CRISES
// ======================================================

app.get("/api/crises", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM crises
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch crises",
    });
  }
});


// ======================================================
// AI ACTIONS
// ======================================================

app.get("/api/ai-actions", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        ai_actions.*,
        customers.name AS customer_name
      FROM ai_actions
      LEFT JOIN customers
        ON ai_actions.customer_id = customers.id
      ORDER BY ai_actions.id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch AI actions",
    });
  }
});


// ======================================================
// COMPLAINT CATEGORIES
// ======================================================

app.get("/api/complaints", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM complaint_categories
      ORDER BY complaint_count DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch complaint categories",
    });
  }
});


// ======================================================
// AI REASONING ENGINE
// ======================================================

app.get("/api/ai-insights", async (req, res) => {
  try {
    // --------------------------------------------------
    // 1. Collect information from multiple data sources
    // --------------------------------------------------

    const ordersResult = await pool.query(`
      SELECT 
        orders.*,
        customers.name AS customer_name,
        products.name AS product_name,
        delivery_hubs.hub_code
      FROM orders
      JOIN customers 
        ON orders.customer_id = customers.id
      JOIN products 
        ON orders.product_id = products.id
      JOIN delivery_hubs 
        ON orders.hub_id = delivery_hubs.id
    `);

    const ticketsResult = await pool.query(`
      SELECT 
        tickets.*,
        customers.name AS customer_name
      FROM tickets
      JOIN customers 
        ON tickets.customer_id = customers.id
    `);

    const complaintsResult = await pool.query(`
      SELECT *
      FROM complaint_categories
      ORDER BY complaint_count DESC
    `);

    const crisesResult = await pool.query(`
      SELECT *
      FROM crises
      ORDER BY id DESC
    `);


    const orders = ordersResult.rows;
    const tickets = ticketsResult.rows;
    const complaints = complaintsResult.rows;
    const crises = crisesResult.rows;


    // --------------------------------------------------
    // 2. Analyse order status
    // --------------------------------------------------

    const delayedOrders = orders.filter((order) => {
      const status = String(
        order.status || order.order_status || ""
      ).toLowerCase();

      return (
        status.includes("delay") ||
        status.includes("late")
      );
    });


    const cancelledOrders = orders.filter((order) => {
      const status = String(
        order.status || order.order_status || ""
      ).toLowerCase();

      return status.includes("cancel");
    });


    // --------------------------------------------------
    // 3. Analyse support tickets
    // --------------------------------------------------

    const highPriorityTickets = tickets.filter((ticket) => {
      const priority = String(
        ticket.priority || ""
      ).toLowerCase();

      return (
        priority.includes("high") ||
        priority.includes("critical") ||
        priority.includes("urgent")
      );
    });


    // --------------------------------------------------
    // 4. Find the most affected delivery hub
    // --------------------------------------------------

    const hubCounts = {};

    delayedOrders.forEach((order) => {
      const hub = order.hub_code || "Unknown Hub";

      hubCounts[hub] = (hubCounts[hub] || 0) + 1;
    });


    let highestRiskHub = null;
    let highestRiskHubCount = 0;

    Object.entries(hubCounts).forEach(
      ([hub, count]) => {
        if (count > highestRiskHubCount) {
          highestRiskHub = hub;
          highestRiskHubCount = count;
        }
      }
    );


    // --------------------------------------------------
    // 5. Find most common complaint
    // --------------------------------------------------

    let topComplaint = null;

    if (complaints.length > 0) {
      topComplaint = complaints[0];
    }


    // --------------------------------------------------
    // 6. Calculate risk score
    // --------------------------------------------------

    let riskScore = 0;

    if (delayedOrders.length > 0) {
      riskScore += Math.min(
        delayedOrders.length * 10,
        40
      );
    }

    if (highPriorityTickets.length > 0) {
      riskScore += Math.min(
        highPriorityTickets.length * 10,
        30
      );
    }

    if (topComplaint) {
      const complaintCount = Number(
        topComplaint.complaint_count || 0
      );

      if (complaintCount >= 5) {
        riskScore += 20;
      } else if (complaintCount > 0) {
        riskScore += 10;
      }
    }

    if (crises.length > 0) {
      riskScore += 10;
    }

    riskScore = Math.min(riskScore, 100);


    // --------------------------------------------------
    // 7. Determine risk level
    // --------------------------------------------------

    let riskLevel = "Low";

    if (riskScore >= 70) {
      riskLevel = "Critical";
    } else if (riskScore >= 40) {
      riskLevel = "High";
    } else if (riskScore >= 20) {
      riskLevel = "Medium";
    }


    // --------------------------------------------------
    // 8. Build reasoning
    // --------------------------------------------------

    const reasoningParts = [];

    if (delayedOrders.length > 0) {
      reasoningParts.push(
        `${delayedOrders.length} delayed order(s) detected`
      );
    }

    if (highestRiskHub) {
      reasoningParts.push(
        `${highestRiskHub} has the highest concentration of delayed orders`
      );
    }

    if (highPriorityTickets.length > 0) {
      reasoningParts.push(
        `${highPriorityTickets.length} high-priority support ticket(s) indicate customer dissatisfaction`
      );
    }

    if (topComplaint) {
      const complaintName =
        topComplaint.category ||
        topComplaint.name ||
        topComplaint.complaint_category ||
        topComplaint.title ||
        "customer complaints";

      reasoningParts.push(
        `"${complaintName}" is the leading complaint category`
      );
    }

    if (crises.length > 0) {
      reasoningParts.push(
        "an active customer experience crisis is already present"
      );
    }


    const reasoning =
      reasoningParts.length > 0
        ? reasoningParts.join(". ") + "."
        : "No significant negative customer experience pattern was detected.";


    // --------------------------------------------------
    // 9. Generate AI recommendation
    // --------------------------------------------------

    let recommendation =
      "Continue monitoring customer experience signals.";

    if (riskScore >= 70) {
      recommendation =
        "Immediately notify affected customers, prioritize delayed orders, and escalate the issue to operations leadership.";
    } else if (riskScore >= 40) {
      recommendation =
        "Proactively contact affected customers, investigate the main operational bottleneck, and prioritize high-risk support tickets.";
    } else if (riskScore >= 20) {
      recommendation =
        "Monitor the emerging pattern and proactively address the leading complaint category before it becomes a larger crisis.";
    }


    // --------------------------------------------------
    // 10. Build final AI insight
    // --------------------------------------------------

    const insight = {
      title:
        highestRiskHub
          ? `Potential disruption detected at ${highestRiskHub}`
          : "Customer Experience Risk Analysis",

      risk_score: riskScore,

      risk_level: riskLevel,

      signal: {
        delayed_orders: delayedOrders.length,
        high_priority_tickets:
          highPriorityTickets.length,
        active_crises: crises.length,
        cancelled_orders: cancelledOrders.length,
        leading_complaint:
          topComplaint
            ? (
                topComplaint.category ||
                topComplaint.name ||
                topComplaint.complaint_category ||
                topComplaint.title ||
                "Unknown"
              )
            : "None",
      },

      reasoning,

      recommendation,

      affected_hub:
        highestRiskHub || "No specific hub identified",

      affected_customers: delayedOrders.length,

      data_sources: [
        "Orders",
        "Support Tickets",
        "Complaint Categories",
        "Crisis Records",
      ],

      generated_at: new Date().toISOString(),
    };


    res.json({
      status: "success",
      message:
        "SentinelCX AI reasoning completed",
      insight,
    });

  } catch (error) {
    console.error(
      "AI reasoning error:",
      error
    );

    res.status(500).json({
      status: "error",
      message:
        "Failed to generate AI insight",
    });
  }
});


// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, () => {
  console.log(
    `SentinelCX backend running on http://localhost:${PORT}`
  );
});