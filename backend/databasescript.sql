-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.bookmarks;
DROP TABLE IF EXISTS public.storybook_data;
DROP TABLE IF EXISTS public.storybooks;
DROP TABLE IF EXISTS public.users;

-- Create the users table
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create the storybooks table with new columns
CREATE TABLE public.storybooks (
    user_id INT,
    storybook_id SERIAL PRIMARY KEY,
    storybook_title VARCHAR(255),
    coverimage VARCHAR(600),
    image1 VARCHAR(600),
    text1 TEXT,
    image2 VARCHAR(600),
    text2 TEXT,
    image3 VARCHAR(600),
    text3 TEXT,
    image4 VARCHAR(600),
    text4 TEXT,
    image5 VARCHAR(600),
    text5 TEXT,
    genre VARCHAR(255),
    artstyle VARCHAR(255),
    privacy BOOLEAN NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.users (id)
);

-- Create the storybook_data table
CREATE TABLE public.storybook_data (
    storybook_id INT,
    likes INT,
    dislikes INT,
    viewership INT,
    PRIMARY KEY (storybook_id),
    FOREIGN KEY (storybook_id) REFERENCES public.storybooks (storybook_id)
);

-- Create the bookmarks table
CREATE TABLE public.bookmarks (
    bookmark_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    storybook_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.users (id)
);

-- Insert example entries into the users table
INSERT INTO public.users (username, email, password) VALUES
('Alice', 'alice@example.com', 'password123'),
('Bob', 'bob@example.com', 's3curepassword'),
('Charlie', 'charlie@example.com', 'my_pass_456'),
('David', 'david@example.com', 'pass2024'),
('Eve', 'eve@example.com', 'evepassword');

-- Insert example entries into the storybooks table with genre and artstyle
INSERT INTO public.storybooks (user_id, storybook_title, coverimage, image1, text1, image2, text2, image3, text3, image4, text4, image5, text5, genre, artstyle, privacy) VALUES
(1, 'The Adventures of PixelBot', 'https://i.imgur.com/Yei17R3.jpeg', 'https://example.com/image1.jpg', 'Once upon a time...', 'https://example.com/image2.jpg', 'Alice found a rabbit hole.', 'https://example.com/image3.jpg', 'She fell down.', 'https://example.com/image4.jpg', 'There was a tea party.', 'https://example.com/image5.jpg', 'The end.', 'Fantasy', 'Cartoon', false),
(2, 'The Adventures Of Dotty Duck', 'https://i.imgur.com/tgG3Ssg.png', 'https://example.com/image1_2.jpg', 'Bob is a builder.', 'https://example.com/image2_2.jpg', 'He builds houses.', 'https://example.com/image3_2.jpg', 'He uses a hammer.', 'https://example.com/image4_2.jpg', 'And also a saw.', 'https://example.com/image5_2.jpg', 'Time for tea.', 'Comedy', 'Watercolor', true),
(3, 'Mios Magical Journey', 'https://i.imgur.com/nimOA0N.jpeg', 'https://example.com/image1_3.jpg', 'Charlie finds a golden ticket.', 'https://example.com/image2_3.jpg', 'He visits the factory.', 'https://example.com/image3_3.jpg', 'He sees the Oompa-Loompas.', 'https://example.com/image4_3.jpg', 'Charlie wins the factory.', 'https://example.com/image5_3.jpg', 'He lives happily ever after.', 'Adventure', 'Realistic', false);

-- Insert example entries into the storybook_data table
INSERT INTO public.storybook_data (storybook_id, likes, dislikes, viewership) VALUES
(1, 100, 10, 500),
(2, 150, 5, 600),
(3, 200, 20, 800);

-- Select statements to verify data insertion
SELECT u.username, s.storybook_id, s.storybook_title, s.coverimage, s.privacy, s.genre, s.artstyle, d.likes, d.dislikes, d.viewership
FROM public.storybooks s
JOIN public.users u ON s.user_id = u.id
JOIN public.storybook_data d ON s.storybook_id = d.storybook_id;

