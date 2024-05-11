function calculateTime() {
    // Get start and end dates
    var startDate = new Date(document.getElementById("start-date").value);
    var endDate = new Date(document.getElementById("end-date").value);

    // Calculate the time difference
    var timeDiff = endDate - startDate;

    // Convert time difference to seconds
    var totalSeconds = Math.abs(timeDiff) / 1000;

    // Calculate years
    var years = Math.floor(totalSeconds / (365 * 24 * 3600));
    totalSeconds %= (365 * 24 * 3600);

    // Calculate months
    var months = Math.floor(totalSeconds / (30 * 24 * 3600));
    totalSeconds %= (30 * 24 * 3600);

    // Calculate weeks
    var weeks = Math.floor(totalSeconds / (7 * 24 * 3600));
    totalSeconds %= (7 * 24 * 3600);

    // Calculate days
    var days = Math.floor(totalSeconds / (24 * 3600));
    totalSeconds %= (24 * 3600);

    // Calculate hours
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;

    // Calculate minutes
    var minutes = Math.floor(totalSeconds / 60);
    totalSeconds %= 60;

    // Remaining seconds
    var seconds = Math.floor(totalSeconds);

    // Display the result
    var result = "Years: " + years + "<br>"
               + "Months: " + months + "<br>"
               + "Weeks: " + weeks + "<br>"
               + "Days: " + days + "<br>"
               + "Hours: " + hours + "<br>"
               + "Minutes: " + minutes + "<br>"
               + "Seconds: " + seconds;

    document.getElementById("result").innerHTML = result;
}
