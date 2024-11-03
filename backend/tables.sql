drop table if exists `users_table`;
CREATE TABLE `users_table` (`user_id` int PRIMARY KEY auto_increment, `username` varchar(255), `password` varchar(255), `email` varchar(255), `role` ENUM('mentor', 'mentee', 'both'), `organization` ENUM('Tech for Good', 'Code Masters', 'Youth Innovators'));
drop table if exists `request_table`;
CREATE TABLE `request_table` (`request_id` int PRIMARY KEY auto_increment, `user_id` int, `request_type` ENUM('resume_review', 'elevator_pitch', 'class_help', 'business_idea'), `request_status` ENUM('pending', 'matched', 'completed'));

-- Sample data insertion

-- USERS_TABLE
INSERT INTO `users_table` (`username`, `password`, `email`, `role`, `organization`) VALUES
('Alice', 'password123', 'alice@example.com', 'mentor', 'Tech for Good'),
('Bob', 'securepass', 'bob@example.com', 'mentee', 'Code Masters'),
('Charlie', 'charliepass', 'charlie@example.com', 'both', 'Youth Innovators');

-- REQUEST_TABLE
INSERT INTO `request_table` (`user_id`, `request_type`, `request_status`) VALUES
(1, 'resume_review', 'pending'),  -- Alice requests resume review
(2, 'class_help', 'matched'),     -- Bob requests class help
(3, 'business_idea', 'completed');  -- Charlie requests business idea feedback
