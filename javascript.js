document.addEventListener("DOMContentLoaded", () => {
    const timeInput = document.getElementById("timeInput");
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const increaseBtn = document.getElementById("increaseBtn");
    const decreaseBtn = document.getElementById("decreaseBtn");
    const timerDisplay = document.getElementById("timer");

    let countdown;
    let remainingTime = 0;
    let isRunning = false;

    function saveToLocalStorage() {
        localStorage.setItem("timerData", JSON.stringify({ remainingTime, isRunning }));
    }

    function loadFromLocalStorage() {
        const savedData = JSON.parse(localStorage.getItem("timerData"));
        if (savedData) {
            remainingTime = savedData.remainingTime;
            isRunning = savedData.isRunning;
            updateTimerDisplay();
            if (isRunning) startTimer();
        }
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerDisplay.textContent = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    }

    function startTimer() {
        if (remainingTime <= 0) return;

        isRunning = true;
        saveToLocalStorage();

        countdown = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                updateTimerDisplay();
                saveToLocalStorage();
            } else {
                clearInterval(countdown);
                isRunning = false;
                saveToLocalStorage();
                alert("Час вийшов!");
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(countdown);
        isRunning = false;
        saveToLocalStorage();
    }

    function changeTime(seconds) {
        remainingTime = Math.max(0, remainingTime + seconds);
        updateTimerDisplay();
        saveToLocalStorage();
    }

    startBtn.addEventListener("click", () => {
        if (!isRunning) {
            remainingTime = parseInt(timeInput.value) || remainingTime;
            if (remainingTime > 0) {
                startTimer();
            }
        }
    });

    pauseBtn.addEventListener("click", pauseTimer);
    increaseBtn.addEventListener("click", () => changeTime(5));
    decreaseBtn.addEventListener("click", () => changeTime(-5));

    loadFromLocalStorage();
});
