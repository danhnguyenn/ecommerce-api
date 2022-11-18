const { Order } = require('../model/Order');
const { OrderItem } = require('../model/Order-Item');
const orderController = {
	getOrderList: async (req, res) => {
		const orderList = await Order.find()
			.populate('user', 'name')
			.sort({ dateOrdered: -1 });

		if (!orderList) {
			return res.status(500).json({ message: 'Get order faild' });
		}

		return res
			.status(200)
			.json({ message: 'Get order Successfully ', orderList });
	},

	getOrderDetail: async (req, res) => {
		const order = await Order.find({ user: req.params.id })
			.populate('user', 'email')
			.populate({
				path: 'orderItems',
				populate: {
					path: 'product'
				}
			})
			.sort({ createdAt: 'desc' });
		if (!order) {
			return res.status(404).json({ message: 'Order Not Found' });
		}

		return res.status(200).json({ message: 'Get order Successfully ', order });
	},

	getOneOrder: async (req, res) => {
		const order = await Order.find({ _id: req.params.id })
			.populate('user', 'email')
			.populate({
				path: 'orderItems',
				populate: {
					path: 'product'
				}
			});
		if (!order) {
			return res.status(404).json({ message: 'Order Not Found' });
		}

		return res.status(200).json({ message: 'Get order Successfully ', order });
	},

	updateStatusShip: async (req, res) => {
		try {
			const order = await Order.findByIdAndUpdate(req.params.id, {
				status: req.body.status,
				dateFinish: req.body.dateFinish
			});
			const orderUpdated = await order.save();
			res.status(200).json({ message: 'Updated Successfully', orderUpdated });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	getUserOrder: async (req, res) => {
		const user = await Order.find({ user: req.params.userId })
			.populate({
				path: 'orderItems',
				populate: { path: 'product', populate: 'category' }
			})
			.sort({ dateOrdered: -1 });

		if (!user) {
			return res.status(500).json({ message: 'Get user orders faild' });
		}

		return res
			.status(200)
			.json({ message: 'Get user orders Successfully ', user });
	},

	addOrder: async (req, res) => {
		try {
			const newOrder = new Order({
				orderItems: req.body.orderItems,
				fullName: req.body.fullName,
				shippingAddress: req.body.shippingAddress,
				city: req.body.city,
				zip: req.body.zip,
				country: req.body.country,
				phone: req.body.phone,
				status: req.body.status,
				priceSavings: req.body.priceSavings,
				priceDelivery: req.body.priceDelivery,
				totalPrice: req.body.totalPrice,
				user: req.body.userId
			});

			const order = await newOrder.save();

			return res.status(201).json({ message: 'Ordered Sucessfully', order });
		} catch (err) {
			return res.status(400).json({
				message: err.message
			});
		}
	}
};

module.exports = orderController;
