import { checkCookie } from "helpers2impact";




const redirectByRole = (cookieName) => {
    const { user } = checkCookie(cookieName);

    if (!user) {
        return;
    }

    if (user.role === "admin") {
        window.location.href = process.env.REACT_APP_ADMIN_URL;
    }

    else if (user.role === "coach") {
        window.location.href = process.env.REACT_APP_COACH_URL;
    }
    else {
        window.location.href = process.env.REACT_APP_TALENT_URL;
    }
};

export default redirectByRole;