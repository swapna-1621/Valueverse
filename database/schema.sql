-- ============================================================
-- ValueVerse Database Schema
-- Database: valueverse
-- ============================================================

CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    item VARCHAR(100) NOT NULL,
    quantity NUMERIC NOT NULL,
    location VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    condition VARCHAR(50),
    estimated_value NUMERIC,
    value_score NUMERIC,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
