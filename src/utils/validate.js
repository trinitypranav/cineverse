export const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );
  // At least one uppercase letter - (?=.*?[A-Z])
  // At least one lowercase letter - (?=.*?[a-z])
  // At least one digit - (?=.*?[0-9])
  // At least one special character -  (?=.*?[#?!@$%^&*-])
  // Minimum eight characters length - .{8,}

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
