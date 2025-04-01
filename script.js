function updateDailyProgress() {
    const now = new Date();

    // Calculate the total minutes passed today
    const totalMinutesToday = now.getHours() * 60 + now.getMinutes();

    // Calculate the percentage of the day that has passed
    const percentage = (totalMinutesToday / 1440) * 100; // 1440 = total minutes in a day

    // Update time display
    const timeElement = document.getElementById("time");
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    timeElement.textContent = formattedTime;

    // Update progress bar width
    const progressFill = document.getElementById("daily-progress-fill");
    progressFill.style.width = `${percentage}%`;

    // Update progress percentage display
    const progressPercentage = document.getElementById("daily-progress-percentage");
    progressPercentage.textContent = `${percentage.toFixed(2)}% of the day completed`;
}

// Update day progress every minute
setInterval(updateDailyProgress, 60 * 1000);
updateDailyProgress(); // Initial call to set the progress immediately

function updateMonthlyProgress() {
    const now = new Date();

    // Calculate the total days passed this month
    const totalDaysThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const totalDaysPassed = now.getDate();

    // Calculate the percentage of the month that has passed
    const percentage = (totalDaysPassed / totalDaysThisMonth) * 100;

    // Update progress bar width
    const monthlyProgressFill = document.getElementById("monthly-progress-fill");
    monthlyProgressFill.style.width = `${percentage}%`;

    // Update progress percentage display
    const monthlyProgressPercentage = document.getElementById("monthly-progress-percentage");
    monthlyProgressPercentage.textContent = `${percentage.toFixed(2)}% of the month completed`;
}

// Update month progress every hour
setInterval(updateMonthlyProgress, 60 * 60 * 1000);
updateMonthlyProgress(); // Initial call to set the progress immediately

function updateYearlyProgress() {
    const now = new Date();

    // Calculate the total days passed this year
    const isLeapYear = new Date(now.getFullYear(), 1, 29).getDate() === 29;
    const totalDaysThisYear = isLeapYear ? 366 : 365;
    const totalDaysPassed = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)) + 1;

    // Calculate the percentage of the year that has passed
    const percentage = (totalDaysPassed / totalDaysThisYear) * 100;

    // Update progress bar width
    const yearlyProgressFill = document.getElementById("yearly-progress-fill");
    yearlyProgressFill.style.width = `${percentage}%`;

    // Update progress percentage display
    const yearlyProgressPercentage = document.getElementById("yearly-progress-percentage");
    yearlyProgressPercentage.textContent = `${percentage.toFixed(2)}% of the year completed`;
}



// Update year progress every day
setInterval(updateYearlyProgress, 24 * 60 * 60 * 1000);
updateYearlyProgress(); // Initial call to set the progress immediately

async function updateSunlightProgress() {
    const now = new Date();

    try {
        const { sunrise, sunset } = await getSunriseSunset(
            // Replace with your location's latitude and longitude
            52.2297, // Latitude for Warsaw
            21.0122  // Longitude for Warsaw
        );

        if (!sunrise || !sunset) {
            console.error("Failed to retrieve sunrise/sunset times.");
            return; // Exit if API call fails
        }

        // Parse the API's time strings into Date objects
        const sunriseDate = parseTimeString(sunrise, now);
        const sunsetDate = parseTimeString(sunset, now);

        // Calculate total daylight minutes
        const daylightMinutes = (sunsetDate - sunriseDate) / (1000 * 60);

        // Calculate minutes passed since sunrise
        let minutesPassed = (now - sunriseDate) / (1000 * 60);

        // Handle cases where it's before sunrise or after sunset
        if (minutesPassed < 0) {
            minutesPassed = 0;
        } else if (minutesPassed > daylightMinutes) {
            minutesPassed = daylightMinutes;
        }

        // Calculate the percentage of daylight passed
        const percentage = (minutesPassed / daylightMinutes) * 100;

        // Update time display
        const timeElement = document.getElementById("time");
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        timeElement.textContent = formattedTime;

        // Update progress bar width
        const progressFill = document.getElementById("sunlight-progress-fill");
        progressFill.style.width = `${percentage}%`;

        // Update progress percentage display
        const progressPercentage = document.getElementById("sunlight-progress-percentage");
        progressPercentage.textContent = `${percentage.toFixed(2)}% of sunlight completed`;
    } catch (error) {
        console.error("Error in updateSunlightProgress:", error);
    }
}

// Cache for storing sunrise/sunset data to avoid excessive API calls
let sunriseSunsetCache = {
    data: null,
    timestamp: 0
};

async function getSunriseSunset(latitude, longitude) {

    const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today`;

    // Check if we have cached data less than 1 hour old
    const currentTime = Date.now();
    if (sunriseSunsetCache.data && (currentTime - sunriseSunsetCache.timestamp < 60 * 60 * 1000)) {
        console.log("Using cached sunrise/sunset data");
        return sunriseSunsetCache.data;
    }

    console.log("Fetching fresh sunrise/sunset data");
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
            console.log("Sunrise/sunset data fetched successfully:", data.results);
            return {
                sunrise: data.results.sunrise,
                sunset: data.results.sunset,
            };
        } else {
            console.error("Sunrise/sunset data not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching sunrise/sunset data:", error);
        return null;
    }
}

function parseTimeString(timeString, currentDate) {
    // Parse time string which might be in 12-hour format like "7:05:12 AM"
    const timeParts = timeString.split(' ');
    const timeComponents = timeParts[0].split(':');
    let hours = parseInt(timeComponents[0]);
    const minutes = parseInt(timeComponents[1]);
    const seconds = parseInt(timeComponents[2] || 0);

    // Adjust for AM/PM if present
    if (timeParts[1] && timeParts[1].toUpperCase() === 'PM' && hours < 12) {
        hours += 12;
    } else if (timeParts[1] && timeParts[1].toUpperCase() === 'AM' && hours === 12) {
        hours = 0;
    }

    const date = new Date(currentDate);
    date.setHours(hours, minutes, seconds, 0);
    return date;
}

// Update progress every minute
setInterval(updateSunlightProgress, 60 * 1000);
updateSunlightProgress(); // Initial call to set the progress immediately