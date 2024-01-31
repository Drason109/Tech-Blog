const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
    console.log(req);
   try{

        const UserData = await User.create({
            username: req.body.username,
            password: req.body.password

        });
        console.log(UserData);
        req.session.save(() =>{
            req.session.userId = UserData.id;
            req.session.username = UserData.username;
            req.session.loggedIn = true;
            res.status(201).json({message: `Account created for ${UserData.username}`});
   });
    }catch (err) {
    res.status(400).json(err);
   }
});

//
router.post('/login', async (req,res) => {
   try{
    const UserData = await User.findOne({
        where: {username: req.body.username}
    });
    if(!UserData){
        res.status(400).json({message: `User id ${req.params.id} is not valid.`});
        return;
    }
    const pwValidated = await UserData.checkPassword(req.body.password);
    if(!pwValidated){
        res.status(400).json({message: "Incorrect password!"});
        return;
    }
    req.session.save(() => {
        req.session.userId = UserData.id;
        req.session.username = UserData.username;
        req.session.loggedIn = true;
        res.status(200).json({message: "You are logged In!"});
    });
   }catch (err){
    res.status(400).json(err);
   }
});


router.post('/logout', withAuth, async(req, res) => {
    try{
        if(req.session.loggedIn){
            const UserData = await req.session.destroy(() => {
                res.status(204).end();
            });
        }else{
            res.status(404).end();
        }
    }catch{
        res.status(400).end();
    }
});


module.exports = router;