
module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        additional_info: {
            type: Sequelize.JSON,
            allowNull: true,
        },
    })

    return users;
}
