-- UP
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
);

CREATE TABLE Vehicule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    price NUMBER,
    ownerId INTEGER REFERENCES User(id)
);

INSERT INTO User (name, email) values ('user1', 'user1@example.com');
INSERT INTO User (name, email) values ('user2', 'user2@example.com');

INSERT INTO Vehicule (brand, model, price, ownerId) values ('Audi', 'R8', '900', 1);
INSERT INTO Vehicule (brand, model, price, ownerId) values ('Jaguar', 'XE', '1200', 1);
INSERT INTO Vehicule (brand, model, price, ownerId) values ('Mercedes', 'Benz', '1000', 2)

-- DOWN
DROP TABLE User;
DROP TABLE Vehicule;