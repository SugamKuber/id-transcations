module.exports = app => {
    const id = require("../controllers/id.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/create", id.create);

    // Retrieve all id
    router.get("/", id.findAll);

    // Retrieve all published id
    router.get("/published", id.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", id.findOne);

    // Update a Tutorial with id
    router.put("/:id", id.update);

    // Delete a Tutorial with id
    router.delete("/:id", id.delete);

    // Create a new Tutorial
    router.delete("/", id.deleteAll);

    app.use("/api/id", router);
};