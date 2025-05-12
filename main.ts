let pinsList = [DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P8, DigitalPin.P9]
let kör = false
let läge = 0

input.onButtonPressed(Button.B, function () {
    if (!kör) {
        kör = true
        basic.showIcon(IconNames.Happy)
    } else {
        läge = (läge + 1) % 4
    }
})

input.onButtonPressed(Button.A, function () {
    kör = false
    släckAllt()
    basic.clearScreen()
})

function släckAllt() {
    for (let pin of pinsList) {
        pins.digitalWritePin(pin, 0)
    }
}

function läge0() {
    for (let i = 0; i < pinsList.length; i++) {
        pins.digitalWritePin(pinsList[i], 1)
        if (i > 0) pins.digitalWritePin(pinsList[i - 1], 0)
        basic.pause(150)
    }
    pins.digitalWritePin(pinsList[pinsList.length - 1], 0)
}

function läge1() {
    for (let i = pinsList.length - 1; i >= 0; i--) {
        pins.digitalWritePin(pinsList[i], 1)
        if (i < pinsList.length - 1) pins.digitalWritePin(pinsList[i + 1], 0)
        basic.pause(150)
    }
    pins.digitalWritePin(pinsList[0], 0)
}

function läge2() {
    for (let pin of pinsList) {
        pins.digitalWritePin(pin, 1)
        basic.pause(100)
    }
    basic.pause(200)
    for (let pin of pinsList) {
        pins.digitalWritePin(pin, 0)
        basic.pause(100)
    }
}

function surprise() {
    let slump = Math.randomRange(0, 2)
    if (slump == 0) läge0()
    else if (slump == 1) läge1()
    else läge2()
}

basic.forever(function () {
    if (kör) {
        if (läge == 0) läge0()
        else if (läge == 1) läge1()
        else if (läge == 2) läge2()
        else if (läge == 3) surprise()
    } else {
        basic.pause(200)
    }
})
