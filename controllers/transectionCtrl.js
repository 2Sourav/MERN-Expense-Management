const transectionModel = require("../models/transectionModel");
const moment = require("moment");
const getAllTransection = async (req, res) => {
    try {
      const {frequency, selectedDate, type}= req.body
    const transections=await transectionModel.find({  
      ...(frequency !== "custom" //If frequency is not custom,then show results as per specified filter
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {// else show results as the user wants to see it
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }), //If the type is not 'all' then only display that particular
      //type that has been selected.
    })
      res.status(200).json(transections);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  
  const editTransection = async (req, res) => {
    try {
      await transectionModel.findOneAndUpdate(//Finding the record based on the unique id
      // whatever be the updated value will be assigned to the body of the request
        { _id: req.body.transacationId },
        req.body.payload
      );
      res.status(200).send("Edit Successfull");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  const deleteTransection = async (req, res) => {
    try {
      //Find the particular record with the help of the id and delete it from the DB
      await transectionModel.findOneAndDelete({ _id: req.body.transacationId }); 
      res.status(200).send("Transaction Deleted!");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  const addTransection = async (req, res) => {
    try {
      const newTransection = new transectionModel(req.body);
      await newTransection.save();
      res.status(201).send("Transection Created");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  module.exports = {
    getAllTransection,
    addTransection,
    editTransection,
    deleteTransection,
  };