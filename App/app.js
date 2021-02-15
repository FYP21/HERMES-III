/**
 * Connecting to Database using Sequelize, start app
 */

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express');
const { Sequelize, DataTypes } = require('sequelize');
const AdminBroSequelize = require('@admin-bro/sequelize');

const sequelize = new Sequelize('postgres://trambui:@localhost:5432/murdoch_fyp');
AdminBro.registerAdapter(AdminBroSequelize);

const express = require('express');
const app = express();

/**
 * Define User resource
 */
const User = sequelize.define('users', {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
},{
    underscored: true
});
/**
 * Define Standard resource
 */
const Standard = sequelize.define('standards', {
    core: { type: DataTypes.STRING },
    cs: { type: DataTypes.STRING },
    domain: { type: DataTypes.STRING },
    sub_domain: { type: DataTypes.STRING },
    standard: { type: DataTypes.STRING },
}, {
    underscored: true
});
/**
 * Define Risk Driver resource
 */
const Risk_Driver = sequelize.define('risk_drivers', {
    category: { type: DataTypes.STRING },
    sub_category: { type: DataTypes.STRING },
    definition: { type: DataTypes.STRING },
    type_of_event: { type: DataTypes.STRING },
},{
    underscored: true
});
/**
 * Define Accessment Framework resource
 */
const Assessment_Framework = sequelize.define('assessment_frameworks', {
    category: { type: DataTypes.STRING },
    sub_category: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
}, {
    underscored: true
});
/**
 * Define Improvement Framework resource
 */
const Improvement_Framework = sequelize.define('improvement_frameworks', {
    theme: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    example: { type: DataTypes.STRING },
}, {
    underscored: true
});
/**
 * Define Policy resource
 */
const Policy = sequelize.define('policies', {
    theme: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    pmm_ref: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    version: { type: DataTypes.INTEGER },
    date_approved: { type: DataTypes.DATE },
    review_interval: { type: DataTypes.INTEGER },
    specified_review_date: { type: DataTypes.DATE },
    last_reviewed: { type: DataTypes.DATE },
    last_modified: { type: DataTypes.DATE },
    next_review: { type: DataTypes.DATE }
}, {
    underscored: true
});
/**
 * Define Compliance Assessment resource
 */
const Compliance_Assessment = sequelize.define('compliance_assessments', {
    policy: { type: DataTypes.STRING },
    procedures: { type: DataTypes.STRING },
    data: { type: DataTypes.STRING },
}, {
    underscored: true
});
/**
 * 
 */
const Risk_Treatment = sequelize.define('risk_treatments', {
    option: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
}, {
    underscored: true
});
/**
 * Define join table 'standard_Policy'
 */
const Standard_Policy = sequelize.define('standard_policies', {
    StandardId: {
        type: DataTypes.INTEGER,
        references: {
            model: Standard,
            key: 'id'
        }
    },
    PolicyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Policy,
            key: 'id'
        },
    }
}, {
    underscored: true
});
/**
 * Define relationship between entities
 */
Compliance_Assessment.belongsTo(Standard);
Compliance_Assessment.belongsTo(Risk_Driver);
Risk_Treatment.belongsTo(Compliance_Assessment, { foreignKey: "assessment_id"});
Standard.belongsToMany(Policy, { through: Standard_Policy });
Policy.belongsToMany( Standard, { through: Standard_Policy });

/**
 * Adding resources to Admin Bro
 */
const run = async () => {
    const adminBro = new AdminBro ({
        databases: [sequelize],
        resources: [
            {
                resource: User, 
                options: { actions: {
                    show: { properties: {
                        password: { isVisible: false }
                    }}
                }}
            }, {
                resource: Standard, 
                options: { properties: {
                    domain: {
                        availableValues: [
                            { value: 'Student Participation and Attainment', label: 'Student Participation and Attainment' },
                            { value: 'Learning Environment', label: 'Learning Environment' },
                            { value: 'Teaching', label: 'Teaching' },
                            { value: 'Research and Research Training', label: 'Research and Research Training' },
                            { value: 'Institutional Quality Assurance', label: 'Institutional Quality Assurance' },
                            { value: 'Governance and Accountability', label: 'Governance and Accountability' },
                            { value: 'Representation, Information and Information Management', label: 'Representation, Information and Information Management' }
                        ],
                    },
                    core: { 
                        availableValues: [
                            {value: 'Y', label: 'Yes'},
                            {value: 'N', label: 'No'},
                        ],
                    },
                    cs: {
                        availableValues: [
                            {value: 'Y', label: 'Yes'},
                            {value: 'N', label: 'No'},
                        ],
                    }
                }}
            }, {
                resource: Risk_Driver, 
                options: { properties: {
                    sub_category: {
                        isTitle: true,
                    },
                    category: { 
                        availableValues: [
                            { value: 'Strategic', label: 'Strategic' },
                            { value: 'External', label: 'External' },
                            { value: 'Financial', label: 'Financial' },
                            { value: 'Operational', label: 'Operational' },
                            { value: 'People', label: 'People' },
                            { value: 'Governance', label: 'Governance' },
                        ],
                    },
                }}
            }, {
                resource: Assessment_Framework,
                options: { properties: {
                    sub_category: {
                        isTitle: true,
                    },
                    category: {
                        availableValues: [
                            { value: 'Student Profile and Outcomes', label: 'Student Profile and Outcomes' },
                            { value: 'Staff Resources and Profile', label: 'Staff Resources and Profile' },
                            { value: 'Financial Viability and Sustainability', label: 'Financial Viability and Sustainability' },
                            { value: 'Provider Specific', label: 'Provider Specific' },
                        ],
                    },
                }}
            }, {
                resource: Improvement_Framework,
                options: { properties: {
                    category: {
                        isTitle: true,
                    },
                    theme: {
                        availableValues: [
                            { value: 'Design', label: 'Design' },
                            { value: 'Support', label: 'Support' },
                            { value: 'Delivery', label: 'Delivery' },
                            { value: 'Performance', label: 'Performance' },
                        ],
                    },
                }}
            }, {
                resource: Policy,
                options: { properties: {
                    theme: {
                        availableValues: [
                            { value: 'Community & Development', label: 'Community & Development' },
                            { value: 'Finance, Purchasing & Insurance', label: 'Finance, Purchasing & Insurance' },
                            { value: 'Governance', label: 'Governance' },
                            { value: 'Learning & Teaching', label: 'Learning & Teaching' },
                            { value: 'People & Culture', label: 'People & Culture' },
                            { value: 'Physical Facilities', label: 'Physical Facilities' },
                            { value: 'GovernHealth, Safety & Environmentance', label: 'Health, Safety & Environment' },
                            { value: 'Information Technology', label: 'Information Technology' },
                            { value: 'Student Experience', label: 'Student Experience' },
                            { value: 'The Animal Hospital', label: 'The Animal Hospital' },
                            { value: 'Research', label: 'Research' },
                        ],
                    },
                    category: {
                        availableValues: [
                            { value: 'Policy (Document Type)', label: 'Policy (Document Type)' },
                            { value: 'Procedure (Document Type)', label: 'Procedure (Document Type)' },
                            { value: 'Guideline (Document Type)', label: 'Guideline (Document Type)' },
                            { value: 'Standard (Document Type)', label: 'Standard (Document Type)' },
                            { value: 'Regulations (Document Type)', label: 'Regulations (Document Type)' },
                            { value: 'Statutes (Document Type)', label: 'Statutes (Document Type)' },
                            { value: 'Rule (Document Type)', label: 'Rule (Document Type)' },
                            { value: 'ByLaw (Document Type)', label: 'ByLaw (Document Type)' },
                            { value: 'Principles/Framework (Document Type)', label: 'Principles/Framework (Document Type)' },
                            { value: 'Strategy/Plan (Document Type)', label: 'Strategy/Plan (Document Type)' },
                            { value: 'Code/Charter (Document Type)', label: 'Code/Charter (Document Type)' },
                            { value: 'Dictionary of Terminology (Document Type)', label: 'Dictionary of Terminology (Document Type)' },
                        ],
                    },
                }}
            }, {
                resource: Compliance_Assessment,
                options: { properties: {
                    policy: { 
                        availableValues: [
                            { value: 'Good', label: 'Good' },
                            { value: 'Satisfactory', label: 'Satisfactory' },
                            { value: 'Poor', label: 'Poor' },
                        ],
                    },
                    procedures: {
                        availableValues: [
                            { value: 'Good', label: 'Good' },
                            { value: 'Satisfactory', label: 'Satisfactory' },
                            { value: 'Poor', label: 'Poor' },
                        ],
                    },
                    data: {
                        availableValues: [
                            { value: 'Good', label: 'Good' },
                            { value: 'Satisfactory', label: 'Satisfactory' },
                            { value: 'Poor', label: 'Poor' },
                        ],
                    },
                }}
            }, {
                resource: Risk_Treatment,
                options: { properties: {
                    option: {
                        availableValues: [
                            { value: 'Avoid', label: 'Avoid' },
                            { value: 'Accept and reduce', label: 'Accept and reduce' },
                            { value: 'Reduce and monitor', label: 'Reduce and monitor' },
                        ],
                    },
                }}
            },{
                resource: Standard_Policy,
            }
        ],
        rootPath: '/admin',
        branding: {
            companyName: 'HERMES III',
            logo: '/Murdoch_logo.png'
        },
    });

    const router = AdminBroExpress.buildRouter(adminBro)
    
    app.use(adminBro.options.rootPath, router)
    app.use(express.static('public'))
    app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))
};
run();
