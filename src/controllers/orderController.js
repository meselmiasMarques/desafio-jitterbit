const service = require("../services/orderService");

async function create(req,res){

    try{

        const order = await service.createOrder(req.body);

        return res.status(201).json(order);

    }catch(error){

        return res.status(500).json({error:error.message});

    }
}

async function get(req,res){

    try{

        const order = await service.getOrder(req.params.orderId);

        if(!order) return res.status(404).json();

        return res.status(200).json(order);

    }catch(error){

        return res.status(500).json({error:error.message});
    }
}

async function list(req,res){

    try{

        const orders = await service.listOrders();

        return res.status(200).json(orders);

    }catch(error){

        return res.status(500).json({error:error.message});
    }
}

async function remove(req,res){

    try{

        await service.deleteOrder(req.params.orderId);

        return res.status(204).send();

    }catch(error){

        return res.status(500).json({error:error.message});
    }
}

module.exports = {
    create,
    get,
    list,
    remove
};