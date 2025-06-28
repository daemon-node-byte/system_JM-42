uniform float time;
uniform float intensity;
varying vec3 vColor;
varying float vSize;
        
void main() {
  vec2 center = vec2(0.5, 0.5);
  float distanceToCenter = distance(gl_PointCoord, center);
  
  // Create a softer falloff
  float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
  
  // Add inner glow
  float innerGlow = 1.0 - smoothstep(0.0, 0.2, distanceToCenter);
  
  // Combine glow effects
  alpha = mix(alpha * 0.3, 1.0, innerGlow);
          
  // Add pulsing effect
  float pulse = sin(time * 8.0) * 0.3 + 0.7;
  alpha *= pulse * intensity;
          
  // Enhance the glow
  alpha = pow(alpha, 1.5);
  
  // Ensure we have some base alpha for visibility
  alpha = max(alpha * 0.8, 0.1 * intensity);
          
  gl_FragColor = vec4(vColor, alpha);
}
