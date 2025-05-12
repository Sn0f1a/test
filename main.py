from microbit import *
import random

led_pins = [pin0, pin1, pin2, pin8, pin9]
kör = False
läge = 0  # Startläge

def släck_allt():
    for p in led_pins:
        p.write_digital(0)

def läge_0():
    for i in range(len(led_pins)):
        led_pins[i].write_digital(1)
        if i > 0:
            led_pins[i-1].write_digital(0)
        sleep(150)
    led_pins[-1].write_digital(0)

def läge_1():
    for i in range(len(led_pins)-1, -1, -1):
        led_pins[i].write_digital(1)
        if i < len(led_pins)-1:
            led_pins[i+1].write_digital(0)
        sleep(150)
    led_pins[0].write_digital(0)

def läge_2():
    for p in led_pins:
        p.write_digital(1)
        sleep(100)
    sleep(200)
    for p in led_pins:
        p.write_digital(0)
        sleep(100)

def surprise():
    random.choice([läge_0, läge_1, läge_2])()

# ✅ Inneslut allt i try-except för att fånga problem
try:
    while True:
        if button_b.is_pressed() and not kör:
            print("Startar")
            kör = True
            sleep(500)

        if button_b.was_pressed() and kör:
            läge = (läge + 1) % 4
            print("Byte till läge", läge)

        if button_a.was_pressed() and kör:
            läge = random.randint(0, 3)
            print("Slumpar till läge", läge)

        if button_a.is_pressed() and kör:
            print("Stoppar")
            kör = False
            släck_allt()
            sleep(500)

        if kör:
            if läge == 0:
                läge_0()
            elif läge == 1:
                läge_1()
            elif läge == 2:
                läge_2()
            elif läge == 3:
                surprise()
        else:
            sleep(200)

except KeyboardInterrupt:
    print("Avbrutet")
    släck_allt()
