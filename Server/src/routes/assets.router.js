const express = require('express');
const router = express.Router();
const jwtHelper = require('../auth/jwtHelper');

const assetsController = require('../controllers/assets.controller');

router.get('/assets',jwtHelper.verifyJwtToken, assetsController.getAssets);
router.get('/assets/:id',jwtHelper.verifyJwtToken, assetsController.getAssetsById);
router.post('/assets',jwtHelper.verifyJwtToken, assetsController.createAsset);
router.put('/assets/:id',jwtHelper.verifyJwtToken, assetsController.updateAsset);
router.delete('/assets/:id',jwtHelper.verifyJwtToken, assetsController.deleteAsset);

module.exports = router;


