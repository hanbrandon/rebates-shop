const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const multer = require('multer');

const { auth } = require('../middleware/auth');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (ext !== '.jpg' || ext !== '.png') {
			return cb(res.status(400).end('only jpg, png are allowed'), false);
		}
		cb(null, true);
	}
});

var upload = multer({ storage: storage }).single('file');

//=================================
//             Product
//=================================

router.post('/uploadImage', auth, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.json({ success: false, err });
		}
		return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename });
	});
});

router.post('/uploadProduct', auth, (req, res) => {
	//save all the data we got from the client into the DB
	const product = new Product(req.body);

	product.save((err, data) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true, id: data._id });
	});
});

router.post('/getProducts', (req, res) => {
	console.log(req.body);
	let order = req.body.order ? req.body.order : 'desc';
	let sortBy = req.body.sortyBy ? req.body.sortBy : '_id';
	let limit = req.body.limit ? parseInt(req.body.limit) : 100;
	let skip = parseInt(req.body.skip);

	let findArgs = {};
	let term = req.body.searchTerm;

	console.log('TERM:', term);
	if (term) {
		Product.find({ productName: { $regex: term, $options: 'i' } })
			.populate('writer')
			.sort([ [ sortBy, order ] ])
			.skip(skip)
			.limit(limit)
			.exec((err, products) => {
				if (err)
					return res.status(400).json({
						success: false,
						err
					});
				console.log(products);
				res.status(200).json({ success: true, products, postSize: products.length });
			});
	} else {
		Product.find().populate('writer').sort([ [ sortBy, order ] ]).skip(skip).limit(limit).exec((err, products) => {
			if (err)
				return res.status(400).json({
					success: false,
					err
				});
			res.status(200).json({ success: true, products, postSize: products.length });
		});
	}
});

router.get('/getProduct/:postId', (req, res) => {
	Product.findOne({ _id: req.params.postId }, (err, product) => {
		if (err) {
			return res.status(400).json({
				success: false,
				err
			});
		}
		res.status(200).json({ success: true, product });
	});
});

module.exports = router;
