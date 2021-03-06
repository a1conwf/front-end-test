$(document).ready(function () {
    //Health insurance duration
    var insuranceDuration = 0;
    var isChecked = false;

    $("#tuberculosis").click(function () {
        $(this).toggleClass("active");
    });

    $(".submitBtn").click(function () {
        event.preventDefault();

        //Employer compensation value
        var employerCompensationValue = 0;

        //Health insurance compensation variables
        var healthCompensationDays = 0;
        var healthCompensationValue = 0;
        var healthCompensationValueDaily = 0;

        //Total compensation
        var totalCompensation = 0;
        var totalCompensationDays = 0;

        //Employer compensation days
        var employerCompensationDays = 0;

        //Getting values from inputs
        const averageIncome = $(".incomeInput").val();
        const daysSickLeave = $(".daysInput").val();

        //Employer compensation output variables
        const empDaysOutput = $(".emp__days");
        const empAmountOutput = $(".emp__amount");

        //Health insurance compensation output variables
        const healthDaysOutput = $(".health__days");
        const healthAmountOutput = $(".health__amount");
        const healthDailyAmountOutput = $(".health__daily__amount");

        //Total output variables
        const totaldays = $(".total__days");
        const totalValue = $(".total__value");

        function calculateCompensation() {
            //Check if days on sick-leave is from the 4th to the 8th
            if (daysSickLeave >= 4 && daysSickLeave <= 8) {
                for (var i = 4; i <= daysSickLeave; i++) {
                    employerCompensationDays++;
                    employerCompensationValue = employerCompensationDays * 28;
                }

                //Total compensation days
                totalCompensationDays = healthCompensationDays + employerCompensationDays;

                //Else maximum compensation days are 5 and compensation amount is 140
            } else if (daysSickLeave > 8) {
                employerCompensationDays = 5;
                employerCompensationValue = 140;

                //Health compensation days
                healthCompensationDays = daysSickLeave - 8;

                //Health compensation amount
                healthCompensationValueDaily = Math.floor((averageIncome * 0.7) / 31);
                healthCompensationValue = healthCompensationValueDaily * healthCompensationDays;

                //Total compensation days
                totalCompensationDays = healthCompensationDays + employerCompensationDays;
            }
        }

        //Check if checkbox input has active class
        $("#tuberculosis").hasClass("active") ? isChecked = true : isChecked = false;

        //Check if isChecked == true, if so, insuranceDuration is 240 days, else insuranceDuration is 180 days 
        if (isChecked) {
            insuranceDuration = 240;
            if (daysSickLeave < insuranceDuration) {
                calculateCompensation();

                //Output total compensation days
                totaldays.html(totalCompensationDays + " days");
            } else {
                alert("Maximum health insurance duration in case of tuberculosis is " + insuranceDuration + " days");
            }

        } else {
            insuranceDuration = 182;

            if (daysSickLeave > insuranceDuration) {
                alert("Maximum health insurance duration unless you have tuberculosis is " + insuranceDuration + " days");
            } else {
                calculateCompensation();

                //Output total compensation days
                totaldays.html(totalCompensationDays + " days");
            }
        }

        //Calculate total compensation value
        totalCompensation = (employerCompensationValue + healthCompensationValue) - ((employerCompensationValue + healthCompensationValue) * 0.2);

        //Output employeer compensation
        empDaysOutput.html(employerCompensationDays + " days");
        empAmountOutput.html(employerCompensationValue + ",00" + "&euro;");

        //Output health insurance compensation
        healthDaysOutput.html(healthCompensationDays + " days");
        healthAmountOutput.html(healthCompensationValue + ",00" + "&euro;");
        healthDailyAmountOutput.html(healthCompensationValueDaily + ",00" + "&euro;");

        //Output total compensation
        totalValue.html(totalCompensation + "&euro;");
    });
});