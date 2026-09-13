-- ==========================================
-- SENTINELCX DEMO DATA
-- ==========================================

-- CUSTOMERS

INSERT INTO customers
(name, email, phone, city, customer_risk, complaint_risk, escalation_risk, churn_risk, sentiment)
VALUES
('Rahul Sharma', 'rahul@example.com', '9876543210', 'Bengaluru', 86, 86, 84, 78, 'Negative'),

('Priya Nair', 'priya@example.com', '9876543211', 'Bengaluru', 72, 74, 68, 65, 'Negative'),

('Arjun Kumar', 'arjun@example.com', '9876543212', 'Mysuru', 35, 30, 28, 32, 'Neutral'),

('Sneha Rao', 'sneha@example.com', '9876543213', 'Bengaluru', 18, 15, 12, 10, 'Positive'),

('Vikram Singh', 'vikram@example.com', '9876543214', 'Hyderabad', 62, 65, 60, 58, 'Negative'),

('Ananya Patel', 'ananya@example.com', '9876543215', 'Bengaluru', 22, 20, 18, 15, 'Positive'),

('Kiran Gowda', 'kiran@example.com', '9876543216', 'Mysuru', 48, 45, 42, 40, 'Neutral'),

('Meera Iyer', 'meera@example.com', '9876543217', 'Chennai', 67, 70, 64, 61, 'Negative'),

('Rohan Das', 'rohan@example.com', '9876543218', 'Bengaluru', 27, 25, 20, 18, 'Positive'),

('Divya Shetty', 'divya@example.com', '9876543219', 'Mangaluru', 81, 83, 80, 76, 'Negative');


-- PRODUCTS

INSERT INTO products
(name, category, price)
VALUES
('Smartphone X1', 'Electronics', 24999),
('Wireless Earbuds', 'Electronics', 2999),
('Laptop Pro 14', 'Electronics', 67999),
('Smart Watch', 'Wearables', 5999),
('Bluetooth Speaker', 'Electronics', 3499);


-- DELIVERY HUBS

INSERT INTO delivery_hubs
(hub_code, location, status)
VALUES
('BLR-HUB-01', 'Bengaluru', 'Operational'),
('BLR-HUB-02', 'Bengaluru', 'Operational'),
('BLR-HUB-03', 'Bengaluru', 'Operational'),
('BLR-HUB-04', 'Bengaluru', 'Disrupted'),
('MYS-HUB-01', 'Mysuru', 'Operational');


-- ORDERS

INSERT INTO orders
(customer_id, product_id, hub_id, order_status, order_date, expected_delivery)
VALUES
(1, 1, 4, 'Delayed', CURRENT_DATE - 3, CURRENT_DATE - 1),

(2, 2, 4, 'Delayed', CURRENT_DATE - 2, CURRENT_DATE),

(3, 3, 1, 'Delivered', CURRENT_DATE - 5, CURRENT_DATE - 2),

(4, 4, 2, 'Delivered', CURRENT_DATE - 4, CURRENT_DATE - 1),

(5, 5, 4, 'Delayed', CURRENT_DATE - 2, CURRENT_DATE),

(6, 1, 3, 'Delivered', CURRENT_DATE - 7, CURRENT_DATE - 4),

(7, 2, 1, 'Delivered', CURRENT_DATE - 6, CURRENT_DATE - 3),

(8, 3, 4, 'Delayed', CURRENT_DATE - 3, CURRENT_DATE - 1),

(9, 4, 2, 'Delivered', CURRENT_DATE - 5, CURRENT_DATE - 2),

(10, 5, 4, 'Delayed', CURRENT_DATE - 2, CURRENT_DATE);


-- SUPPORT TICKETS

INSERT INTO tickets
(customer_id, order_id, subject, message, category, priority, sentiment)
VALUES
(1, 1,
'Order is delayed',
'My order has still not arrived. This is the second time my delivery has been delayed.',
'Delivery Delay',
'High',
'Negative'),

(2, 2,
'Where is my order?',
'My delivery is late and I need the product urgently.',
'Delivery Delay',
'High',
'Negative'),

(5, 5,
'Delivery problem',
'The tracking has not changed for two days.',
'Delivery Delay',
'Medium',
'Negative'),

(8, 8,
'Late delivery',
'My order was supposed to arrive yesterday.',
'Delivery Delay',
'High',
'Negative'),

(10, 10,
'Delivery delayed again',
'This is the second delay I have experienced recently.',
'Delivery Delay',
'High',
'Negative');


-- CUSTOMER INTERACTIONS

INSERT INTO interactions
(customer_id, interaction_type, message, sentiment)
VALUES
(1, 'Chat',
'Customer complained about previous delivery delay.',
'Negative'),

(1, 'Email',
'Customer requested faster delivery.',
'Negative'),

(1, 'Support',
'Customer contacted support regarding current delayed order.',
'Negative'),

(2, 'Chat',
'Customer asked about delivery status.',
'Negative'),

(5, 'Chat',
'Customer expressed frustration about tracking.',
'Negative'),

(8, 'Email',
'Customer requested delivery update.',
'Negative'),

(10, 'Chat',
'Customer complained about repeated delays.',
'Negative');


-- CRISIS

INSERT INTO crises
(title, severity, affected_customers, predicted_complaints,
root_cause, confidence, revenue_risk, status)
VALUES
(
'Delivery Hub Disruption',
'Critical',
73,
41,
'BLR-HUB-04 disruption',
94,
180000,
'Active'
);


-- COMPLAINT ROOT CAUSES

INSERT INTO complaint_categories
(category, complaint_count, percentage)
VALUES
('Delivery Delays', 320, 32),
('Payment Failures', 210, 21),
('Product Defects', 170, 17),
('Refund Delays', 110, 11),
('Wrong Product', 90, 9),
('Other', 100, 10);


-- AI ACTIONS

INSERT INTO ai_actions
(customer_id, crisis_id, action_type, description, status, risk_before, risk_after)
VALUES
(
1,
1,
'Proactive Notification',
'Notify customer about delivery disruption before they contact support.',
'Executed',
89,
51
),

(
2,
1,
'Priority Escalation',
'Prioritize delayed order for logistics investigation.',
'Executed',
82,
48
),

(
5,
1,
'Compensation Recommendation',
'Recommend simulated ₹200 compensation for affected customer.',
'Recommended',
78,
45
);