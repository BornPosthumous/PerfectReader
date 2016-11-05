UPDATE ${schema~}.Texts
SET text = $2
WHERE id = $1;