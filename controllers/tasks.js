const Task = require('../models/Tasks')

module.exports = {
    getTasks: async (req,res)=>{
        try{
            const taskItems = await Task.find({userId:req.user.id})
            res.render('tasks.ejs', {tasks: taskItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    deleteTask: async (req, res)=>{
        console.log(req.body.taskIdFromJSFile)
        try{
            let task = await Task.findById({_id: req.params.id});
            await Task.deleteOne({ _id: req.params.id });
            console.log('Deleted Task')
            res.redirect('/tasks')
        }catch(err){
            console.log(err)
        }
    },
    createTask: async (req, res)=>{
        try{
            const {task, pay, measure} = req.body
            await Task.create({task, pay, measure, userId: req.user.id})
            res.redirect('/tasks')
        }catch(err){
            console.log(err)
        }
    },
    updateTask: async (req, res)=>{
        try{
            const {task, pay, measure} = req.body
            await Task.findOneAndUpdate({_id:req.body.taskId}, {task, pay, measure})
            res.redirect('/tasks')
        }catch(err){
            console.log(err)
        }
    }
}