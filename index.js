var schedule = require('node-schedule');
var SunCalc = require('suncalc');
const Lookup = require("node-yeelight-wifi").Lookup;
var sunsetDate = new Date();

var sunsetSchedule = schedule.scheduleJob('sunsetJob', sunsetDate, function(){
  let look = new Lookup();

  look.on("detected",(light) =>
  {
      console.log("new yeelight detected: id="+light.id);
      if(light){
        light.setPower(true).then(() =>{console.log("turned on the lights");})
        .catch((error =>{console.log("failed to turn on the lights",error);}));
      }
  });
});

var midnight = schedule.scheduleJob('0 1 * * *', () => {
  var times = SunCalc.getTimes(new Date(), 'long', 'lat');
  sunsetDate = times.sunsetStart;
  var sunsetJob = schedule.scheduledJobs['sunsetJob'];
  var value = sunsetJob.reschedule(sunsetDate);
  console.log('reschedule value: ' + value);
  console.log('set sunset time for: ' + sunsetDate);
})
