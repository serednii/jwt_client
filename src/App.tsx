import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

const App: React.FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Downloading...</div>;
  }

  if (!store.isAuth) {
    if (users.length > 0) setUsers([]);
    return (
      <div>
        <LoginForm />
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `Користувач авторизований ${store.user.email}`
          : "АВТОРИЗУЙТЕСЯ!!!"}
      </h1>
      <h1>
        {store.user.isActivated
          ? `Аккаунт підтверджений по почті ${store.user.email}`
          : "ПІДТВЕРДІТЬ АККАУНТ!!!"}
      </h1>
      <button onClick={() => store.logout()}>Вийти</button>
      <button onClick={getUsers}>Получить пользователей</button>

      {users.map((user) => {
        return <div key={user.email}>{user.email}</div>;
      })}
    </div>
  );
};

export default observer(App);
