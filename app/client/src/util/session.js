import Axios from "axios";

export const login = user => {
    Axios.post("http://localhost:5000/session/", user)
};

export const logout = () => {
    Axios.delete("http://localhost:5000/session/")
};

// export const checkLoggedIn = async preloadedState => {
//     const response = await Axios.get("http://localhost:5000/session/");
//     const { user } = await response.json();

//     let preloadedState = {};

//     if (user) {
//         preloadedState = {
//             session: user,
//         };
//     }
//     return preloadedState;
// };

export const checkLoggedIn = async preloadedState => {
    const res = await Axios.get("http://localhost:5000/session/");
    console.log(res);
    const { user } = await res.data;

    preloadedState = {};

    if (user) {
        preloadedState = {
            session: user,
        };
    }
    return preloadedState;
};