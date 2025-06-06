const fragmentShader = `
  uniform float time;
  uniform float scanlineIntensity;
  uniform float scanlineCount;
  uniform float flickerAmount;
  uniform float noiseAmount;
  uniform vec3 crtColor;
  varying vec2 vUv;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    // Couleur de base
    vec3 baseColor = crtColor;

    // Effets visuels CRT
    float scanline = sin(vUv.y * scanlineCount + time * 10.0) * 0.5 + 0.5;
    float flicker = 1.0 + sin(time * 100.0) * flickerAmount;
    float noise = rand(vUv + time);

    // Superposition des effets
    vec3 finalColor = baseColor;
    finalColor += (1.0 - scanline) * scanlineIntensity;
    finalColor *= flicker;
    finalColor += (noise - 0.5) * noiseAmount;

    // Correction gamma légère pour affichage
    finalColor = pow(finalColor, vec3(1.0 / 2.2));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default fragmentShader