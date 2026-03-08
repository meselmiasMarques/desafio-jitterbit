const repository = require("../repositories/orderRepository");
const mapper = require("../mappers/orderMapper");

async function createOrder(data){

    const order = mapper.mapToOrderEntity(data);

    return await repository.createOrder(order);
}

async function getOrder(orderId){

    const order = await repository.getOrderById(orderId);

    if(!order) throw new Error("Pedido não encontrado");

    return order;
}

async function listOrders(){

    return await repository.listOrders();
}

async function deleteOrder(orderId){

    return await repository.deleteOrder(orderId);
}

module.exports = {
    createOrder,
    getOrder,
    listOrders,
    deleteOrder
};