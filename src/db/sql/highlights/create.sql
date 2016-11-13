CREATE TABLE IF NOT EXISTS ${schema~}.Highlights
(
    id serial PRIMARY KEY,
    book_id serial references ${schema~}.Texts(id),
    paragraph_id serial references ${schema~}.Paragraphs(id),
    start_pos integer default 0,
    end_pos integer default 0,
    text text default '',
    deleted BOOLEAN NOT NULL DEFAULT false,
    created timestamp with time zone not null default current_timestamp
);