// api.ts: Defines Get and Post methods to interact with API

// imports Firebase authentication to generate token for API requests
import { getAuth } from "firebase/auth";

// defines API URL to be used throughout other methods
const apiUrl = "http://localhost:5000";

// removes any leading slashes from the API URL for accurate parsing
function parsePath(path: String) {
    if (path.startsWith('/')) path = path.substring(1);
    return path;
}

// defines format of response from a Get request
interface GetResponse {
    success: boolean,
    response: any | null
}

const UnsuccessfulGetResponse: GetResponse = {
    success: false,
    response: null
}

// defines format of response from a Post request
interface PostResponse {
    success: boolean
}

const UnsuccessfulPostResponse: PostResponse = {
    success: false
}

// defines method Get to allow user to fetch data from API
export function Get(path: String): Promise<GetResponse> {
    return new Promise(async resolve => {
        path = parsePath(path);

        const auth = getAuth();
        auth.onAuthStateChanged(async user => {
            if (!user) {
                resolve(UnsuccessfulGetResponse);
            } else {
                const token = await user.getIdToken();

                const res = await fetch(`${apiUrl}/${path}`, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "token": token
                    }
                }).catch(() => resolve(UnsuccessfulGetResponse));
                const json = await res?.json();

                if (!res || !res.ok) resolve(UnsuccessfulGetResponse);
                
                resolve({
                    success: true,
                    response: json
                });
            }
        })
    });
}

// defines method Post to allow user to write data to API
export function Post(path: String, data: object): Promise<PostResponse> {
    return new Promise(async resolve => {
        path = parsePath(path);

        const auth = getAuth();
        auth.onAuthStateChanged(async user => {
            if (!user) {
                resolve(UnsuccessfulPostResponse);
            } else {
                const token = await user.getIdToken();

                const res = await fetch(`${apiUrl}/${path}`, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "token": token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).catch(() => resolve(UnsuccessfulPostResponse));
                const json = await res?.json();
                
                if (!res) resolve(UnsuccessfulPostResponse);

                if (json === 'Error') {
                    resolve(UnsuccessfulPostResponse);
                } else {
                    resolve({
                        success: true
                    });
                }
            }
        });
    });
}