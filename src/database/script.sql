CREATE DATABASE OrderDB;
GO

USE OrderDB;
GO

CREATE TABLE Orders (
    orderId VARCHAR(50) PRIMARY KEY,
    value DECIMAL(18,2),
    creationDate DATETIME
);

CREATE TABLE Items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    orderId VARCHAR(50),
    productId INT,
    quantity INT,
    price DECIMAL(18,2),
    FOREIGN KEY (orderId) REFERENCES Orders(orderId)
);