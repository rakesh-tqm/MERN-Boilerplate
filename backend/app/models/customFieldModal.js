
module.exports = (sequelize, Sequelize) => {
    const customField = sequelize.define("customField", {
        label: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        formType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        validationRules: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: [],
        },
        options: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: [],
        },
        idDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        }
    })

    return customField;
}
