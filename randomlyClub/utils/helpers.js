async function secureFetch(data) {
    try {
        let settings = {
            "method": data.method,
            "headers": {
                "Content-Type": "application/json"
            }
        };
        if (data.body && data.method != 'GET') Object.assign(settings, { "body": JSON.stringify(data.body) });
        let response = await (await fetch(data.apiPath, settings)).json();
        return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const helpers = { secureFetch };