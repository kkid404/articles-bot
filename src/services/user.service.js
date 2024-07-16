const User = require('../models/user.model')

const UserService = {
    
    // добавление пользователя
    async addUSer(userData) {
        const user = new User(userData)
        await user.save()
        return user;
    },

    // получение пользователя по telegram id
    async getByIdUser(tgId) {
        return await User.findOne({ tg_id: tgId })
    },

    // получение статьи по id
    async getById(id) {
        return await User.findOne({ _id: id })
    },

    // изменение пользователя
    async updateUser(tgId, updateData) {
        return await User.findOneAndUpdate({ tg_id: tgId }, updateData, { new: true })
    },

    // удаление пользователя
    async deleteUser(tgId) {
        return await User.findOneAndDelete({ tg_id: tgId })
    },

    // проверка на админа
    async isAdmin(tgId) {
        const user = await User.findOne({ tg_id: tgId })
        return user && user.role == 'admin'
    }

}

module.exports = UserService;
