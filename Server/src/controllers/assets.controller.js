const Asset = require('../models/assets.model');

module.exports.createAsset = async (req, res, next) => {
    // Validate request
    if(!req.body.name || !req.body.type || !req.body.count) {
        return res.status(400).send({
            message: "Required field missing"
        });
    }
    const asset = new Asset({ ...req.body });
    try {
        await asset.save();
        res.status(201).send(asset);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    }
}

module.exports.getAssets = async (req, res, next) => {
    try {
        let assets = await Asset.find({});
        res.send(assets);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    }    
}

module.exports.getAssetsById = async (req, res, next) => {
    const _id = req.params.id;
    try {
        const asset = await Asset.findById(_id);
        if (!asset) {
            return res.status(404).send();
        }
        res.send(asset);
    } catch (err) {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    }
}

module.exports.deleteAsset = async (req, res, next) => {
    const _id = req.params.id;
    try {
        const asset = await Asset.findByIdAndDelete(_id);
        if (!asset) {
            return res.status(404).send();
        }
        res.send(asset);
    } catch (err) {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    }
}

exports.updateAsset = async (req, res, next) => {
    try {
        // Validate Request
        if(!req.body.name || !req.body.type || !req.body.count) {
            return res.status(400).send({
            message: "Required field missing"
            });
        }
        const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            type: req.body.type,
            count: req.body.count,
            status: req.body.status 
        }, {new: true});
        res.send(updatedAsset);
    } catch (err) {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    }
    
};