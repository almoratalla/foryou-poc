const response = (res: any,mode: string, status: number,params = {}, path = '') => {
    if(mode === 'render'){
        typeof params === 'string' ? res.status(status).render(params) : res.status(status).render(path, params);
    } 

    if(mode === 'json'){
        res.status(status).json(params)
    }

    return res;
}

export default response;