window.addEventListener("load", function() {
    // Setup
    var Q = Quintus()
            .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
            .setup({ maximize: true })
            .touch();

    // Setup controls
    Q.input.touchControls({
        controls: [
            ['left', '<'],
            ['right', '>'],
            [], [], [], []
        ]
    });

    Q.controls();


    // Sprites
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
            this.play("right");
        },
        step: function (dt) {
            if (Q.inputs['left']) {
                this.p.x -= this.p.speed;
                this.play("left");
            }
            else if (Q.inputs['right']) {
                this.p.x += this.p.speed;
                this.play("right");
            }
            else if (Q.inputs['up']) {
                this.p.y -= this.p.speed;
                this.play("up");
            }
            else if (Q.inputs['down']) {
                this.p.y += this.p.speed;
                this.play("down");
            }
        }
    });

    Q.Sprite.extend("Island1", {
        init: function (p) {
            this._super(p, {
                sprite: "island1",
                sheet: "island1",
                x: Q.el.width + 300,
                y: Q.el.height,
                type: Q.SPRITE_FRIENDLY,
                speed: 0,
            });
        }});

    
    // Scenes
    Q.scene("sea", function (stage) {
        Q.gravity = 0;
        stage.insert(new Q.Repeater({ asset: "water.png", speedX: 0.5, speedY: 0.5 }));
        stage.insert(new Q.Island1());
        
        var ship = stage.insert(new Q.Ship());
        stage.add("viewport").follow(ship);
    });


    // On load
    Q.load(["water.png", "ship.png", "ship.json", "island1.png", "island1.json"], function () {
        Q.compileSheets("ship.png", "ship.json");
        Q.compileSheets("island1.png", "island.json");

        Q.animations("ship", {
            left: { frames: [4,5,6,7], rate: 1 / 4 },
            right: { frames: [8,9,10,11], rate: 1 / 4 },
            up: { frames: [12,13,14,15], rate: 1 / 4 },
            down: { frames: [0,1,2,3], rate: 1 / 4 },
        });

        Q.stageScene("sea");
    });
});
