import { useState, useCallback, useEffect } from "react";

const USERS_KEY = "css_users";
const CURRENT_USER_KEY = "css_currentUser";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      const users = getUsers();
      if (users[stored]) {
        setUser(users[stored]);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((username, password) => {
    const users = getUsers();
    if (!users[username]) return { ok: false, error: "User not found" };
    if (users[username].password !== password) return { ok: false, error: "Wrong password" };
    localStorage.setItem(CURRENT_USER_KEY, username);
    setUser(users[username]);
    return { ok: true };
  }, []);

  const register = useCallback((username, password, displayName) => {
    const users = getUsers();
    if (users[username]) return { ok: false, error: "Username already exists" };
    if (!username || username.length < 3) return { ok: false, error: "Username must be at least 3 characters" };
    if (!password || password.length < 4) return { ok: false, error: "Password must be at least 4 characters" };
    const newUser = {
      username,
      password,
      displayName: displayName || username,
      createdAt: Date.now(),
      saves: [],
    };
    users[username] = newUser;
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_KEY, username);
    setUser(newUser);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }, []);

  const saveGame = useCallback((gameState, slot = 0) => {
    if (!user) return { ok: false, error: "Not logged in" };
    const users = getUsers();
    const u = users[user.username];
    if (!u) return { ok: false, error: "User not found" };
    const save = {
      timestamp: Date.now(),
      slot,
      state: gameState,
    };
    if (u.saves[slot]) {
      u.saves[slot] = save;
    } else {
      u.saves.push(save);
    }
    saveUsers(users);
    setUser(u);
    return { ok: true };
  }, [user]);

  const loadGame = useCallback((slot = 0) => {
    if (!user) return null;
    const users = getUsers();
    const u = users[user.username];
    if (!u || !u.saves[slot]) return null;
    return u.saves[slot].state;
  }, [user]);

  const getSaves = useCallback(() => {
    if (!user) return [];
    const users = getUsers();
    const u = users[user.username];
    if (!u) return [];
    return u.saves || [];
  }, [user]);

  const deleteSave = useCallback((slot) => {
    if (!user) return;
    const users = getUsers();
    const u = users[user.username];
    if (!u || !u.saves[slot]) return;
    u.saves.splice(slot, 1);
    saveUsers(users);
    setUser({ ...u, saves: u.saves });
  }, [user]);

  const getAllUsers = useCallback(() => {
    const users = getUsers();
    return Object.entries(users).map(([username, data]) => ({
      username,
      displayName: data.displayName || username,
      createdAt: data.createdAt,
      saveCount: (data.saves || []).length,
    }));
  }, []);

  const switchUser = useCallback((username) => {
    const users = getUsers();
    if (!users[username]) return { ok: false, error: "User not found" };
    localStorage.setItem(CURRENT_USER_KEY, username);
    setUser(users[username]);
    return { ok: true };
  }, []);

  return { user, loading, login, register, logout, saveGame, loadGame, getSaves, deleteSave, getAllUsers, switchUser };
}
