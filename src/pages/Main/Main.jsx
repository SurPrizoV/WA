import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Main.module.css";
import { Modal } from "../../components/Modal/Modal";
import { OnExitChange, SendMessage, ReceiveMessage, DeleteNotification } from "../../ApiService";

export const Main = ({ id, setId, apiToken, setApiToken }) => {
  const [modal, setModal] = useState(false);
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [chat, setChat] = useState([]);
  const [receiptId, setReceiptId] = useState('');
  const [messageByNumber, setMessageByNumber] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (number) {
      setMessageByNumber(allMessages.filter((item) => item.number === number));
    }
  }, [number, allMessages]);

  const onExitChange = async () => {
    await OnExitChange(id, apiToken);
    localStorage.clear("token");
    setId("");
    setApiToken("");
    const path = "/login";
    navigate(path);
  }

  const onClick = (item) => {
    setNumber(item);
  }

  const onSendMessageChange = () => {
    SendMessage(id, apiToken, number, message)
      .then((response) => {
        setAllMessages([
          ...allMessages,
          { message: message, number: number, type: "outgoing" },
        ])
        setMessage("");
      })
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    let timerId = setInterval(
      () =>
        ReceiveMessage(id, apiToken)
          .then((data) => {
            console.log(data);
            if (data.body.messageData && data.body.messageData.textMessageData) {
              setAllMessages([
                ...allMessages,
                {
                  message: data.body.messageData.textMessageData.textMessage,
                  number: number,
                  type: "incoming",
                }
              ])
            }
            return data;
          })
          .then((data) => {
            if (data.receiptId !== "") {
              DeleteNotification(id, apiToken, data.receiptId);
              setReceiptId("");
            }
          })
          .catch((e) => {
            console.log("Ошибка: " + e.message);
            console.log(e.response);
          }),
      5000
    );
    return () => clearInterval(timerId);
  }, [id, apiToken, allMessages, receiptId, number]);

  return (
    <div className={s.main}>
      <div className={s.chats}>
        <div className={s.title}>
          <p className={s.title_data}>Список чатов</p>
        </div>
        <div className={s.list}>
          {chat.length >= 1 &&
            chat.map((item) => (
              <p
                key={item}
                onClick={() => onClick(item)}
                className={s.item}>
                {item}
              </p>
            ))
          }
        </div>
      </div>
      <div className={s.menu}>
        <p className={s.number}>{number}</p>
        <div>
          <button className={s.button_create} onClick={() => setModal(true)}>Создать чат</button>
          {modal && (
            <Modal setNumber={setNumber}
              setModal={setModal}
              setChat={setChat}
              chat={chat}
            />
          )}
          <button className={s.button} onClick={onExitChange}>Выйти</button>
        </div>
      </div>
      <div className={s.messages}>
        {messageByNumber.length >= 1 &&
          messageByNumber.map((mess) => (
            <p
              className={mess.type === "outgoing" ? s.outgoing : s.incoming} key={mess.message}>
              {mess.message}
            </p>
          ))}
      </div>
      <div className={s.text_message}>
        <input className={s.input} type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className={s.button} onClick={onSendMessageChange}>Отправить</button>
      </div>
    </div>
  );
};
