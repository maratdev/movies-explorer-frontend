import './FormComponent.css';

const FormComponent = ({
  name, type, nameInput, required, errorTxt,
  maxLength, minLength,
}) => (
  <>
    <label className="FormComponent">
      <span className="FormComponent__label-txt">{name}</span>
      <input className={`FormComponent__input ${errorTxt && 'FormComponent__input_error'}`} maxLength={maxLength}
             minLength={minLength} placeholder={name} type={type} name={nameInput}
             required={required}/>
      <span className="FormComponent__err-txt">{errorTxt}</span>
    </label>
  </>
);
export default FormComponent;
