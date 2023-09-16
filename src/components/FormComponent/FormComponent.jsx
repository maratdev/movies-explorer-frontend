import './FormComponent.css';

const FormComponent = ({
  name, type, nameInput, required, errors,
  maxLength, minLength, handleChange, value,
}) => (
    <>
      <label className="FormComponent">
        <span className="FormComponent__label-txt">{name}</span>
        <input className={`FormComponent__input ${!errors ? '' : 'FormComponent__input_error'}`}
               maxLength={maxLength} minLength={minLength}
               placeholder={name}
               type={type}
               defaultValue={value || ''}
               name={nameInput}
               onChange={handleChange}
               required={required}
               autoComplete="on"
        />

        <span className="FormComponent__err-txt">{errors}</span>
      </label>
    </>
);
export default FormComponent;
