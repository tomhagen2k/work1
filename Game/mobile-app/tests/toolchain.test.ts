import Ajv from 'ajv';
import { Container } from 'pixi.js';
import { describe, expect, it } from 'vitest';

// Installation contracts only; these do not validate gameplay or native services.
describe('installed toolchain contracts', () => {
  it('links PixiJS without requiring a browser to construct a scene container', () => {
    const parent = new Container();
    const child = new Container();
    parent.addChild(child);
    expect(child.parent).toBe(parent);
    parent.destroy({ children: true });
    expect(child.destroyed).toBe(true);
  });

  it('compiles a validator and rejects an invalid external payload', () => {
    const validate = new Ajv({ strict: true }).compile({
      type: 'object',
      properties: { revision: { type: 'integer', minimum: 1 } },
      required: ['revision'],
      additionalProperties: false,
    });
    expect(validate({ revision: 1 })).toBe(true);
    expect(validate({ revision: '1' })).toBe(false);
    expect(validate({ revision: 0 })).toBe(false);
  });
});
