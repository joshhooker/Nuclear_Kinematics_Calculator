export function resultFormatter(result) {
    Object.keys(result).forEach(function (field) {
        Object.keys(result[field]).forEach(function (entry) {
            if (result[field][entry] && !isNaN(result[field][entry])) {
                result[field][entry] = valueFormatter(result[field][entry], field, entry);
            }
        })
    });
    return result;
}

function valueFormatter(val, field, entry) {
    switch (field) {
        case "kinematics":
            val = kinematicsFormatter(val, entry);
            break;
        default:
            val = formatConvertion(val, 4, 3);
            break;
    }
    return val;
}

function kinematicsFormatter(val, entry) {
    val = formatConvertion(val, 4, 3);
    return val;
}

function formatConvertion(num, fixed, exp) {
    if (Math.abs(num.e) < 4) {
        return num.toFixed(fixed).toString();
    } else {
        return num.toExponential(exp).toString();
    }
}