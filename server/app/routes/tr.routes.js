module.exports = app => {
    const id = require("../controllers/tr.controller.js");

    var router = require("express").Router();
    router.post("/send", id.send);

    app.use("/api/tr", router);
};