import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import styled from "styled-components";
import { ILogin } from "../../../interfaces/login.interfaces";
import { login } from "../../../services/api.service";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import useToken from "../../../hooks/usetoken.hook";

const AuthWrapper = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 350px;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.46);
  background-color: #fff;
`;

const Title = styled.h4`
  text-align: center;
`;

interface ErrMessage {
  message: string;
}

export const AuthForm: React.FC = () => {
  const [loginData, setLoginData] = useState<ILogin>({
    username: "",
    password: "",
  });
  const [emptyUsername, setEmptyUsername] = useState<boolean>(false);
  const [emptyPassword, setEmptyPassword] = useState<boolean>(false);

  const [_, setToken] = useToken();

  const handleLogin = (): void => {
    if (loginData.password === "" && loginData.username === "") {
      toast.warning("Username va password bo'sh bo'lmasligi kerak");
    } else if (loginData.username === "") {
      toast.warning("Username bo'sh bo'lmasligi kerak");
    } else if (loginData.password === "") {
      toast.warning("Password bo'sh bo'lmasligi kerak");
    } else {
      login(loginData.username, loginData.password)
        .then((res: AxiosResponse) => {
          if (res.data.token) {
            const token = res.data.token as string;
            if (typeof setToken === "function") {
              setToken(token);
            }
            window.location.href = "/";
          }
        })
        .catch((err: AxiosError) => {
          const { message } = err.response?.data as ErrMessage;
          if (message === "username not found") {
            toast.error("wrong username");
            setEmptyUsername(true);
          } else if (message === "wrong password or username") {
            toast.error("wrong password");
            setEmptyPassword(true);
          }
        });
    }
  };

  return (
    <AuthWrapper>
      <Typography className="auth-form__heading" variant="h4" component="div">
        <Title>Login</Title>
      </Typography>
      <TextField
        required={true}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setLoginData({ ...loginData, username: e.target.value });
          setEmptyUsername(false);
        }}
        id={emptyUsername ? "outlined-error" : "outlined-basic"}
        error={emptyUsername ? true : false}
        label={emptyUsername ? "Wrong username" : "Username"}
        variant="outlined"
      />
      <TextField
        required={true}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setLoginData({ ...loginData, password: e.target.value });
          setEmptyPassword(false);
        }}
        id={"outlined-password-input"}
        error={emptyPassword ? true : false}
        label={emptyPassword ? "wrong password" : "Password"}
        type="password"
        autoComplete="current-password"
      />
      <Button onClick={handleLogin} variant="contained" aria-label="primary">
        Login
      </Button>
    </AuthWrapper>
  );
};
