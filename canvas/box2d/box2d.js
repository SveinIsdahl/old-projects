var hel = "hello world"
console.log(hel);

planck.testbed('test', function (testbed) {
    testbed.speed = 1.3;
    testbed.hz = 60;

    var pl = planck 
    var Vec2 = pl.Vec2;
    var world = new pl.World({
        gravity: Vec2(0, -10)
    });

    var ground = world.createBody({
        type: 'static',
        position: Vec2(2, 5),
    });
    ground.createFixture({
        shape: planck.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)),
    });

    let boxes = [];
    for(i = 0;i < 10; i++){
        boxes += planck.Box(400,100);
    }

    return world;
});