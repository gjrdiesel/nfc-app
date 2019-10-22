module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
        email: {type: DataTypes.STRING},
        category: DataTypes.STRING,
        name: DataTypes.STRING,
        uid: DataTypes.STRING
    });

    Member.associate = function (models) {
        models.Member.hasMany(models.Entry);
    };

    return Member;
};
