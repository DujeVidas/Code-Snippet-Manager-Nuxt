import {
  createUserWithEmailAndPassword,
  updateProfile,
  type User,
  type UserCredential,
} from "firebase/auth";
import { Loading, Notify } from "quasar";
import parseErrorMessage from "./firebase-error-msg";

interface FirebaseData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
export default function (data: FirebaseData): Promise<User> {
  const { $firebaseAuth } = useNuxtApp()

  return new Promise((resolve, reject) => {
    Loading.show();
    if (data.first_name != null && data.last_name != null) {
      data.first_name = data.first_name.replace(/\s/g, "");
      data.last_name = data.last_name.replace(/\s/g, "");
    }
    if (
      data.first_name !== "" &&
      data.first_name != null &&
      data.last_name !== "" &&
      data.last_name != null
    ) {
      createUserWithEmailAndPassword($firebaseAuth, data.email, data.password)
        .then((userCredential: UserCredential) => {
          updateProfile(userCredential.user, {
            displayName: data.first_name + " " + data.last_name,
          }).then(() => {
            console.log(userCredential.user.displayName);
            Loading.hide();
            resolve(userCredential.user);
          });
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
    } else {
      Loading.hide();
      ;Notify.create({
        type: "negative",
        message: "First Name And Last Name Cannot Be Empty",
      });
    }
  });
}

