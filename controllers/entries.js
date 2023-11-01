const Entries = require('../models/Entries')
const Task = require('../models/Tasks')

module.exports = {
    getEntries: async (req,res)=>{
        console.log(req.user)
        try{
            const entriesItems = await Entries.find({userId:req.user.id})
            const taskItems = await Task.find({userId:req.user.id})

            res.render('entries.ejs', {entries: entriesItems, tasks: taskItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    deleteEntry: async (req, res)=>{
        try{
            let entry = await Entries.findById({_id: req.params.id});
            await Entries.deleteOne({ _id: req.params.id });
            console.log('Deleted Entry')
            res.redirect('/entries')
        }catch(err){
            console.log(err)
        }
    },
    addEntry: async (req, res)=>{
        try{
            const {task, date, pay, units, measure, duration} = req.body
            await Entries.create({task, date, pay, units, measure, duration, userId: req.user.id})
            res.redirect('/entries')
        }catch(err){
            console.log(err)
        }
    },
}
