define(["require", "exports", "../Position"], function (require, exports, Position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Trigger = /** @class */ (function () {
        function Trigger(position, size) {
            this.position = position;
            this.size = size;
            this.drawable = null;
            this.radius = (size.width < size.height) ? size.width / 2 : size.height / 2;
        }
        Object.defineProperty(Trigger.prototype, "center", {
            // returns center of the object
            get: function () {
                return new Position_1.ObjectPosition(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
            },
            enumerable: true,
            configurable: true
        });
        // Drawing object into a canvas
        Trigger.prototype.draw = function (ctx, camera) {
            if (this.drawable) {
                this.drawable.draw(ctx, camera);
            }
        };
        // checking the contact of objects
        Trigger.prototype.checkHit = function (obj) {
            var distance = this.center.distance(obj.center);
            if (distance < this.radius) {
                this.onTrigger(obj);
            }
        };
        return Trigger;
    }());
    exports.Trigger = Trigger;
});
//# sourceMappingURL=Trigger.js.map