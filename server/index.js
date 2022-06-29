const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/hrDB');

const employeeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    country: String,
    position: String,
    wage: Number
});
const Employee = mongoose.model('Employee', employeeSchema);


app.post('/create', function (req, res) {
    console.log(req.body);
    const newEmployee = new Employee({
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
        position: req.body.position,
        wage: req.body.wage
    })

    newEmployee.save(function (err) {
        if (!err) {
            res.send("Successfully Added a new employee.");
        } else {
            res.send(err);
        }
    });
});

app.get('/employees', function (req, res) {
    Employee.find({}, function (err, employees) {
        if (!err) {
            res.send(employees);
        } else {
            res.send(err);
        }
    });
});

app.patch('/update', function (req, res) {

    Employee.updateOne(
        { _id: req.body._id },
        { $set: req.body },
        function (err) {
            if (!err) {
                res.send("Successfully updated article.")
            } else {
                res.send(err)
            }
        }
    )
});

app.delete('/delete/:_id', function (req, res) {
    Employee.deleteOne({_id: req.params._id}, function (err) {
        if (!err) {
            res.send("Successfully deleted the corresponding article.");
        } else {
            res.send(err);
        }
    });
});



app.listen(process.env.PORT || 3001, function () {
    console.log("Server is running on port 3001.");
});
