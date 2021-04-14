// Your code here
let createEmployeeRecord = function(array){
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(arrayofarrays){
  return arrayofarrays.map(function(array){
    return createEmployeeRecord(array)
  })
}

let createTimeInEvent = function(employee, timeStamp){
  let [date, hour] = timeStamp.split(' ')

  employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
  })

  return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, dayWorked){
  let clockIn = employee.timeInEvents.find(function(element){
    return element.date === dayWorked
  })

  let clockOut = employee.timeOutEvents.find(function(element){
    return element.date === dayWorked
  })

  return (clockOut.hour - clockIn.hour) / 100
}

let calculatePayroll = function(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce(function(memo, e){
    return memo + allWagesFor(e)
  }, 0)
}

let findEmployeeByFirstName = function(array, firstName){
  return array.find(function(e){
    return e.firstName === firstName
  })
}

let wagesEarnedOnDate = function(employee, dayWorked){
  let basePay = hoursWorkedOnDate(employee, dayWorked)
    * employee.payPerHour
  return parseFloat(basePay.toString())
}

let allWagesFor = function(employee){
  let eligibleDates = employee.timeInEvents.map(function(e){
    return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d){
    return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return payable
}
