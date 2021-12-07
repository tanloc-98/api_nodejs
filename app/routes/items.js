var express = require('express');
var router = express.Router();
var asyncHandler = require('../middleware/async')

const controllerName = 'items';
const MainModel 	= require(__path_models + controllerName);

router.get('/',asyncHandler( async (req,res, next) => {
        let params = [];
        params.keyword   = req.query.keyword;
        params.sortField = req.query.orderBy;
        params.sortType  = req.query.orderDir;

        const data = await MainModel.listItems(params , {'task' : 'all'})
        res.status(200).json({
            success : true,
            data : data
        })
}))

router.get('/:id',asyncHandler(async (req,res, next) => {
        const data = await MainModel.listItems({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data : data
        })
}))

router.post('/add',asyncHandler(async (req,res, next) => {
        let params = [];
        params.name = req.body.name;
        params.status = req.body.status;
        const data = await MainModel.create(params);

        res.status(201).json({
            success : true,
            data : data
        })
}))

router.put('/edit/:id',asyncHandler(async (req,res, next) => {
        let body = req.body;
        const data = await MainModel.editItem({'id' : req.params.id,'body' : body} , {'task' : 'edit'})
        res.status(200).json({
            success : true,
            data : data
        })
}))

router.delete('/delete/:id',asyncHandler(async (req,res, next) => {
        const data = await MainModel.deleteItem({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data : data
        })
}))

module.exports = router;
