UPDATE ${schema~}.Paragraphs
SET paragraph = $2
WHERE id = $1
RETURNING paragraph;
