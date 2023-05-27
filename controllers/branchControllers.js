const mongoose = require('mongoose');
const Branch = require('../models/branchModel');

const getBranch = async(req, res) => {
    const branches = await Branch.find({}).sort({ createdAt: 1});

    res.status(200).json(branches);
}

const getSingleBranch = async (req, res) => {
    const singleBranch = await Branch.findById(req.params.id);

    res.status(200).json(singleBranch);
}

const createBranch = async(req, res) => {
    if(!req.body.name){
        return res.status(400).json({ error: 'Please enter a name'});
    }
    
    try {

        const branch = await Branch.create(req.body);

        res.status(200).json(branch);
    } catch (error) {
        res.status(404).json({ error: error.message});
    }
}

const editBranchName = async(req, res) => {
    try {
        const editedBranchName = await Branch.findByIdAndUpdate(req.params.id, {name: req.body.name});
        res.status(200).json(editedBranchName)
        
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
}

const deleteBranch = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Branch does not exist'});
    }
    
    const branch = await Branch.findByIdAndDelete(id);
    
    if(!branch){
        res.status(404).json({ error: 'Branch does not exist'});
    }

    res.status(200).json(branch);
}

module.exports = {
    getBranch,
    getSingleBranch,
    createBranch,
    editBranchName,
    deleteBranch
};
