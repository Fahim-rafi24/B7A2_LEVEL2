// promise code
const AsyncHandler = (requestHandler : Function) => {
    return (req : any, res : any, next : any) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch(err => next(err));
    };
};


export { AsyncHandler }