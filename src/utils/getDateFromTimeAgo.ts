import { DateTime } from "luxon";

const getDateFromTimeAgo = (relativeTime) => {
  const timeAgo = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const secondsAgoMatch = relativeTime.match(/(\d+) (seconds? ago)/);
  const minutesAgoMatch = relativeTime.match(/(\d+) (minutes? ago)/);
  const hoursAgoMatch = relativeTime.match(/(\d+) (hours? ago)/);
  const daysAgoMatch = relativeTime.match(/(\d+) (days? ago)/);
  const monthsAgoMatch = relativeTime.match(/(\d+) (months? ago)/);
  const yearsAgoMatch = relativeTime.match(/(\d+) (years? ago)/);

  if (secondsAgoMatch) {
    timeAgo.seconds = secondsAgoMatch[1];
  }
  if (minutesAgoMatch) {
    timeAgo.minutes = minutesAgoMatch[1];
  }
  if (hoursAgoMatch) {
    timeAgo.hours = hoursAgoMatch[1];
  }
  if (daysAgoMatch) {
    console.log(daysAgoMatch);
    timeAgo.days = daysAgoMatch[1];
  }
  if (monthsAgoMatch) {
    timeAgo.months = monthsAgoMatch[1];
  }
  if (yearsAgoMatch) {
    timeAgo.years = yearsAgoMatch[1];
  }

  return DateTime.utc().minus(timeAgo).toISODate();
};

export default getDateFromTimeAgo;
