const router = require('express').Router();
const { User, Comment, Blog } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        const blogdb = await Blog.findAll({
            attributes:['id', 'title','content','created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id','comment','postId','userId','created_at'],
                    include:{
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [['created_at','DESC']]
        })

        const posts = blogdb.map((post) => post.get({plain: true}));
        console.log(posts)
        res.render('homepage',{posts, loggedIn: req.session.loggedIn, username: req.session.username, userId: req.session.userId});
    }catch (err){
        res.status(500).json(err);
    }
});

router.get('/blogs/:id', withAuth, async (req,res) => {
    try{
        const blogdb = await Blog.findByPk({
            where: {id: req.session.id},
            attributes: ['id','comment','postId','userId','create_at'],
            include: [
                {
                    model: Comment,
                    attributes:['id','comment','postId','userId','created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
    
    });
    if(blogdb){
        const blog = blogdb.get({plain: true});
        console.log(blog);
        res.render('single-blog', {blog, loggedIn: req.session.loggedIn, username: req.session.username})
    }else{
        res.status(404).json({message: 'This Id has no post.'});
        return;
    }
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', (req,res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', async(req,res) => {
    res.render('signup');
})

module.exports = router; 