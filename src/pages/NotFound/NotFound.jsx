import s from "./NotFound.module.css";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className={s.not_found}>
      <p className={s.title}>Данной страницы не существует</p>
      <Link className={s.button} to="/">
        Вернуться
      </Link>
    </div>
  );
};
