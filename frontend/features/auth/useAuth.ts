"use client";

import { useEffect, useState } from "react";
import { User } from "../../domain/User";

const STORAGE_KEY = "eventease_auth";

interface AuthState {
  user: User | null;
  token: string | null;
}

let globalState: AuthState = { user: null, token: null };
let listeners: ((state: AuthState) => void)[] = [];

function setGlobalState(newState: AuthState) {
  globalState = newState;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }
  listeners.forEach((l) => l(globalState));
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(globalState);

  useEffect(() => {
    if (typeof window !== "undefined" && !globalState.token) {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          globalState = parsed;
          setState(parsed);
        } catch {}
      }
    }

    const listener = (s: AuthState) => setState(s);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  function setAuth(user: User, token: string) {
    const newState = { user, token };
    setGlobalState(newState);
  }

  function logout() {
    const newState = { user: null, token: null };
    setGlobalState(newState);
  }

  return { ...state, setAuth, logout };
}
