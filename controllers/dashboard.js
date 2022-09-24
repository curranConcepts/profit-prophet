const Task = require('../models/Tasks')

module.exports = {
    getDashboard: async (req,res)=>{
        console.log(req.user)
        try{
            const taskItems = await Task.find({userId:req.user.id})
            res.render('dashboard.ejs', {tasks: taskItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    getEntries: async (req,res)=>{
        console.log(req.user)
        try{
            res.render('entries.ejs')
        }catch(err){
            console.log(err)
        }
    },
    getTasks: async (req,res)=>{
        console.log(req.user)
        try{
            res.render('tasks.ejs')
        }catch(err){
            console.log(err)
        }
    },
}