import Role from "../models/Role";
import User from "../models/User.js";

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "moderator" }).save(),
            new Role({ name: "admin" }).save(),
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
};

export const createAdminUser = async () => {
    const userFound = await User.findOne({ email: "admin@notes" });

    if (userFound) return;

    const newUser = new User({
        username: "admin",
        email: "admin@notes",
        password: await User.encryptPassword("notesadmin"),
    });

    const foundRoles = await Role.find({ name: "admin" });

    newUser.roles = foundRoles.map((role) => role._id);

    const admin = await newUser.save();

    console.log("Admin user created", admin);
};
