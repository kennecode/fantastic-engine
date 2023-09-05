import { Form, FormField, FieldValue, FieldAttributes } from './app.interfaces';
import React, { useEffect, useState, useReducer } from 'preact/compat';
import { useLocalStorage } from './hooks/useLocalStorage';
import { slidesReducer, initialSlideState } from './reducers/slides';
import style from './style';

export default function App(props: Form) {
  const [slides, dispatchSlides] = useReducer(slidesReducer, initialSlideState);
  const [showSurvey, setShowSurvey] = useState(false);
  const { title, subtitle } = props;

  if (slides.count === null && props.form.length) {
    dispatchSlides({
      type: 'create',
      form: props.form,
      action: props.action,
      method: props.method,
    });
  }

  const moveStep = (next: number) => {
    const nextStep = slides.step + next;
    return (e: any) => {
      e.preventDefault();
      if (next < 0) {
        dispatchSlides({ type: 'previous' });
        return true;
      }

      if (hasError()) {
        return;
      }
      dispatchSlides({ type: 'next' });
    };
  };

  /**
   * Handle key controls on keyboard
   * @param e
   */
  function formKeyboardControls(e: KeyboardEvent) {
    switch (e.key) {
      case 'Escape': // Escape key
        setShowSurvey(false);
        break;
      case 'Enter': // Enter key
        console.log('Return !');
        break;
      case 'ArrowDown': // Enter key
        dispatchSlides({ type: 'next' });
        break;
      case 'ArrowUp': // Enter key
        dispatchSlides({ type: 'previous' });
        break;
    }
  }

  // If survey is shown, let's make sure body isn't scrollable
  useEffect(() => {
    document.body.style.overflow = showSurvey ? 'hidden' : 'auto';
    if (showSurvey) {
      document.body.addEventListener('keyup', formKeyboardControls);
    }
    return () => {
      document.body.removeEventListener('keyup', formKeyboardControls);
    };
  }, [showSurvey]);

  // Let's check the form inputs as data changes
  useEffect(() => {
    const body = document.body;
    body.style.overflow = showSurvey ? 'hidden' : 'auto';
    slides.form.forEach((p: FormField) => {
      // const field = document.getElementById(p.name);
      // const valid = field?.checkValidity();
      // console.log(p.name, field?.checkValidity());
      // if (field && !valid) {
      //     field.classList.add('error');
      //     field.classList.remove('valid');
      // } else if (field && valid) {
      //     field.classList.add('valid');
      //     field.classList.remove('error');
      // }
      // {p.values.map((o:FieldValue) => (
    });
  }, [slides.form, slides.data, showSurvey]);

  const onFocus = (e: any) => {
    e.target.classList.toggle('focus');
  };

  const onBlur = (e: any) => {
    e.target.classList.toggle('focus');
  };

  // save data as it changes
  const updateData = (e: any) => {
    if (!e.target.classList.contains('dirty')) {
      e.target.classList.toggle('dirty');
    }
    dispatchSlides({
      type: 'save',
      data: {
        [e.target.name]: e.target.value,
      },
    });
  };

  const renderFormInput = (p: FormField) => {
    // return formInput(p);
  };

  const hasError = () => {
    const p = slides.form[slides.step];
    const field = document.getElementById(p.name);
    const valid = field?.checkValidity();
    if (field && !valid) {
      field.classList.add('error');
      field.classList.remove('valid');
    } else {
      field.classList.add('valid');
      field.classList.remove('error');
    }

    return field && !valid;
    // console.log(p.name, field?.checkValidity());
    // if (field && !valid) {
    //     field.classList.add('error');
    //     field.classList.remove('valid');
    // } else if (field && valid) {
    //     field.classList.add('valid');
    //     field.classList.remove('error');
    // }
    // {p.values.map((o:FieldValue) => (
  };

  const formInput = (p: FormField, i: number) => {
    const value: any = slides.data[p.name as keyof Object] || '';
    const attributes: FieldAttributes = p.attributes || {};
    const show = slides.step === i ? style.show : style.hide;
    switch (p.type) {
      case 'text':
      case 'tel':
      case 'email':
      case 'password':
        return (
          <div style={show}>
            <label for={p.name}>{p.label}</label>
            <input
              id={p.name}
              name={p.name}
              type={p.type}
              onInput={updateData}
              onFocus={onFocus}
              onblur={onBlur}
              value={value}
              {...attributes}
            />
          </div>
        );
      case 'radio':
      case 'checkbox':
        return (
          <div style={show}>
            <label>{p.label}</label>
            {p.values?.map((o: FieldValue) => (
              <>
                <input
                  id={`${p.name}_${o.value}`}
                  name={`${p.name}_${o.value}`}
                  type={p.type}
                  onClick={updateData}
                  value={o.value}
                  checked={o.value === value}
                  {...attributes}
                />
                <label for={`${p.name}_${o.value}`}>{o.display}</label>
              </>
            ))}
          </div>
        );
      case 'textarea':
        return (
          <div style={show}>
            <label for={p.name}>{p.label}</label>
            <textarea
              id={p.name}
              name={p.name}
              onInput={updateData}
              {...attributes}
            >
              {value}
            </textarea>
          </div>
        );
      case 'select':
        return (
          <div style={show}>
            <label>{p.label}</label>
            <select name={p.name} onChange={updateData} {...attributes}>
              {p.values?.map((o: FieldValue) => (
                <option value={o.value} selected={o.value === value}>
                  {o.display}
                </option>
              ))}
            </select>
          </div>
        );
    }
  };

  const submit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(slides.data).forEach((p: any) => {
      formData.append(p[0], p[1]);
    });
    fetch(slides.action, {
      body: formData,
      method: slides.method,
    });
  };

  const toggleSurvey = () => {
    setShowSurvey(!showSurvey);
  };

  return (
    <div style={style.app}>
      <span>
        <button type="button" onClick={toggleSurvey}>
          {props.openButtonText || 'Open Survey'}
        </button>
      </span>
      {!showSurvey ? null : (
        <div style={style.surveyContainer}>
          <div style={style.surveyContent}>
            <div
              style={{
                ...style.surveyProgress,
                ...{ width: `${(slides.step / (slides.count - 1)) * 100}%` },
              }}
            />
            <div style={style.surveyCloseContainer}>
              <a href="#" onClick={toggleSurvey} style={style.surveyClose}>
                &#10005;
              </a>
            </div>
            <div style={style.surveyFormContainer}>
              {!title ? null : <h1 style={style.surveyH1}>{title}</h1>}
              {!subtitle ? null : <h2 style={style.surveyH2}>{subtitle}</h2>}
              <div style={{ fontSize: 8 }}>
                Step {slides.step + 1} of {slides.count}
              </div>
              <form style={style.surveyForm} onSubmit={submit}>
                <div style={style.surveyFormContent}>
                  {slides.form.map(formInput)}
                </div>
                <div style={style.surveyButtons}>
                  {slides.step > 0 ? (
                    <button type="button" onClick={moveStep(-1)}>
                      {props.backButtonText || 'Back'}
                    </button>
                  ) : null}
                  {slides.step < slides.count - 1 ? (
                    <button type="button" onClick={moveStep(1)}>
                      {props.nextButtonText || 'Next'}
                    </button>
                  ) : null}
                  {slides.step === slides.count - 1 ? (
                    <button type="submit">
                      {props.submitButtonText || 'Submit'}
                    </button>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
