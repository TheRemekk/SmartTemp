CREATE TABLE "users"
(
    uuid VARCHAR PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(254) NOT NULL,
    role VARCHAR(10) NOT NULL,
    create_date TIMESTAMP NOT NULL
);