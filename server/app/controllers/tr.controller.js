const db = require("../models");
const Ids = db.ids;
const catchAsync = require("./../utils/catchAsync");

const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");

const settings = {
    apiKey: "k9KLHPXTMyQOJGKCEctmeFlGwIFD7r-C",
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);


async function Send(publicAddress, privateAddress, amount) {

    let wallet = new Wallet(privateAddress);

    const nonce = await alchemy.core.getTransactionCount(
        wallet.address,
        "latest"
    );

    let transaction = {
        to: publicAddress,
        value: Utils.parseEther(amount),
        gasLimit: "21000",
        maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
        maxFeePerGas: Utils.parseUnits("20", "gwei"),
        nonce: nonce,
        type: 2,
        chainId: 5,
    };

    let rawTransaction = await wallet.signTransaction(transaction);
    let tx = await alchemy.core.sendTransaction(rawTransaction);
    return tx
}

exports.send = catchAsync(async (req, res, next) => {
    if (!req.body.uniqueId || !req.body.privateAddress || !req.body.amount) {
        res.status(400).send({ message: "fields cannot be empty!" });
        return;
    }

    const isId = await Ids.findOne({ uniqueId: req.body.uniqueId });
    if (!isId) return next(res.status(404).send({ message: "id not found" }));
    const publicAddress = isId.publicAddress
    const privateAddress = req.body.privateAddress
    const amount = req.body.amount

    const result = Send(publicAddress, privateAddress, amount)
    if (!result) {
        return res.status(500).send({ message: "transaction failed" });
    }

    return res.status(200).send({ message: "transcation succesfull", result });
});





