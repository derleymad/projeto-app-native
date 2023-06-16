'use strict';

/**
 * patient service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::patient.patient');
