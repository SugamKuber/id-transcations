module.exports = app => {
    const id = require("../controllers/id.controller.js");

    var router = require("express").Router();
    router.post("/create", id.create);
    router.get("/", id.findAll);
    router.get("/:id", id.findOne);


    app.use("/api/id", router);
};