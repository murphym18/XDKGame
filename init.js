function InitGame() {
    var _ctx;
    var _removed = [];
    var _removedBullets = [];
    var _actors = [];
    var _bullets = [];
    var _numUnloaded = 0;
    
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
        
        Object.defineProperty(this, "bullets", {
            get: function() { return _bullets; },
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
            value: _removeKilled,
            writable: false,
            enumerable: true,
            configurable: false
        });
        
        Object.defineProperty(this, "removeBullet", {
            value: _removeBullet,
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, "ctx", {
            get: function() { return _ctx; },
            enumerable: true,
            configurable: false
        });
        
        Object.defineProperty(this, "world", {
            value: new Box2D.b2World(new Box2D.b2Vec2(0, 0), true),
            enumerable: true,
            writable: false,
            configurable: false
        });

        Object.defineProperty(this, "resetGraphics", {
            value: resetGraphicsContexts,
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "iOS", {
            value: navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false,
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "toMeters", {
            value: function(x) { return x/4; },
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "toPixels", {
            value: function(x) { return 4*x; },
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "now", {
            value: timeNow,
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "ships", {
            value: {
                "PLASMA_SHIP": [],
                "Power Ship": [],
                "Spread Ship": [],
                "Wave Ship": []
            },
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "cache", {
            value: {},
            enumerable: true,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(this, "loadImage", {
            value: loadImageAsset,
            enumerable: true,
            writable: false,
            configurable: false
        });
    }
    
    function timeNow() {
        return (new Date()).getTime();
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
        
        canvas = document.createElement("canvas");
        canvas.id = app.CANVAS_ID;
        canvas.width = getWindowDimension("width");
        canvas.height = getWindowDimension("height");
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        document.body.appendChild(canvas);
        _ctx = canvas.getContext("2d");
        resetGraphicsContexts();
        
        if (app.camera) {
            app.camera.resizeCanvas();
        }
    }
    
    function _removeKilled() {
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
    }
    
    function _removeBullet(bullet) {
        if (bullet) {
            _removedBullets.push(actor);
        }
    }
    
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
        Object.defineProperty(app, "camera", {
            value: new Camera(),
            enumerable: true,
            writable: true,
            configurable: false
        });
    }
    
    function loadImageAsset(path) {
        ++_numUnloaded;
        var i = new Image();
        i.addEventListener("load", function(e){
            app.cache[path] = i;
            if (--_numUnloaded === 0) {
                afterAssetsLoad();
            }
        });
        i.src = path;
    }

    window.app = new App();
    
    window.addEventListener("resize", resetCanvas);
    
    window.addEventListener('orientationchange', resetCanvas);
    resetCanvas();
};

function loadAssets() {
    app.loadImage("asset/bg.png");
    app.loadImage("asset/debris.png");
    app.loadImage("asset/dpadBase.png");
    app.loadImage("asset/dpadMove.png");
    app.loadImage("asset/moon.png");
    app.loadImage("asset/obstacle.png");
    app.loadImage("asset/obstacle2.png");
    app.loadImage("asset/obstacle3.png");
    app.loadImage("asset/PlasmaShip.png");
    app.loadImage("asset/PlasmaShot.png");
    app.loadImage("asset/PowerShip.png");
    app.loadImage("asset/PowerShot.png");
    app.loadImage("asset/ShipPlaceHolderPlaceHolder.png");
    app.loadImage("asset/SpreadShip.png");
    app.loadImage("asset/SpreadShot.png");
    app.loadImage("asset/WaveShip.png");
    app.loadImage("asset/WaveShot.png");
}

function afterAssetsLoad() {
    initBulletConstructors();
    initShipPrototypes();
    setupInput();
    start();
}