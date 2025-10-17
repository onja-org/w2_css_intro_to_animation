const fs = require('fs');
const path = require('path');

// Helper: remove CSS comments for reliable matching
function stripComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\//g, '');
}

describe('Playground 5 - Spinning Wheel', () => {
  let css;
  let cssClean;

  beforeAll(() => {
    css = fs.readFileSync(
      path.join(__dirname, '..', 'css', 'playground-5-spinning-wheel.css'),
      'utf8'
    );
    cssClean = stripComments(css);
  });

  test('should apply spin animation to .spinning-wheel (TODO #1)', () => {
    expect(cssClean).toMatch(/\.spinning-wheel\s*\{[^}]*animation\s*:\s*spin\s+\d*\.?\d+s\s+linear\s+infinite/);
  });

  test('should set correct rotation degrees on spokes (TODO #2-6)', () => {
    const expectedRotations = {
      '.spoke-2': '60',
      '.spoke-3': '120',
      '.spoke-4': '180',
      '.spoke-5': '240',
      '.spoke-6': '300'
    };

    for (const [selector, expectedDeg] of Object.entries(expectedRotations)) {
      const escapedSelector = selector.replace(/\./g, '\\.');
      const regex = new RegExp(`${escapedSelector}\\s*\\{[^}]*rotate\\(\\s*${expectedDeg}\\s*deg\\s*\\)`);
      expect(css).toMatch(regex);
    }
  });

  test('should define rotate(0deg) to rotate(360deg) in @keyframes spin (TODO #7)', () => {
    // Check "from" has rotate(0deg)
    expect(css).toMatch(/from\s*\{[^}]*transform\s*:\s*rotate\s*\(\s*0deg\s*\)/);

    // Check "to" has rotate(360deg)
    expect(css).toMatch(/to\s*\{[^}]*transform\s*:\s*rotate\s*\(\s*360deg\s*\)/);
  });
});