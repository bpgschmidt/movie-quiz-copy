function resolvePromise(prms) {
    return prms
        .then(data => ({ success: true, data }))
        .catch(error => ({ success: false, error }));
}

export default resolvePromise;