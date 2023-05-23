let _2 = 0
let _1 = 0
let sprite = 0
game.setLife(3)
let ball = game.createSprite(2, 2)
let mittespieler = game.createSprite(0, 2)
let untenspieler = game.createSprite(0, 3)
let obenspieler = game.createSprite(0, 1)
let gegneroben = game.createSprite(4, 1)
let gegnermitte = game.createSprite(4, 2)
let gegnerunten = game.createSprite(4, 3)
gegneroben.set(LedSpriteProperty.Brightness, 0)
gegnermitte.set(LedSpriteProperty.Brightness, 0)
gegnerunten.set(LedSpriteProperty.Brightness, 0)
loops.everyInterval(1000, function () {
    if (game.isRunning()) {
        sprite += 1
    }
})
basic.forever(function () {
    for (let index = 0; index < 125; index++) {
        control.waitMicros(1000)
    }
    if (input.rotation(Rotation.Pitch) <= -10) {
        obenspieler.change(LedSpriteProperty.Y, -1)
        mittespieler.change(LedSpriteProperty.Y, -1)
        untenspieler.change(LedSpriteProperty.Y, -1)
        if (mittespieler.isTouching(obenspieler)) {
            mittespieler.change(LedSpriteProperty.Y, 1)
        }
        if (untenspieler.isTouching(mittespieler)) {
            untenspieler.change(LedSpriteProperty.Y, 1)
        }
    } else if (input.rotation(Rotation.Pitch) >= 10) {
        untenspieler.change(LedSpriteProperty.Y, 1)
        mittespieler.change(LedSpriteProperty.Y, 1)
        obenspieler.change(LedSpriteProperty.Y, 1)
        if (mittespieler.isTouching(untenspieler)) {
            mittespieler.change(LedSpriteProperty.Y, -1)
        }
        if (obenspieler.isTouching(mittespieler)) {
            obenspieler.change(LedSpriteProperty.Y, -1)
        }
    }
    if (obenspieler.isTouching(ball)) {
        ball.set(LedSpriteProperty.Direction, 315)
    } else if (mittespieler.isTouching(ball)) {
        ball.set(LedSpriteProperty.Direction, 0)
        ball.move(1)
    } else if (untenspieler.isTouching(ball)) {
        ball.set(LedSpriteProperty.Direction, 45)
    } else if (gegneroben.isTouching(ball)) {
        ball.set(LedSpriteProperty.Direction, 45)
    } else if (gegnermitte.isTouching(ball)) {
        ball.set(LedSpriteProperty.Direction, 180)
    } else if (gegnerunten.isTouching(ball)) {
        ball.set(LedSpriteProperty.Direction, 135)
    } else if (ball.isTouchingEdge()) {
        if (led.point(0, 0) && led.point(0, 3) || led.point(0, 1) && led.point(0, 4)) {
            game.removeLife(1)
            ball.delete()
            ball = game.createSprite(2, 2)
            basic.pause(500)
        }
    }
    ball.move(1)
    if (ball.get(LedSpriteProperty.X) == 3) {
        _1 = 0
        _2 += 1
    } else if (ball.get(LedSpriteProperty.X) == 1) {
        _1 += 1
        _2 = 0
    }
    if (_2 == 1 || _2 == 2) {
        ball.change(LedSpriteProperty.X, -1)
        obenspieler.set(LedSpriteProperty.Brightness, 0)
        mittespieler.set(LedSpriteProperty.Brightness, 0)
        untenspieler.set(LedSpriteProperty.Brightness, 0)
        if (_2 == 2) {
            gegneroben.set(LedSpriteProperty.Brightness, 300)
            gegnermitte.set(LedSpriteProperty.Brightness, 300)
            gegnerunten.set(LedSpriteProperty.Brightness, 300)
        }
    } else if (_1 == 1 || _1 == 2) {
        ball.change(LedSpriteProperty.X, 1)
        gegneroben.set(LedSpriteProperty.Brightness, 0)
        gegnermitte.set(LedSpriteProperty.Brightness, 0)
        gegnerunten.set(LedSpriteProperty.Brightness, 0)
        if (_1 == 2) {
            obenspieler.set(LedSpriteProperty.Brightness, 300)
            mittespieler.set(LedSpriteProperty.Brightness, 300)
            untenspieler.set(LedSpriteProperty.Brightness, 300)
        }
    }
    ball.ifOnEdgeBounce()
})
basic.forever(function () {
    if (game.isGameOver()) {
        basic.showNumber(sprite)
    }
})
control.inBackground(function () {
    music.playMelody("A G A F G A B C ", 120)
    music.playMelody("B A G F E F G F ", 120)
    music.playMelody("A G A B A F E F ", 120)
    music.playMelody("E G A G F G B C5 ", 120)
    music.playMelody("A G F E D E F G ", 120)
    music.playMelody("A G F E D E F G ", 120)
    music.playMelody("A B C5 B A B C5 B ", 120)
    music.playMelody("E F G F E D E F ", 120)
})
