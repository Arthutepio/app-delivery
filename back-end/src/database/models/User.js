const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {  type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: "users",
    underscored: true
  });

  User.associate = ({Sale}) => {
    User.hasMany(Sale, {
      foreignKey: 'id',
      as: 'sales'
    })
  }

  return User;
};

module.exports = User;