UPDATE ${schema~}.Paragraphs
SET deleted = TRUE
WHERE id = $1
RETURNING id;