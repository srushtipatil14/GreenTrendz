const mongoose = require('mongoose');

// Define the ESG Data Schema
const esgDataSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model (if you have one)
    },
    environmental: {
        energy: {
            coal: { type: Number, default: 0 },
            diesel: { type: Number, default: 0 },
            hsd: { type: Number, default: 0 },
            petrol: { type: Number, default: 0 },
            lpg: { type: Number, default: 0 },
            naturalGas: { type: Number, default: 0 },
            lngPng: { type: Number, default: 0 },
            solarEnergy: { type: Number, default: 0 },
            windEnergy: { type: Number, default: 0 },
            hydroEnergy: { type: Number, default: 0 },
            biomass: { type: Number, default: 0 },
            renewableEnergyGenerated: { type: Number, default: 0 },
            onsiteEnergyConsumption: { type: Number, default: 0 },
            biodiesel: { type: Number, default: 0 },
        },
        water: {
            producedWaterWithdrawal: { type: Number, default: 0 },
            surfaceWaterWithdrawal: { type: Number, default: 0 },
            groundWaterWithdrawal: { type: Number, default: 0 },
            seawaterWithdrawal: { type: Number, default: 0 },
            thirdPartyWaterWithdrawal: { type: Number, default: 0 },
            waterConsumption: { type: Number, default: 0 },
            waterRecycled: { type: Number, default: 0 },
            waterDischargeSurface: { type: Number, default: 0 },
            waterDischargeGround: { type: Number, default: 0 },
            waterDischargeThirdParty: { type: Number, default: 0 },
            waterDischargeSeawater: { type: Number, default: 0 },
            wastewaterGenerated: { type: Number, default: 0 },
        },
        waste: {
            eWaste: { type: Number, default: 0 },
            plasticWaste: { type: Number, default: 0 },
            metalWaste: { type: Number, default: 0 },
            glassWaste: { type: Number, default: 0 },
            batteryWaste: { type: Number, default: 0 },
            civilWaste: { type: Number, default: 0 },
            miscWaste: { type: Number, default: 0 },
            biomedicalWaste: { type: Number, default: 0 },
            feedWaste: { type: Number, default: 0 },
            hazardousWaste: { type: Number, default: 0 },
        },
        emissions: {
            ghgEmissions: { type: Number, default: 0 },
            effluentDischarge: { type: Number, default: 0 },
            noxEmissions: { type: Number, default: 0 },
            so2Emissions: { type: Number, default: 0 },
            pm10Emissions: { type: Number, default: 0 },
            vocEmissions: { type: Number, default: 0 },
            coEmissions: { type: Number, default: 0 },
            ch4Emissions: { type: Number, default: 0 },
            nh3Emissions: { type: Number, default: 0 },
            odsEmissions: { type: Number, default: 0 },
        },
        otherEnvironmentalFactors: {
            environmentalIncidents: { type: Number, default: 0 },
            solarPanelRecycling: { type: Number, default: 0 },
        },
    },
    social: {
        workforceManagement: {
            newEmployees: { type: Number, default: 0 },
            genderRatio: { type: Number, default: 0 },
            employeeDiversity: { type: Number, default: 0 },
            employeeTraining: { type: Number, default: 0 },
            employeeTurnover: { type: Number, default: 0 },
            workplaceSafety: { type: Number, default: 0 },
            humanRights: { type: Number, default: 0 },
            fairWages: { type: Number, default: 0 },
        },
        communityEngagement: {
            csrPrograms: { type: Number, default: 0 },
            communityInvestments: { type: Number, default: 0 },
            volunteerPrograms: { type: Number, default: 0 },
            philanthropicActivities: { type: Number, default: 0 },
        },
        productResponsibility: {
            customerSafety: { type: Number, default: 0 },
            dataPrivacy: { type: Number, default: 0 },
            ethicalMarketing: { type: Number, default: 0 },
            productQuality: { type: Number, default: 0 },
        },
        supplyChainResponsibility: {
            supplierCompliance: { type: Number, default: 0 },
            fairTrade: { type: Number, default: 0 },
            ethicalSourcing: { type: Number, default: 0 },
        },
    },
    governance: {
        corporateEthicsCompliance: {
            antiCorruption: { type: Number, default: 0 },
            whistleblowerProtection: { type: Number, default: 0 },
            codeOfConduct: { type: Number, default: 0 },
        },
        boardLeadership: {
            boardDiversity: { type: Number, default: 0 },
            executiveCompensation: { type: Number, default: 0 },
            shareholderRights: { type: Number, default: 0 },
        },
        riskManagement: {
            cybersecurity: { type: Number, default: 0 },
            businessContinuity: { type: Number, default: 0 },
            climateRisks: { type: Number, default: 0 },
        },
        regulatoryReportingCompliance: {
            esgDisclosure: { type: Number, default: 0 },
            legalCompliance: { type: Number, default: 0 },
        },
    },
    dataImport: {
        startDate: { type: Date },
        endDate: { type: Date },
    },
    csvFile: {
        filename: { type: String },
        data: { type: Array }, // Store parsed CSV/XLSX data
    },
    logoFile: {
        filename: { type: String },
        url: { type: String }, // Store the URL of the uploaded logo
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the ESG Data Model
const ESGData = mongoose.model('ESGData', esgDataSchema);

// Function to Save ESG Data
const saveESGData = async (user_id, data) => {
    try {
        // Check if data already exists for the user
        let esgData = await ESGData.findOne({ user_id });

        if (!esgData) {
            // Create new entry if no data exists
            esgData = new ESGData({ user_id, ...data });
        } else {
            // Update existing data
            esgData.environmental = { ...esgData.environmental, ...data.environmental };
            esgData.social = { ...esgData.social, ...data.social };
            esgData.governance = { ...esgData.governance, ...data.governance };
            esgData.dataImport = { ...esgData.dataImport, ...data.dataImport };
            esgData.csvFile = { ...esgData.csvFile, ...data.csvFile };
            esgData.logoFile = { ...esgData.logoFile, ...data.logoFile };
        }

        // Save the data
        await esgData.save();
        return { success: true, message: 'ESG data saved successfully!' };
    } catch (error) {
        console.error('Error saving ESG data:', error);
        return { success: false, message: 'Failed to save ESG data.' };
    }
};

// Function to Map CSV Data to Metrics
const mapCsvDataToMetrics = (csvData, user_id) => {
    const mappedData = {
        user_id,
        environmental: {},
        social: {},
        governance: {},
    };

    csvData.forEach((row) => {
        const metricName = row['Metric Name'];
        const value = parseFloat(row['Value']);

        // Map to Environmental Metrics
        if (metricName.includes('Coal')) mappedData.environmental.energy.coal = value;
        if (metricName.includes('Diesel')) mappedData.environmental.energy.diesel = value;
        // Add more mappings as needed...

        // Map to Social Metrics
        if (metricName.includes('New Employees')) mappedData.social.workforceManagement.newEmployees = value;
        if (metricName.includes('Gender Ratio')) mappedData.social.workforceManagement.genderRatio = value;
        // Add more mappings as needed...

        // Map to Governance Metrics
        if (metricName.includes('Anti-Corruption')) mappedData.governance.corporateEthicsCompliance.antiCorruption = value;
        if (metricName.includes('Board Diversity')) mappedData.governance.boardLeadership.boardDiversity = value;
        // Add more mappings as needed...
    });

    return mappedData;
};

module.exports = { ESGData, saveESGData, mapCsvDataToMetrics };