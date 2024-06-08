document.addEventListener("DOMContentLoaded", () => {
    let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    let timeRef = document.querySelector(".time-display");
    let int = null;
    let lapCounter = 1;
    let lapList = document.getElementById("lap-list");

    document.getElementById("start-timer").addEventListener("click", () => {
        if (int != null) {
            clearInterval(int);
        }
        int = setInterval(displayTimer, 10);
    });

    document.getElementById("pause-timer").addEventListener("click", () => {
        clearInterval(int);
    });

    document.getElementById("reset-timer").addEventListener("click", () => {
        clearInterval(int);
        [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
        timeRef.innerHTML = "00 : 00 : 00 : 000";
        // lapCounter = 1;
        // lapList.innerHTML = "";

    });

    document.getElementById("lap-timer").addEventListener("click", () => {
        let lapTime = `${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)} : ${formatMilliseconds(milliseconds)}`;
        let lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${lapCounter}:- ${lapTime}`;
        lapList.appendChild(lapItem);
        lapCounter++;
    });


    function displayTimer() {
        milliseconds += 10;
        if (milliseconds == 1000) {
            milliseconds = 0;
            seconds++;
            if (seconds == 60) {
                seconds = 0;
                minutes++;
                if (minutes == 60) {
                    minutes = 0;
                    hours++;
                }
            }
        }
        let h = formatTime(hours);
        let m = formatTime(minutes);
        let s = formatTime(seconds);
        let ms = formatMilliseconds(milliseconds);
        timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
    }
    function formatTime(unit) {
        return unit < 10 ? "0" + unit : unit;
    }

    function formatMilliseconds(unit) {
        if (unit < 10) {
            return "00" + unit;
        } else if (unit < 100) {
            return "0" + unit;
        } else {
            return unit;
        }
    }
});
