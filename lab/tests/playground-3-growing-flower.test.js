const fs = require('fs');
const path = require('path');

// Helper: remove comments for reliable matching (but keep structure)
function stripComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\//g, '');
}

describe('Playground 3 - Growing Flower', () => {
  let css;
  let cssClean;

  beforeAll(() => {
    css = fs.readFileSync(
      path.join(__dirname, '..', 'css', 'playground-3-growing-flower.css'),
      'utf8'
    );
    cssClean = stripComments(css);
  });

  test('should apply grow-up animation to .stem (TODO #1)', () => {
    expect(cssClean).toMatch(/\.stem\s*\{[^}]*animation\s*:\s*grow-up\s+\d+s\s+[\w-]+/);
  });

  test('should apply bloom animation to .petal with "both" fill mode (TODO #3)', () => {
    expect(cssClean).toMatch(/\.petal\s*\{[^}]*animation\s*:\s*bloom\s+\d+s\s+[\w-]+\s+both/);
  });

  test('should apply delayed bloom animation to .center with "both" (TODO #2)', () => {
    // Must have animation with delay (e.g., 2.5s) and 'both'
    const centerMatch = cssClean.match(/\.center\s*\{([\s\S]*?)\}/);
    expect(centerMatch).not.toBeNull();

    const centerStyles = centerMatch[1];
    const hasBloom = /animation\s*:\s*bloom\s+\d+s\s+[\w-]+\s+\d*\.?\d+s\s+both/.test(centerStyles);
    expect(hasBloom).toBe(true);
  });

  test('should define scale(0) at start and scale(1) at end of bloom keyframes (TODO #10, #11)', () => {
  // Check that "from" block contains scale(0)
  expect(css).toMatch(/from\s*\{[^}]*scale\s*\(\s*0\s*\)/);

  // Check that "to" block contains scale(1)
  expect(css).toMatch(/to\s*\{[^}]*scale\s*\(\s*1\s*\)/);
});

  // Optional: Check that at least one petal has animation-delay (proves they tried TODO #4-9)
  test('should include animation-delay on at least one petal (e.g., TODO #4)', () => {
    const petalClasses = ['.petal-1', '.petal-2', '.petal-3', '.petal-4', '.petal-5', '.petal-6'];
    let foundDelay = false;

    for (const cls of petalClasses) {
      const regex = new RegExp(`${cls.replace(/\./g, '\\.')}\\s*\\{[^}]*animation-delay\\s*:\\s*\\d*\\.?\\d+s`);
      if (regex.test(cssClean)) {
        foundDelay = true;
        break;
      }
    }

    expect(foundDelay).toBe(true);
  });
});