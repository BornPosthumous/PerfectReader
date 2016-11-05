INSERT INTO ${schema~}.Paragraphs(book_id, paragraph)
VALUES($1, $2)
RETURNING paragraph, book_id, id;