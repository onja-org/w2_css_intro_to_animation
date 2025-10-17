const fs = require('fs');
const path = require('path');

describe('Playground 1 - Bouncing Ball', () => {
  let css;

  beforeAll(() => {
    css = fs.readFileSync(
      path.join(__dirname, '..', 'css', 'playground-1-bouncing-ball.css'),
      'utf8'
    );
  });

  test('should have the animation property applied and uncommented (TODO #1)', () => {
    // Remove comments to avoid false matches
    const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
    expect(noComments).toMatch(/\.bouncing-ball\s*\{[^}]*animation\s*:\s*bounce\s+\d*\.?\d+s\s+\w+(?:-\w+)*\s+(?:infinite|\d+)/);
  });

  test('should move the ball up 100px at 50% keyframe using translateY(-100px) (TODO #2)', () => {
    // Extract the FULL @keyframes bounce block by matching from @keyframes to the closing }
    // We'll use a trick: split the file and find the block
    const lines = css.split('\n');
    let inKeyframes = false;
    let keyframeLines = [];
    let braceCount = 0;

    for (const line of lines) {
      if (/^\s*@keyframes\s+bounce/i.test(line)) {
        inKeyframes = true;
        braceCount = 0;
        keyframeLines = [];
      }

      if (inKeyframes) {
        keyframeLines.push(line);
        // Count braces
        const open = (line.match(/{/g) || []).length;
        const close = (line.match(/}/g) || []).length;
        braceCount += open - close;

        if (braceCount === 0 && keyframeLines.length > 1) {
          // We've closed the block
          break;
        }
      }
    }

    const keyframeContent = keyframeLines.join('\n');
    expect(keyframeContent).toBeTruthy();

    // Now check 50% block
    expect(keyframeContent).toMatch(/50%\s*\{[^}]*transform\s*:\s*translateY\(\s*-100px\s*\)/);
  });

  test('should define valid animation duration, timing function, and iteration count (TODO #3-5)', () => {
    const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const animMatch = noComments.match(/animation\s*:\s*bounce\s+(\d*\.?\d+s)\s+(\w+(?:-\w+)?)\s+(\w+)/i);
    expect(animMatch).not.toBeNull();

    const [, duration, timingFunction, iteration] = animMatch;
    expect(duration).toMatch(/^\d*\.?\d+s$/);
    expect(['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']).toContain(timingFunction.toLowerCase());
    if (iteration.toLowerCase() !== 'infinite') {
      expect(parseInt(iteration)).toBeGreaterThanOrEqual(1);
    }
  });
});