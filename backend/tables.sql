drop table if exists `users_table`;
CREATE TABLE `users_table` (`user_id` int PRIMARY KEY auto_increment, `username` varchar(255), `password` varchar(255), `email` varchar(255), `expertise` varchar(255));
drop table if exists `roles_table`;
CREATE TABLE `roles_table` (`role_id` int PRIMARY KEY auto_increment, `role_name` ENUM('mentor', 'mentee', 'both'));
drop table if exists `user_roles_table`;
CREATE TABLE `user_roles_table` (`user_role_id` int PRIMARY KEY auto_increment, `role_id` int unique, `user_id` int unique);
drop table if exists `organizations_table`;
CREATE TABLE `organizations_table` (`org_id` int PRIMARY KEY auto_increment, `org_name` varchar(255));
drop table if exists `user_org_table`;
CREATE TABLE `user_org_table` (`user_org_id` int PRIMARY KEY auto_increment, `user_id` int unique, `org_id` int unique);
drop table if exists `request_table`;
CREATE TABLE `request_table` (`request_id` int PRIMARY KEY auto_increment, `user_id` int unique, `request_type` ENUM('resume_review', 'elevator_pitch', 'class_help', 'business_idea'), `request_status` ENUM('pending', 'matched', 'completed'));

-- Sample data insertion

-- USERS_TABLE
INSERT INTO `users_table` (`username`, `password`, `email`, `expertise`) VALUES
('Alice', 'password123', 'alice@example.com', 'Data Science'),
('Bob', 'securepass', 'bob@example.com', 'Web Development'),
('Charlie', 'charliepass', 'charlie@example.com', 'Cybersecurity');

-- ROLES_TABLE
INSERT INTO `roles_table` (`role_name`) VALUES
('mentor'),
('mentee'),
('both');

-- USER_ROLES_TABLE
INSERT INTO `user_roles_table` (`role_id`, `user_id`) VALUES
(1, 1), -- Alice as mentor
(2, 2), -- Bob as mentee
(3, 3); -- Charlie as both mentor and mentee

-- ORGANIZATIONS_TABLE
INSERT INTO `organizations_table` (`org_name`) VALUES
('Tech for Good'),
('Code Masters'),
('Youth Innovators');

-- USER_ORG_TABLE
INSERT INTO `user_org_table` (`user_id`, `org_id`) VALUES
(1, 1), -- Alice in Tech for Good
(2, 2), -- Bob in Code Masters
(3, 3); -- Charlie in Youth Innovators

-- REQUEST_TABLE
INSERT INTO `request_table` (`user_id`, `request_type`, `request_status`) VALUES
(1, 'resume_review', 'pending'),  -- Alice requests resume review
(2, 'class_help', 'matched'),     -- Bob requests class help
(3, 'business_idea', 'completed');  -- Charlie requests business idea feedback
