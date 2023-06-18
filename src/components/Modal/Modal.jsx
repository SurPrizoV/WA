import s from './Modal.module.css';
import { useState } from "react";

export function Modal({ setNumber, setModal, setChat, chat }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onHandleClick = (e) => {
    e.preventDefault();
    const regex = /^\d{11}$/;
    const result = regex.test(value);
    if (value && result) {
      setNumber(value);
      setChat([...chat, value]);
      setModal(false);
    } else {
      if (!result) {
        setError("Неправильный номер");
        return;
      }
      setError("Номер не может быть пустым");
    }
  };

  return (
    <div className={s.modal} onClick={() => setModal(false)}>
      <form>
        <div className={s.content} onClick={(e) => e.stopPropagation()}>
          <label htmlFor="value">Введите номер телефона</label>
          <input
            size={11}
            type="tel"
            required
            pattern="[0-9]{11}"
            placeholder="79999999999"
            className={s.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {error && <p className={s.error}>{error}</p>}
          <button className={s.button} onClick={onHandleClick}>
            Создать чат
          </button>
        </div>
      </form>
    </div>
  );
}