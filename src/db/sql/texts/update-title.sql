UPDATE ${schema~}.Texts
SET title = $2
WHERE id = $1;