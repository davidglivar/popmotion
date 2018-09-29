import smoothFrame from './smooth-frame';
import { getFrameData } from 'framesync';

export default (strength: number = 50) => {
  let previousValue = 0;
  let lastUpdated = 0;

  return (v: number) => {
    const currentFramestamp = getFrameData().timestamp;
    const timeDelta =
      currentFramestamp !== lastUpdated ? currentFramestamp - lastUpdated : 0;
    const newValue = timeDelta
      ? smoothFrame(v, previousValue, timeDelta, strength)
      : previousValue;
    lastUpdated = currentFramestamp;
    previousValue = newValue;
    return newValue;
  };
};