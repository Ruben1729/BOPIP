module.exports = {
    getRequestIP(req) {
        if (req.connection.remoteAddress)
            return req.connection.remoteAddress.replace('::ffff:', '').replace('::1', '127.0.0.1');
        return '';
    },
    deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    whereLike(query, ...fields) {
        let words = String(query).trim().split(/\s+/g);
        return function () {
            for (let word of words) {
                this.where(function () {
                    for (let field of fields)
                        this.orWhere(db.raw(`lower(${field}) like ?`, `%${word.toLowerCase()}%`));
                });
            }
        };
    },
};
