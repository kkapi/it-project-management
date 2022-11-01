const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, required: true},
    password: {type: DataTypes.STRING, required: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
    isBlocked: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Token = sequelize.define('token', {    
    refreshToken: {type: DataTypes.STRING, required: true},    
})

const UserInfo = sequelize.define('user_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},    
    name: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    final_price: {type: DataTypes.INTEGER},
    isActive: {type: DataTypes.BOOLEAN, defaultValue: true}
})

const BasketFood = sequelize.define('basket_food', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER},    
})

const Food = sequelize.define('food', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, required: true},
    price: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, required: true}
})

const FoodInfo = sequelize.define('food_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, required: true},
    description: {type: DataTypes.STRING, required: true}
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE}, 
    registration_time: {type: DataTypes.TIME},  
    status: {type: DataTypes.STRING},
    pay_method: {type: DataTypes.STRING},
    wishes: {type: DataTypes.STRING},
})



User.hasOne(Token)
Token.belongsTo(User)

User.hasOne(UserInfo)
UserInfo.belongsTo(User)

User.hasMany(Basket)
Basket.belongsTo(User)

Basket.hasOne(Order)
Order.belongsTo(Basket)

Basket.hasMany(BasketFood)
BasketFood.belongsTo(Basket)

Food.hasMany(BasketFood)
BasketFood.belongsTo(Food)

Type.hasMany(Food)
Food.belongsTo(Type)

Food.hasMany(FoodInfo)
FoodInfo.belongsTo(Food)

module.exports = {
    User,
    Token,
    UserInfo,
    Basket,
    BasketFood,
    Food,
    Type,
    FoodInfo,
    Order
}