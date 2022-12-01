const centralAuth = (v) => {
    return async function(req, res, next){
        if (v.baseRoute === "user") {
            if (req.headers.usertoken) {
                next();
            } else {
                res.send({
                    'data': {},
                    'error': {
                        'errorCode': "Invalid Request",
                        'errorDetails': "You can not access this endpoint without userToken"
                    }
                });
            }
        } else {
            next();
        }
    }
} 

exports.centralAuth = centralAuth