function endThreeJs(){
    //function ends three js animation so they dont stack
    //document.getElementById('canvas').innerHTML="";
    
    //document.getElementById('canvas').removeChild(renderer.domElement);
}

function bigImage(smallImg)
{
    endThreeJs();
    var fullImg = document.getElementById("imageBox");

    fullImg.src = smallImg.src;
}

//threejs 

function beginThreeJs(){
    endThreeJs();
    //var fullImg = document.getElementById("imageBox");
    const canvas = document.getElementById('canvas');
    
    
    CANVAS_WIDTH = document.getElementById("canvas").offsetWidth,
    CANVAS_HEIGHT = document.getElementById("canvas").offsetHeight;

    var scene = new THREE.Scene()
    scene.background = new THREE.Color(0x5f6661)
    var camera = new THREE.PerspectiveCamera( 60, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000 )
    var renderer = new THREE.WebGLRenderer()
    var controls = new THREE.OrbitControls(camera, renderer.domElement)

    var axes = new THREE.AxesHelper(10)
    scene.add(axes)
    var grid = new THREE.GridHelper()
    scene.add(grid)

    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 1.8
    renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT )
    renderer.shadowMap.enabled = true

    canvas.innerHTML="";
    canvas.appendChild(renderer.domElement);


    camera.position.x = -5
    camera.position.y = 8
    camera.position.z = 13
    camera.lookAt(0,2,0)

    new THREE.GLTFLoader().load(
        'models/desk2022.gltf',
        function ( gltf ) {
        scene.add( gltf.scene )

        scene.traverse( function(x) {
            if (x.isMesh) {
                x.castShadow = true
                x.receiveShadow = true			
            }

        })
    }
    )

    addLights()
animate()

function animate() {
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
}

function addLights(){
    var hemilight = new THREE.HemisphereLight(0xffeeb1, 0x292619, 4)
    scene.add(hemilight)

    var spotLight = new THREE.SpotLight(0xFFA95C, 4)
    spotLight.castShadow = true
    scene.add(spotLight)  
}

}
//document.getElementById("img-container").offsetWidth


