const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketFood = sequelize.define('basket_food', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Food = sequelize.define('food', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const FoodInfo = sequelize.define('food_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketFood)
BasketFood.belongsTo(Basket)

Type.hasMany(Food)
Food.belongsTo(Type)

Food.hasMany(BasketFood)
BasketFood.belongsTo(Food)

Food.hasMany(FoodInfo, {as: 'info'})
FoodInfo.belongsTo(Food)

module.exports = {
    User,
    Basket,
    BasketFood,
    Food,
    Type,
    FoodInfo
}
