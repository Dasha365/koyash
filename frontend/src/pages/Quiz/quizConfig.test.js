import { describe, it, expect } from 'vitest';
import { buildRequest } from './quizConfig';

// buildRequest assembles the POST /recommend payload from the raw quiz
// answers state. It is the one piece of quiz logic shared by both the long
// (Quiz) and short (Quick) questionnaire flows, so it is covered directly
// here rather than only indirectly through the screens that call it.
describe('buildRequest', () => {
  it('defaults budget to low and returns empty/false values for a blank questionnaire', () => {
    expect(buildRequest({})).toEqual({
      budget: 'low',
      concerns: [],
      vegan: false,
      cruelty_free: false,
      minimalism: false,
      allergens: [],
      skin_type: null,
    });
  });

  it('passes through the chosen budget and concerns', () => {
    const request = buildRequest({ budget: 'high', concerns: ['acne', 'aging'] });
    expect(request.budget).toBe('high');
    expect(request.concerns).toEqual(['acne', 'aging']);
  });

  it('remaps the "pores" concern to the backend canonical "oiliness" tag', () => {
    expect(buildRequest({ concerns: ['pores'] }).concerns).toEqual(['oiliness']);
  });

  it('deduplicates concerns once "pores" is remapped onto an existing "oiliness"', () => {
    expect(buildRequest({ concerns: ['pores', 'oiliness'] }).concerns).toEqual(['oiliness']);
  });

  it('drops the null "no concerns" sentinel option', () => {
    expect(buildRequest({ concerns: [null] }).concerns).toEqual([]);
  });

  it('expands an allergen preset into every matching catalog token', () => {
    const { allergens } = buildRequest({ allergens: ['alcohol'] });
    expect(allergens).toEqual(
      expect.arrayContaining(['Alcohol', 'Alcohol Denat.', 'Benzyl Alcohol']),
    );
    expect(allergens.length).toBeGreaterThan(1);
  });

  it('passes through an allergen value with no known preset unchanged', () => {
    expect(buildRequest({ allergens: ['unknown-token'] }).allergens).toEqual(['unknown-token']);
  });

  it('drops the null "no allergens" sentinel option', () => {
    expect(buildRequest({ allergens: [null] }).allergens).toEqual([]);
  });

  it('maps the values checklist onto vegan / cruelty_free / minimalism flags', () => {
    const request = buildRequest({ values: ['vegan', 'cruelty_free', 'minimalism'] });
    expect(request.vegan).toBe(true);
    expect(request.cruelty_free).toBe(true);
    expect(request.minimalism).toBe(true);
  });

  it('passes a known skin type through unchanged', () => {
    expect(buildRequest({ skin_type: 'oily' }).skin_type).toBe('oily');
  });

  it('normalizes the "unknown" skin type answer to null', () => {
    expect(buildRequest({ skin_type: 'unknown' }).skin_type).toBeNull();
  });
});
