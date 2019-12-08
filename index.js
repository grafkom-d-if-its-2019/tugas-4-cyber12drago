(function() {

  glUtils.SL.init({ callback: function() { main(); }});
  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // Mendefinisikan verteks-verteks
    var vertices = [];
    var cubePoints = [
      [ -0.5, -0.5,  0.5 ],
      [ -0.5,  0.5,  0.5 ],
      [  0.5,  0.5,  0.5 ],
      [  0.5, -0.5,  0.5 ],
      [ -0.5, -0.5, -0.5 ],
      [ -0.5,  0.5, -0.5 ],
      [  0.5,  0.5, -0.5 ],
      [  0.5, -0.5, -0.5 ],
    ];

    var name = [
      [ -0.1, -0.25,  0.0 ],
      [ -0.1,  0.25,  0.0 ],
      [  0.1,  0.25,  0.0 ],
      [  0.1, -0.25,  0.0 ],
      [ -0.1, -0.25, -0.10 ],
      [ -0.1,  0.25, -0.10 ],
      [  0.1,  0.25, -0.10 ],
      [  0.1, -0.25, -0.10 ]
    ];

    var nameColors = [
      [1.0, 1.0, 0.0], 
      // [1.0, 0.0, 0.0], // merah
      // [0.0, 1.0, 0.0], // hijau
      // [0.0, 0.0, 1.0], // biru
      // [1.0, 1.0, 1.0], // putih
      // [1.0, 0.5, 0.0], // oranye
      // [1.0, 1.0, 0.0], // kuning
      // []
    ];

    var cubeColors = [
      [],
      [0.0, 0.0, 0.0], // hijau
      [0.0, 0.0, 0.0], // merah
      [0.0, 0.0, 0.0], // biru
      [0.0, 0.0, 0.0], // putih
      [0.0, 0.0, 0.0], // oranye
      [0.0, 0.0, 0.0], // kuning
      []
    ];

    var cubeNormals = [
      [],
      [  0.0,  0.0,  1.0 ], // depan
      [  1.0,  0.0,  0.0 ], // kanan
      [  0.0, -1.0,  0.0 ], // bawah
      [  0.0,  0.0, -1.0 ], // belakang
      [ -1.0,  0.0,  0.0 ], // kiri
      [  0.0,  1.0,  0.0 ], // atas
      []
    ];

    function quad(a, b, c, d) {
      var indices = [a, b, c, a, c, d];
      for (var i=0; i < indices.length; i++) {
        for (var j=0; j < 3; j++) {
          vertices.push(cubePoints[indices[i]][j]);
        }
        for (var j=0; j < 3; j++) {
          vertices.push(cubeColors[a][j]);
        }
        for (var j=0; j < 3; j++) {
          vertices.push(cubeNormals[a][j] * -0.5);
        }
        switch (indices[i]) {
          case a:
            vertices.push((a - 2) * 0.125);
            vertices.push(0.0);
            break;
          case b:
            vertices.push((a - 2) * 0.125);
            vertices.push(1.0);
            break;
          case c:
            vertices.push((a - 1) * 0.125);
            vertices.push(1.0);
            break;
          case d:
            vertices.push((a - 1) * 0.125);
            vertices.push(0.0);
            break;
        
          default:
            break;
        }
      }
    }
    function letter(a, b, c, d) {
      var indices = [a, b, c, c, d, a];
      for (var i=0; i < indices.length; i++) {
        for (var j=0; j < 3; j++) {
          vertices.push(name[indices[i]][j]);
        }
        for (var j=0; j < 3; j++) {
          vertices.push(nameColors[0][j]);
        }
        for (var j=0; j < 3; j++) {
          vertices.push(0.0);
        }
        for(var j=0; j < 2;j++) {
          vertices.push(0.0);
        }
      }
    }
    // quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
    quad(6, 5, 1, 2);
    
    letter(1, 0, 3, 2);
    letter(2, 3, 7, 6);
    letter(3, 0, 4, 7);
    letter(4, 5, 6, 7);
    letter(5, 4, 0, 1);
    letter(6, 5, 1, 2);

    // Membuat vertex buffer object (CPU Memory <==> GPU Memory)
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Membuat sambungan untuk attribute
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    var vNormal = gl.getAttribLocation(program, "vNormal");
    var vTexCoord = gl.getAttribLocation(program, "vTexCoord");

    gl.vertexAttribPointer(
      vPosition,    // variabel yang memegang posisi attribute di shader
      3,            // jumlah elemen per atribut
      gl.FLOAT,     // tipe data atribut
      gl.FALSE, 
      11 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(
      vColor, 
      3, 
      gl.FLOAT, 
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT, 
      3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.vertexAttribPointer(
      vNormal, 
      3, 
      gl.FLOAT, gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT, 
      6 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.vertexAttribPointer(
      vTexCoord, 
      2, 
      gl.FLOAT, 
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT, 
      9 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);
    gl.enableVertexAttribArray(vNormal);
    gl.enableVertexAttribArray(vTexCoord);

    // Variable yang dipakai
    var theta = 0;
    var thetaSpeed = 0.0;
    var axis = [true, true, true];
    var x = 0;
    var y = 1;
    var z = 2;
    var i_x = 0.0, i_y = 0.0, i_z = 0.0, rot = 0.0;
    var slide_x = 0.01, slide_y = 0.01, slide_z = 0.01, rot_t = 0.05;
    var nameLoc = [], cubePos = [];

    var PLANE = {
      FRONT: null,
      BACK: null,
      TOP: null,
      BOTTOM: null,
      RIGHT: null,
      LEFT: null
    }

    // Definisi untuk matriks model
    var mmLoc = gl.getUniformLocation(program, 'modelMatrix');
    var mm = glMatrix.mat4.create();
    glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -1.5]);

    // Uniform untuk pencahayaan
    var dcLoc = gl.getUniformLocation(program, 'diffuseColor');
    var dc = glMatrix.vec3.fromValues(1.0, 1.0, 1.0);  // rgb
    gl.uniform3fv(dcLoc, dc);

    var ddLoc = gl.getUniformLocation(program, 'diffusePosition');
    var iCenter = glMatrix.vec3.fromValues(0.0, 0.0, 0.0);

    var acLoc = gl.getUniformLocation(program, 'ambientColor');
    var ac = glMatrix.vec3.fromValues(0.2, 0.2, 0.2);
    gl.uniform3fv(acLoc, ac);

    // Uniform untuk modelMatrix vektor normal
    var nmLoc = gl.getUniformLocation(program, 'normalMatrix');

    // Definisi untuk matrix view dan projection
    var vmLoc = gl.getUniformLocation(program, 'viewMatrix');
    var vm = glMatrix.mat4.create();
    var pmLoc = gl.getUniformLocation(program, 'projectionMatrix');
    var pm = glMatrix.mat4.create();
    var camera = {x: 0.0, y: 0.0, z:0.0};
    glMatrix.mat4.perspective(pm,
      glMatrix.glMatrix.toRadian(90), // fovy dalam radian
      canvas.width/canvas.height,     // aspect ratio
      0.5,  // near
      10.0, // far  
    );
    gl.uniformMatrix4fv(pmLoc, false, pm);

    var tmp = glMatrix.mat4.create();

    // Kontrol menggunakan keyboard
    function onKeyDown(event) {
      if (event.keyCode == 189) thetaSpeed -= 0.01;       // key '-'
      else if (event.keyCode == 187) thetaSpeed += 0.01;  // key '='
      else if (event.keyCode == 48) thetaSpeed = 0;       // key '0'
      if (event.keyCode == 88) axis[x] = !axis[x];
      if (event.keyCode == 89) axis[y] = !axis[y];
      if (event.keyCode == 90) axis[z] = !axis[z];
      if (event.keyCode == 38) camera.z -= 0.1;
      else if (event.keyCode == 40) camera.z += 0.1;
      if (event.keyCode == 37) camera.x -= 0.1;
      else if (event.keyCode == 39) camera.x += 0.1;
    }
    document.addEventListener('keydown', onKeyDown);

    // Kontrol menggunakan mouse
    var lastMousePosition = {
      x: 0,
      y: 0
    };
    var isDragging = false;
    function onMouseDown(event) {
      isDragging = true;
    }
    function onMouseMove(event) {
      event.preventDefault();
      deltaMove = {
        x: event.x - lastMousePosition.x,
        y: event.y - lastMousePosition.y
      };
      if (isDragging) {
        var radx = glMatrix.glMatrix.toRadian(deltaMove.x);
        var rady = glMatrix.glMatrix.toRadian(deltaMove.y);
        var quat = glMatrix.quat.create();
        glMatrix.quat.rotateX(quat, quat, rady);
        glMatrix.quat.rotateY(quat, quat, radx);
        var rotateMat = glMatrix.mat4.create();
        glMatrix.mat4.fromQuat(rotateMat, quat);
        glMatrix.mat4.multiply(mm, mm, rotateMat);
      }
      lastMousePosition = {
        x: event.x,
        y: event.y
      };
    }
    function onMouseUp(event) {
      event.preventDefault();
      isDragging = false;
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);


    function distance(point,plane){
      a = glMatrix.vec3.create()
      b = glMatrix.vec3.create()
      n = glMatrix.vec3.create()
      v = glMatrix.vec3.create()
      glMatrix.vec3.subtract(a,plane[1],plane[2])
      glMatrix.vec3.subtract(b,plane[0],plane[2])
      glMatrix.vec3.cross(n,a,b)
      glMatrix.vec3.subtract(v,point,plane[0])
      return Math.abs(glMatrix.vec3.dot(v,n))
    }

    function coll_check(){
      var coll = 0.01
      // front
      for(var i=0; i<nameLoc.length; i++){
        if(distance(nameLoc[i],PLANE.FRONT) < coll){
          slide_z = -0.01
          rot_t  *= -1
          return
        }
      }
      // back
      for(var i=0; i<nameLoc.length; i++){
        if(distance(nameLoc[i],PLANE.BACK) < coll){
          slide_z = 0.01
          rot_t  *= -1
          return
        }
      }
      // top
      for(var i=0; i<nameLoc.length; i++){
        if(distance(nameLoc[i],PLANE.TOP) < coll){
          slide_y = -0.01
          rot_t  *= -1
          return
        }
      }
      // bottom
      for(var i=0; i<nameLoc.length; i++){
        if(distance(nameLoc[i],PLANE.BOTTOM) < coll){
          slide_y = 0.01
          rot_t  *= -1
          return
        }
      }
      // left
      for(var i=0; i<nameLoc.length; i++){
        if(distance(nameLoc[i],PLANE.LEFT) < coll){
          slide_x = 0.01
          rot_t  *= -1
          return
        }
      }
      // right
      for(var i=0; i<nameLoc.length; i++){
        if(distance(nameLoc[i],PLANE.RIGHT) < coll){
          slide_x = -0.01
          rot_t  *= -1
          return
        }
      }
    }

    function matrix_multiply(a,b){
      var matrix = [];
      var k1 = a[0]*b[0] + a[4]*b[1] + a[8]*b[2]  + a[12]*b[3]; matrix.push(k1)
      var k2 = a[1]*b[0] + a[5]*b[1] + a[9]*b[2]  + a[13]*b[3]; matrix.push(k2)
      var k3 = a[2]*b[0] + a[6]*b[1] + a[10]*b[2] + a[14]*b[3]; matrix.push(k3)
      var k4 = a[3]*b[0] + a[7]*b[1] + a[11]*b[2] + a[15]*b[3]; matrix.push(k4)
      return matrix;
    }

    glMatrix.mat4.copy(tmp, mm)

    //---------------------------------------------------------------------- RENDERING -------------------------------------------------------------------------
    function render() {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      theta += thetaSpeed;
      if (axis[z]) glMatrix.mat4.rotateZ(mm, mm, thetaSpeed);
      if (axis[y]) glMatrix.mat4.rotateY(mm, mm, thetaSpeed);
      if (axis[x]) glMatrix.mat4.rotateX(mm, mm, thetaSpeed);
      gl.uniformMatrix4fv(mmLoc, false, mm);

      glMatrix.mat4.lookAt(vm,
        [camera.x, camera.y, camera.z], // di mana posisi kamera (posisi)
        [0.0, 0.0, -1.5], // ke mana kamera menghadap (vektor)
        [0.0, 1.0, 0.0]  // ke mana arah atas kamera (vektor)
      );
      gl.uniformMatrix4fv(vmLoc, false, vm);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

      cubePos = []
      for (let i = 0; i < cubePoints.length; i++) {
        var temp = matrix_multiply(mm, [...cubePoints[i], 1.0])
        cubePos.push(temp)
      }

      PLANE.FRONT  = [cubePos[0], cubePos[2], cubePos[3]]
      PLANE.BACK   = [cubePos[4], cubePos[6], cubePos[7]]
      PLANE.TOP    = [cubePos[1], cubePos[5], cubePos[6]]
      PLANE.BOTTOM = [cubePos[0], cubePos[4], cubePos[7]]
      PLANE.LEFT   = [cubePos[1], cubePos[4], cubePos[5]]
      PLANE.RIGHT  = [cubePos[2], cubePos[6], cubePos[7]]

      gl.drawArrays(gl.TRIANGLES, 0, 30);

      iCenter[0] = i_x*1.5;
      iCenter[1] = i_y*1.5;
      iCenter[2] = i_z*1.5;
      var dd = glMatrix.vec3.fromValues(iCenter[0], iCenter[1], iCenter[2]); // xyz
      gl.uniform3fv(ddLoc, dd);
      
      glMatrix.mat4.translate(mm, mm, [i_x, i_y, i_z])
      glMatrix.mat4.rotate(mm,mm,rot,[1.0,1.0,1.0])
      gl.uniformMatrix4fv(mmLoc, false, mm)
      gl.drawArrays(gl.TRIANGLES, 30, 36)
      
      var indices = [ 0, 1, 2, 3, 4, 5, 6, 7 ]

      nameLoc = []
      for (var i = 0; i < indices.length; i++) {
        var temp = matrix_multiply(mm, [...name[indices[i]], 1.0])
        nameLoc.push(temp)
      }

      glMatrix.mat4.copy(mm, tmp)
      gl.uniformMatrix4fv(mmLoc, false, mm)

      i_x += slide_x
      i_y += slide_y
      i_z += slide_z
      rot += rot_t 

      coll_check()

      requestAnimationFrame(render);
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Uniform untuk tekstur
    var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
    gl.uniform1i(sampler0Loc, 0);

    // Create a texture.
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    // Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array([0, 0, 255, 255]));
    
    // Asynchronously load an image
    var image = new Image();
    image.src = "images/gay.png";
    image.addEventListener('load', function() {
      // Now that the image has loaded make copy it to the texture.
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);
    });

    render();
  }
})();