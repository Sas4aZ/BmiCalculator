
function calculateBMI() {
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    var weightUnit = document.getElementById("weightUnit").value;
    var heightUnit = document.getElementById("heightUnit").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;

    // Convert weight to kg if unit is lbs
    if (weightUnit === "lbs") {
        weight *= 0.453592; // 1 lb = 0.453592 kg
    }
    //Conversion of KGS to pounds
    if(weightUnit ==="kgs") {
        weight *= (1/0.453592);
    }

    // Convert height to meters
    if (heightUnit === "cm") {
        height /= 100; // 1 m = 100 cm
    } else if (heightUnit === "ft") {
        height *= 0.3048; // 1 ft = 0.3048 m
    }

    var bmi = weight / (height * height);
    bmi = bmi.toFixed(1); // Round to 1 decimal place

    var result = "Your BMI is " + bmi + ". ";
    if (gender === "male") {

        if (bmi < 18.5) {
            result += "You are underweight.";
            displayHealthyWeight(height, weight,gender, 'primary');
        } else if (bmi >= 18.5 && bmi < 25) {
            result += "You have a normal weight.";
            createAlert('add', 'success' , 'Hooray! You are in perfect shape.');
        } else if (bmi >= 25 && bmi < 30) {
            result += "You are overweight.";
            displayHealthyWeight(height, weight,gender, 'warning');
        } else {
            result += "You are obese.";
            displayHealthyWeight(height, weight, gender, 'danger');
        }

    } else if (gender === "female") {
        if (bmi < 18.5) {

            result += "You are underweight.";
            displayHealthyWeight(height, weight,gender,'primary' );
        } else if (bmi >= 18.5 && bmi < 24) {
            result += "You have a normal weight.";
            createAlert('add', 'success' , 'Hooray! You are in perfect shape.');
        } else if (bmi >= 25 && bmi < 30) {

            result += "You are overweight.";
            displayHealthyWeight(height,weight,gender, 'warning');
        } else {
            result += "You are obese.";
            displayHealthyWeight(height, weight, gender, 'danger');

        }
    }

    document.getElementById("result").innerText = result;
}
function displayHealthyWeight(height, weight, gender, alert_type) {
    var healthyBMI;

    if (gender === "male") {
        healthyBMI = 24.9; // Maximum BMI for normal weight in males
    } else if (gender === "female") {
        healthyBMI = 23.9; // Maximum BMI for normal weight in females
    }

    var healthyWeightKg = (healthyBMI * (height * height)).toFixed(1);
    var healthyWeightLbs = (healthyWeightKg * 2.20462).toFixed(1); // Convert kg to lbs

    var result = "To achieve a healthy BMI, you should aim for a weight of approximately " + healthyWeightKg + " kg or " + healthyWeightLbs + " lbs.";

    createAlert('add', alert_type, result);

}



function createAlert(dom_element, alert_type, text) {
    var select = document.getElementById(dom_element);
    select.removeChild(select.lastElementChild);
    var element = document.createElement('div');
    element.classList.add('alert');
    element.classList.add('alert-'+alert_type);
    element.innerText = text
    document.getElementById(dom_element).appendChild(element);
}