function mapToOrderEntity(body) {

    const orderId = body.numeroPedido.split("-")[0];

    return {
        orderId,
        value: body.valorTotal,
        creationDate: new Date(body.dataCriacao),
        items: body.items.map(item => ({
            productId: parseInt(item.idItem),
            quantity: item.quantidadeItem,
            price: item.valorItem
        }))
    };
}

module.exports = {
    mapToOrderEntity
};