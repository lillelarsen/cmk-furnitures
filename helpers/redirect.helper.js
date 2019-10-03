/**
 * @module Helper/redirects
 */

exports.refererRedirect = function(requestObject) {
        const refererRedirect = new URL(requestObject).pathname;
        return refererRedirect;
}