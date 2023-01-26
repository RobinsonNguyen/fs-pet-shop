DROP TABLE IF EXISTS pets_table;

CREATE TABLE pets_table (
    pets_id serial,
    age integer, 
    kind varchar(100), 
    name varchar(100)
);

-- [{"age":7,"kind":"rainbow","name":"fido"},{"age":5,"kind":"snake","name":"Buttons"}
-- INSERT INTO movies (title, duration, rating, genre, is_3d, released_at, score) VALUES ('Pulp Fiction', 154, 'R', 'Crime', FALSE, '1994-10-14 00:00:00 UTC', 8.9);

INSERT INTO pets_table (age, kind, name) VALUES (7, 'rainbow', 'fido');
INSERT INTO pets_table (age, kind, name) VALUES (5, 'snake', 'Buttons');
INSERT INTO pets_table (age, kind, name) VALUES (10, 'bird', 'lola');
INSERT INTO pets_table (age, kind, name) VALUES (15, 'dog', 'cupcake');
INSERT INTO pets_table (age, kind, name) VALUES (12, 'cat', 'chainsaw');
INSERT INTO pets_table (age, kind, name) VALUES (2, 'dog', 'miles');
INSERT INTO pets_table (age, kind, name) VALUES (9, 'pig', 'spice');
INSERT INTO pets_table (age, kind, name) VALUES (1, 'horse', 'ramsey');
INSERT INTO pets_table (age, kind, name) VALUES (7, 'duck', 'quackster');