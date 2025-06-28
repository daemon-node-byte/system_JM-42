attribute float size;
attribute vec3 color;
varying vec3 vColor;
varying float vSize;
        
void main() {
  vColor = color;
  vSize = size;
          
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  
  // Fixed point size calculation
  gl_PointSize = size * (1.0 / length(mvPosition.xyz)) * 100.0;
  
  // Ensure minimum size
  gl_PointSize = max(gl_PointSize, 2.0);
  
  gl_Position = projectionMatrix * mvPosition;
}