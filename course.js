const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle=body.querySelector(".toggle"),
    modeSwitch=body.querySelector(".toggle-switch"),
    modeText=body.querySelector(".mode-text");

    toggle.addEventListener("click",() =>{
        sidebar.classList.toggle("close");
    });
    modeSwitch.addEventListener("click",() =>{
        body.classList.toggle("dark");

        if(body.classList.contains("dark")){
            modeText.innerText ="Light Mode"
        }
        else{
            modeText.innerText="Dark Mode"
        }
    });
    document.addEventListener("DOMContentLoaded", function() {
        const progressBars = document.querySelectorAll('.progress-done');
    
        progressBars.forEach(progress => {
            const donePercentage = progress.getAttribute('data-done');
            progress.style.width = donePercentage + '%';
            progress.style.opacity = 1;
        });
    });
    const studyData = [
        { date: new Date(2025, 1, 4), activity: "low" },
        { date: new Date(2025, 1, 5), activity: "low" },
        { date: new Date(2025, 1, 11), activity: "medium" },
        { date: new Date(2025, 1, 13), activity: "high" },
        { date: new Date(2025, 1, 17), activity: "medium" },
        { date: new Date(2025, 1, 19), activity: "medium" },
        { date: new Date(2025, 1, 25), activity: "low" },
        { date: new Date(2025, 1, 27), activity: "high" },
    ];
    
    let currentDate = new Date();
    
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        document.getElementById("currentMonth").textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });
    
        const calendarDays = document.getElementById("calendar-days");
        calendarDays.innerHTML = "";
    
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
    
        let dayCount = 0;
    
        // Empty cells before the first day
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.innerHTML += `<div class="day empty"></div>`;
            dayCount++;
        }
    
        // Days with activity
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const activity = getActivityForDate(date);
            calendarDays.innerHTML += `<div class="day ${activity}">${day}</div>`;
            dayCount++;
        }
    
        // Empty cells at the end
        while (dayCount % 7 !== 0) {
            calendarDays.innerHTML += `<div class="day empty"></div>`;
            dayCount++;
        }
    }
    
    function getActivityForDate(date) {
        const match = studyData.find(d =>
            d.date.getDate() === date.getDate() &&
            d.date.getMonth() === date.getMonth() &&
            d.date.getFullYear() === date.getFullYear()
        );
        return match ? match.activity : "none";
    }
    
    document.getElementById("prevMonth").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });
    
    document.getElementById("nextMonth").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });
    
    updateCalendar();
    