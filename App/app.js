require('dotenv').config();
const moment = require('moment');
/**
 * Connecting to Database using Sequelize, start app
 */

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express');
const { Sequelize, DataTypes } = require('sequelize');
const AdminBroSequelize = require('@admin-bro/sequelize');
const bcrypt = require('bcryptjs')
const sequelize = new Sequelize(process.env.DATABASE_URL);

AdminBro.registerAdapter(AdminBroSequelize);

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const isAdmin = ({ currentAdmin }) =>{
  if (currentAdmin && currentAdmin.role === 'Admin')
    return true;
  return false;
}

/**
 * Define User resource
 */
const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Name cannot be empty"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: "Email is not valid"
            },
            notEmpty: {
                msg: "Email cannot be empty"
            }
        }
    },
    password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Password cannot be empty"
            },
            len: {
                args: [6,10],
                msg: "Password must be of 6-10 characters length"
            }
        }
    },
    encrypted_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
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
    standard: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Standard cannot be empty"
            }
        }
    },
}, {
    underscored: true
});
/**
 * Define Risk Driver resource
 */
const Risk_Driver = sequelize.define('risk_drivers', {
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Category cannot be empty"
            }
        }
    },
    sub_category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Sub-category cannot be empty"
            }
        }
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Definition cannot be empty"
            }
        }
    },
    type_of_event: { type: DataTypes.STRING },
},{
    underscored: true
});
/**
 * Define Accessment Framework resource
 */
const Assessment_Framework = sequelize.define('assessment_frameworks', {
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Category cannot be empty"
            }
        }
    },
    sub_category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Sub-category cannot be empty"
            }
        }
    },
    description: { type: DataTypes.STRING },
}, {
    underscored: true
});
/**
 * Define Improvement Framework resource
 */
const Improvement_Framework = sequelize.define('improvement_frameworks', {
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Theme cannot be empty"
            }
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Category cannot be empty"
            }
        }
    },
    description: { type: DataTypes.STRING },
    example: { type: DataTypes.STRING },
}, {
    underscored: true
});
/**
 * Define Policy resource
 */
const Policy = sequelize.define('policies', {
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Theme cannot be empty"
            }
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Category cannot be empty"
            }
        }
    },
    pmm_ref: { type: DataTypes.INTEGER },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Title cannot be empty"
            }
        }
    },
    version: { type: DataTypes.INTEGER },
    last_reviewed: { type: DataTypes.DATE },
}, {
    underscored: true
});
const Review = sequelize.define('reviews', {
    date_approved: { type: DataTypes.DATE },
    review_interval: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Review Interval value must be specified"
            }
        }
    },
    specified_review_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "A scheduled review date must be specified"
            },
            isAfter: {
                args: moment().subtract(1, 'day').toString(),
                msg: "Cannot set review date in the past"
            }
        }
    },
    reviewed_date: { type: DataTypes.DATE },
    next_review: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
}, {
    underscored: true
})
/**
 * Define Compliance Assessment resource
 */
const Compliance_Assessment = sequelize.define('compliance_assessments', {
    policy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Rating value must be indicated"
            }
        }
    },
    procedures: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Rating value must be indicated"
            }
        }
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Rating value must be indicated"
            }
        }
    },
    treatment_option: { type: DataTypes.STRING },
    risk_rating: { type: DataTypes.STRING },
    residual_risk_rating: { type: DataTypes.STRING},
    treatment_description: { type: DataTypes.STRING }
}, {
    underscored: true
});
/**
 * Define joint table 'standard_policies'
 */
const Standard_Policy = sequelize.define('standard_policies', {
    StandardId: {
        type: DataTypes.INTEGER,
        references: {
            model: Standard,
        },
        allowNull: false,
        unique: "compositeIndex"
    },
    PolicyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Policy,
        },
        allowNull: false,
        unique: "compositeIndex"
    },
}, {
    underscored: true
});
/**
 * Define joint table 'standard_risk_drivers'
 */
const Standard_Risk_Driver = sequelize.define('standard_risk_drivers', {
    StandardId: {
        type: DataTypes.INTEGER,
        references: {
            model: Standard,
        },
        allowNull: false
    },
    RiskDriverId: {
        type: DataTypes.INTEGER,
        references: {
            model: Risk_Driver,
        },
        allowNull: false
    }
}, {
    underscored: true
});
/**
 * Define joint table 'standard_assessment_frameworks'
 */
const Standard_Assessment_Framework = sequelize.define('standard_assessment_frameworks', {
    StandardId: {
        type: DataTypes.INTEGER,
        references: {
            model: Standard,
        },
        allowNull: false
    },
    AssessmentFrameworkId: {
        type: DataTypes.INTEGER,
        references: {
            model: Assessment_Framework,
        },
        allowNull: false
    }
}, {
    underscored: true
});
/**
 * Define joint table 'standard_improvement_frameworks'
 */
const Standard_Improvement_Framework = sequelize.define('standard_improvement_frameworks', {
    StandardId: {
        type: DataTypes.INTEGER,
        references: {
            model: Standard,
        },
        allowNull: false
    },
    ImprovementFrameworkId: {
        type: DataTypes.INTEGER,
        references: {
            model: Improvement_Framework,
        },
        allowNull: false
    }
}, {
    underscored: true
});
/**
 * Define relationship between entities
 */
Compliance_Assessment.belongsTo(Standard); //one to one
// one to many
Policy.hasMany(Review);
Review.belongsTo(Policy);

/**
 * Calculate Risk Rating
 */
const calculatedRiskRating = (policyRating, procedureRating, dataRating) => {
    let risk_rating = "";
    let mark = {
        "Good": 3,
        "Satisfactory": 2,
        "Poor": 1
    };

    let input = [policyRating, procedureRating, dataRating];
    let sum = 0;
    input.forEach((rating) => {
        sum += mark[rating];
    });

    if (sum >= 7) risk_rating = "Low";
    else if (sum >= 5 && sum <= 6) risk_rating = "Medium";
    else risk_rating = "High";

    return risk_rating;
};
/**
 * Calculate Residual Risk Rating
 */
const calculatedResidualRisk = (risk_rating, treatment_option) => {
    let residual_risk_rating = "";
    if (!treatment_option) residual_risk_rating = "";
    else if ((risk_rating === "High") && (treatment_option === "Avoid")) residual_risk_rating = "Low";
    else if ((risk_rating === "High" ) && (treatment_option === "Accept and reduce")) residual_risk_rating = "Medium";
    else if ((risk_rating === "Medium") && (treatment_option === "Avoid")) residual_risk_rating = "Low";
    else if ((risk_rating === "Medium") && (treatment_option === "Accept and reduce")) residual_risk_rating = "Low";
    else residual_risk_rating = risk_rating;

    return residual_risk_rating;
}
/**
 * Update risk_rating and residual_risk_rating in database after create/edit
 */
Compliance_Assessment.addHook('beforeSave', (assessment, options) => {
    assessment.risk_rating = calculatedRiskRating(assessment.policy, assessment.procedures, assessment.data);
    assessment.residual_risk_rating = calculatedResidualRisk(assessment.risk_rating, assessment.treatment_option);
});
/**
 * Increase version by 1 after edit the policy
 */
Policy.addHook('beforeUpdate', (policy, options) => {
    let oldTitle = policy._previousDataValues.title;
    let currentTitle = policy.dataValues.title;
    let oldPmm_ref = policy._previousDataValues.pmm_ref.toString();
    let currentPmm_ref = policy.dataValues.pmm_ref;
    let oldCategory = policy._previousDataValues.category;
    let currentCategory = policy.dataValues.category;
    let oldTheme = policy._previousDataValues.theme;
    let currentTheme = policy.dataValues.theme;
    if (
        (currentTitle !== oldTitle) ||
        (currentPmm_ref !== oldPmm_ref) ||
        (currentCategory !== oldCategory) ||
        (currentTheme !== oldTheme)
    ) policy.version = parseInt(policy.version) + 1;

    console.log(policy);
});
/**
 * Update date after X months
 * @param {date} date
 * @param {number} months
 * @returns after X months date
 */
function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}
/**
 * Compare 2 dates
 * @param {date} date1
 * @param {date} date2
 * @returns {number} 1: date1 > date2|-1: date1 < date2|0: date1 = date2
 */
function compare_dates(date1,date2) {
    if (date1>date2) return (1);
  else if (date1<date2) return (-1);
  else return (0);
 }
/**
 * Calcuate next_review and update review status before new/edit action
 */
Review.addHook('beforeSave', (review, options) => {
    let today = moment().toDate();
    console.log(review);
    console.log(today);

    // Update review status field
    if (compare_dates(today, review.specified_review_date) === 1) return; // Don't allow user to set review date in the past
    else if (!review.reviewed_date && compare_dates(today, review.specified_review_date) === 1) review.status = "Overdue";
    else if (
        review.reviewed_date &&
        compare_dates(today, review.specified_review_date) === -1 ||
        compare_dates(today, review.specified_review_date) === 0
    ) review.status = "Complete";
    else review.status = "Pending";

    // Update next_review field
    let newDate = new Date(review.specified_review_date.toString());
    review.next_review = newDate;
    review.next_review = addMonths(review.next_review, parseInt(review.review_interval));

    //Update last_reviewd in Policy
    if (review.reviewed_date) {
        Policy.update(
        { last_reviewed: review.reviewed_date },
        { where: { id: review.policyId } }
      )
    }
});

/**
 * Organize navigation bar by groups
 */
const users = {
    name: 'Users',
    icon: 'User',
}
const associations = {
    name: 'Associations',
    icon: 'Link',
}
const resources = {
    name: 'Resources',
    icon: 'Component',
}
const assessments = {
    name: 'Assessments',
    icon: 'Edit',
}

/**
 * Create new review after save if status is overdue or complete
 */
Review.addHook('afterSave', async (review, options) => {
    if (review.dataValues.status === "Overdue" || review.dataValues.status === "Complete") {
        const nextReview = await Review.create({
            policyId: review.dataValues.policyId,
            specified_review_date: review.dataValues.next_review,
            review_interval: review.dataValues.review_interval
        });
    }
});
/**
 * Adding resources to Admin Bro
 */
const run = async () => {
    const adminBro = new AdminBro ({
        databases: [sequelize],
        resources: [
            {
                resource: User, 
                options: {
					parent: users,
					properties: {
                        name: {
                            isVisible: {
                                list: true,
                                filter: true, 
                                show: true, 
                                edit: true 
                            },
                            position: -1    //set position of a column in list => -1, 100 ...
                        },
                        email: {
                            isVisible: {
                                list: true,
                                filter: true,
                                show: true,
                                edit: true
                            }
                        },
                        encrypted_password: {
                            isVisible: {
                                list: false,
                                filter: false,
                                show: false,
                                edit: false
                            },
                            // type: 'richtext'
                        },
                        role: {
                            availableValues: [
                                { value: 'User', label: 'User' },
                                { value: 'Admin', label: 'Admin' }
                            ],
                        },
                        password: {
                            isVisible: {
                                list: false,
                                show: false,
                                edit: true,
                                filter: false
                            }
                        }
                    },
                    actions: {
                        new: {
                            isAccessible: isAdmin,
                            before: async (request) => {
                                console.log(request.payload);
                                if (request.payload.password){

                                request.payload = {
                                    ...request.payload,
                                    encrypted_password: await bcrypt.hash(request.payload.password, 10),
                                    }
                                }
                                return request
                            },
                            after: async (response) => {
                                console.log(response)
                                return response
                            }
                        },
                        edit: {
                            isAccessible: isAdmin,
                            before: async (request) => {
                            console.log(request.payload);
                            if (request.payload.password){

                                request.payload = {
                                ...request.payload,
                                encrypted_password: await bcrypt.hash(request.payload.password, 10),
                                }
                            }

                            return request
                            },
                        },
                        delete: {
                            isAccessible: isAdmin
                        },
                    }
			    }
            }, {
                resource: Standard, 
                options: {
                    parent: resources,
                    properties: {
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
                        },
                        standard: {
                            isTitle: true
                        }
                    }}
            }, {
                resource: Risk_Driver,
                options: {
                    parent: resources,
                    properties: {
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
                options: {
                    parent: resources,
                        properties: {
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
                options: {
                    parent: resources,
                        properties: {
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
                options: {
                    parent: resources,
                    properties: {
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
                        last_reviewed: {
                            isVisible: { list: true, show: true, new: false, edit: false }
                        },
                        version: {
                            isVisible: { list: true, show: true, new: false, edit: false }
                        }
                    }}
            }, {
                resource: Review,
                options: {
                    parent: assessments,
                    properties: {
                        reviewed_date: {
                            isVisible: { list: true, show: true, new: false, edit: true}
                        },
                        date_approved: {
                            isVisible: { list: true, show: true, new: false, edit: true}
                        },
                        next_review: {
                            isVisible: { list: true, show: true, new: false, edit: false}
                        },
                        status: {
                            isVisible: { list: true, show: true, new: false, edit: false}
                        },
                        review_interval: {
                            availableValues: [
                                { value: 36, label: 36 },
                                { value: 24, label: 24 },
                                { value: 12, label: 12 }
                            ]
                        }
                    }}
            }, {
                resource: Compliance_Assessment,
                options: { 
                    parent: assessments,
                    properties: {
                        policy: { 
                            availableValues: [
                                { value: 'Good', label: 'Good' },
                                { value: 'Satisfactory', label: 'Satisfactory' },
                                { value: 'Poor', label: 'Poor' },
                            ],
                            isVisible: { list: false, show: true, new: true, edit: true }
                        },
                        procedures: {
                            availableValues: [
                                { value: 'Good', label: 'Good' },
                                { value: 'Satisfactory', label: 'Satisfactory' },
                                { value: 'Poor', label: 'Poor' },
                            ],
                            isVisible: { list: false, show: true, new: true, edit: true }
                        },
                        data: {
                            availableValues: [
                                { value: 'Good', label: 'Good' },
                                { value: 'Satisfactory', label: 'Satisfactory' },
                                { value: 'Poor', label: 'Poor' },
                            ],
                            isVisible: { list: false, show: true, new: true, edit: true }
                        },
                        treatment_option: {
                            availableValues: [
                                { value: 'Avoid', label: 'Avoid' },
                                { value: 'Accept and reduce', label: 'Accept and reduce' },
                                { value: 'Reduce and monitor', label: 'Reduce and monitor' },
                            ],
                            isVisible: { list: true, show: true, new: false, edit: true },
                        },
                        risk_rating: {
                            isVisible: { list: true, show: true, new: false, edit: false },
                        },
                        residual_risk_rating: {
                            isVisible: { list: true, show: true, new: false, edit: false },
                        },
                        treatment_description: {
                            isVisible: { list: false, show: true, new: false, edit: true },
                        }
                    }}
            }, {
                resource: Standard_Policy,
                options: {
                    parent: associations
                }
            }, {
                resource: Standard_Risk_Driver,
                options: {
                    parent: associations
                }
            }, {
                resource: Standard_Assessment_Framework,
                options: {
                    parent: associations
                }
            }, {
                resource: Standard_Improvement_Framework,
                options: {
                    parent: associations
                }
            }
        ],
        rootPath: '/admin',
		logoutPath: '/admin/logout',
        branding: {
            companyName: 'HERMES III',
            logo: '/Murdoch_logo.png'
        },
    });

    const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
	authenticate: async (email, password) => {
    const user = await User.findOne({where:{email: email}});
    if (user){
		
      const MatchedEntry = await bcrypt.compare(password, user.encrypted_password);
	  if (MatchedEntry==true){
        return user; 
      }
	  else
	  {console.log('Entry denied');
		return false;}
    }
    return false
  },
  cookieName: process.env.ADMIN_COOKIE_NAME || 'adminbro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'somePassword',
},null,{
    resave: false,
    saveUninitialized: true,
})
    app.use(adminBro.options.rootPath, router)
    app.use(express.static('public'))
    app.listen(port, () => console.log(`AdminBro is under localhost:${port}/admin`))
};
run();
