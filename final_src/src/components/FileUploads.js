import React, { useState } from 'react';
import GreenTrendz from '../assets/img/logo_1.png';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Papa from "papaparse";
import {
    Home, LayoutDashboard, FileText, BarChart2, Calculator, Settings,
    UserCircle, HelpCircle, CloudUpload,
} from 'lucide-react';
import * as XLSX from 'xlsx'; // For parsing XLSX files
const styles = {
    landingPage: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f4f4f9',
        fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
        width: '250px',
        background: 'linear-gradient(to bottom right, #064e3b, #276749)',
        color: 'white',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'fixed',
        height: '100vh',
        zIndex: 10,
        boxShadow: '2px 0 15px rgba(0, 0, 0, 0.15)',
        transition: 'width 0.3s ease',
    },
    sidebarCollapsed: {
        width: '80px',
    },
    content: {
        flex: 1,
        padding: '30px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        overflowY: 'auto',
        marginLeft: '250px',
        transition: 'margin-left 0.3s ease',
    },
    contentCollapsed: {
        marginLeft: '80px',
    },
    logo: {
        fontSize: '25px',
        marginBottom: '30px',
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: '20px',
        transition: 'opacity 0.3s ease',
    },
    logoCollapsed: {
        opacity: 0,
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
    },
    navItem: {
        color: 'white',
        textDecoration: 'none',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: '8px',
        marginBottom: '12px',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        cursor: 'pointer',
    },
    navItemCollapsed: {
        justifyContent: 'center',
        padding: '15px',
    },
    navIcon: {
        marginRight: '20px',
        transition: 'margin 0.3s ease, font-size 0.3s ease',
        fontSize: '20px',
    },
    navIconCollapsed: {
        marginRight: '0',
        fontSize: '24px',
    },
    navLabel: {
        transition: 'opacity 0.3s ease',
    },
    navLabelCollapsed: {
        display: 'none',
    },
    section: {
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
    },
     sectionTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    twoColumnContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginTop: '10px',
    },
    inputContainer: {
        marginBottom: '15px',
    },
    inputField: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '14px',
        marginTop: '5px',
        backgroundColor: '#f9f9f9',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    inputFieldHover: {
        borderColor: '#007bff',
        boxShadow: '0 0 8px rgba(0, 123, 255, 0.3)',
    },
    infoIcon: {
        marginLeft: '5px',
        cursor: 'pointer',
        color: '#666',
    },
    button: {
        backgroundColor: '#064e3b',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#276749',
    },
    logoutButton: {
        backgroundColor: '#ffffff',
        color: '#064e3b',
        padding: '12px 25px',
        borderRadius: '8px',
        border: 'none',
        fontWeight: 'bold',
        width: '80%',
        marginBottom: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    logoutButtonCollapsed: {
        width: 'auto',
        padding: '12px',
    },
    toggleButton: {
        backgroundColor: '#3b6b5c',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        marginBottom: '20px',
        fontSize: '24px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
    },
    toggleButtonHover: {
        backgroundColor: '#4a7c6c',
        transform: 'scale(1.1)',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '400px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '25px',
    },
    infoIcon: {
        marginLeft: '8px',
        cursor: 'pointer',
        fontSize: '6px',
        color: '#666',
        lineHeight: '1',
        width: '20px',
        height: '20px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '2px',
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 15px', // Increased padding for better spacing
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: '1000',
        visibility: 'hidden',
        opacity: 0,
        transition: 'opacity 0.3s',
        width: '200px', // Set a fixed width for the rectangle
        whiteSpace: 'normal', // Allow text to wrap
        textAlign: 'center', // Center the text (optional)
    },
    tooltipVisible: {
        visibility: 'visible',
        opacity: 1,
    },
    section: {
        marginBottom: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '25px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
    },
    sectionHover: {
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    },
    sectionTitle: {
        fontSize: '28px', // Increased font size for better prominence
        fontWeight: '700', // Bold for emphasis
        color: '#064e3b', // Dark green for a professional look
        marginBottom: '20px', // Increased spacing
        fontFamily: 'Georgia, serif', // A more elegant serif font
        position: 'relative',
        textTransform: 'uppercase', // Uppercase for a modern look
        letterSpacing: '1px', // Slight letter spacing for readability
    },
    sectionSubtitle: {
        fontSize: '22px', // Slightly larger than before
        fontWeight: '600', // Semi-bold for subtitles
        color: '#28a745', // Green for subtitles
        marginBottom: '15px', // Adjusted spacing
        fontFamily: 'Arial, sans-serif', // Clean sans-serif for subtitles
        textTransform: 'capitalize', // Capitalize for consistency
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '15px 20px', // Increased padding for better touch targets
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        marginBottom: '10px', // Added margin for separation
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        transition: 'background-color 0.3s ease',
    },
    sectionHeaderHover: {
        backgroundColor: '#e0f7fa', // Light blue on hover for interactivity
    },
    sectionHeaderText: {
        fontSize: '20px', // Larger font size for section headers
        fontWeight: '600', // Semi-bold for emphasis
        color: '#064e3b', // Dark green for consistency
        fontFamily: 'Arial, sans-serif', // Clean sans-serif
    },
    metricLabel: {
        fontSize: '16px', // Slightly larger for readability
        fontWeight: '500', // Medium weight for labels
        color: '#333', // Dark gray for better contrast
        fontFamily: 'Arial, sans-serif', // Consistent font
        marginBottom: '8px', // Spacing below labels
    },
    metricInput: {
        fontSize: '14px', // Standard size for inputs
        fontWeight: '400', // Regular weight for inputs
        color: '#555', // Medium gray for input text
        fontFamily: 'Arial, sans-serif', // Consistent font
    },

    accentLine: {
        position: 'absolute', // Use absolute positioning
        left: '50%', // Move the line to the horizontal center
        bottom: '-5px', // Position it slightly below the text
        width: '100px', // Width of the line
        height: '3px', // Height of the line
        backgroundColor: '#28a745', // Green color for the line
        borderRadius: '2px', // Slightly rounded corners
        transform: 'translateX(-50%)', // Center the line horizontally
    },
    sectionSubtitle: {
        fontSize: '20px',
        fontWeight: '500',
        color: '#28a745',
        marginBottom: '10px',
        fontFamily: 'Arial, sans-serif',
    },
    inputContainer: {
        marginBottom: '15px',
    },
    popupTab: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        width: '400px',
    },
    popupHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px',
    },
    saveButton: {
        backgroundColor: '#064e3b',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        color: '#000',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    success: {
        color: 'green',
        marginTop: '10px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    fileUploadContainer: {
        border: '2px dashed #ccc',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        marginTop: '10px',
        backgroundColor: '#fff',
        transition: 'background-color 0.3s ease',
    },
        chooseFileButton: {
            backgroundColor: '#28a745', // Green color
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            margin: '10px 0',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
        },
    
        chooseFileButtonHover: {
            backgroundColor: '#218838', // Darker green on hover
            transform: 'scale(1.05)', // Slight zoom effect
        },
    
    
    datePickerContainer: {
        display: 'flex',
        gap: '20px',
        marginTop: '10px',
    },
    inputColumn: {
        flex: 1,
    },
     previewContainer: {
        maxHeight: '300px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: '10px',
        marginTop: '10px',
    },
};
   

const menuItems = [
    { icon: Home, label: 'Home', path: '/land' },
    { icon: CloudUpload, label: 'Data Upload', path: '/upload' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: BarChart2, label: 'Comparison', path: '/comparison' },
    { icon: Calculator, label: 'Carbon Calculator', path: '/calculator' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: UserCircle, label: 'Account', path: '/account' },
    
];

const Sidebar = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        navigate('/');
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const [tooltipVisible, setTooltipVisible] = useState({});

    const showTooltip = (key) => {
        setTooltipVisible((prev) => ({ ...prev, [key]: true }));
    };
    
    const hideTooltip = (key) => {
        setTooltipVisible((prev) => ({ ...prev, [key]: false }));

    };
    const Tooltip = ({ text, visible }) => {
        return (
            <div
                style={{
                    ...styles.tooltip,
                    ...(visible && styles.tooltipVisible),
                }}
            >
                {text}
            </div>
        );
    };

   
    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

   // State variables
   const [environmentalData, setEnvironmentalData] = useState({});
   const [socialData, setSocialData] = useState({});
   const [governanceData, setGovernanceData] = useState({});
   const [dataImportData, setDataImportData] = useState({ startDate: '', endDate: '' });
   const [csvFile, setCsvFile] = useState(null);
   const [csvData, setCsvData] = useState([]); // To store parsed CSV/XLSX data
   const [showAllData, setShowAllData] = useState(false);
   const [fullCsvData, setFullCsvData] = useState([]);
   const [logoFile, setLogoFile] = useState(null);
   const [loading, setLoading] = useState(false);
   const [successMessage, setSuccessMessage] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [user_id, setUserId] = useState(''); // Add user_id state

   // Handle CSV/XLSX file upload
   const handleCsvUpload = (event) => {
       const file = event.target.files[0];
       if (file) {
           if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
               Papa.parse(file, {
                   header: true,
                   dynamicTyping: true,
                   complete: (result) => {
                       setCsvData(result.data.slice(0, 5)); // Show first 5 rows initially
                       setFullCsvData(result.data); // Store full data separately
                       setCsvFile(file);
                   },
                   error: (error) => {
                       setErrorMessage('Error parsing CSV file.');
                       console.error(error);
                   },
               });
           } else if (file.name.endsWith('.xlsx')) {
               const reader = new FileReader();
               reader.onload = (e) => {
                   const data = new Uint8Array(e.target.result);
                   const workbook = XLSX.read(data, { type: 'array' });
                   const sheetName = workbook.SheetNames[0];
                   const sheet = workbook.Sheets[sheetName];
                   const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                   setCsvData(parsedData.slice(0, 5));
                   setFullCsvData(parsedData);
                   setCsvFile(file);
               };
               reader.readAsArrayBuffer(file);
           } else {
               setErrorMessage('Invalid file type. Please upload a CSV or XLSX file.');
           }
       }
   };

   // Handle logo file upload
   const handleLogoUpload = (event) => {
       const file = event.target.files[0];
       if (file && file.type.startsWith('image/')) {
           setLogoFile(file);
       } else {
           setErrorMessage('Invalid file type. Please upload an image (JPEG/PNG/SVG).');
       }
   };

   // Handle form submission
   const handleSubmit = async () => {
    if (!csvFile || !logoFile) {
        alert('Please upload both CSV and Logo files.');
        return;
    }

    // Check if user_id is valid
    if (!user_id) {
        alert('Please provide a valid User ID.');
        return;
    }

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const formData = new FormData();
    formData.append('user_id', user_id); // Add user_id to form data
    formData.append('environmental', JSON.stringify(environmentalData));
    formData.append('social', JSON.stringify(socialData));
    formData.append('governance', JSON.stringify(governanceData));
    formData.append('startDate', dataImportData.startDate);
    formData.append('endDate', dataImportData.endDate);
    formData.append('csvFile', csvFile);
    formData.append('logoFile', logoFile);

    try {
        const response = await fetch('http://localhost:5003/api/save-esg-data', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            setSuccessMessage(result.message || 'Data submitted successfully!');
        } else {
            const errorDetail = await response.text();
            throw new Error(`Error ${response.status}: ${errorDetail}`);
        }
    } catch (error) {
        setErrorMessage('Error submitting data: ' + error.message);
    } finally {
        setLoading(false);
    }
};

    const [environmentalSections, setEnvironmentalSections] = useState([
        {
            title: 'Energy',
            metrics: [
                { 
                    label: 'Coal (tons, GJ)', 
                    key: 'coal', 
                    type: 'number', 
                    tooltip: 'Coal consumption measured in tons or gigajoules (GJ). Represents the total coal used for energy production.' 
                },
                { 
                    label: 'Diesel (L, GJ)', 
                    key: 'diesel', 
                    type: 'number', 
                    tooltip: 'Diesel consumption measured in liters (L) or gigajoules (GJ). Represents the total diesel used for energy or transportation.' 
                },
                { 
                    label: 'High-Speed Diesel (HSD) (L, GJ)', 
                    key: 'hsd', 
                    type: 'number', 
                    tooltip: 'High-Speed Diesel (HSD) consumption measured in liters (L) or gigajoules (GJ). Commonly used in heavy machinery and vehicles.' 
                },
                { 
                    label: 'Petrol (L, GJ)', 
                    key: 'petrol', 
                    type: 'number', 
                    tooltip: 'Petrol consumption measured in liters (L) or gigajoules (GJ). Represents the total petrol used for transportation.' 
                },
                { 
                    label: 'Liquefied Petroleum Gas (LPG) (m³, GJ)', 
                    key: 'lpg', 
                    type: 'number', 
                    tooltip: 'LPG consumption measured in cubic meters (m³) or gigajoules (GJ). Commonly used for heating and cooking.' 
                },
                { 
                    label: 'Natural Gas (m³, GJ)', 
                    key: 'naturalGas', 
                    type: 'number', 
                    tooltip: 'Natural gas consumption measured in cubic meters (m³) or gigajoules (GJ). Represents the total natural gas used for energy production.' 
                },
                { 
                    label: 'LNG/PNG (m³, GJ)', 
                    key: 'lngPng', 
                    type: 'number', 
                    tooltip: 'Liquefied Natural Gas (LNG) or Piped Natural Gas (PNG) consumption measured in cubic meters (m³) or gigajoules (GJ).' 
                },
                { 
                    label: 'Solar Energy (MWh, kWh)', 
                    key: 'solarEnergy', 
                    type: 'number', 
                    tooltip: 'Solar energy generated or consumed measured in megawatt-hours (MWh) or kilowatt-hours (kWh). Represents renewable energy from solar sources.' 
                },
                { 
                    label: 'Wind Energy (MWh, kWh)', 
                    key: 'windEnergy', 
                    type: 'number', 
                    tooltip: 'Wind energy generated or consumed measured in megawatt-hours (MWh) or kilowatt-hours (kWh). Represents renewable energy from wind turbines.' 
                },
                { 
                    label: 'Hydroelectric Energy (MWh, kWh)', 
                    key: 'hydroEnergy', 
                    type: 'number', 
                    tooltip: 'Hydroelectric energy generated or consumed measured in megawatt-hours (MWh) or kilowatt-hours (kWh). Represents renewable energy from water sources.' 
                },
                { 
                    label: 'Biomass (tons, GJ)', 
                    key: 'biomass', 
                    type: 'number', 
                    tooltip: 'Biomass consumption measured in tons or gigajoules (GJ). Represents organic material used for energy production.' 
                },
                { 
                    label: 'Renewable Energy Generated (MWh, %)', 
                    key: 'renewableEnergyGenerated', 
                    type: 'number', 
                    tooltip: 'Total renewable energy generated measured in megawatt-hours (MWh) or as a percentage of total energy production.' 
                },
                { 
                    label: 'On-site Energy Consumption (MWh, GJ)', 
                    key: 'onsiteEnergyConsumption', 
                    type: 'number', 
                    tooltip: 'Energy consumed on-site measured in megawatt-hours (MWh) or gigajoules (GJ). Represents energy used directly at the facility.' 
                },
                { 
                    label: 'Biodiesel (L, GJ)', 
                    key: 'biodiesel', 
                    type: 'number', 
                    tooltip: 'Biodiesel consumption measured in liters (L) or gigajoules (GJ). Represents renewable fuel derived from biological sources.' 
                },
            ],
        },
        {
            title: 'Water',
            metrics: [
                { 
                    label: 'Produced Water Withdrawal (m³, L)', 
                    key: 'producedWaterWithdrawal', 
                    type: 'number', 
                    tooltip: 'Water extracted during industrial processes, measured in cubic meters (m³) or liters (L).' 
                },
                { 
                    label: 'Surface Water Withdrawal (m³, L)', 
                    key: 'surfaceWaterWithdrawal', 
                    type: 'number', 
                    tooltip: 'Water withdrawn from surface sources like rivers or lakes, measured in cubic meters (m³) or liters (L).' 
                },
                { 
                    label: 'Ground Water Withdrawal (m³, L)', 
                    key: 'groundWaterWithdrawal', 
                    type: 'number', 
                    tooltip: 'Water extracted from underground sources, measured in cubic meters (m³) or liters (L).' 
                },
                { 
                    label: 'Seawater Withdrawal (m³, L)', 
                    key: 'seawaterWithdrawal', 
                    type: 'number', 
                    tooltip: 'Seawater extracted for industrial use, measured in cubic meters (m³) or liters (L).' 
                },
                { 
                    label: 'Third-Party Water Withdrawal (m³, L)', 
                    key: 'thirdPartyWaterWithdrawal', 
                    type: 'number', 
                    tooltip: 'Water obtained from third-party suppliers, measured in cubic meters (m³) or liters (L).' 
                },
                { 
                    label: 'Water Consumption (m³, L)', 
                    key: 'waterConsumption', 
                    type: 'number', 
                    tooltip: 'Total water consumed, measured in cubic meters (m³) or liters (L).' 
                },
                { 
                    label: 'Water Recycled (m³, %)', 
                    key: 'waterRecycled', 
                    type: 'number', 
                    tooltip: 'Water recycled and reused, measured in cubic meters (m³) or as a percentage of total water used.' 
                },
                { 
                    label: 'Water Discharge to Surface Water (m³, L)', 
                    key: 'waterDischargeSurface', 
                    type: 'number', 
                    tooltip: 'Water discharged back into surface water bodies, measured in cubic meters (m³) or liters (L).' 
                },
                { 
                    label: 'Water Discharge to Groundwater (m³, L)', 
                    key: 'waterDischargeGround', 
                    type: 'number', 
                    tooltip: 'Water discharged into groundwater sources, measured in cubic meters (m³) or liters (L).' 
                },
                { 
                    label: 'Water Discharge to Third-Party (m³, L)', 
                    key: 'waterDischargeThirdParty', 
                    type: 'number', 
                    tooltip: 'Water discharged to third-party treatment facilities, measured in cubic meters (m³) or liters (L).' 
                },
                { 
                    label: 'Water Discharge to Seawater (m³, L)', 
                    key: 'waterDischargeSeawater', 
                    type: 'number', 
                    tooltip: 'Water discharged into seawater, measured in cubic meters (m³) or liters (L).' 
                },
                { 
                    label: 'Wastewater Generated (m³, L)', 
                    key: 'wastewaterGenerated', 
                    type: 'number', 
                    tooltip: 'Total wastewater generated, measured in cubic meters (m³) or liters (L).' 
                },
            ],
        },
        {
            title: 'Waste',
            metrics: [
                { 
                    label: 'E-Waste (kg, tons, % recycled)', 
                    key: 'eWaste', 
                    type: 'number', 
                    tooltip: 'Electronic waste generated, measured in kilograms (kg), tons, or percentage recycled.' 
                },
                { 
                    label: 'Plastic Waste (kg, tons, % recycled)', 
                    key: 'plasticWaste', 
                    type: 'number', 
                    tooltip: 'Plastic waste generated, measured in kilograms (kg), tons, or percentage recycled.' 
                },
                { 
                    label: 'Metal Waste (kg, tons, % recycled)', 
                    key: 'metalWaste', 
                    type: 'number', 
                    tooltip: 'Metal waste generated, measured in kilograms (kg), tons, or percentage recycled.' 
                },
                { 
                    label: 'Glass Waste (kg, tons, % recycled)', 
                    key: 'glassWaste', 
                    type: 'number', 
                    tooltip: 'Glass waste generated, measured in kilograms (kg), tons, or percentage recycled.' 
                },
                { 
                    label: 'Batteries and Accumulator Waste (kg, tons, % recycled)', 
                    key: 'batteryWaste', 
                    type: 'number', 
                    tooltip: 'Battery waste generated, measured in kilograms (kg), tons, or percentage recycled.' 
                },
                { 
                    label: 'Civil Waste (kg, tons, % recycled)', 
                    key: 'civilWaste', 
                    type: 'number', 
                    tooltip: 'Civil waste generated, measured in kilograms (kg), tons, or percentage recycled.' 
                },
                { 
                    label: 'Miscellaneous Waste (kg, tons, % recycled)', 
                    key: 'miscWaste', 
                    type: 'number', 
                    tooltip: 'Miscellaneous waste generated, measured in kilograms (kg), tons, or percentage recycled.' 
                },
                { 
                    label: 'Biomedical Waste (kg, tons, % recycled)', 
                    key: 'biomedicalWaste', 
                    type: 'number', 
                    tooltip: 'Biomedical waste generated, measured in kilograms (kg), tons, or percentage recycled.' 
                },
                { 
                    label: 'Feed Waste (kg, tons, % recycled)', 
                    key: 'feedWaste', 
                    type: 'number', 
                    tooltip: 'Feed waste generated, measured in kilograms (kg), tons, or percentage recycled.' 
                },
                { 
                    label: 'Hazardous Waste Generation (kg, tons)', 
                    key: 'hazardousWaste', 
                    type: 'number', 
                    tooltip: 'Hazardous waste generated, measured in kilograms (kg) or tons.' 
                },
            ],
        },
        {
            title: 'Emissions',
            metrics: [
                { 
                    label: 'Greenhouse Gas (GHG) Emissions (tons CO₂e)', 
                    key: 'ghgEmissions', 
                    type: 'number', 
                    tooltip: 'Total greenhouse gas emissions measured in tons of CO₂ equivalent (CO₂e).' 
                },
                { 
                    label: 'Effluent Discharge (m³, L, ppm)', 
                    key: 'effluentDischarge', 
                    type: 'number', 
                    tooltip: 'Effluent discharge measured in cubic meters (m³), liters (L), or parts per million (ppm).' 
                },
                { 
                    label: 'Nitrogen Oxides (NOₓ) Emissions (tons)', 
                    key: 'noxEmissions', 
                    type: 'number', 
                    tooltip: 'Total nitrogen oxides emissions measured in tons.' 
                },
                { 
                    label: 'Sulfur Dioxide (SO₂) Emissions (tons)', 
                    key: 'so2Emissions', 
                    type: 'number', 
                    tooltip: 'Total sulfur dioxide emissions measured in tons.' 
                },
                { 
                    label: 'Particulate Matter (PM10) Emissions (tons)', 
                    key: 'pm10Emissions', 
                    type: 'number', 
                    tooltip: 'Total particulate matter (PM10) emissions measured in tons.' 
                },
                { 
                    label: 'Volatile Organic Compounds (VOC) Emissions (tons)', 
                    key: 'vocEmissions', 
                    type: 'number', 
                    tooltip: 'Total volatile organic compounds emissions measured in tons.' 
                },
                { 
                    label: 'Carbon Monoxide (CO) Emissions (tons)', 
                    key: 'coEmissions', 
                    type: 'number', 
                    tooltip: 'Total carbon monoxide emissions measured in tons.' 
                },
                { 
                    label: 'Methane (CH₄) Emissions (tons)', 
                    key: 'ch4Emissions', 
                    type: 'number', 
                    tooltip: 'Total methane emissions measured in tons.' 
                },
                { 
                    label: 'Ammonia (NH₃) Emissions (tons)', 
                    key: 'nh3Emissions', 
                    type: 'number', 
                    tooltip: 'Total ammonia emissions measured in tons.' 
                },
                { 
                    label: 'Ozone-Depleting Substances (ODS) Emissions (kg)', 
                    key: 'odsEmissions', 
                    type: 'number', 
                    tooltip: 'Total ozone-depleting substances emissions measured in kilograms (kg).' 
                },
            ],
        },
        {
            title: 'Other Environmental Factors',
            metrics: [
                { 
                    label: 'Environmental Incidents (count)', 
                    key: 'environmentalIncidents', 
                    type: 'number', 
                    tooltip: 'Number of environmental incidents reported during the reporting period.' 
                },
                { 
                    label: 'Solar Panel Recycling (% recycled, kg, tons)', 
                    key: 'solarPanelRecycling', 
                    type: 'number', 
                    tooltip: 'Solar panel recycling measured as a percentage, kilograms (kg), or tons.' 
                },
            ],
        },
    ]);
    const socialSections = [
        {
            title: 'Workforce Management',
            metrics: [
                { label: 'Number of New Employees', key: 'newEmployees', type: 'number', tooltip: 'Total number of new employees hired during the reporting period.' },
                { label: 'Male vs Female Ratio', key: 'genderRatio', type: 'number', tooltip: 'Ratio of male to female employees in the workforce.' },
                { label: 'Employee Diversity & Inclusion (% female, % minorities, % disabled employees)', key: 'employeeDiversity', type: 'number', tooltip: 'Percentage of female employees, minorities, and employees with disabilities in the workforce.' },
                { label: 'Employee Training & Development (hours per employee, $ spent per employee)', key: 'employeeTraining', type: 'number', tooltip: 'Average hours of training and development per employee and the associated costs.' },
                { label: 'Employee Turnover Rate (%)', key: 'employeeTurnover', type: 'number', tooltip: 'Percentage of employees who left the organization during the reporting period.' },
                { label: 'Workplace Safety & Health (injury rate per 100 employees, fatalities count)', key: 'workplaceSafety', type: 'number', tooltip: 'Number of workplace injuries per 100 employees and total fatalities.' },
                { label: 'Human Rights & Labor Standards (% compliance, number of reported violations)', key: 'humanRights', type: 'number', tooltip: 'Percentage of compliance with human rights and labor standards, and the number of reported violations.' },
                { label: 'Fair Wages & Compensation (minimum wage compliance %, wage gap %)', key: 'fairWages', type: 'number', tooltip: 'Percentage of compliance with minimum wage laws and the wage gap between genders.' },
            ],
        },
        {
            title: 'Community Engagement',
            metrics: [
                { label: 'Corporate Social Responsibility (CSR) Programs (number of programs, $ spent)', key: 'csrPrograms', type: 'number', tooltip: 'Number of CSR programs and the total amount spent on them.' },
                { label: 'Community Investments (total $ invested)', key: 'communityInvestments', type: 'number', tooltip: 'Total amount invested in community development projects.' },
                { label: 'Volunteer Programs (% employee participation, hours volunteered)', key: 'volunteerPrograms', type: 'number', tooltip: 'Percentage of employees participating in volunteer programs and total hours volunteered.' },
                { label: 'Philanthropic Activities ($ donated, number of beneficiaries)', key: 'philanthropicActivities', type: 'number', tooltip: 'Total amount donated and the number of beneficiaries of philanthropic activities.' },
            ],
        },
        {
            title: 'Product Responsibility',
            metrics: [
                { label: 'Customer Health & Safety (% compliance with safety standards, number of recalls)', key: 'customerSafety', type: 'number', tooltip: 'Percentage of compliance with customer health and safety standards and the number of product recalls.' },
                { label: 'Data Privacy & Protection (number of breaches, % compliance with GDPR/CCPA)', key: 'dataPrivacy', type: 'number', tooltip: 'Number of data breaches and percentage of compliance with GDPR/CCPA regulations.' },
                { label: 'Ethical Marketing & Advertising (% compliance, number of violations)', key: 'ethicalMarketing', type: 'number', tooltip: 'Percentage of compliance with ethical marketing standards and the number of violations.' },
                { label: 'Product Quality & Safety (number of defects per million units, recall count)', key: 'productQuality', type: 'number', tooltip: 'Number of defects per million units and the total number of product recalls.' },
            ],
        },
        {
            title: 'Supply Chain Responsibility',
            metrics: [
                { label: 'Supplier ESG Compliance (% compliant suppliers, count of audits conducted)', key: 'supplierCompliance', type: 'number', tooltip: 'Percentage of suppliers compliant with ESG standards and the number of audits conducted.' },
                { label: 'Fair Trade Practices (% fair-trade certified suppliers)', key: 'fairTrade', type: 'number', tooltip: 'Percentage of suppliers certified for fair trade practices.' },
                { label: 'Ethical Sourcing (% responsibly sourced materials)', key: 'ethicalSourcing', type: 'number', tooltip: 'Percentage of materials sourced from ethical and sustainable sources.' },
            ],
        },
    ];

    const governanceSections = [
        {
            title: 'Corporate Ethics & Compliance',
            metrics: [
                { label: 'Anti-Corruption & Bribery Policies (number of violations, % compliance)', key: 'antiCorruption', type: 'number', tooltip: 'Number of violations and percentage of compliance with anti-corruption and bribery policies.' },
                { label: 'Whistleblower Protection (number of cases reported, resolution time in days)', key: 'whistleblowerProtection', type: 'number', tooltip: 'Number of whistleblower cases reported and the average resolution time in days.' },
                { label: 'Code of Conduct (% compliance, number of violations)', key: 'codeOfConduct', type: 'number', tooltip: 'Percentage of compliance with the code of conduct and the number of violations.' },
            ],
        },
        {
            title: 'Board & Leadership',
            metrics: [
                { label: 'Board Diversity & Independence (% female board members, % independent directors)', key: 'boardDiversity', type: 'number', tooltip: 'Percentage of female board members and independent directors on the board.' },
                { label: 'Executive Compensation (CEO pay ratio, total executive compensation in $)', key: 'executiveCompensation', type: 'number', tooltip: 'CEO pay ratio and total compensation for executives in dollars.' },
                { label: 'Shareholder Rights (number of resolutions passed, % participation in voting)', key: 'shareholderRights', type: 'number', tooltip: 'Number of shareholder resolutions passed and the percentage of shareholder participation in voting.' },
            ],
        },
        {
            title: 'Risk Management',
            metrics: [
                { label: 'Cybersecurity & Data Protection (number of incidents, % compliance with regulations)', key: 'cybersecurity', type: 'number', tooltip: 'Number of cybersecurity incidents and percentage of compliance with data protection regulations.' },
                { label: 'Business Continuity Planning (number of plans in place, % tested annually)', key: 'businessContinuity', type: 'number', tooltip: 'Number of business continuity plans in place and the percentage tested annually.' },
                { label: 'Climate-Related Risks ($ financial impact, % assets at risk)', key: 'climateRisks', type: 'number', tooltip: 'Financial impact of climate-related risks and the percentage of assets at risk.' },
            ],
        },
        {
            title: 'Regulatory & Reporting Compliance',
            metrics: [
                { label: 'ESG Disclosure & Transparency (% compliance, number of reports published annually)', key: 'esgDisclosure', type: 'number', tooltip: 'Percentage of compliance with ESG disclosure requirements and the number of reports published annually.' },
                { label: 'Legal & Regulatory Compliance (number of violations, total fines in $)', key: 'legalCompliance', type: 'number', tooltip: 'Number of legal and regulatory violations and the total fines incurred in dollars.' },
            ],
        },
    ];

    const [expandedSections, setExpandedSections] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [newMetric, setNewMetric] = useState({
        section: '',
        customSection: '',
        name: '',
        type: 'number',
        unit: '',
    });
    const unitOptions = ["kg", "tons", "L", "m³", "MWh", "kWh", "%", "ppm", "count"];

    const [showSocialPopup, setShowSocialPopup] = useState(false);
    const [newSocialMetric, setNewSocialMetric] = useState({
        section: '',
        customSection: '',
        name: '',
        type: 'number',
        unit: '',
    });

    const [showGovernancePopup, setShowGovernancePopup] = useState(false);
    const [newGovernanceMetric, setNewGovernanceMetric] = useState({
        section: '',
        customSection: '',
        name: '',
        type: 'number',
        unit: '',
    });

    const handleAddMetric = () => {
        if (!newMetric.section || !newMetric.name || !newMetric.unit) {
            alert("Please fill all fields before adding a metric.");
            return;
        }

        let sectionKey = newMetric.section === "Other" ? newMetric.customSection : newMetric.section;

        if (!sectionKey) {
            alert("Please provide a name for the 'Other' section.");
            return;
        }

        setEnvironmentalSections((prevSections) => {
            let sectionExists = prevSections.find(sec => sec.title === sectionKey);

            if (sectionExists) {
                return prevSections.map(sec =>
                    sec.title === sectionKey
                        ? { ...sec, metrics: [...sec.metrics, { label: newMetric.name, type: newMetric.type, unit: newMetric.unit }] }
                        : sec
                );
            } else {
                return [...prevSections, {
                    title: sectionKey,
                    metrics: [{ label: newMetric.name, type: newMetric.type, unit: newMetric.unit }],
                }];
            }
        });

        setShowPopup(false);
        setNewMetric({ section: '', customSection: '', name: '', type: 'number', unit: '' });
    };

    const handleAddSocialMetric = () => {
        if (!newSocialMetric.section || !newSocialMetric.name || !newSocialMetric.unit) {
            alert("Please fill all fields before adding a metric.");
            return;
        }

        let sectionKey = newSocialMetric.section === "Other" ? newSocialMetric.customSection : newSocialMetric.section;

        if (!sectionKey) {
            alert("Please provide a name for the 'Other' section.");
            return;
        }

        setSocialSections((prevSections) => {
            let sectionExists = prevSections.find(sec => sec.title === sectionKey);

            if (sectionExists) {
                return prevSections.map(sec =>
                    sec.title === sectionKey
                        ? { ...sec, metrics: [...sec.metrics, { label: newSocialMetric.name, type: newSocialMetric.type, unit: newSocialMetric.unit }] }
                        : sec
                );
            } else {
                return [...prevSections, {
                    title: sectionKey,
                    metrics: [{ label: newSocialMetric.name, type: newSocialMetric.type, unit: newSocialMetric.unit }],
                }];
            }
        });

        setShowSocialPopup(false);
        setNewSocialMetric({ section: '', customSection: '', name: '', type: 'number', unit: '' });
    };

    const handleAddGovernanceMetric = () => {
        if (!newGovernanceMetric.section || !newGovernanceMetric.name || !newGovernanceMetric.unit) {
            alert("Please fill all fields before adding a metric.");
            return;
        }

        let sectionKey = newGovernanceMetric.section === "Other" ? newGovernanceMetric.customSection : newGovernanceMetric.section;

        if (!sectionKey) {
            alert("Please provide a name for the 'Other' section.");
            return;
        }

        setGovernanceSections((prevSections) => {
            let sectionExists = prevSections.find(sec => sec.title === sectionKey);

            if (sectionExists) {
                return prevSections.map(sec =>
                    sec.title === sectionKey
                        ? { ...sec, metrics: [...sec.metrics, { label: newGovernanceMetric.name, type: newGovernanceMetric.type, unit: newGovernanceMetric.unit }] }
                        : sec
                );
            } else {
                return [...prevSections, {
                    title: sectionKey,
                    metrics: [{ label: newGovernanceMetric.name, type: newGovernanceMetric.type, unit: newGovernanceMetric.unit }],
                }];
            }
        });

        setShowGovernancePopup(false);
        setNewGovernanceMetric({ section: '', customSection: '', name: '', type: 'number', unit: '' });
    };

    return (
        <div style={styles.landingPage}>
            <nav
                style={{
                    ...styles.sidebar,
                    ...(isCollapsed && styles.sidebarCollapsed),
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={GreenTrendz}
                        alt="Logo"
                        width="50"
                        height="50"
                        className="d-inline-block align-top me-2"
                    />
                    <h5
                        style={{
                            ...styles.logo,
                            ...(isCollapsed && styles.logoCollapsed),
                        }}
                    >
                        GreenTrendz
                    </h5>
                </div>

                {/* Toggle Button */}
                <button style={styles.toggleButton} onClick={toggleSidebar}>
                    {isCollapsed ? '»' : '«'}
                </button>

                <ul style={styles.navList}>
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <a
                                href={item.path}
                                style={{
                                    ...styles.navItem,
                                    ...(isCollapsed && styles.navItemCollapsed),
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#3b6b5c';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '';
                                    e.target.style.transform = '';
                                }}
                            >
                                <item.icon
                                    style={{
                                        ...styles.navIcon,
                                        ...(isCollapsed && styles.navIconCollapsed),
                                    }}
                                    size={20}
                                />
                                <span
                                    style={{
                                        ...styles.navLabel,
                                        ...(isCollapsed && styles.navLabelCollapsed),
                                    }}
                                >
                                    {item.label}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div
                    style={{
                        marginTop: 'auto',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '0 20px 20px',
                    }}
                >
                    <button
                        style={{
                            ...styles.logoutButton,
                            ...(isCollapsed && styles.logoutButtonCollapsed),
                        }}
                        onClick={handleLogout}
                    >
                        <Settings size={18} />
                        {!isCollapsed && 'Logout'}
                    </button>
                </div>
            </nav>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to logout?</p>
                        <div style={styles.modalButtons}>
                            <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
                            <button onClick={confirmLogout}>Yes, Logout</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{
                ...styles.content,
                ...(isCollapsed && styles.contentCollapsed),
            }}>

                <div className="container">
                <h1 style={{ ...styles.sectionTitle, fontStyle: 'italic', color: 'black', fontSize: '32px'}}>
    Upload ESG Data
    <div style={styles.accentLine}></div>
</h1>
                        <h2 style={styles.sectionSubtitle}>Annual ESG Metrics</h2>
{/*Environmental*/}
                        <div style={styles.section}>
    <h1 style={styles.sectionTitle}>
        Environmental
        <div style={styles.accentLine}></div>
    </h1>
    {environmentalSections.map((section, idx) => (
    <div key={idx} style={styles.section}>
        <div
            style={styles.sectionHeader}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.sectionHeaderHover.backgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.sectionHeader.backgroundColor)}
            onClick={() => toggleSection(section.title)}
        >
            <h4 style={styles.sectionHeaderText}>{section.title}</h4>
            <span>{expandedSections[section.title] ? '▲' : '▼'}</span>
        </div>
        {expandedSections[section.title] && (
            <div style={styles.twoColumnContainer}>
                {section.metrics.map((metric, i) => (
                    <div key={i} style={styles.inputContainer}>
                        <label htmlFor={metric.key} style={styles.metricLabel}>
                            {metric.label}
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <Info
                                    style={styles.infoIcon}
                                    onMouseEnter={() => showTooltip(metric.key)}
                                    onMouseLeave={() => hideTooltip(metric.key)}
                                />
                                <Tooltip
                                    text={metric.tooltip}
                                    visible={tooltipVisible[metric.key]}
                                />
                            </div>
                        </label>
                        <input
                            id={metric.key}
                            type={metric.type}
                            value={environmentalData[metric.key] || ''}
                            onChange={(e) =>
                                setEnvironmentalData((prev) => ({
                                    ...prev,
                                    [metric.key]: e.target.value,
                                }))
                            }
                            style={{ ...styles.inputField, ...styles.metricInput }}
                        />
                    </div>
                ))}
            </div>
        )}
    </div>
))}
                            {/* Button to open popup */}
                            <button
                                style={styles.button}
                                onClick={() => setShowPopup(true)}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                            >
                                Add New Environmental Metric
                            </button>

                            {/* Popup Tab for Adding New Metric */}
                            {showPopup && (
                                <div style={styles.popupTab}>
                                    <div style={styles.popupHeader}>
                                        <h3>Add New Environmental Metric</h3>
                                        <button style={styles.closeButton} onClick={() => setShowPopup(false)}>
                                            ✖
                                        </button>
                                    </div>

                                    {/* Section Selection */}
                                    <label>Section:</label>
                                    <select
                                        value={newMetric.section}
                                        onChange={(e) =>
                                            setNewMetric((prev) => ({
                                                ...prev,
                                                section: e.target.value,
                                                customSection: e.target.value === "Other" ? "" : prev.customSection,
                                            }))
                                        }
                                        style={styles.inputField}
                                    >
                                        <option value="">Select Section</option>
                                        {environmentalSections.map((section, i) => (
                                            <option key={i} value={section.title}>
                                                {section.title}
                                            </option>
                                        ))}
                                        <option value="Other">Other</option>
                                    </select>

                                    {/* Custom Section Name */}
                                    {newMetric.section === "Other" && (
                                        <div>
                                            <label>Custom Section Name:</label>
                                            <input
                                                type="text"
                                                value={newMetric.customSection}
                                                onChange={(e) =>
                                                    setNewMetric((prev) => ({
                                                        ...prev,
                                                        customSection: e.target.value,
                                                    }))
                                                }
                                                placeholder="Enter custom section name"
                                                style={styles.inputField}
                                            />
                                        </div>
                                    )}

                                    {/* Metric Name */}
                                    <label>Metric Name:</label>
                                    <input
                                        type="text"
                                        value={newMetric.name}
                                        onChange={(e) =>
                                            setNewMetric((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        placeholder="Enter Metric Name"
                                        style={styles.inputField}
                                    />

                                    {/* Unit Selection */}
                                    <label>Unit:</label>
                                    <select
                                        value={newMetric.unit}
                                        onChange={(e) =>
                                            setNewMetric((prev) => ({
                                                ...prev,
                                                unit: e.target.value,
                                            }))
                                        }
                                        style={styles.inputField}
                                    >
                                        <option value="">Select Unit</option>
                                        {unitOptions.map((unit, i) => (
                                            <option key={i} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Action Buttons */}
                                    <div style={styles.buttonContainer}>
                                        <button onClick={handleAddMetric} style={styles.saveButton}>
                                            Save Metric
                                        </button>
                                        <button onClick={() => setShowPopup(false)} style={styles.cancelButton}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
{/*socail*/}
                        <div style={styles.section}>
    <h1 style={styles.sectionTitle}>
        Social
        <div style={styles.accentLine}></div>
    </h1>
    {socialSections.map((section, idx) => (
    <div key={idx} style={styles.section}>
        <div
            style={styles.sectionHeader}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.sectionHeaderHover.backgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.sectionHeader.backgroundColor)}
            onClick={() => toggleSection(section.title)}
        >
            <h4 style={styles.sectionHeaderText}>{section.title}</h4>
            <span>{expandedSections[section.title] ? '▲' : '▼'}</span>
        </div>
        {expandedSections[section.title] && (
            <div style={styles.twoColumnContainer}>
                {section.metrics.map((metric, i) => (
                    <div key={i} style={styles.inputContainer}>
                        <label htmlFor={metric.key} style={styles.metricLabel}>
                            {metric.label}
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <Info
                                    style={styles.infoIcon}
                                    onMouseEnter={() => showTooltip(metric.key)}
                                    onMouseLeave={() => hideTooltip(metric.key)}
                                />
                                <Tooltip
                                    text={metric.tooltip}
                                    visible={tooltipVisible[metric.key]}
                                />
                            </div>
                        </label>
                        <input
                            id={metric.key}
                            type={metric.type}
                            value={socialData[metric.key] || ''}
                            onChange={(e) =>
                                setSocialData((prev) => ({
                                    ...prev,
                                    [metric.key]: e.target.value,
                                }))
                            }
                            style={{ ...styles.inputField, ...styles.metricInput }}
                        />
                    </div>
                ))}
            </div>
        )}
    </div>
))}
                            {/* Button to open Social popup */}
                            <button
                                style={styles.button}
                                onClick={() => setShowSocialPopup(true)}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
                            >
                                Add New Social Metric
                            </button>

                            {/* Popup for adding new Social metric */}
                            {showSocialPopup && (
                                <div style={styles.popupTab}>
                                    <div style={styles.popupHeader}>
                                        <h3>Add New Social Metric</h3>
                                        <button style={styles.closeButton} onClick={() => setShowSocialPopup(false)}>
                                            ✖
                                        </button>
                                    </div>

                                    {/* Section Selection */}
                                    <label>Section:</label>
                                    <select
                                        value={newSocialMetric.section}
                                        onChange={(e) =>
                                            setNewSocialMetric((prev) => ({
                                                ...prev,
                                                section: e.target.value,
                                                customSection: e.target.value === "Other" ? "" : prev.customSection,
                                            }))
                                        }
                                        style={styles.inputField}
                                    >
                                        <option value="">Select Section</option>
                                        {socialSections.map((section, i) => (
                                            <option key={i} value={section.title}>
                                                {section.title}
                                            </option>
                                        ))}
                                        <option value="Other">Other</option>
                                    </select>

                                    {/* Custom Section Name */}
                                    {newSocialMetric.section === "Other" && (
                                        <div>
                                            <label>Custom Section Name:</label>
                                            <input
                                                type="text"
                                                value={newSocialMetric.customSection}
                                                onChange={(e) =>
                                                    setNewSocialMetric((prev) => ({
                                                        ...prev,
                                                        customSection: e.target.value,
                                                    }))
                                                }
                                                placeholder="Enter custom section name"
                                                style={styles.inputField}
                                            />
                                        </div>
                                    )}

                                    {/* Metric Name */}
                                    <label>Metric Name:</label>
                                    <input
                                        type="text"
                                        value={newSocialMetric.name}
                                        onChange={(e) =>
                                            setNewSocialMetric((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        placeholder="Enter Metric Name"
                                        style={styles.inputField}
                                    />

                                    {/* Unit Selection */}
                                    <label>Unit:</label>
                                    <select
                                        value={newSocialMetric.unit}
                                        onChange={(e) =>
                                            setNewSocialMetric((prev) => ({
                                                ...prev,
                                                unit: e.target.value,
                                            }))
                                        }
                                        style={styles.inputField}
                                    >
                                        <option value="">Select Unit</option>
                                        {unitOptions.map((unit, i) => (
                                            <option key={i} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Action Buttons */}
                                    <div style={styles.buttonContainer}>
                                        <button onClick={handleAddSocialMetric} style={styles.saveButton}>
                                            Save Metric
                                        </button>
                                        <button onClick={() => setShowSocialPopup(false)} style={styles.cancelButton}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={styles.section}>
    <h1 style={styles.sectionTitle}>
        Governance
        <div style={styles.accentLine}></div>
    </h1>
    {governanceSections.map((section, idx) => (
    <div key={idx} style={styles.section}>
        <div
            style={styles.sectionHeader}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.sectionHeaderHover.backgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.sectionHeader.backgroundColor)}
            onClick={() => toggleSection(section.title)}
        >
            <h4 style={styles.sectionHeaderText}>{section.title}</h4>
            <span>{expandedSections[section.title] ? '▲' : '▼'}</span>
        </div>
        {expandedSections[section.title] && (
            <div style={styles.twoColumnContainer}>
                {section.metrics.map((metric, i) => (
                    <div key={i} style={styles.inputContainer}>
                        <label htmlFor={metric.key} style={styles.metricLabel}>
                            {metric.label}
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <Info
                                    style={styles.infoIcon}
                                    onMouseEnter={() => showTooltip(metric.key)}
                                    onMouseLeave={() => hideTooltip(metric.key)}
                                />
                                <Tooltip
                                    text={metric.tooltip}
                                    visible={tooltipVisible[metric.key]}
                                />
                            </div>
                        </label>
                        <input
                            id={metric.key}
                            type={metric.type}
                            value={governanceData[metric.key] || ''}
                            onChange={(e) =>
                                setGovernanceData((prev) => ({
                                    ...prev,
                                    [metric.key]: e.target.value,
                                }))
                            }
                            style={{ ...styles.inputField, ...styles.metricInput }}
                        />
                    </div>
                ))}
            </div>
        )}
    </div>
))}
                            {/* Button to open Governance popup */}
                            <button
                                style={styles.button}
                                onClick={() => setShowGovernancePopup(true)}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
                            >
                                Add New Governance Metric
                            </button>

                            {/* Popup for adding new Governance metric */}
                            {showGovernancePopup && (
                                <div style={styles.popupTab}>
                                    <div style={styles.popupHeader}>
                                        <h3>Add New Governance Metric</h3>
                                        <button style={styles.closeButton} onClick={() => setShowGovernancePopup(false)}>
                                            ✖
                                        </button>
                                    </div>

                                    {/* Section Selection */}
                                    <label>Section:</label>
                                    <select
                                        value={newGovernanceMetric.section}
                                        onChange={(e) =>
                                            setNewGovernanceMetric((prev) => ({
                                                ...prev,
                                                section: e.target.value,
                                                customSection: e.target.value === "Other" ? "" : prev.customSection,
                                            }))
                                        }
                                        style={styles.inputField}
                                    >
                                        <option value="">Select Section</option>
                                        {governanceSections.map((section, i) => (
                                            <option key={i} value={section.title}>
                                                {section.title}
                                            </option>
                                        ))}
                                        <option value="Other">Other</option>
                                    </select>

                                    {/* Custom Section Name */}
                                    {newGovernanceMetric.section === "Other" && (
                                        <div>
                                            <label>Custom Section Name:</label>
                                            <input
                                                type="text"
                                                value={newGovernanceMetric.customSection}
                                                onChange={(e) =>
                                                    setNewGovernanceMetric((prev) => ({
                                                        ...prev,
                                                        customSection: e.target.value,
                                                    }))
                                                }
                                                placeholder="Enter custom section name"
                                                style={styles.inputField}
                                            />
                                        </div>
                                    )}

                                    {/* Metric Name */}
                                    <label>Metric Name:</label>
                                    <input
                                        type="text"
                                        value={newGovernanceMetric.name}
                                        onChange={(e) =>
                                            setNewGovernanceMetric((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        placeholder="Enter Metric Name"
                                        style={styles.inputField}
                                    />

                                    {/* Unit Selection */}
                                    <label>Unit:</label>
                                    <select
                                        value={newGovernanceMetric.unit}
                                        onChange={(e) =>
                                            setNewGovernanceMetric((prev) => ({
                                                ...prev,
                                                unit: e.target.value,
                                            }))
                                        }
                                        style={styles.inputField}
                                    >
                                        <option value="">Select Unit</option>
                                        {unitOptions.map((unit, i) => (
                                            <option key={i} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Action Buttons */}
                                    <div style={styles.buttonContainer}>
                                        <button onClick={handleAddGovernanceMetric} style={styles.saveButton}>
                                            Save Metric
                                        </button>
                                        <button onClick={() => setShowGovernancePopup(false)} style={styles.cancelButton}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

{/* Data Import Section */}
<div className="section" style={styles.section}>
    <h3 style={styles.sectionTitle}>Data Import</h3>
    <div style={styles.datePickerContainer}>
        <div style={styles.inputColumn}>
            <label style={styles.label}>Start Date</label>
            <input
                type="date"
                value={dataImportData.startDate}
                onChange={(e) =>
                    setDataImportData({
                        ...dataImportData,
                        startDate: e.target.value,
                    })
                }
                style={styles.inputField}
            />
        </div>
        <div style={styles.inputColumn}>
            <label style={styles.label}>End Date</label>
            <input
                type="date"
                value={dataImportData.endDate}
                onChange={(e) =>
                    setDataImportData({
                        ...dataImportData,
                        endDate: e.target.value,
                    })
                }
                style={styles.inputField}
            />
        </div>
    </div>
</div>

{/* File Upload Section */}
<div className="section" style={styles.section}>
            <h3 style={styles.sectionTitle}>Upload CSV/XLSX</h3>
            <div
                style={styles.fileUploadContainer}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.backgroundColor = '#e0f7fa';
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.backgroundColor = '#fff';
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.backgroundColor = '#fff';
                    const file = e.dataTransfer.files[0];
                    if (file) handleCsvUpload({ target: { files: [file] } });
                }}
            >
                {/* File Input */}
                <input
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={handleCsvUpload}
                    style={{ display: 'none' }} // Hide input
                    id="csv-upload"
                />
                {/* Label linked to the input */}
                <label htmlFor="csv-upload" style={styles.uploadLabel}>
                    <p>Drag and drop your CSV/XLSX file here</p>
                    <p>or</p>
                    <button
                        type="button"
                        style={styles.chooseFileButton}
                        onClick={() => document.getElementById('csv-upload').click()}
                    >
                        Choose File
                    </button>
                    <p>Upload a CSV/XLSX file (max. 5MB) containing Metric Name, Value, and Timestamp columns</p>
                </label>
            </div>

            {/* File Preview */}
            {csvFile && (
                <div style={styles.preview}>
                    <p>{csvFile.name}</p>
                    <p>{Math.round(csvFile.size / 1024)} KB</p>
                </div>
            )}

            {/* Additional Upload Options */}
            <div style={styles.additionalUploadOptions}>
                <p>Or upload from:</p>
                <button style={styles.uploadOptionButton} onClick={() => alert('Google Drive upload not implemented')}>Google Drive</button>
                <button style={styles.uploadOptionButton} onClick={() => alert('OneDrive upload not implemented')}>OneDrive</button>
                <button style={styles.uploadOptionButton} onClick={() => alert('Dropbox upload not implemented')}>Dropbox</button>
            </div>
        </div>


{/* Logo Upload Section */}
 {/* Logo Upload Section */}
 <div className="section" style={styles.section}>
                <h3 style={styles.sectionTitle}>Upload Logo</h3>
                <div
                    style={styles.fileUploadContainer}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.backgroundColor = '#e0f7fa';
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.backgroundColor = '#fff';
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.backgroundColor = '#fff';
                        const file = e.dataTransfer.files[0];
                        if (file) handleLogoUpload({ target: { files: [file] } });
                    }}
                >
                    {/* File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        style={{ display: 'none' }}
                        id="logo-upload"
                    />
                    {/* Label linked to the input */}
                    <label htmlFor="logo-upload" style={styles.uploadLabel}>
                        <p>Drag and drop your logo here</p>
                        <p>or</p>
                        <button
                            type="button"
                            style={styles.chooseFileButton}
                            onClick={() => document.getElementById('logo-upload').click()}
                        >
                            Choose File
                        </button>
                        <p>Upload your company logo (JPEG/PNG/SVG, max. 2MB)</p>
                    </label>
                </div>
            
    {/* Logo Preview */}
    {logoFile && (
    <div style={styles.preview}>
        <p><strong>Logo File Name:</strong> {logoFile.name}</p>
    </div>
)}
</div>

{/* Preview Section */}
<div className="section" style={styles.section}>
    <h3 style={styles.sectionTitle}>Uploaded Files Preview</h3>
    <div style={styles.previewContainer}>
        {/* CSV/XLSX File Preview */}
        {csvFile && (
                    <div style={styles.preview}>
                        <h4>CSV/XLSX File:</h4>
                        <p><strong>File Name:</strong> {csvFile.name}</p>
                        <p><strong>File Size:</strong> {Math.round(csvFile.size / 1024)} KB</p>

                        {/* Scrollable Data Preview */}
                        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        {csvData.length > 0 && Object.keys(csvData[0]).map((key, index) => (
                                            <th key={index}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(showAllData ? fullCsvData : csvData).map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td>{rowIndex + 1}</td>
                                            {Object.values(row).map((value, colIndex) => (
                                                <td key={colIndex}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Show More Button */}
                        {fullCsvData.length > 5 && (
                            <button onClick={() => setShowAllData(!showAllData)} style={{ marginTop: '10px' }}>
                                {showAllData ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </div>
                )}
         {/* Logo File Preview */}
         {logoFile && (
                        <div style={styles.preview}>
                            <h4>Logo:</h4>
                            <img src={URL.createObjectURL(logoFile)} alt="Logo Preview" style={styles.logoPreview} />
                            <p><strong>File Name:</strong> {logoFile.name}</p>
                            <p><strong>File Size:</strong> {Math.round(logoFile.size / 1024)} KB</p>
                        </div>
                    )}
        {/* No Files Uploaded Message */}
        {!csvFile && !logoFile && (
            <p style={styles.noFilesMessage}>No files uploaded yet.</p>
        )}
    </div>
</div>

{/* Submit Button */}
<button
    style={styles.button}
    onClick={handleSubmit}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
>
    Submit Data
</button>

{/* Status Messages */}
<div>
    {loading && <p style={styles.loading}>Submitting data, please wait...</p>}
    {successMessage && <p style={styles.success}>{successMessage}</p>}
    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
</div>
                    </div>
                </div>
            </div>
    );
};

export default Sidebar;