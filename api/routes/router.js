const express = require('express');
const route = express.Router();

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

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);

route.post('/api/images', upload.single('image'), controller.addImage);
route.get('/api/images', controller.getImages);
route.get('/api/images/:id', controller.getImage);

route.post('/api/articles', controller.addArticle);
route.get('/api/articles', controller.getArticles);
route.put('/api/articles/:id', controller.updateArticle);

route.put('/api/send/:id', controller.sendArticle)

module.exports = route;