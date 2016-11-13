INSERT INTO ${schema~}.Users(username, password, email, fname, lname) VALUES
('jeff' , 'whatever', 'jeffrey.m.rivera@gmail.com', 'jeff','rivera')
RETURNING id;