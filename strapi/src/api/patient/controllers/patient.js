'use strict';

/**
 * patient controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::patient.patient');
