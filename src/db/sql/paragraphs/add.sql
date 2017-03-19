INSERT INTO ${schema~}.Paragraphs(book_id, paragraph, pos)
VALUES($1, $2, $3)
RETURNING paragraph, book_id, id, pos;
