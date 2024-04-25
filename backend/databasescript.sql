-- Check if the table exists and drop it if it does
DROP TABLE IF EXISTS public.users;

-- Create the table
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insert example entries into the table
INSERT INTO public.users (username, email, password) VALUES
('Alice', 'alice@example.com', 'password123'),
('Bob', 'bob@example.com', 's3curepassword'),
('Charlie', 'charlie@example.com', 'my_pass_456'),
('David', 'david@example.com', 'pass2024'),
('Eve', 'eve@example.com', 'evepassword');
