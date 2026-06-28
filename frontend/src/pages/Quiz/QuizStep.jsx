import './QuizStep.css';
import Stage from './Stage';
import logo from '../../assets/landing/logo.png';
import advice from '../../assets/quiz/advice.png';
import heart from '../../assets/landing/heart.png';

export default function QuizStep({ step, answer, progressPct, onChange, onNext, onBack }) {
  const isTip = step.type === 'tip';
  const f = step.fig;

  function handleOptionClick(value) {
    if (step.type === 'single') {
      onChange(value);
    } else if (step.type === 'multi') {
      const current = answer || [];
      if (value === null) {
        onChange(current.includes(null) ? [] : [null]);
        return;
      }
      const without = current.filter((v) => v !== null);
      if (without.includes(value)) {
        onChange(without.filter((v) => v !== value));
      } else {
        if (step.max && without.length >= step.max) return;
        onChange([...without, value]);
      }
    }
  }

  const isSelected = (value) =>
    step.type === 'single' ? answer === value : Array.isArray(answer) && answer.includes(value);

  function canProceed() {
    if (isTip) return true;
    if (step.type === 'input') return Boolean(answer && String(answer).trim());
    if (step.type === 'single') return answer !== null && answer !== undefined;
    if (step.type === 'multi') return Array.isArray(answer) && answer.length > 0;
    return true;
  }

  const opts = f.opts || {};
  const twoCol = opts.cols === 2;

  return (
    <Stage>
      <div className="qRoot">
        <img className="qLogo" src={logo} alt="Koyash" />
        <div className="qTrack" />
        <div className="qFill" style={{ width: `${(progressPct / 100) * 1307}px` }} />

        {/* illustration */}
        {step.scene && (
          <img
            key={step.id}
            className="qScene"
            src={step.scene}
            alt=""
            aria-hidden="true"
            style={{ left: f.scene.x, top: f.scene.y, width: f.scene.w, height: f.scene.h }}
          />
        )}
        {(step.decor || []).map((d, i) => (
          <img
            key={i}
            className={`qDecor${d.cls ? ' ' + d.cls : ''}`}
            src={d.img}
            alt=""
            aria-hidden="true"
            style={{ left: d.x, top: d.y, width: d.w, height: d.h }}
          />
        ))}

        {/* note pill (every screen) — auto-width, one line */}
        {f.notePill && (
          <div className="qNotePill" style={{ left: f.notePill.x, top: f.notePill.y }}>
            {isTip ? step.noteLabel : step.note}
          </div>
        )}

        {isTip ? (
          <>
            <h2 className="qTipTitle" style={{ left: f.title.x, top: f.title.y, width: f.title.w }}>
              {step.title}
            </h2>
            {f.heart && (
              <img
                className="qHeart"
                src={heart}
                alt=""
                aria-hidden="true"
                style={{ left: f.heart.x, top: f.heart.y, width: f.heart.w }}
              />
            )}
            <p className="qTipBody" style={{ left: f.body.x, top: f.body.y, width: f.body.w }}>
              {step.body}
            </p>
            {step.highlight && (
              <>
                <img
                  className="qAdvice"
                  src={advice}
                  alt=""
                  aria-hidden="true"
                  style={{
                    left: f.advice.x,
                    top: f.advice.y,
                    width: f.advice.w,
                    height: f.advice.h,
                  }}
                />
                {/* text centered over the card, right ~1/6 reserved for the branch */}
                <div
                  className="qHi"
                  style={{
                    left: f.advice.x,
                    top: f.advice.y,
                    width: f.advice.w,
                    height: f.advice.h,
                    paddingRight: Math.round(f.advice.w / 6),
                  }}
                >
                  {step.highlight}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {step.noteBody && (
              <p className="qNarr" style={{ left: f.narr.x, top: f.narr.y, width: f.narr.w }}>
                {step.noteBody}
              </p>
            )}
            <h2 className="qHead" style={{ left: f.head.x, top: f.head.y, width: f.head.w }}>
              {step.question}
              {step.subQuestion && <span className="qHeadSub"> {step.subQuestion}</span>}
            </h2>

            {step.type === 'input' && (
              <input
                className="qInput"
                style={{ left: f.input.x, top: f.input.y, width: f.input.w }}
                type="number"
                min="10"
                max="100"
                placeholder={step.placeholder}
                value={answer || ''}
                onChange={(e) => onChange(e.target.value)}
              />
            )}

            {(step.type === 'single' || step.type === 'multi') && (
              <div
                className={`qOpts${twoCol ? ' qOptsGrid' : ''}`}
                style={{
                  left: opts.x,
                  top: opts.y,
                  rowGap: `${(opts.rowGap || 40) - 27}px`,
                  ...(twoCol
                    ? {
                        columnGap: `${opts.col2x - opts.x - 300}px`,
                        gridTemplateColumns: '300px max-content',
                      }
                    : {}),
                }}
              >
                {step.options.map((o, i) => (
                  <button
                    key={o.value ?? `none${i}`}
                    type="button"
                    className={`qOpt${isSelected(o.value) ? ' sel' : ''}`}
                    onClick={() => handleOptionClick(o.value)}
                  >
                    <span className={step.type === 'multi' ? 'qCheck' : 'qRadio'} />
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        <button
          className="qBtn qBack"
          type="button"
          style={{ left: f.back.x, top: f.back.y }}
          onClick={onBack}
        >
          Назад
        </button>
        <button
          className="qBtn qNext"
          type="button"
          style={{ left: f.next.x, top: f.next.y }}
          onClick={onNext}
          disabled={!canProceed()}
        >
          Дальше →
        </button>
      </div>
    </Stage>
  );
}
