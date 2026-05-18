const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = ` 
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
        `;
  res.send(html);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err, data) => {
      return res.json({ status: "Success!", id: users.length });
    },
  );
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const index = users.findIndex((user) => user.id == id);
  const updatedUser = users.splice(index, 1, {
    ...users[index],
    ...body,
  });
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err, data) => {
      return res.json({ status: "Updated!", user: updatedUser[0] });
    },
  );
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id == id);
  const deletedUser = users.splice(index, 1);
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err, data) => {
      return res.json({ status: "Deleted!", deletedUser: deletedUser[0] });
    },
  );
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
