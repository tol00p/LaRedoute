
//import {GUI} from 'dat.gui';
var hasPanel = false;

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

   
    //scene.background = new THREE.Color(0x5f6661)
    var camera = new THREE.PerspectiveCamera( 60, (CANVAS_WIDTH / CANVAS_HEIGHT), 1, 1000 )
    var renderer = new THREE.WebGLRenderer()
    
    //console.log(autoRotate);
    var controls = new THREE.OrbitControls(camera, renderer.domElement)
    

    const loader = new THREE.TextureLoader();
    loader.load('./img/fundoPara3d.jpg' , function(texture)
            {
             scene.background = texture;  
            });

    

    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 1.8
    renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT )
    renderer.shadowMap.enabled = true

    canvas.innerHTML="";
    canvas.appendChild(renderer.domElement);


    camera.position.x = 1
    camera.position.y = 0.5
    camera.position.z = 2
    camera.lookAt(0,0,0)

    var relogio = new THREE.Clock()
    var misturador ;

    new THREE.GLTFLoader().load(
        'models/desk2022_1.gltf',
        function ( gltf ) {
        scene.add( gltf.scene )

        scene.traverse( function(x) {
            if (x.isMesh) {
                x.castShadow = true
                x.receiveShadow = true			
            }

        })
        misturador = new THREE.AnimationMixer(scene)
        clipe = THREE.AnimationClip.findByName( gltf.animations,'leftStorage2Action')
        acao = misturador.clipAction( clipe )
        
        
            acao.play()
            misturador.update(relogio.getDelta);
        
        
    }
    )

   

    

    if(hasPanel!=true){
        var obj = {
        

            
            rotate: true,
            openDoor: false,
            openDrawers: false,
    
            height: 10,
            noiseStrength: 10.2,
            growthSpeed: 0.2,
    
            
        };
    
        var gui = new dat.gui.GUI();
        gui.domElement.id = 'gui';
    
        gui.remember(obj);
    
       
    
        // Choose from accepted values
        
    
        // Choose from named values
        gui.add(obj, 'rotate');
        gui.add(obj, 'openDoor');
        gui.add(obj, 'openDrawers');
        hasPanel = true  
        autoRotate = obj.speed; 
    
        
        
    
    }

    var hemilight = new THREE.HemisphereLight(0xffeeb1, 0x292619, 4)
    scene.add(hemilight)

    var spotLight = new THREE.SpotLight(0xFFFFFF, 4)
    spotLight.castShadow = true
    scene.add(spotLight) 
    
    //addLights()
    animate()

function animate() {
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
    //console.log("veio");
    var autoRotate = obj.rotate;
    //var lightPosition = obj.light;
    
        controls.autoRotate=autoRotate;
        //spotLight.intensity = lightPosition;
        //console.log(controls.autoRotate);
        controls.update();
    
}


}
//document.getElementById("img-container").offsetWidth


