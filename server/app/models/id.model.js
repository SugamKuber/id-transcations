module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            uniqueId: String,
            publicAddress: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Ids = mongoose.model("ids", schema);
    return Ids;
};