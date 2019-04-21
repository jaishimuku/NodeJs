const Ticket = require('../model/ticket');
const mongoose = require('mongoose');

//get all ticket
exports.tickets_get_all = (req, res, next) => {
    Ticket.find({}, function (err, data) {
        console.log(data);
        res.status(200).json(data);
    });
}
//single ticket
exports.ticket_by_ID = (req, res, next)=>{
    const id = req.params.ticketID;
    Ticket.find({_id: id}, function(err, data){
        if(!data){
            res.status(404).json({
                message: "Ticket of given ID is not found"
            })
        }else{
            console.log( data );
            res.status(200).json(data)
        }
    });
}
//create new ticket
exports.tickets_create = (req, res, next) => {
    const ticket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        price: req.body.price,
        from: req.body.from,
        to: req.body.to
    });
    console.log(ticket)
    if (!ticket.name ||
        !ticket.age ||
        !ticket.address ||
        !ticket.price ||
        !ticket.from ||
        !ticket.to) {
        return res.status(404).json({
            message: "Incomplete Ticket info"
        });
    } else {
        ticket.save().then(result => {
            console.log(result);
        });
        res.status(201).json({
            message: 'Ticket has been created',
            createdTicket: ticket
        });
    }
}
//update existing ticket
exports.ticket_update = (req, res, next)=>{
    const id = req.params.ticketID;
    Ticket.findByIdAndUpdate({_id: id},
       {$set: { 
           name: req.body.name,
           age: req.body.age,
           address: req.body.address,
           price: req.body.price,
           from: req.body.to    }  
    }).exec()
    .then( result => {
       console.log(result);
       res.status(200).json({
           message: 'Ticket has been Updated',
           updatedTicket: result
       });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}
//delete ticket by ID
exports.ticket_delete_ID = (req, res, next) => {
    const id = req.params.ticketID;
    Ticket.remove({ _id: id }, function (err, data) {
        if (!data) {
            res.status(404).json({
                message: "Ticket of given ID is not found"
            })
        } else {
            console.log(data);
            res.status(200).json({
                message: "Ticket has been deleted",
                data: data
            });
        }
    });
}