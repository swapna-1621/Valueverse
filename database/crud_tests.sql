-- ============================================================
-- ValueVerse CRUD Tests
-- ============================================================

-- CREATE
INSERT INTO resources
(item, quantity, location, category, condition, estimated_value, value_score)
VALUES
('Test Laptop', 2, 'Chennai', 'E2Value', 'Working', 8000, 90);

-- READ
SELECT *
FROM resources
ORDER BY id;

-- READ ONE
SELECT *
FROM resources
WHERE id = 1;

-- UPDATE
UPDATE resources
SET quantity = 120,
    estimated_value = 600,
    value_score = 85
WHERE id = 1;

-- Verify UPDATE
SELECT *
FROM resources
WHERE id = 1;

-- DELETE
DELETE FROM resources
WHERE item = 'Test Laptop';

-- Verify DELETE
SELECT *
FROM resources
ORDER BY id;
