const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({userId: req.userId}) 
    
    if (account != null) {
        res.json({
            balance: account.balance,
        })
    }else{
        res.json({
            message: "Account not exist!"
        })
    }

    
});


router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    const {to, amount} = req.body;

    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();

        return res.status(411).json({
            message: "Insufficient balance",
        });
    }

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: +amount}}).session(session);

    await session.commitTransaction();
    res.json({
        msg: "Transfer successful",
    })


})

module.exports = router;
