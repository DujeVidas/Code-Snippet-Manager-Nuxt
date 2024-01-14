import {
  signInWithEmailAndPassword,
  type UserCredential,
  type User,
} from "firebase/auth";
import { Loading, Notify } from "quasar";
import parseErrorMessage from "./firebase-error-msg";

interface LoginData {
  email: string;
  password: string;
}

export default function (data: LoginData): Promise<User> {
  const { $firebaseAuth } = useNuxtApp()
  return new Promise((resolve, reject) => {
    Loading.show();
    signInWithEmailAndPassword($firebaseAuth, data.email, data.password)
      .then((userCredential: UserCredential) => {
        Loading.hide();
        resolve(userCredential.user);
      })
      .catch((err: any) => {
        err = parseErrorMessage(err);
        Loading.hide();
        ;Notify.create({
          type: "negative",
          message: err.message,
        });
        reject(err.message);
      });
  });
}
