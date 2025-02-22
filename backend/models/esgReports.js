const mongoose = require('mongoose');

const esgReportSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    extractedMetrics: { 
        type: mongoose.Schema.Types.Mixed,  // This allows any data type: object, array, etc.
        default: {}
    },
    reportFileName: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

const EsgReport = mongoose.model('EsgReport', esgReportSchema);
module.exports = EsgReport;