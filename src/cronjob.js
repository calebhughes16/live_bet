//CronJOb
const cronWeekEventSchedule = '10 * * * *';// Every xx:10.
const cronWeekEventJob = () => {
 getWeeklyEventsNFL()
  const time = new Date().toString();
  console.log('Cron Job for Week Event' + time);
}
cron.schedule(cronWeekEventSchedule, cronWeekEventJob),