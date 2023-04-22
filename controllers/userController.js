const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel');

module.exports.signUp = async (req, res, next) => {
    check = await User.findOne({ username: req.body.username });
    if (check != null)
        return res.status(400).json({ msg: "username already exists" });

    check = await User.findOne({ email: req.body.email });
    if (check != null)
        return res.status(400).json({ msg: "email already exists" });

    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        token: req.body.token,
        username: req.body.username,
        password: hashed,
    });

    await user.save();

    const token = jwt.sign(
        {
            username: user.username,
            userId: user._id,
        },
        process.env.jwt_key,
        { expiresIn: "60 days" }
    );

    res.status(201).json({
        msg: "user created successfully",
        token: token,
        user: user,
    });
};

module.exports.logIn = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });

    if (user == null) {
        return res.status(400).json({ msg: "Wrong credentials!" });
    }
    const chk = await bcrypt.compare(req.body.password, user.password);

    if (!chk) {
        return res.status(400).json({ msg: "Wrong credentials!" });
    }

    const token = jwt.sign(
        {
            username: user.username,
            userId: user._id,
        },
        process.env.jwt_key,
        { expiresIn: "60 days" }
    );

    res.status(200).json({
        msg: "logged in successfully",
        token: token,
        user: user,
    });
};

module.exports.getUser = async (req, res, next) => {
    user = await userModel.findById(req.UserData['userId'])
    res.status(200).json(user)
}

module.exports.getAllUser = async (req, res, next) => {
    console.log('got')
    users = await userModel.find().exec()
    res.status(200).json(users)
}

module.exports.updateUser = async (req, res, next) => {
    user = await userModel.findById(req.UserData['userId'])
    fuser = await userModel.findOne({ username: req.body.username })

    if (fuser != null && user.id != fuser.id) {
        return res.status(400).json({
            'msg': 'username already exists'
        })
    }
    fuser = await userModel.findOne({ email: req.body.email })
    if (fuser != null && user.id != fuser.id) {
        return res.status(400).json({
            'msg': 'email already exists'
        })
    }
    user.name = req.body.name
    user.username = req.body.username
    user.email = req.body.email
    await user.save()
    res.status(200).json({
        'msg': 'user profile updated',
        'user': user
    })
}

module.exports.updateToken = async (req, res, next) => {
    const user = await userModel.findById(req.UserData.userId)
    user.token = req.body.token

    user.save()

    res.status(200).json({ 'msg': 'token update successfully' })
} 