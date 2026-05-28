const User = require("../models/user");

async function listUsers(req, res) {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    return res.status(200).render("users/index", {
      title: "Users",
      users,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to fetch users");
  }
}

async function showCreateForm(req, res) {
  return res.status(200).render("users/new", {
    title: "Create user",
    user: {
      firstName: "",
      email: "",
    },
    error: null,
  });
}

async function createUser(req, res) {
  try {
    const firstName =
      typeof req.body.firstName === "string" ? req.body.firstName.trim() : "";
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (!firstName || !email) {
      return res.status(400).render("users/new", {
        title: "Create user",
        user: { firstName, email },
        error: "First name and email are required.",
      });
    }

    await User.create({ firstName, email });
    return res.redirect("/users");
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).render("users/new", {
        title: "Create user",
        user: {
          firstName:
            typeof req.body.firstName === "string"
              ? req.body.firstName.trim()
              : "",
          email:
            typeof req.body.email === "string"
              ? req.body.email.trim().toLowerCase()
              : "",
        },
        error: "Email already exists.",
      });
    }
    return res.status(500).send("Failed to create user");
  }
}

module.exports = {
  listUsers,
  showCreateForm,
  createUser,
};
