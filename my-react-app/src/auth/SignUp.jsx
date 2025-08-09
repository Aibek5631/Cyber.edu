// Вверх в файле
import { auth, db } from "../firebase";             // твой firebase-config
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// ...

async function handleSignup(e) {
  e.preventDefault();

  try {
    // 1. Создаём учётку в Firebase Auth
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // 2. Сразу же пишем профиль в БД
    await setDoc(doc(db, "users", user.uid), {
      uid:       user.uid,
      email:     user.email,
      role:      "user",
      createdAt: serverTimestamp()
    });

    console.log("✅ Пользователь создан и записан:", user.uid);
    // тут можешь делать редирект или уведомление об успехе

  } catch (err) {
    console.error("Ошибка при регистрации:", err);
    alert(err.message);
  }
}

// В JSX:
<form onSubmit={handleSignup}>
  <input
    type="email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    placeholder="Email"
    required
  />
  <input
    type="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    placeholder="Password"
    required
  />
  <button type="submit">Sign Up</button>
</form>