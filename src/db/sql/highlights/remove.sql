UPDATE ${schema~}.Highlights
SET deleted = TRUE
WHERE id = $1
RETURNING id;