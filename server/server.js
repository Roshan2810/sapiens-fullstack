const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

app.post("/user/signup", (req, res) => {
  console.log("inside signup");
  const { userName, password, dob } = req.body;
  if (userName === undefined || password === undefined || dob === undefined) {
    res.status(400).send({
      message: "Please provide userName, password and dob in the request body",
    });
  } else {
    fs.readFile(
      `${path.resolve(__dirname, "./userData.json")}`,
      { options: {} },
      (err, data) => {
        if (!err) {
          let newData = JSON.parse(data);
          if (!newData.filter((d) => d.userName === userName).length) {
            newData.push({ userName, password, dob });
            fs.writeFile(
              `${path.resolve(__dirname, "./userData.json")}`,
              JSON.stringify(newData),
              (err) => {
                if (err)
                  res
                    .status(400)
                    .send({ message: "Unable to create an account" });
                else
                  res
                    .status(200)
                    .send({ message: "User account created successfully" });
              }
            );
          } else {
            res.status(400).send({ message: "User already exists!!" });
          }
        } else {
          res.status(400).send({ message: "Unable to create an account" });
        }
      }
    );
  }
});

app.post("/user/login", (req, res) => {
  console.log("inside login");
  const { userName, password } = req.body;
  if (userName === undefined || password === undefined) {
    res.status(400).send({
      message: "Please provide userName and password in the request body",
    });
  } else {
    fs.readFile(path.resolve(__dirname, "./userData.json"), {}, (err, data) => {
      const userDetails = JSON.parse(data).filter(
        (e) => e.userName === userName
      );
      if (!userDetails.length) {
        res.status(400).send({
          message:
            "User is not active, please create an user with the provided email id",
        });
      } else {
        if (userDetails[0].password === password) {
          res.status(200).send({ message: "Logged in successfully" });
        } else {
          res.status(400).send({ message: "Incorrect password" });
        }
      }
    });
  }
});

app.get("/products/getList", async (req, res) => {
  console.log("inside getList");
  fs.readFile(
    `${path.resolve(__dirname, "./productData.json")}`,
    { options: { encoding: true } },
    (err, data) => {
      if (err) {
        res.status(400).send({ message: "Unable to fetch product list" });
      } else {
        res.status(200).send({
          message: "Successfully fetched product list",
          data: JSON.parse(data),
        });
      }
    }
  );
});

console.log("listening to port 5001");

app.listen(5001);
