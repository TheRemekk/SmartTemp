CREATE TABLE Sensors
(
    name VARCHAR(5) PRIMARY KEY,
    ip VARCHAR(15) NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE Data
(
    measur_date TIMESTAMP PRIMARY KEY,
    sensor_name VARCHAR(5) NOT NULL REFERENCES Sensors(name),
    temp FLOAT,
    mois FLOAT,
    level INT
);