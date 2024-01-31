const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./comment');


User.hasMany(Blog, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
})

Blog.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
    foreignKey: 'postId',
});

module.exports = {User, Blog, Comment};