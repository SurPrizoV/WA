import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { OnLoginChange } from "../../ApiService";
import s from "./Login.module.css";

export const Login = ({setId, setApiToken}) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (idInstance && apiTokenInstance) {
      OnLoginChange(idInstance,apiTokenInstance).then((data) => {
        if (data.stateInstance === "authorized") {
          localStorage.setItem("token", "true");
          setId(idInstance);
          setApiToken(apiTokenInstance);
          const path = "/";
          navigate(path);
        } else {
          console.error(data);
        }
      })
    }
  };

  return (
    <div className={s.login}>
      <p
        className={s.title}
        onClick={() =>
          alert(
            "Для получения IdInstance и ApiTokenInstance пройдите регистрацию на сайте `https://green-api.com/` и активируйте данные в личном кабинете"
          )
        }
      >
        Форма входа
      </p>
      <input className={s.input} type="text" placeholder="IdInstance" value={idInstance} onChange={(e) => {setIdInstance(e.target.value)}}/>
      <input className={s.input} type="text" placeholder="ApiTokenInstance" value={apiTokenInstance} onChange={(e) => {setApiTokenInstance(e.target.value)}}/>
      <button className={s.button} onClick={(e)=> {e.preventDefault(); handleLogin()}}>Войти</button>
      </div>
  );
};
