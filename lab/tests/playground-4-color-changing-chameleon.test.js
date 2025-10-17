const fs = require('fs');
const path = require('path');

// Helper: remove CSS comments for reliable matching
function stripComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\//g, '');
}

describe('Playground 4 - Color-Changing Chameleon', () => {
  let css;
  let cssClean;

  beforeAll(() => {
    css = fs.readFileSync(
      path.join(__dirname, '..', 'css', 'playground-4-color-changing-chameleon.css'),
      'utf8'
    );
    cssClean = stripComments(css);
  });

  test('should apply color-shift animation to .chameleon-head (TODO #1)', () => {
    expect(cssClean).toMatch(/\.chameleon-head\s*\{[^}]*animation\s*:\s*color-shift\s+\d+s\s+[\w-]+\s+infinite/);
  });

  test('should apply delayed color-shift animation to .chameleon-body (TODO #2)', () => {
    const bodyMatch = cssClean.match(/\.chameleon-body\s*\{([\s\S]*?)\}/);
    expect(bodyMatch).not.toBeNull();
    const bodyStyles = bodyMatch[1];
    // Must have animation with a delay (e.g., 0.5s)
    expect(bodyStyles).toMatch(/animation\s*:\s*color-shift\s+\d+s\s+[\w-]+\s+infinite\s+\d*\.?\d+s/);
  });

  test('should apply delayed color-shift animation to .chameleon-tail (TODO #3)', () => {
    const tailMatch = cssClean.match(/\.chameleon-tail\s*\{([\s\S]*?)\}/);
    expect(tailMatch).not.toBeNull();
    const tailStyles = tailMatch[1];
    expect(tailStyles).toMatch(/animation\s*:\s*color-shift\s+\d+s\s+[\w-]+\s+infinite\s+\d*\.?\d+s/);
  });

  test('should apply color-shift animation to .leg (TODO #4)', () => {
    expect(cssClean).toMatch(/\.leg\s*\{[^}]*animation\s*:\s*color-shift\s+\d+s\s+[\w-]+\s+infinite/);
  });

  test('should include animation-delay on at least two legs (e.g., TODO #5-8)', () => {
    const legClasses = ['.leg-1', '.leg-2', '.leg-3', '.leg-4'];
    let delayCount = 0;

    for (const cls of legClasses) {
      const regex = new RegExp(`${cls.replace(/\./g, '\\.')}\\s*\\{[^}]*animation-delay\\s*:\\s*\\d*\\.?\\d+s`);
      if (regex.test(cssClean)) {
        delayCount++;
      }
    }

    expect(delayCount).toBeGreaterThanOrEqual(2);
  });

  test('should define background-color at 25%, 50%, and 75% in @keyframes color-shift (TODO #9-11)', () => {
  expect(css).toMatch(/25%\s*\{[^}]*background-color\s*:\s*#[0-9a-fA-F]+\s*;/);
  expect(css).toMatch(/50%\s*\{[^}]*background-color\s*:\s*#[0-9a-fA-F]+\s*;/);
  expect(css).toMatch(/75%\s*\{[^}]*background-color\s*:\s*#[0-9a-fA-F]+\s*;/);
});
});