module.exports = (sequelize, DataTypes) => {
    const Entry = sequelize.define('Entry', {
        category: DataTypes.STRING
    });

    Entry.associate = function (models) {
        models.Entry.belongsTo(models.Member, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Entry;
};
