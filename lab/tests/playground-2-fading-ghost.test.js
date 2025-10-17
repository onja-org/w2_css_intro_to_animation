const fs = require('fs');
const path = require('path');

// Helper: remove CSS comments to avoid matching commented code
function stripComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\//g, '');
}

describe('Playground 2 - Fading Ghost', () => {
  let css;
  let cssClean;

  beforeAll(() => {
    css = fs.readFileSync(
      path.join(__dirname, '..', 'css', 'playground-2-fading-ghost.css'),
      'utf8'
    );
    cssClean = stripComments(css);
  });

  test('should apply the fade animation to .ghost-body (TODO #1)', () => {
    // Match .ghost-body { ... animation: fade ... }
    const match = cssClean.match(/\.ghost-body\s*\{([\s\S]*?)\}/);
    expect(match).not.toBeNull();

    const bodyStyles = match[1];
    // Allow flexible spacing, hyphens, and optional semicolon
    const hasAnim = /animation\s*:\s*fade\s+\d*\.?\d+s\s+[\w-]+\s+infinite/i.test(bodyStyles);
    expect(hasAnim).toBe(true);
  });

  test('should apply the blink animation to .eye (TODO #2)', () => {
    const match = cssClean.match(/\.eye\s*\{([\s\S]*?)\}/);
    expect(match).not.toBeNull();

    const eyeStyles = match[1];
    const hasAnim = /animation\s*:\s*blink\s+\d*\.?\d+s\s+[\w-]+\s+infinite/i.test(eyeStyles);
    expect(hasAnim).toBe(true);
  });

  test('should make the ghost completely invisible at 50% keyframe (TODO #3)', () => {
    // Match: 50% { ... opacity: 0 ... }
    // Allow any characters (including newlines) between 50% { and }
    // But ensure "opacity: 0" appears inside
    const pattern = /50%\s*\{[^}]*opacity\s*:\s*0\s*;?/s;
    expect(css).toMatch(pattern);
  });
});