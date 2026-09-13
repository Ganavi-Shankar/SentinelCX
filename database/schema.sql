-- ==========================================
-- SENTINELCX DATABASE
-- ==========================================

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100),
    customer_risk INTEGER DEFAULT 0,
    complaint_risk INTEGER DEFAULT 0,
    escalation_risk INTEGER DEFAULT 0,
    churn_risk INTEGER DEFAULT 0,
    sentiment VARCHAR(30) DEFAULT 'Neutral',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE delivery_hubs (
    id SERIAL PRIMARY KEY,
    hub_code VARCHAR(50) UNIQUE NOT NULL,
    location VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Operational'
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    product_id INTEGER REFERENCES products(id),
    hub_id INTEGER REFERENCES delivery_hubs(id),
    order_status VARCHAR(50),
    order_date DATE,
    expected_delivery DATE,
    actual_delivery DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    order_id INTEGER REFERENCES orders(id),
    subject VARCHAR(200),
    message TEXT,
    category VARCHAR(100),
    priority VARCHAR(30) DEFAULT 'Medium',
    sentiment VARCHAR(30),
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interactions (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    interaction_type VARCHAR(50),
    message TEXT,
    sentiment VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crises (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    severity VARCHAR(30),
    affected_customers INTEGER DEFAULT 0,
    predicted_complaints INTEGER DEFAULT 0,
    root_cause VARCHAR(200),
    confidence INTEGER DEFAULT 0,
    revenue_risk DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_actions (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    crisis_id INTEGER REFERENCES crises(id),
    action_type VARCHAR(100),
    description TEXT,
    status VARCHAR(50) DEFAULT 'Recommended',
    risk_before INTEGER,
    risk_after INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE complaint_categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    complaint_count INTEGER DEFAULT 0,
    percentage DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(200),
    entity_type VARCHAR(100),
    entity_id INTEGER,
    performed_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);