UPDATE ${schema~}.Highlights
SET text = $2
WHERE id = $1;