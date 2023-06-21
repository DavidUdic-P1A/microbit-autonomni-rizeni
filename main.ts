let motor1 = PCAmotor.Motors.M1
let motor4 = PCAmotor.Motors.M4
radio.setGroup(69)
let leftSpeed = 60
let rightSpeed = 60

let direction = "0"
let autonomous = true
let whiteLine = 0

const pinCenter = DigitalPin.P15
const pinLeft = DigitalPin.P14
const pinRight = DigitalPin.P13

pins.setPull(pinCenter, PinPullMode.PullNone)

basic.forever(function () {
    if (autonomous) {
        let centerSensor = (whiteLine ^ pins.digitalReadPin(pinCenter)) == 0 ? true : false
        let leftSensor = (whiteLine ^ pins.digitalReadPin(pinLeft)) == 0 ? true : false
        let rightSensor = (whiteLine ^ pins.digitalReadPin(pinRight)) == 0 ? true : false

        if (!rightSensor && !leftSensor && direction == "r") {
            leftSpeed = -105
            rightSpeed = -105
            PCAmotor.MotorRun(motor1, leftSpeed)
            PCAmotor.MotorRun(motor4, -rightSpeed)
            basic.pause(600)
            do {
                rightSensor = (whiteLine ^ pins.digitalReadPin(pinRight)) == 0 ? true : false
            } while (rightSensor)
            basic.clearScreen()
            direction = "0"
        }

        if (!rightSensor && !leftSensor && direction == "l") {
            leftSpeed = 105
            rightSpeed = 115
            basic.pause(100)
            PCAmotor.MotorRun(motor1, leftSpeed)
            PCAmotor.MotorRun(motor4, -rightSpeed)
            basic.pause(600)
            do {
                rightSensor = (whiteLine ^ pins.digitalReadPin(pinRight)) == 0 ? true : false
            } while (rightSensor)
            basic.clearScreen()
            direction = "0"
        }

        if (!rightSensor && !leftSensor && direction == "s") {
            rightSpeed = 115
            leftSpeed = -115
            PCAmotor.MotorRun(motor1, -leftSpeed)
            PCAmotor.MotorRun(motor4, -rightSpeed)
            basic.pause(600)
            basic.clearScreen()
            direction = "0"
        }



        if (rightSensor) {
            rightSpeed = 115
        } else {
            rightSpeed = 0
        }

        if (leftSensor) {
            leftSpeed = -115
        } else {
            leftSpeed = 0
        }

        PCAmotor.MotorRun(motor1, leftSpeed)
        PCAmotor.MotorRun(motor4, -rightSpeed)
    }
    radio.onReceivedString(function (receivedString) {
        if (receivedString == "s") {
            direction = "s"
        }
        if (receivedString == "l") {
            direction = "l"
        }
        if (receivedString == "r") {
            direction = "r"
        }
    })
})

/*OVLADAČ

 radio.setGroup(69)
 input.onButtonPressed(Button.A, function () {
     radio.sendString("l")
    })
 input.onButtonPressed(Button.B, function () {
     radio.sendString("r")
    })
input.onButtonPressed(Button.AB, function () {
     radio.sendString("s")
    }) */