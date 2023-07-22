CREATE DATABASE app_recipe;
ALTER DATABASE app_recipe SET timezone TO 'Asia/Jakarta';

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category_id INTEGER REFERENCES category(id),
    created_by INTEGER REFERENCES users(id)
);


INSERT INTO category (id, name) VALUES (1, 'Appetizer'), (2, 'Main'), (3, 'Dessert');
INSERT INTO users (id, username, email, password) VALUES (1, 'Recipe Owner', 'myrecipe123@gmail.com', 'kuahmeatballs');
INSERT INTO recipe (id, name, ingredients, created_at, category_id, created_by) VALUES (1, 'Sandwich with egg', '{Egg, Lettuce, Bread, Sauce, Butter}', '2023-07-19 05:06:00', 2, 1);

--Sort--
SELECT * FROM recipe ORDER BY created_at DESC
--Getting recipe table--
SELECT * FROM recipe;
--Getting category table--
SELECT * FROM category;
--Getting users table--
SELECT * FROM users;

--Updating recipe--
UPDATE recipe SET name = 'Chicken Curry', ingredients = '{Chicken, Water, Salt, Sugar, Sauce}', created_at = '2023-07-30 01:23:54';
--Updating users--
UPDATE users SET username = 'Recipe Employee', email = 'loremployee@gmail.com', password = 'sategoat123' WHERE id = 4;

--Deleting users--
DELETE FROM users WHERE id = 3;