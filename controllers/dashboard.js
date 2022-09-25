const Task = require('../models/Tasks')
const Entries = require('../models/Entries')

module.exports = {
    getDashboard: async (req,res)=>{
        console.log(req.user)
        try{
            // Need to format time to a number and calculate pay per hour
            const taskItems = await Task.find({userId:req.user.id})
            const entryItems = await Entries.find({userId:req.user.id})
            const totalTimes = entryItems.reduce((acc,task)=>acc+task.duration,0)
            const totalPay = entryItems.reduce((acc,task)=>acc+task.pay,0)
            const payPerHour = totalPay/totalTimes || 0

            res.render('dashboard.ejs', {tasks: taskItems, 
                                         totalTimes: totalTimes, 
                                         totalPay: totalPay,
                                         payPerHour: payPerHour, 
                                         user: req.user
                                        })
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