module.exports = app => {
    const id = require("../controllers/tr.controller.js");

    var router = require("express").Router();
    router.post("/send", id.send);
    router.get("/all/:addr", id.findAll);
    router.get("/:trhsx", id.findOne);

    app.use("/api/tr", router);
};