const fs = require('fs');
const path = require('path');

// Helper: remove CSS comments for reliable matching
function stripComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\//g, '');
}

describe('Playground 7 - Dancing Squares', () => {
  let css;
  let cssClean;

  beforeAll(() => {
    css = fs.readFileSync(
      path.join(__dirname, '..', 'css', 'playground-7-dancing-squares.css'),
      'utf8'
    );
    cssClean = stripComments(css);
  });

  test('should apply dance animation to .square (TODO #1)', () => {
    expect(cssClean).toMatch(/\.square\s*\{[^}]*animation\s*:\s*dance\s+\d+s\s+[\w-]+\s+infinite/);
  });

  test('should set correct animation-delay values for each square (TODO #2-5)', () => {
    const expectedDelays = {
      '.square-1': '0s',
      '.square-2': '0.2s',
      '.square-3': '0.4s',
      '.square-4': '0.6s'
    };

    for (const [selector, expectedDelay] of Object.entries(expectedDelays)) {
      const escapedSelector = selector.replace(/\./g, '\\.');
      const regex = new RegExp(`${escapedSelector}\\s*\\{[^}]*animation-delay\\s*:\\s*${expectedDelay.replace('s', '\\s*')}`);
      expect(css).toMatch(regex);
    }
  });

  test('should define transform with translateY, scale, and rotate at 25%, 50%, and 75% (TODO #6-8)', () => {
    // Check 25% has translateY, scale(1.2), rotate
    expect(css).toMatch(/25%\s*\{[^}]*transform\s*:\s*translateY\([^)]*\)\s+scale\(1\.2\)\s+rotate\([^)]*\)/);

    // Check 50% has translateY, scale(0.8), rotate
    expect(css).toMatch(/50%\s*\{[^}]*transform\s*:\s*translateY\([^)]*\)\s+scale\(0\.8\)\s+rotate\([^)]*\)/);

    // Check 75% has translateY, scale(1.1), rotate
    expect(css).toMatch(/75%\s*\{[^}]*transform\s*:\s*translateY\([^)]*\)\s+scale\(1\.1\)\s+rotate\([^)]*\)/);
  });

  test('should reduce animation duration on hover (TODO #12)', () => {
    const hoverMatch = css.match(/\.dancing-squares\s*:hover\s*\.square\s*\{([\s\S]*?)\}/);
    expect(hoverMatch).not.toBeNull();

    const hoverStyles = hoverMatch[1];
    // Should contain animation-duration with a value less than 4s (e.g., 2s, 1s, etc.)
    const durationMatch = hoverStyles.match(/animation-duration\s*:\s*(\d*\.?\d+)s/);
    expect(durationMatch).not.toBeNull();

    const duration = parseFloat(durationMatch[1]);
    expect(duration).toBeLessThan(4);
  });
});