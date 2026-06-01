import * as ScreenOrientation from "expo-screen-orientation";
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

export function accelerometerToAngle(
  accelerometerData: { x: number; y: number; z: number },
  orientation: ScreenOrientation.Orientation,
): number {
  let { x, y, z } = accelerometerData;

  // Adjust axes based on orientation
  switch (orientation) {
    case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
      [x, y] = [y, -x];
      break;

    case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
      [x, y] = [-y, x];
      break;

    case ScreenOrientation.Orientation.PORTRAIT_DOWN:
      x = -x;
      y = -y;
      break;
  }

  // Now compute angle consistently
  const pitchAngle = Math.atan2(y, z) - Math.PI / 2;

  return pitchAngle;
}
