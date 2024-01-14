interface FirebaseError {
  code?: string;
  message?: string;
}

const parseErrorMessage = (error: FirebaseError): FirebaseError => {
  switch (error.code) {
    case "auth/invalid-email":
      error.message = "Invalid Email";
      break;
    case "auth/email-already-in-use":
      error.message = "Email Is Already In Use";
      break;
    case "auth/weak-password":
      error.message = "Password Should Be At Least 6 Characters";
      break;
    case "auth/missing-email":
      error.message = "Missing Email";
      break;
    case "auth/missing-password":
      error.message = "Missing Password";
      break;
    case "auth/invalid-login-credentials":
      error.message = "Invalid Login Credentials";
      break;
  }

  return error;
};

export default parseErrorMessage;
