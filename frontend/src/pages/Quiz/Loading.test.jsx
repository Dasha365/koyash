import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Loading from './Loading';

// Integration test: Loading is the seam between the questionnaire state and
// the /recommend API boundary — it builds the request body, calls fetch, and
// routes to /results with the right navigation state for every response shape
// the backend can return. react-router's useNavigate is mocked so we can
// assert on where the component sends the user.
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

const ANSWERS = {
  budget: 'mid',
  concerns: ['acne'],
  allergens: ['fragrance'],
  values: ['vegan'],
  skin_type: 'oily',
};

function stubFetch(response) {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function renderLoading(answers = ANSWERS) {
  return render(
    <MemoryRouter>
      <Loading answers={answers} />
    </MemoryRouter>,
  );
}

describe('Loading', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts the request built from the quiz answers to POST /recommend', async () => {
    const fetchMock = stubFetch({ ok: true, json: async () => ({ bag: [] }) });

    renderLoading();

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toMatch(/\/recommend$/);
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({
      budget: 'mid',
      concerns: ['acne'],
      vegan: true,
      cruelty_free: false,
      minimalism: false,
      allergens: ['Fragrance'],
      skin_type: 'oily',
    });
  });

  it('navigates to /results with the parsed bag on a successful response', async () => {
    stubFetch({ ok: true, json: async () => ({ bag: [{ id: 1 }] }) });

    renderLoading();

    await waitFor(
      () =>
        expect(mockNavigate).toHaveBeenCalledWith('/results', {
          state: { results: { bag: [{ id: 1 }] }, answers: ANSWERS },
        }),
      { timeout: 2000 },
    );
  });

  it('navigates with a noResults flag when the API reports NO_PRODUCTS_AVAILABLE', async () => {
    stubFetch({
      ok: false,
      status: 422,
      json: async () => ({ detail: { error: { code: 'NO_PRODUCTS_AVAILABLE' } } }),
    });

    renderLoading();

    await waitFor(
      () =>
        expect(mockNavigate).toHaveBeenCalledWith('/results', {
          state: { results: { noResults: true }, answers: ANSWERS },
        }),
      { timeout: 2000 },
    );
  });

  it('navigates with an error flag when the request fails outright', async () => {
    stubFetch({ ok: false, status: 500, json: async () => ({}) });

    renderLoading();

    await waitFor(
      () =>
        expect(mockNavigate).toHaveBeenCalledWith('/results', {
          state: { error: true, answers: ANSWERS },
        }),
      { timeout: 2000 },
    );
  });
});
