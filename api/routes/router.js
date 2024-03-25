const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

const upload = multer({ storage: storage });

/**
 * @description Root Route
 * @method GET /
 */
route.get('/', services.homeRoutes);

/**
 * @description add user
 * @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 * @description update user
 * @method GET /update-user
 */
route.get('/update-user', services.update_user)

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);

route.post('/api/images', upload.single('image'), controller.addImage);
route.get('/api/images', controller.getImages);
route.get('/api/images/:id', controller.getImage);

module.exports = route;