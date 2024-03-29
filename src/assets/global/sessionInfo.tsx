let GLoggedInUser: string;

export function setSessionInfo(loggedInUser: string){
    GLoggedInUser = loggedInUser;
}

export function getSessionInfo(){
    return {
        user: GLoggedInUser
    };
} 