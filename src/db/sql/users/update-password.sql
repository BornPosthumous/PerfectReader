UPDATE ${schema~}.Users
SET password = $1
WHERE id = $2
RETURNING id;