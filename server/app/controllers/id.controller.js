const db = require("../models");
const Ids = db.ids;
const catchAsync = require("./../utils/catchAsync");

exports.create = catchAsync(async (req, res, next) => {
    if (!req.body.uniqueId || !req.body.publicAddress) {
        res.status(400).send({ message: "id can not be empty!" });
        return;
    }

    const isId = await Ids.findOne({ uniqueId: req.body.uniqueId });
    const isAdd = await Ids.findOne({ publicAddress: req.body.publicAddress });
    if (isId || isAdd) return next(res.status(500).send({ message: "id's already exisits, try new" }));

    const ids = await Ids.create({
        uniqueId: req.body.uniqueId,
        publicAddress: req.body.publicAddress
    });

    return res.status(201).json(ids);
});

exports.findAll = catchAsync(async (req, res, next) => {
    const idsData = await Ids.find({})
    if (!idsData) {
        return next(res.status(404).send({ message: "no ids Data found" }));
    }
    res.status(200).json(idsData)
});

exports.findOne = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const idData = await Ids.findOne({ 'uniqueId': id })
    if (!idData) {
        return next(res.status(404).send({ message: "No document found with that ID" }));
    }
    res.status(200).json(idData);
});

exports.check = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const idData = await Ids.findOne({ 'publicAddress': id })
    if (!idData) {
        return next(res.status(404).send({ message: "user not found" }));
    }
    res.status(200).json(idData);
});
