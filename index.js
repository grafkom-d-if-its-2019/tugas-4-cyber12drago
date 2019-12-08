(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  var shaders = [];
  var canvas = document.getElementById("glcanvas");
  var gl = glUtils.checkWebGL(canvas);

  var scale = 0;
  var adder = 0.0083;

  var testerA = 0;
  var testerB = 0;
  var testerC = 0;

  var xAdders   = 0.04/2;
  var yAdders   = 0.03/2;
  var zAdders   = 0.02/2;
  var translate = [0, 0, -0.5];

  var current_middle = [0.4, -0.2, 0];

  var theta = [0, 0, 0];
  var axis  = 0;
  var xAxis = 0;
  var yAxis = 1;
  var zAxis = 2;
  
  function initShaders() {
    var vertexShader    = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
        fragmentShader  = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2   = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
        fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);

    shaders.push(glUtils.createProgram(gl, vertexShader, fragmentShader));
    shaders.push(glUtils.createProgram(gl, vertexShader2, fragmentShader2));
  }

  function main() {
    var canvas  = document.getElementById("glcanvas");
    var gl      = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    initShaders();

    var cubeVertices = [
       0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0, 
       0.5, -0.5,  0.5,     0.0, 0.0,  1.0, 0.0, 0.0,
       0.5, -0.5, -0.5,     0.2, 0.0,  1.0, 0.0, 0.0,
       0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0,
       0.5, -0.5, -0.5,     0.2, 0.0,  1.0, 0.0, 0.0,
       0.5,  0.5, -0.5,     0.2, 1.0,  1.0, 0.0, 0.0,

       0.5, -0.5,  0.5,     0.2, 1.0,  0.0, -1.0, 0.0, 
      -0.5, -0.5,  0.5,     0.2, 0.0,  0.0, -1.0, 0.0,
      -0.5, -0.5, -0.5,     0.4, 0.0,  0.0, -1.0, 0.0,
       0.5, -0.5,  0.5,     0.2, 1.0,  0.0, -1.0, 0.0,
      -0.5, -0.5, -0.5,     0.4, 0.0,  0.0, -1.0, 0.0,
       0.5, -0.5, -0.5,     0.4, 1.0,  0.0, -1.0, 0.0,

      -0.5, -0.5, -0.5,     0.4, 1.0,  0.0, 0.0, -1.0, 
      -0.5,  0.5, -0.5,     0.4, 0.0,  0.0, 0.0, -1.0,
       0.5,  0.5, -0.5,     0.6, 0.0,  0.0, 0.0, -1.0,
      -0.5, -0.5, -0.5,     0.4, 1.0,  0.0, 0.0, -1.0,
       0.5,  0.5, -0.5,     0.6, 0.0,  0.0, 0.0, -1.0,
       0.5, -0.5, -0.5,     0.6, 1.0,  0.0, 0.0, -1.0,

      -0.5,  0.5, -0.5,     0.6, 1.0,  -1.0, 0.0, 0.0, 
      -0.5, -0.5, -0.5,     0.6, 0.0,  -1.0, 0.0, 0.0,
      -0.5, -0.5,  0.5,     0.8, 0.0,  -1.0, 0.0, 0.0,
      -0.5,  0.5, -0.5,     0.6, 1.0,  -1.0, 0.0, 0.0,
      -0.5, -0.5,  0.5,     0.8, 0.0,  -1.0, 0.0, 0.0,
      -0.5,  0.5,  0.5,     0.8, 1.0,  -1.0, 0.0, 0.0,

       0.5,  0.5, -0.5,     0.8, 1.0,  0.0, 1.0, 0.0,
      -0.5,  0.5, -0.5,     0.8, 0.0,  0.0, 1.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
       0.5,  0.5, -0.5,     0.8, 1.0,  0.0, 1.0, 0.0,
      -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
       0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 1.0, 0.0
    ];

    var triangleVertices = new Float32Array([
        //x, y      r,g,b
        -0.5, -0.8,   0.0,0.0,1.0,
        -0.5, +0.5,   0.0,0.0,1.0,
        -0.45, +0.5,  0.0,0.0,1.0,
        -0.45, +0.5,  0.0,0.0,1.0,
        -0.5, -0.8,   0.0,0.0,1.0,
        -0.45,-0.8,   0.0,0.0,1.0,
  
        -0.45, +0.5,  0.0,0.0,1.0,
        -0.45, +0.35, 0.0,0.0,1.0,
        -0.2, -0.1,   0.0,0.0,1.0,
        -0.45, +0.35, 0.0,0.0,1.0,
        -0.2,-0.1,    0.0,0.0,1.0,
        -0.2,-0.15,   0.0,0.0,1.0,
  
       +0.05, +0.5,   0.0,0.0,1.0,
        +0.05, +0.35, 0.0,0.0,1.0,
        -0.2, -0.15,  0.0,0.0,1.0 ,
        -0.2, -0.15,  0.0,0.0,1.0 ,
        -0.2, -0.1,   0.0,0.0,1.0 ,
        +0.05, +0.5,  0.0,0.0,1.0 ,
  
        +0.05, +0.5,  0.0,0.0,1.0,
        +0.1, +0.5,   0.0,0.0,1.0 ,
        +0.05, -0.8,  0.0,0.0,1.0 ,
        +0.05, -0.8,  0.0,0.0,1.0 ,
        +0.1, +0.5,   0.0,0.0,1.0 ,
        +0.1, -0.8,   0.0,0.0,1.0 ,
    ]);
    
    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
      drawA(gl.TRIANGLE_STRIP, triangleVertices, 1, shaders[1]);
      drawA(gl.TRIANGLES, cubeVertices, 0, shaders[0]);
    
      requestAnimationFrame(render);
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    // gl.frontFace(gl.CW);
    render();

    function drawA(type, vertices, mode, program) {

      var n = initBuffers(mode, vertices, program);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(type, 0, n);
    }

    
    var lastX, lastY, dragging;
    function onMouseDown(event) {
      var x = event.clientX;
      var y = event.clientY;
      var rect = event.target.getBoundingClientRect();
      if (rect.left <= x &&
          rect.right > x &&
          rect.top <= y &&
          rect.bottom > y) {
            lastX = x;
            lastY = y;
            dragging = true;
      }
    }
    function onMouseUp(event) {
      dragging = false;
    }
    function onMouseMove(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (dragging) {
        var factor = 10 / canvas.height;
        var dx = factor * (x - lastX);
        var dy = factor * (y - lastY);
        theta[yAxis] += dx;
        theta[xAxis] += dy;
      }
      lastX = x;
      lastY = y;
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    function initBuffers(mode, vertices, program) {
      var n;
      if (mode) {
        n = vertices.length/5;
      } else {
        n = vertices.length/6;
      }
      // console.log(vertices);

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

      // Definisi view dan projection
      var vmLoc = gl.getUniformLocation(program, 'view');
      var pmLoc = gl.getUniformLocation(program, 'projection');
      var mmLoc = gl.getUniformLocation(program, 'model');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();
      // console.log(pm);

      glMatrix.mat4.lookAt(vm,
        glMatrix.vec3.fromValues(0.0, 0.0, -0.5),    // posisi kamera
        glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
        glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
      );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.5;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
        fovy,
        aspect,
        near,
        far
      );

      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vNormal = gl.getAttribLocation(program, 'vNormal');
      
      // Uniform untuk definisi cahaya
      var lightColorLoc = gl.getUniformLocation(program, 'lightColor');
      var lightPositionLoc = gl.getUniformLocation(program, 'lightPosition');
      var ambientColorLoc = gl.getUniformLocation(program, 'ambientColor');
      var lightColor = [1, 1, 1];
      var lightPosition = [translate[0], translate[1], -2 + translate[2]];
      var ambientColor = glMatrix.vec3.fromValues(0.17, 0.40, 0.97);
      gl.uniform3fv(lightColorLoc, lightColor);
      gl.uniform3fv(lightPositionLoc, lightPosition);
      gl.uniform3fv(ambientColorLoc, ambientColor);

      if (mode) {
        
        var vColor = gl.getAttribLocation(program, 'vColor');

        if (scale > 1){
          adder = -0.0083
        }
        else if (scale < -1){
          adder = 0.0083
        }

        scale += adder;
        // console.log(scale);
        
        gl.vertexAttribPointer(
            vPosition, // Variable yang memegang posisi atribut di shader
            2, // Jumlah element per attribut
            gl.FLOAT, // tipe data attribut
            gl.FALSE, 
            5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
            0 //offset dari posisi elemen di array
        );
    
        gl.vertexAttribPointer(
            vColor,
            3,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            2 * Float32Array.BYTES_PER_ELEMENT
        );

        //Translasi X
        if (translate[0] + 0.15 > 0.5 || translate[0] - 0.15 < -0.5 ) {
          xAdders *= -1;
        }
        translate[0] += xAdders;
        // console.log(translate[0] + xAdders);

        current_middle += translate[0];

        //Translasi Y
        if (translate[1] + 0.2 > 0.5 || translate[1] - 0.2 < -0.5 ) {
          yAdders *= -1;
        }
        translate[1] += yAdders;

        //Translasi Z
        if (translate[2] > 0.5 || translate[2] < -0.5 ) {
          zAdders *= -1;
        }
        translate[2] += zAdders;

        var mm = glMatrix.mat4.create();
        glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);
        // console.log(translate);
        glMatrix.mat4.translate(mm, mm, translate);
        glMatrix.mat4.scale(mm, mm, [0.2, 0.2, 0.2]);
        glMatrix.mat4.scale(mm, mm, [scale, 1.0, 1.0]);
        gl.uniformMatrix4fv(mmLoc, false, mm);
        
        gl.enableVertexAttribArray(vColor);
      } else{
  
        var vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
        gl.vertexAttribPointer(
          vPosition,  // variabel yang memegang posisi attribute di shader
          3,          // jumlah elemen per attribute
          gl.FLOAT,   // tipe data atribut
          gl.FALSE,
          8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
          0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
          8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(vTexCoord);

        // theta[axis] += glMatrix.glMatrix.toRadian(0.5);  // dalam derajat
        var mm = glMatrix.mat4.create();
        glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);
        gl.uniformMatrix4fv(mmLoc, false, mm);
        
        // Uniform untuk tekstur
        var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
        gl.uniform1i(sampler0Loc, 0);

        // Inisialisasi tekstur
        var texture = gl.createTexture();
        if (!texture) {
          reject(new Error('Failed'));
        }
        gl.activeTexture(gl.TEXTURE0);
        initTexture(texture);
      }
      
      gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);

      var nmLoc = gl.getUniformLocation(program, 'normalMatrix');

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

      //Rotation Matrix
      var mvpLoc = gl.getUniformLocation(program, 'MVPMatrix');
      var mvp = glMatrix.mat4.create();
      glMatrix.mat4.multiply(mvp,vm,mm);
      glMatrix.mat4.multiply(mvp,pm,mvp);
      glMatrix.mat4.rotateY(mvp, mvp, theta[yAxis]);
      glMatrix.mat4.rotateX(mvp, mvp, theta[xAxis]);

      gl.uniformMatrix4fv(mvpLoc, false, mvp);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vNormal);
      return n;
    }

    

    // Membuat mekanisme pembacaan gambar jadi tekstur
    function initTexture(texture) {
      var imageSource = 'images/Photo.jpg';
      var image = new Image();
      image.onload = function() {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      }
      image.src = imageSource;
    }
  }

})();
