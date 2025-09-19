import { resizeAspectRatio, setupText, updateText } from "../../util/util.js";
import { Shader, readShaderFile } from "../../util/shader.js";

const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl2");
let shader; // shader program
let vao; // vertex array object
let verticalFlip = 1.0; // 1.0 for normal, -1.0 for vertical flip

function initWebGL() {
  if (!gl) {
    console.error("WebGL 2 is not supported by your browser.");
    return false;
  }

  canvas.width = 600;
  canvas.height = 600;

  resizeAspectRatio(gl, canvas);

  // Initialize WebGL settings
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 1.0);

  return true;
}

async function initShader() {
  const vertexShaderSource = await readShaderFile("shVert.glsl");
  const fragmentShaderSource = await readShaderFile("shFrag.glsl");
  shader = new Shader(gl, vertexShaderSource, fragmentShaderSource);
}

function setupKeyboardEvents() {
  // 키를 눌렀을 때
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
    } else if (event.key === "ArrowDown") {
    } else if (event.key === "ArrowLeft") {
    } else if (event.key === "ArrowRight") {
    }
  });

  // 키를 뗐을 때
  window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") {
    } else if (event.key === "ArrowDown") {
    } else if (event.key === "ArrowLeft") {
    } else if (event.key === "ArrowRight") {
    }
  });
}

function setupBuffers() {
  const vertices = new Float32Array([
    -0.1,
    -0.1,
    0.0, // Bottom left
    0.1,
    -0.1,
    0.0, // Bottom right
    0.1,
    0.1,
    0.0, // Top right
    -0.1,
    0.1,
    0.0, // Top left
  ]);

  vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  shader.setAttribPointer("aPos", 3, gl.FLOAT, false, 0, 0);
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 정사각형을 빨간색으로 설정
  let color;
  color = [1.0, 0.0, 0.0, 1.0];

  shader.setVec4("uColor", color);
  shader.setFloat("verticalFlip", verticalFlip);

  gl.bindVertexArray(vao);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

  requestAnimationFrame(() => render());
}

async function main() {
  try {
    // WebGL 초기화
    if (!initWebGL()) {
      throw new Error("WebGL 초기화 실패");
    }

    // 셰이더 초기화
    await initShader();

    // setup text overlay (see util.js)
    setupText(canvas, "Use arrow keys to move the rectangle", 1);

    // 키보드 이벤트 설정
    setupKeyboardEvents();

    // 나머지 초기화
    setupBuffers(shader);
    shader.use();

    // 렌더링 시작
    render();

    return true;
  } catch (error) {
    console.error("Failed to initialize program:", error);
    alert("프로그램 초기화에 실패했습니다.");
    return false;
  }
}

// call main function
main()
  .then((success) => {
    if (!success) {
      console.log("프로그램을 종료합니다.");
      return;
    }
  })
  .catch((error) => {
    console.error("프로그램 실행 중 오류 발생:", error);
  });
