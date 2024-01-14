import { signOut } from "firebase/auth";
import { Loading, Notify } from "quasar";

export default function signOutUser() {
  const { $firebaseAuth } = useNuxtApp();
  return new Promise<void>((resolve, reject) => {
    Loading.show();

    signOut($firebaseAuth)
      .then(() => {
        Loading.hide();
        resolve();
      })
      .catch((err) => {
        Loading.hide();
        Notify.create({
          type: "negative",
          message: err.message,
        });
        reject(err.message);
      });
  });
}
