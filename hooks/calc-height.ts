export function calcHeight(
  angleTop: number,
  angleBottom: number,
  distance: number,
) {
  if (isNaN(angleTop) || isNaN(angleBottom) || isNaN(distance)) {
    console.warn(
      "Invalid input for angle or distance. Please enter valid numbers.",
    );
    return 0;
  }
  const height = distance * (Math.tan(angleTop) - Math.tan(angleBottom));
  return height;
}

// Convert accelerometer data to tilt angle in radians
// Assumes phone is held vertically with screen facing user
// Positive angle = tilted forward/up, Negative angle = tilted backward/down
export function accelerometerToAngle(accelerometerData: { x: number; y: number; z: number }): number {
  const { x, y, z } = accelerometerData;

  // Calculate pitch angle using atan2
  // For phone held vertically: atan2(y, z) gives forward/backward tilt
  // Subtract π/2 to convert from gravity vector angle to tilt from horizontal
  const pitchAngle = Math.atan2(y, z) - Math.PI / 2;

  return pitchAngle;
}

// Alternative calculation if phone is held differently
// Use this if the above doesn't give expected results
export function accelerometerToAngleAlternative(accelerometerData: { x: number; y: number; z: number }): number {
  const { x, y, z } = accelerometerData;

  // Calculate tilt from horizontal using the Y and Z components
  // This gives angle from horizontal plane
  const tiltAngle = Math.atan2(y, Math.sqrt(x * x + z * z));

  return tiltAngle;
}
