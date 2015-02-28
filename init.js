function initGame() {
    var _ctx;
    var _removed = [];
    var _actors = [];

    function resetGraphicsContexts() {
        _ctx.fillStyle = "#000000";
        _ctx.font = "20px sans-serif";
        _ctx.globalAlpha = 1;
        _ctx.globalCompositeOperation = "source-over";
        _ctx.imageSmoothingEnabled = true;
        _ctx.lineCap = "butt";
        _ctx.lineDashOffset = 0;
        _ctx.lineJoin = "miter";
        _ctx.lineWidth = 1;
        _ctx.miterLimit = 10;
        _ctx.shadowBlur = 0;
        _ctx.shadowColor = "rgba(0, 0, 0, 0)";
        _ctx.shadowOffsetX = 0;
        _ctx.shadowOffsetY = 0;
        _ctx.strokeStyle = "#000000";
        _ctx.textAlign = "start";
        _ctx.textBaseline = "alphabetic";
        _ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    function App() {
        Object.defineProperty(this, "CANVAS_ID", {
            value: "game-canvas",
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "canvas", {
            get: function() { return document.getElementById(app.CANVAS_ID); },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "GAME_NAME", {
            value: window.document.head.firstElementChild.firstChild,
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "actors", {
            get: function() { return _actors; },
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "kill", {
            value: function(actor) {
                if (actor) {
                    _removed.push(actor);
                }
            },
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "removeKilled", {
            value: function() {
                if (_removed.length) {
                    var len = _actors.length;
                    var newLength = len - _removed.length;
                    for (var next = _removed.pop(); next; next = _removed.pop()) {
                        for (var i = 0; i < len; ++i) {
                            if (_actors[i] === next) {
                                _actors[i] = null;
                            }
                        }
                    }

                    var n = 0;
                    var tmp = new Array(newLength);
                    for (var i = 0; i < len; ++i) {
                        if (_actors[i]) {
                            tmp[n++] = _actors[i];
                        }
                    }

                    _actors = tmp;
                }
            },
            writable: false,
            enumerable: true,
            configurable: false
        }); 

        var context = {
            get: function() { return _ctx; },
            enumerable: true,
            configurable: false
        };

        Object.defineProperty(this, "ctx", context);
        Object.defineProperty(this, "context", context);
        Object.defineProperty(this, "graphics", context);

        Object.defineProperty(this, "resetGraphics", {
            value: resetGraphicsContexts,
            enumerable: true,
            writable: false,
            configurable: false
        });

        Object.defineProperty(this, "camera", {
            value: new Camera(),
            enumerable: true,
            writable: false,
            configurable: false
        });
    }

    function getWindowDimension(dim) {
        dim = dim.charAt(0).toUpperCase() + dim.slice(1).toLowerCase();
        var tmp = document.documentElement["client" + dim];
        return Math.max(tmp , window["inner"+dim] || 0);
    }

    function resetCanvas() {
        var canvas = document.getElementById(app.CANVAS_ID);
        if (canvas) {
            canvas.parentNode.removeChild(canvas);
        }
        var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

        console.log("ios? ",iOS)
        canvas = document.createElement("canvas");
        canvas.id = app.CANVAS_ID;
        if (iOS) {
            var w = getWindowDimension("width");
            var h = getWindowDimension("height");
            canvas.width = (w);
            canvas.height = (h);
        }
        else {
            canvas.width = getWindowDimension("width");
            canvas.height = getWindowDimension("height");
        }
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        if (iOS) {
            canvas.style.width = w;
            canvas.style.height = h;
        }

        document.body.appendChild(canvas);
        _ctx = canvas.getContext("2d");
        resetGraphicsContexts();
    }

    window.app = new App();
    window.addEventListener("resize", resetCanvas);
    resetCanvas();
}