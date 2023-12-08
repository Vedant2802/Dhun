export enum AUTH_ENDPOINTS {
    register = "/api/auth/register",
    login = "/api/auth/login",
  }
  
  export enum API_STATUS_TYPES {
    idle = "idle",
    loading = "loading",
    success = "success",
    failure = "failure",
    incorrect = "Incorrect Email or Password"
  }

  export enum REGISTER_PAGE_CONSTANTS {
    usernamePlaceholder = "Name",
    emailPlaceholder = "Email",
    passwordPlaceholder = "Password",
    usernameLabel = "Name",
    emailLabel = "Email",
    passwordLabel = "Password",
    title = "Create a Dhun.ai account",
    login = "Login to Dhun.ai account",
    buttonText = "Create",
    buttonTextPending = "Creating...",
    existingUserText = "Already have an account? ",
    loginLinkText = "Login",
  }