function checkRequiredAttributes(requestKey, ...requiredAttributes) {
    return (req, res, next) => {
        for (let i = 0; i < requiredAttributes.length; i++) {
            const param = req[requestKey][requiredAttributes[i]];
            if (param === undefined || param === null || param === '')
                return res.status(HTTP_BAD_REQUEST).send(`Missing parameter: ${requiredAttributes[i]}`);
        }
        next();
    };
}

module.exports = {
    checkRequiredGET(...requiredAttributes) {
        return checkRequiredAttributes('query', ...requiredAttributes);
    },
    checkRequiredPOST(...requiredAttributes) {
        return checkRequiredAttributes('body', ...requiredAttributes);
    }
};
