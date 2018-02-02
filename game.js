window.addEventListener("load", function() {
    var Q = Quintus()
            .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
            .setup({ maximize: true })
            .touch();

    Q.input.touchControls({
        controls: [
            ['left', '<'],
            ['right', '>'],
            [], [], [], []
        ]
    });

    Q.controls();

    Q.Sprite.extend("Ship", {
        init: function (p) {
            this._super(p, {
                sprite: "ship",
                sheet: "ship",
                x: Q.el.width,
                y: Q.el.height,
                type: Q.SPRITE_FRIENDLY,
                speed: 10,
            });

            this.add('platformerControls, animation');
            this.play("default");
        },
        step: function (dt) {
            if (Q.inputs['left']) {
                this.p.x -= this.p.speed;
            }
            else if (Q.inputs['right']) {
                this.p.x += this.p.speed;
            }
            else if (Q.inputs['up']) {
                this.p.y -= this.p.speed;
            }
            else if (Q.inputs['down']) {
                this.p.y += this.p.speed;
            }
        }
    });

    Q.scene("sea", function (stage) {
        Q.gravity = 0;
        stage.insert(new Q.Repeater({ asset: "water.png", speedX: 0.5, speedY: 0.5 }));
        
        var ship = stage.insert(new Q.Ship());
        stage.add("viewport").follow(ship);
    });

    Q.load(["water.png", "ship.png", "ship.json"], function () {
        Q.compileSheets("ship.png", "ship.json");
        Q.animations("ship", { default: { frames: [0,1,2,3], rate: 1 / 4 } });

        Q.stageScene("sea");
    });
});
