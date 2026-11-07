import { useState } from "react";
import { Icon } from "./ui.jsx";

/* Client-side validated form with success state.
   Fields use the existing .field / .error-msg markup; native constraint validation decides validity.
   TODO before launch: send the form data to an email/CRM endpoint in onSubmit. */
export function ValidatedForm({ children, success, submitLabel, className = "form" }) {
  const [state, setState] = useState("idle"); // idle | loading | done

  const check = (inp) => {
    const f = inp.closest(".field"); if (!f) return true;
    const ok = inp.checkValidity();
    f.classList.toggle("has-error", !ok); inp.setAttribute("aria-invalid", String(!ok));
    return ok;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const inputs = [...e.currentTarget.querySelectorAll(".field input, .field select, .field textarea")];
    const bad = inputs.filter((i) => !check(i));
    if (bad.length) { bad[0].focus(); return; }
    setState("loading");
    setTimeout(() => setState("done"), 900);
  };
  const onInput = (e) => { const f = e.target.closest(".field"); if (f?.classList.contains("has-error")) check(e.target); };

  if (state === "done") {
    return (
      <div className="form-success show" role="status">
        <div className="icon-tile"><Icon name="check" /></div>
        <h3>{success.title}</h3><p className="muted">{success.text}</p>
      </div>
    );
  }
  return (
    <form className={className} noValidate onSubmit={onSubmit} onInput={onInput}>
      {children}
      <button className={"btn btn-lg" + (state === "loading" ? " is-loading" : "")} type="submit">{submitLabel}</button>
    </form>
  );
}

/* Labelled field with error message */
export function Field({ id, label, required, error, hint, children }) {
  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}{required && <> <span className="req">*</span></>}</label>}
      {children}
      {hint && <span className="hint">{hint}</span>}
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
}

export const Checks = ({ label, options }) => (
  <div className="field"><span className="label">{label}</span>
    <div className="check-grid">{options.map((o) => <label className="check" key={o}><input type="checkbox" />{o}</label>)}</div>
  </div>
);
