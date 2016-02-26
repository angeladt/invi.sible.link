var _ = require('lodash'),
    Promise = require('bluebird'),
    debug = require('debug')('plugin.stripper'),
    companies = require('../lib/companies');

module.exports = function(datainput) {
  /* this module strip off from the top websites collected, the tracking
   * companies, for example: G.F. & Twitter */

    datainput.source =
    _.reduce(datainput.source, function(memo, siteEntry) {
        var isTracker =
            companies.associatedCompany(datainput.companies,
                                      siteEntry._ls_links[0].domain);

        if (_.isNull(isTracker)) {
            memo.push(siteEntry);
        } else {
            debug("Removed entry %s because part of %s",
                siteEntry._ls_links[0].domain, isTracker);
        }
        return memo;
    }, []);

    return datainput;
};