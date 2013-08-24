var LdDao = require('../dao/LdDao')
    , when   = require('when')
    , nodefn = require('when/node/function')
	, messages = require('./ValidationMessages');

/*
    Using cujos/when module to convert async dao calls to promises,
    to avoid the dreaded "christmas tree" code - deep nested async calls.
    https://github.com/cujojs/when/blob/master/docs/api.md#node-style-asynchronous-functions
*/
module.exports = {

    LD_NUMBER_OF_DATA_ELEMENTS: 4,

    getLearningDesignPromise: function(ldid) {
        var promiseDaoGetLd = nodefn.call(LdDao.getLearningDesign, ldid);
        var promiseDaoGetLdSubjects = nodefn.call(LdDao.getLearningDesignSubjects, ldid);
        var promiseDaoGetLdObjectives = nodefn.call(LdDao.getLearningDesignObjectives, ldid);
        var promiseDaoGetLdPrerequisites = nodefn.call(LdDao.getPrerequisites, ldid);

        return when.join(promiseDaoGetLd, promiseDaoGetLdSubjects, promiseDaoGetLdObjectives, promiseDaoGetLdPrerequisites);
    }
};