import { useState } from "react";
import { Icon } from "./ui.jsx";

/* Client-side validated form with success state.
   Forms with a `name` are sent to Netlify Forms (submissions appear in the Netlify dashboard → Forms,
   and Netlify can email each one to you). Every named form must also be declared, with the same
   field names, in public/__forms.html so Netlify detects it at deploy time.
   Forms without a `name` only show the success message (nothing is sent). */
export function ValidatedForm({ children, success, submitLabel, className = "form", name }) {
  const [state, setState] = useState("idle"); // idle | loading | done | error

  const check = (inp) => {
    const f = inp.closest(".field"); if (!f) return true;
    const ok = inp.checkValidity();
    f.classList.toggle("has-error", !ok); inp.setAttribute("aria-invalid", String(!ok));
    return ok;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputs = [...form.querySelectorAll(".field input, .field select, .field textarea")];
    const bad = inputs.filter((i) => !check(i));
    if (bad.length) { bad[0].focus(); return; }
    setState("loading");
    if (!name) { setTimeout(() => setState("done"), 900); return; }
    // Combine multi-select checkboxes (same name) into one comma-separated value
    const fd = new FormData(form), body = new URLSearchParams();
    for (const key of new Set(fd.keys())) body.append(key, fd.getAll(key).join(", "));
    try {
      const res = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
      setState(res.ok ? "done" : "error");
    } catch { setState("error"); }
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
    <form className={className} name={name} noValidate onSubmit={onSubmit} onInput={onInput}>
      {name && <><input type="hidden" name="form-name" value={name} />
        <p hidden><label>Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p></>}
      {children}
      {state === "error" && <p className="error-msg" style={{ display: "flex" }} role="alert"><Icon name="info" />Something went wrong sending your form. Please try again, or email us directly.</p>}
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

/* Checkbox group. Pass `name` so the ticked options are included in the submission. */
export const Checks = ({ label, options, name }) => (
  <div className="field"><span className="label">{label}</span>
    <div className="check-grid">{options.map((o) => <label className="check" key={o}><input type="checkbox" name={name} value={o} />{o}</label>)}</div>
  </div>
);
