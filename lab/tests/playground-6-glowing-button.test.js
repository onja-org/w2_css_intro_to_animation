const fs = require('fs');
const path = require('path');

// Helper: remove CSS comments for reliable matching
function stripComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\//g, '');
}

describe('Playground 6 - Glowing Button', () => {
  let css;
  let cssClean;

  beforeAll(() => {
    css = fs.readFileSync(
      path.join(__dirname, '..', 'css', 'playground-6-glowing-button.css'),
      'utf8'
    );
    cssClean = stripComments(css);
  });

  test('should apply pulse-glow animation to .glowing-button (TODO #1)', () => {
    expect(cssClean).toMatch(/\.glowing-button\s*\{[^}]*animation\s*:\s*pulse-glow\s+\d*\.?\d+s\s+[\w-]+\s+infinite/);
  });

  test('should add box-shadow on .glowing-button:hover (TODO #2)', () => {
    // Match hover rule with at least one box-shadow containing rgba and blur
    const hoverMatch = css.match(/\.glowing-button\s*:hover\s*\{([\s\S]*?)\}/);
    expect(hoverMatch).not.toBeNull();

    const hoverStyles = hoverMatch[1];
    // Should contain box-shadow with rgba and at least 30px blur
    expect(hoverStyles).toMatch(/box-shadow\s*:\s*[^}]*rgba\s*\([^)]*\)[^}]*\d{2,}px/);
  });

  test('should set brightness(1) at 0% in @keyframes pulse-glow (TODO #3)', () => {
    expect(css).toMatch(/0%\s*\{[^}]*filter\s*:\s*brightness\s*\(\s*1\s*\)/);
  });

  test('should add a third box-shadow layer at 50% with larger blur (TODO #4)', () => {
    // Look for 50% block with 3 box-shadow layers (comma-separated)
    const fiftyMatch = css.match(/50%\s*\{([\s\S]*?)\}/);
    expect(fiftyMatch).not.toBeNull();

    const fiftyContent = fiftyMatch[1];
    // Count commas in box-shadow to ensure 3 layers (2 commas = 3 values)
    const boxShadowMatch = fiftyContent.match(/box-shadow\s*:\s*([^;}]*)/);
    expect(boxShadowMatch).not.toBeNull();

    const boxShadowValue = boxShadowMatch[1];
    const commaCount = (boxShadowValue.match(/,/g) || []).length;
    expect(commaCount).toBeGreaterThanOrEqual(2); // At least 3 layers

    // Also ensure one layer has a large blur (e.g., 40px or more)
    expect(boxShadowValue).toMatch(/\d{2,}px\s+rgba/);
  });

  test('should set brightness(1.2) at 50% in @keyframes pulse-glow (TODO #5)', () => {
    expect(css).toMatch(/50%\s*\{[^}]*filter\s*:\s*brightness\s*\(\s*1\.2\s*\)/);
  });
});