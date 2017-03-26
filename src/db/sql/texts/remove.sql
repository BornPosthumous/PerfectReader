UPDATE ${schema~}.Texts
SET deleted = TRUE
WHERE id = $1
RETURNING id;
