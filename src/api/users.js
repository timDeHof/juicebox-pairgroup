const express = require("express");
const jwt = require("jsonwebtoken");
const {
    getAllUsers,
    createUser,
    getUserByUsername,
    getUserById,
    updateUser
} = require("../../db");
const {requireUser} = require("./utils");
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");

    next();
});
usersRouter.post("/login", async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        next({name: "MissingCredentialsError", message: "Please supply both a username and password"});
    }

    try {
        const user = await getUserByUsername(username);

        if (user && user.password == password) {
            const token = jwt.sign({
                username,
                id: user.id
            }, process.env.JWT_SECRET);
            res.send({message: "you're logged in!", token: token});
        } else {
            next({name: "IncorrectCredentialsError", message: "Username or password is incorrect"});
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

usersRouter.post("/register", async (req, res, next) => {
    const {username, password, name, location} = req.body;

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            next({name: "UserExistsError", message: "A user by that username already exists"});
        }

        const user = await createUser({username, password, name, location});

        const token = jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {expiresIn: "1w"});

        res.send({message: "thank you for signing up", token});
    } catch ({name, message}) {
        next({name, message});
    }
});

usersRouter.get("/", async (req, res) => {
    const users = await getAllUsers();
    res.send({users});
});

usersRouter.delete("/:userId", requireUser, async (req, res, next) => {
    try {
        console.log("deleting user!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        const user = await getUserById(req.params.userId);
        // console.log("req:", req);
        if (user && user.id === + req.user.id) {
            console.log("hello!");
            const updatedUser = await updateUser(user.id, {active: false});
            console.log("updated user:", updatedUser);
            res.send({user: updatedUser});
        } else {
            next(user ? {
                name: "UnauthorizedUserError",
                message: "You cannot delete a account which is not yours"
            } : {
                name: "UserNotFoundError",
                message: "That user does not exist"
            });
        }
        console.log("!!!!user deleted");
    } catch ({message}) {
        next({message});
    }
});

usersRouter.patch("/:userId", requireUser, async (req, res, next) => {
    try {
        console.log("updating user's status !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        const user = await getUserById(req.params.userId);
        console.log("req:", req);
        if (user && user.id === + req.user.id) {
            const updatedUser = await updateUser(user.id, {active: true});
            console.log("updated user:", updatedUser);
            res.send({user: updatedUser});
        } else {
            next(user ? {
                name: "UnauthorizedUserError",
                message: "You cannot delete a account which is not yours"
            } : {
                name: "userNotFoundError",
                message: "That user does not exist"
            });
        }
        console.log("!!!!user active status changed");
    } catch ({message}) {
        next({message});
    }
});

module.exports = usersRouter;
