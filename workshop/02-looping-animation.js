/*
## 2 - Looping Animations

We have already setup our scene, and it's time to make it move it move it.

One of the most common ways of animating an object is to **transform** it: that
is 1) moving it 2) rotating it around a point.
*/

// First we need to import three.js module and the webgl starter kit
import THREE from "three";
import { WebGlWidget } from "../webglstarterkit.js";

// Let's declare a class and extend `WebGlWidget`, and define its constructor.
class LoopingAnimation extends WebGlWidget {

    constructor ( selector, backgroundColor=0x112244 ) {

        // Call `super()` to make sure the superclass constructor is run
        super( selector, backgroundColor );

        // Create our geometry
        let box = new THREE.BoxGeometry( 1, 1, 1 );
        let sphere = new THREE.SphereGeometry( 1, 12, 12 );
        let torus = new THREE.TorusGeometry( 2, 1, 12, 12 );

        // Give it a shading material. Lambert is a common and fast material
        // that lights up objects with a "matte" finish.
        let material = new THREE.MeshLambertMaterial( { color: 0x1234ff } );

        // Create our mesh, which has geometry and material defined.
        // We assign the meshes into `this` class so we can access it in another
        // function.
        let boxMesh = this.boxMesh = new THREE.Mesh( box, material );
        let sphereMesh = this.sphereMesh = new THREE.Mesh( sphere, material );
        let torusMesh = this.torusMesh = new THREE.Mesh( torus, material );

        // We can set the position of the mesh
        boxMesh.position.set(0, 0, -2);
        sphereMesh.position.set(0, 0, 0);
        torusMesh.position.set(0, 0, 2);

        // Add the mesh to the scene
        this.scene.add( boxMesh );
        this.scene.add( sphereMesh );
        this.scene.add( torusMesh );

        // We can setup a variable to keep track of total time elapsed
        this.totalElapsedTime = 0;

        // Finally, we need to tell the webgl starterkit to set the scene
        this.moveCameraToShowAll();
    }

    // We can move the camera slightly at each time step. WebGL starter kit
    // provides such a function called `animate()`, which we can override
    animate ( elapsedTime ) {

        // `three.js` provides a number of ways to animate transformations:
        //  * translateX (distance)
        //  * translateY (distance)
        //  * translateZ (distance)
        //  * translateOnAxis (axis, distance)
        //  * rotateOnAxi (axis, distance)

        // We can move the sphere along an axis
        this.boxMesh.translateZ(elapsedTime * -0.001);

        // We can rotate the torus around an axis
        this.torusMesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), elapsedTime * 0.001);

        // We can move around the sphere
        this.sphereMesh.position.set(0, 0, Math.sin(this.totalElapsedTime * 0.001));

        // Accumulate time for sine() to be used
        this.totalElapsedTime += elapsedTime;
    }

}

// Instantiate the widget and inserts it into our page.
var widget = new LoopingAnimation('#widget');

// We also bind a callback function so when the browser window resizes, we
// also resize our widget.
window.addEventListener("resize", () => widget.resize());