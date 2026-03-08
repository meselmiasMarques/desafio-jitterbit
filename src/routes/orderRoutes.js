const express = require("express");
const controller = require("../controllers/orderController");


const router = express.Router();



/**
 * @swagger
 * /order:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroPedido:
 *                 type: string
 *               valorTotal:
 *                 type: number
 *               dataCriacao:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                     quantidadeItem:
 *                       type: integer
 *                     valorItem:
 *                       type: number
 *     responses:
 *       201:
 *         description: Pedido criado
 */
router.post("/order", controller.create);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get("/order", controller.list);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: recupera pedido por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get("/order/:orderId", controller.get);

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Deletar pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pedido removido
 */
router.delete("/order/:orderId", controller.remove);
/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Atualizar pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido atualizado
 */
router.put("/order/:orderId", controller.update);

module.exports = router;