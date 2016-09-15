/*
 Assignment 3
  Tommy Rauch
*/

"use strict";

var gl;

var theta = 0.0;
var speed = 0.1;
var oldSpeed = 0.1;
var thetaLoc;
//var c = vec4(0.0, 0.0, 0.0, 1.0);
var red = 1.0;
var blue = 0.0;
var green = 0.0;
/*var redLoc;
var greenLoc;
var blueLoc;*/
var timesPressed = 0;

var direction = true;
//console.debug("Variables");
window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    //onsole.debug("init");
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertices = [
        vec2(  0,  1 ),
        vec2(  -1,  0 ),
        vec2( 1,  0 ),
        vec2( 0, -1)
    ];

    
    // Load the data into the GPU

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation( program, "theta" );

    //Sliders
    /*redLoc = gl.getUniformLocation( program, "red" );
    greenLoc = gl.getUniformLocation( program, "green" );
    blueLoc = gl.getUniformLocation( program, "blue" );


     document.getElementById("redSlider").onchange = function(event) {
        red = parseFloat(event.target.value);
        console.debug(red);
    };

     document.getElementById("greenSlider").onchange = function(event) {
        green = parseFloat(event.target.value);
        console.debug(green);
    };

     document.getElementById("blueSlider").onchange = function(event) {
        blue = parseFloat(event.target.value);
        console.debug(blue);
    }; */

    // Initialize event handler (key codes)
    //r, g, and b keys make the rbg values of the square increase if capital, decrease if lowercase
   /*window.onkeydown = function( event ) {
       var key = String.fromCharCode(event.keyCode);
       switch( key ) {
          case 'R': //red
            red += 0.5;
            break;
          case 'r':
            red += 0.5;
            if (red <= 0.0) {
                red = 0.0;
            }
            console.log("Red");
            break;
          case 'G':  //green
           green += 0.5;
            break;
          case 'g':
           green += 0.5; 
            if (green <= 0.0) {
                green = 0.0;
            }
            console.log("green");
           break;
          case 'B':  //blue
            blue += 0.5;
            break;
          case 'b':
            blue += 0.5;
            if (blue <= 0.0) {
                blue = 0.0;
            }
            console.log("blue");
            break;
        }
    }; */
    //c = vec4(red, blue, green, 1.0);

 document.getElementById("stop").onclick = function () {
        timesPressed++;
        console.debug("pressed stop button", timesPressed);
        oldSpeed = speed;
        speed = 0;
    };
    document.getElementById("start").onclick = function () {
        timesPressed++;
        console.debug("pressed start button", timesPressed);
        speed = oldSpeed;
    };

    render();
};

function render()
{
    console.debug(red, green, blue);
    gl.clear( gl.COLOR_BUFFER_BIT );
   // console.debug("render");
    if (direction == true)
    {
        theta += speed;
    }
    else 
    {
        theta -= speed;
    }
    gl.uniform1f(thetaLoc, theta);
    /*gl.uniform1f(redLoc, red);
    gl.uniform1f(greenLoc, green);
    gl.uniform1f(blueLoc. blue);*/
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    window.requestAnimFrame(render);
}
