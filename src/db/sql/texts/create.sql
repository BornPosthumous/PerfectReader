CREATE TABLE IF NOT EXISTS ${schema~}.Texts
(
    id serial PRIMARY KEY,
    title VARCHAR(100),
    text text,
    deleted boolean NOT NULL DEFAULT false,
    created timestamp with time zone not null default current_timestamp
);