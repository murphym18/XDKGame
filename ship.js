function PlasmaShip(x, y) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y);
    Ship.call(this, this.props.hp, this.BULLET_FACTORY);
    AnimatedImage.call(this, this.props.sprite, this.props.frameCount, this.props.framesPerSecond);
    this.others.push(this);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
}

function PowerShip(x, y) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y);
    Ship.call(this, this.props.hp, this.BULLET_FACTORY);
    AnimatedImage.call(this, this.props.sprite, this.props.frameCount, this.props.framesPerSecond);
    this.others.push(this);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
}

function SpreadShip(x, y) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y);
    Ship.call(this, this.props.hp, this.BULLET_FACTORY);
    AnimatedImage.call(this, this.props.sprite, this.props.frameCount, this.props.framesPerSecond);
    this.others.push(this);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
}
function WaveShip(x, y) {
    GameType.call(this, this.props.typeName);
    SpaceObject.call(this, x, y);
    Ship.call(this, this.props.hp, this.BULLET_FACTORY);
    AnimatedImage.call(this, this.props.sprite, this.props.frameCount, this.props.framesPerSecond);
    this.others.push(this);
    var fixtureDef = new b2FixtureDef();
    var tmpW = this.width/2;
    var tmpH = this.height/2;
    fixtureDef.set_shape(makeBoxShape(tmpW, tmpH, 0, 0, 0));
    fixtureDef.set_density(this.DEFAULT_DENSITY);
    fixtureDef.set_friction(0);
    this.body.CreateFixture(fixtureDef);
}

function initShipPrototypes() {
    PlasmaShip.prototype = new ShipPrototype({
        typeName: "PLASMA_SHIP",
        hp: 50,
        bulletDamage: 20,
        fireRate: 200,
        bullet: PlasmaShot,
        change: function(x,y){return new PlasmaChange(x,y);},
        sprite: app.cache["asset/PlasmaShip.png"],
        frameCount: 8,
        framesPerSecond: 10,
        topSpeed: 12,
        bulletSound: app.cache["asset/PlasmaShotSound.wav"],
        bulletFactory: function(origin) {
            return new PlasmaShot(origin);
        }
    });
    PowerShip.prototype = new ShipPrototype({
        typeName: "POWER_SHIP",
        hp: 100,
        bulletDamage: 5,
        fireRate: 150,
        bullet: PowerShot,
        change: function(x,y){return new PowerChange(x,y);},
        sprite: app.cache["asset/PowerShip.png"],
        frameCount: 6,
        framesPerSecond: 10,
        topSpeed: 12,
        bulletSound: app.cache["asset/BaseShotSound.wav"],
        bulletFactory: function(origin) {
            return new PowerShot(origin);
        }
    });
    SpreadShip.prototype = new ShipPrototype({
        typeName: "SPREAD_SHIP",
        hp: 70,
        bulletDamage: 15,
        fireRate: 200,
        bullet: SpreadShot,
        change: function(x,y){return new SpreadChange(x,y);},
        sprite: app.cache["asset/SpreadShip.png"],
        frameCount: 6,
        framesPerSecond: 10,
        topSpeed: 12,
        bulletSound: app.cache["asset/TripleShotSound.wav"],
        bulletFactory: function(origin) {
            return new SpreadShot(origin);
        }
    });
    WaveShip.prototype = new ShipPrototype({
        typeName: "WAVE_SHIP",
        hp: 60,
        bulletDamage: 30,
        fireRate: 350,
        bullet: WaveShot,
        change: function(x,y){return new WaveChange(x,y);},
        sprite: app.cache["asset/WaveShip.png"],
        frameCount: 8,
        framesPerSecond: 10,
        topSpeed: 12,
        bulletSound: app.cache["asset/WaveShotSound.wav"],
        bulletFactory: function() {
            return new WaveShot();
        }
    });

}


function aimAndFireAtEnemy() {
    /*if (!this.ENEMY_DETECTED) {
        this.update = searchForEnemy.bind(this);
        return;
    }*/
    
    var ANGLE_THRESHOLD = 5*Math.PI/180; //5 degrees
    var IDEAL_ANGLE_VELOCITY = 15*Math.PI/180; //15 degrees per second
    var deltaAngle = otherShip.angle - this.angle;
    var idealAngularVel = Math.sign(deltaAngle)*IDEAL_ANGLE_VELOCITY;
    
    if (deltaAngle < ANGLE_THRESHOLD) {
        this.body.SetAngularVelocity(0.05*this.body.GetAngularVelocity());
        this.fireWeapon();
    }
    else if (this.body.GetAngularVelocity() - idealAngularVel > ANGLE_THRESHOLD) {
        this.body.SetAngularVelocity(idealAngularVel*(1 - Math.random()*0.15));
    }
    this.fireWeapon();
}
function updateAiShip() {
    //this.fireWeapon();
    var otherShip = app.player;

    var ANGLE_THRESHOLD = 5*Math.PI/180; //5 degrees
    var IDEAL_ANGLE_VELOCITY = 15*Math.PI/180; //15 degrees per second
    var deltaAngle = otherShip.angle - this.angle;
    var idealAngularVel = Math.sign(deltaAngle)*IDEAL_ANGLE_VELOCITY;
    
    if (deltaAngle < ANGLE_THRESHOLD) {
        this.body.SetAngularVelocity(0.05*this.body.GetAngularVelocity());
        //this.fireWeapon();
    }
    else if (this.body.GetAngularVelocity() - idealAngularVel > ANGLE_THRESHOLD) {
        this.body.SetAngularVelocity(idealAngularVel*(1 - Math.random()*0.15));
    }
    //this.body.SetAngularVelocity(idealAngularVel*(1 - Math.random()*0.15));
    //this.angle = Math.atan2(this.x - app.player.x, app.player.y - this.y);
    
    if (Math.abs(this.x - app.player.x) > 20 ||
        Math.abs(this.y - app.player.y) > 20)
    {
        if (Math.floor(Math.random()*100)%100==0)
        this.angle += (Math.random()*6);
        var velX = - Math.sin(this.angle);
        var velY = Math.cos(this.angle);
        var vec = new b2Vec2(velX, velY);
        vec.Normalize();
        vec.op_mul(this.topSpeed / 4);
        this.vx = vec.get_x();
        this.vy = vec.get_y();
    }
    else if (Math.abs(this.x - app.player.x) > 10 ||
        Math.abs(this.y - app.player.y) > 10)
    {
        this.angle = Math.atan2(this.x - app.player.x, app.player.y - this.y);
        var velX = - Math.sin(this.angle);
        var velY = Math.cos(this.angle);
        var vec = new b2Vec2(velX, velY);
        vec.Normalize();
        vec.op_mul(this.topSpeed / 2);
        this.vx = vec.get_x();
        this.vy = vec.get_y();
    }
    else if (Math.abs(this.x - app.player.x) > 5 ||
        Math.abs(this.y - app.player.y) > 5)
    {
        this.angle = Math.atan2(this.x - app.player.x, app.player.y - this.y);
        this.angle += Math.floor(Math.random())/3;
        if (Math.abs(this.y - app.player.y) > Math.abs(this.x - app.player.x))
            this.vx = app.player.x - this.x;
        else
            this.vy = app.player.y - this.y;
        this.body.SetAngularVelocity(idealAngularVel*(1 - Math.random()*0.15));
        if (this.TYPE != app.player.TYPE)
        {
            if (Math.floor(Math.random()*20)%20==0)
                this.fireWeapon();
        }
        else
        {
            if (Math.floor(Math.random()*10)%10==0)
                this.fireWeapon();
        }
    }
}

function Ship(hp, bulletFactory) {
    ShipAi.call(this);
    this.fireRate = this.props.fireRate ? this.props.fireRate : 500;
    var _health = hp;
    if (!app[this.TYPE + "_BULLET_CACHE"]) {
        app[this.TYPE + "_BULLET_CACHE"] = new BulletCache(bulletFactory, this.fireRate);
    }
    var _bullets = app[this.TYPE + "_BULLET_CACHE"].getBullets();
    var _nextBulletIndex = 0;
    function _fireWeapon(){
        if (!this.lastShotTime || app.now() - this.lastShotTime > this.fireRate) {
            _bullets[_nextBulletIndex++ % _bullets.length].fire(this);
            this.lastShotTime = app.now();
            if (app.player === this) {
                this.props.bulletSound.play();
            }
        }
    }
    this.damage = function (object) {
        _health -= object.bulletDamage;
        if (_health <= 0) {
            if (object == app.player)
                app.score += this.__proto__.SPAWN_HEALTH / 10;
            app.cache["asset/DestroyShip.wav"].play();
            this.onDeath();
        }
    };
    
    var _isDead = false;
    
    Object.defineProperty(this, "isDead", {
        get: function() { return _isDead; },
        enumerable: true,
        configurable: true
    });
    function _explode() {
        app[this.TYPE + "_BULLET_CACHE"].freeBullets(_bullets);
        if (!_isDead) {
            AnimatedImage.call(this, app.cache["asset/Explosion.png"], 8, 10);
            this.updateCurrentFrame = showFramesThenKill.bind(this);
            if (this != app.player)
                this.update = (function() {
                    this.change(this.x, this.y);
                    this.update = function(){};
                }).bind(this);
            else
                this.update = function(){};
            _isDead = true;
        }
    }
    
    Object.defineProperty(this, "health", {
        get: function() { return _health; },
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "bulletDamage", {
        value: this.props.bulletDamage,
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(this, "isShip", {
        value: true,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    this.lastShotTime = null;
    this.update = updateAiShip.bind(this);
    this.fireWeapon = _fireWeapon.bind(this);
    this.onDeath = _explode.bind(this);
}

function ShipPrototype(props) {
    this.topSpeed = props.topSpeed ? props.topSpeed : 150;
    this.props = props;
    var _init = function(x, y) {

    };
    
    Object.defineProperty(this, "init", {
        value: _init,
        writable: false,
        enumerable: false,
        configurable: false
    });
    
    Object.defineProperty(this, "SPAWN_HEALTH", {
        value: props.hp,
        writable: true,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "BULLET_FACTORY", {
        value: props.bulletFactory,
        writable: false,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "change", {
        value: props.change,
        writable: true,
        enumerable: true,
        configurable: false
    });
    
    Object.defineProperty(this, "others", {
        get: function() {
            return app.ships[this.TYPE];
        },
        enumerable: true,
        configurable: false
    });
}

Object.defineProperty(ShipPrototype.prototype, "DEFAULT_DENSITY", {
    value: 5,
    writable: true,
    enumerable: true,
    configurable: false
});

function BulletCache(bulletFactory, fireRate) {
    var _bulletFactory = bulletFactory;
    var _fireRate = bulletFactory;
    var _bulletSets = [];
    var _size = Math.round(2000/fireRate) + 2;
    console.log(_size);
    this.getBullets = function() {
        var bullets = _bulletSets.length !== 0 ? _bulletSets.pop() :
            new Array(_size);
        if (!bullets[0]) {
            for (var i=0; i < bullets.length; ++i) {
                bullets[i] = bulletFactory(this);
            }
        }
        return bullets;
    }
    
    this.freeBullets = function(bullets) {
        _bulletSets.push(bullets);
    }
}