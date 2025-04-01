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
  setInterval(updateProgress, 60*1000);
  updateProgress(); // Initial call to set the progress immediately

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
    setInterval(updateMonthlyProgress, 60*60*1000);
    updateMonthlyProgress(); // Initial call to set the progress immediately

  function updateYearlyProgress() {
    const now = new Date();
    
    // Calculate the total days passed this year
    const totalDaysThisYear = new Date(now.getFullYear(), 11, 31).getDate();
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
    setInterval(updateYearlyProgress, 24*60*60*1000);
    updateYearlyProgress(); // Initial call to set the progress immediately
