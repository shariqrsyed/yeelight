var schedule = require('node-schedule');
var SunCalc = require('suncalc');
const Lookup = require("node-yeelight-wifi").Lookup;

var sunsetDate = new Date();

schedule.scheduleJob('0 0 * * *', () => {
  var times = SunCalc.getTimes(new Date(), 'long', 'lat');
  sunsetDate = times.sunsetStart;
})

schedule.scheduleJob(sunsetDate, function(){
  let look = new Lookup();

  look.on("detected",(light) =>
  {
      console.log("new yeelight detected: id="+light.id);
      if(light){
        light.setPower(true).then(() =>
        {
            console.log("success");
        }).catch((error =>
        {
            console.log("failed",error);
        }));
      }
  });
});
