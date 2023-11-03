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
            const payPerHour = (Math.round(PerHour * 100) / 100).toFixed(2) || 0

            // Chart.js Queries
            const previousWeek = await Entries.find({"date":{$gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))}}).sort({ "date": 1 })
            const previousMonth = await Entries.find({"date":{$gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))}}).sort({ "date": 1 })
            const previousYear = await Entries.find({"date":{$gte: new Date((new Date().getTime() - (365 * 24 * 60 * 60 * 1000)))}}).sort({ "date": 1 })

            // Days Chart
            const dayData = previousWeek.map(entry => ({
                x: entry.date.toLocaleDateString(),
                y: parseInt(entry.duration.split(':')[0])
            }));

            const reducedDay = Object.values(dayData.reduce((c, { x, y }) => {
                c[x] = c[x] || {x,y: 0};
                c[x].y += y;
                return c;
            }, {}));

            const dayResult = reducedDay.map(entry => ({
                x: Date.parse(entry.x),
                y: entry.y
            }));

            // Monthly Chart with Weekly Aggregation and 'MMM D' format
            const monthData = previousMonth.map((entry) => {
                const date = new Date(entry.date);
                const weekStart = getWeekStartDate(date);
                return {
                    x: weekStart.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                    y: parseInt(entry.duration.split(':')[0]),
                };
            });

            const reducedMonth = Object.values(
                monthData.reduce((c, { x, y }) => {
                    c[x] = c[x] || { x, y: 0 };
                    c[x].y += y;
                    return c;
                }, {})
            );

            const weekResult = reducedMonth.map((entry) => ({
                x: Date.parse(entry.x),
                y: entry.y,
            }));

            // Function to get the first day of the week for a date
            function getWeekStartDate(date) {
                const d = new Date(date);
                const dayOfWeek = d.getDay();
                const diff = d.getDate() - dayOfWeek + (dayOfWeek == 0 ? -6 : 1); // Adjust for Sunday
                d.setDate(diff);
                return d;
            }

            // Year Chart with Monthly Aggregation
            const yearData = previousYear.map((entry) => ({
                month: entry.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
                y: parseInt(entry.duration.split(':')[0]),
            }));

            const reducedYear = Object.values(
                yearData.reduce((c, { month, y }) => {
                    c[month] = c[month] || { month, y: 0 };
                    c[month].y += y;
                    return c;
                }, {})
            );

            const monthResult = reducedYear.map((entry) => ({
                x: Date.parse(entry.month),
                y: entry.y,
            }));

            res.render('dashboard.ejs', {
                                         entries: entryItems,
                                         tasks: taskItems,
                                         totalTime: totalTime,
                                         totalPay: totalPay,
                                         payPerHour: payPerHour,
                                         dayResult: dayResult,
                                         weekResult: weekResult,
                                         monthResult: monthResult,
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
