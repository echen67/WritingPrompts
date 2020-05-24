CREATE DATABASE prompt;

CREATE TABLE prompts(
  prompt_id SERIAL PRIMARY KEY,
  description varchar(255) NOT NULL,
  genre varchar(50)
);
