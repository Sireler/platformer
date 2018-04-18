define(["require", "exports", "./position"], function (require, exports, position_1) {
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
            get: function () {
                return new position_1.ObjectPosition(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
            },
            enumerable: true,
            configurable: true
        });
        Trigger.prototype.draw = function (ctx, camera) {
            if (this.drawable) {
                this.drawable.draw(ctx, camera);
            }
        };
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