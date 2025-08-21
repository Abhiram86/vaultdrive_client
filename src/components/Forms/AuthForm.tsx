import React from "react";
import Modal from "../Modal/Modal";
import Register from "./Register";
import Login from "./Login";

export default function AuthForm({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = React.useState<"login" | "register">("login");
  return (
    <Modal childrenClassName="max-w-lg w-full p-2" onClose={onClose}>
      {mode === "register" ? (
        <Register onClick={() => setMode("login")} />
      ) : (
        <Login onClick={() => setMode("register")} />
      )}
    </Modal>
  );
}
