//@ts-check

function setup() {
    let avatar = {
        div: document.getElementById("avatar"),
        x: 0,
        y: 0,
        moveLeft: function() {
            if (this.x > 0) {
                this.x -= 1;
                this.update();
            }
        },
        moveRight: function() {
            if (this.x < 11) {
                this.x += 1;
                this.update();
            }

        },
        moveUp: function() {
            if (this.y > 0) {
                this.y -= 1;
                this.update();
            }

        },
        moveDown: function() {
            if (this.y < 11) {
                this.y += 1;
                this.update();
            }

        },
        update: function() {
            this.div.style.left = this.x * 32 + "px";
            this.div.style.top = this.y * 32 + "px";
        }
    }
    document.addEventListener("keydown", (e) => { dostuff(e) })


    /**
     * @param {KeyboardEvent} e
     */
    function dostuff(e) {
        const key = e.key;
        switch (key) {
            case "a":
                avatar.moveLeft()

                break;

            case "d":
                avatar.moveRight()

                break;

            case "w":
                avatar.moveUp()

                break;

            case "s":
                avatar.moveDown()

                break;

        }
    }



}