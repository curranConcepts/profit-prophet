const Task = require('../models/Tasks')
const Entries = require('../models/Entries')

module.exports = {
    getDashboard: async (req,res)=>{
        try{
            const taskItems = await Task.find({userId:req.user.id})
            const entryItems = await Entries.find({userId:req.user.id})
            const totalPay = entryItems.reduce((acc,task)=>acc+task.pay,0)

            //function to help calculate total time
            function addTimes (startTime, endTime) {
                let times = [ 0, 0, 0 ]
                let max = times.length

                let a = (startTime || '').split(':')
                let b = (endTime || '').split(':')

                // normalize time values
                for (let i = 0; i < max; i++) {
                  a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
                  b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
                }

                // store time values
                for (let i = 0; i < max; i++) {
                  times[i] = a[i] + b[i]
                }

                let hours = times[0]
                let minutes = times[1]
                let seconds = times[2]

                if (seconds >= 60) {
                  let m = (seconds / 60) << 0
                  minutes += m
                  seconds -= 60 * m
                }

                if (minutes >= 60) {
                  let h = (minutes / 60) << 0
                  hours += h
                  minutes -= 60 * h
                }

                return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
              }

            // Hero Section
            const totalTime = entryItems.reduce((acc,task)=>addTimes(acc,task.duration),0) || '00:00:00' //getting error when 0 entries
            const totalHours = totalTime.split(':')[0] || 0
            const PerHour = totalPay / totalHours || 0
            const payPerHour = Math.round(PerHour * 100) / 100 || 0

            // Chart.js
            //const chartLabels =
            //const chartData =

            res.render('dashboard.ejs', {
                                         entries: entryItems,
                                         tasks: taskItems,
                                         totalTime: totalTime,
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
