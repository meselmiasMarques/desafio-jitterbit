const { sql, pool } = require("../database/db");

async function createOrder(order) {
    const connection = await pool;
    const transaction = new sql.Transaction(connection);

    try {
        await transaction.begin();

        await new sql.Request(transaction)
            .input("orderId", sql.VarChar, order.orderId)
            .input("value", sql.Decimal(18, 2), order.value)
            .input("creationDate", sql.DateTime, order.creationDate)
            .query(`
                INSERT INTO Orders (orderId, value, creationDate)
                VALUES (@orderId, @value, @creationDate)
            `);

        for (let item of order.items) {
            await new sql.Request(transaction)
                .input("orderId", sql.VarChar, order.orderId)
                .input("productId", sql.Int, item.productId)
                .input("quantity", sql.Int, item.quantity)
                .input("price", sql.Decimal(18, 2), item.price)
                .query(`
                    INSERT INTO Items (orderId, productId, quantity, price)
                    VALUES (@orderId, @productId, @quantity, @price)
                `);
        }

        await transaction.commit();
        return order;

    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

async function getOrderById(orderId) {
    const connection = await pool;

    const orderResult = await connection.request()
        .input("orderId", sql.VarChar, orderId)
        .query("SELECT * FROM Orders WHERE orderId = @orderId");

    const itemsResult = await connection.request()
        .input("orderId", sql.VarChar, orderId)
        .query("SELECT * FROM Items WHERE orderId = @orderId");

    return {
        ...orderResult.recordset[0],
        items: itemsResult.recordset
    };
}

async function listOrders() {
    const connection = await pool;

    const result = await connection.request()
        .query("SELECT * FROM Orders");

    return result.recordset;
}

async function deleteOrder(orderId) {
    const connection = await pool;

    await connection.request()
        .input("orderId", sql.VarChar, orderId)
        .query("DELETE FROM Items WHERE orderId = @orderId");

    await connection.request()
        .input("orderId", sql.VarChar, orderId)
        .query("DELETE FROM Orders WHERE orderId = @orderId");
}

async function updateOrder(orderId, order) {

    const connection = await pool;

    const transaction = new sql.Transaction(connection);

    try {

        await transaction.begin();

        // Atualiza pedido
        await new sql.Request(transaction)
            .input("orderId", sql.VarChar, orderId)
            .input("value", sql.Decimal(18,2), order.value)
            .query(`
                UPDATE Orders
                SET value = @value
                WHERE orderId = @orderId
            `);

        // Remove itens antigos
        await new sql.Request(transaction)
            .input("orderId", sql.VarChar, orderId)
            .query(`
                DELETE FROM Items
                WHERE orderId = @orderId
            `);

        // Insere novos itens
        for(const item of order.items){

            await new sql.Request(transaction)
                .input("orderId", sql.VarChar, orderId)
                .input("productId", sql.Int, item.productId)
                .input("quantity", sql.Int, item.quantity)
                .input("price", sql.Decimal(18,2), item.price)
                .query(`
                    INSERT INTO Items(orderId,productId,quantity,price)
                    VALUES(@orderId,@productId,@quantity,@price)
                `);
        }

        await transaction.commit();

        return true;

    } catch(error){

        await transaction.rollback();
        throw error;

    }
}

module.exports = {
    createOrder,
    getOrderById,
    listOrders,
    deleteOrder,
    updateOrder
};