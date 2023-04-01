const db = require("../models");
const Ids = db.ids;
const catchAsync = require("./../utils/catchAsync");
const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");

const settings = {
    apiKey: "k9KLHPXTMyQOJGKCEctmeFlGwIFD7r-C",
    network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);

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

    return res.status(200).send({ message: "transcation succesfull", data: tx });
});

exports.findAll = catchAsync(async (req, res, next) => {
    const addr = req.params.addr;
    const data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: addr,
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
    });
    res.status(200).json(data);
});

exports.findOne = catchAsync(async (req, res, next) => {
    const trhsx = req.params.trhsx;
    const data = await alchemy.core.getTransactionReceipt(trhsx)
    console.log(trhsx, "::", data)
    res.status(200).json(data);
});