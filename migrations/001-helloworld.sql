-- UP
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE Car (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    price NUMBER,
    ownerId INTEGER REFERENCES User(id)
);

-- DOWN
DROP TABLE User;
DROP TABLE Car;