INSERT INTO ${schema~}.Texts(title, text)
VALUES($1, $2)
RETURNING title, text, id;