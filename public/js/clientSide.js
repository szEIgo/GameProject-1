var canvas, engine, scene, light, groundMaterial, ground, freeCam, playerCam;
var player = {};
var players = {};

window.addEventListener('DOMContentLoaded', function(){

  // get canvas
  canvas = document.getElementById('renderCanvas');
  // start motoren
  engine = new BABYLON.Engine(canvas, true);
  // lav en scene
  scene = createScene();

  //addLocalPlayer();

  // ved ikke om engine.resize() skal have noget input, bør undersøges..
  window.addEventListener('resize', function(){
    engine.resize();
  });

  // renderloop / gameloop
  engine.runRenderLoop(function() {
    scene.render();
  });
});
  function rotateItem(item, direction){

  }

  // move an item in the world to the target position
  function moveItem(item, target){

    console.log(target);
    item.mesh.position.x = target.x;
    item.mesh.position.y = target.y + 1;
    item.mesh.position.z = target.z;
  }

  function createScene(){
    scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

    var postProcess = new BABYLON.FxaaPostProcess("fxaa",1.0,null,null,engine,true);

    var cam = new BABYLON.ArcRotateCamera("cam",10,0,0,new BABYLON.Vector3(0,0,0),scene);
    cam.attachPostProcess(postProcess);
    freeCam = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0,5,-10), scene);
    freeCam.setTarget(BABYLON.Vector3.Zero());
    freeCam.attachControl(canvas, false);

    light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    var groundMaterial = new BABYLON.StandardMaterial("ground",scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("gras1.jpg",scene);
//    groundMaterial.specularPower = 10000;

    groundMaterial.diffuseTexture.uScale = 0.0;
    groundMaterial.diffuseTexture.vScale = 0.0;

//    Name, picture url, meshSize, width, height, number of subdivisions, minHeight, maxHeight, scene, updateable?
//    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("grd", "/map", 300,300,125,0,60,scene,false);
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/map", 1000, 1000, 64, 0, 60, scene, true);

    var groundMaterial1 = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial1.diffuseTexture = new BABYLON.Texture("/gras1.jpg", scene);
  	groundMaterial1.diffuseTexture.uScale = 10.0;
  	groundMaterial1.diffuseTexture.vScale = 10.0;

    ground.material = groundMaterial1;

    var groundPlane = BABYLON.Mesh.CreatePlane("groundPlane", 200.0, scene);
    groundPlane.material = groundMaterial1;



    // old white ground
//    var ground = BABYLON.Mesh.CreateGround('ground1', 20,20,2,scene);

    // new create ground from heightMap

    // groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    // ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/map", 200, 200, 250, 0, 10, scene, false);
    // ground.material = groundMaterial;

    // add local players avatar


  window.addEventListener("click", function () {
    // We try to pick an object
    var target = scene.pick(scene.pointerX, scene.pointerY);
    console.log('you clicked on ' + target.pickedMesh.name + ' at position ' + target.pickedMesh.position);
    //console.log(target);

    if(target.pickedMesh.name == 'ground1'){
      socket.emit('updatePosition', target.pickedPoint);
      moveItem(player, target.pickedPoint);
    }
    else{
      socket.emit('updatePosition', target.pickedMesh.position);
      moveItem(player, target.pickedMesh.position);
    }

});



    return scene;
  }

  function removeRemotePlayer(player){
    players[player.id].mesh.dispose();
  }

  function addRemotePlayer(player){
    players[player.id] = player;
    players[player.id].mesh = BABYLON.Mesh.CreateSphere("remotePlayer", 16, 1, scene);

  }

  function updatePlayerPosition(data){
    console.log('incoming playerposition data: ');
    console.log(JSON.stringify(data));
    console.log('object: ' + data.id);
    console.log('object position: ' + JSON.stringify(data.position));
    moveItem(players[data.id], data.position);
    // players[data.id].mesh.position = data.position;

  }

  function createPlayer(data){
    player = data;

    player.mesh = BABYLON.Mesh.CreateSphere("player", 16, 1, scene);
    player.mesh.position.y = 1;
    playerCam = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(2, 40, -45), scene);
    playerCam.target = player.mesh; // target any mesh or object with a "position" Vector3
    //scene.activeCamera = playerCam;

    var cam = new BABYLON.ArcRotateCamera("cam",10,0,0,new BABYLON.Vector3(0,0,0),scene);
    scene.activeCamera = cam;
    scene.activeCamera.attachControl(canvas);

  }

  function destroyPlayer(){
    player.mesh.dispose();
    // then what?
  }









/*
var player = {};
player.rotationSpeed = 1;
player.movementSpeed = 1;

window.addEventListener('resize', function(){
  engine.resize();
});

*/
