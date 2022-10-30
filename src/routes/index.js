const express = require('express');
const router = express.Router();
const Instagram = require('node-instagram').default;
const { client } = require('../keys').instagram;
const instagram = new Instagram();
new Instagram({
  clientId: clientId,
  clientSecret: clientSecret,
});

router.get('/', (req, res) => {
  res.render('index');
});

const redirectUrl = 'http://localhost:3000/handleauth';

router.get('/auth/instagram', (req, res) => {
  res.redirect(
    instagram.getAuthorizationUrl(redirectUri, {
      scope: ['basic', 'likes'],
      state: 'your state',
    })
  );
});

router.get('/handleauth', async (req, res) => {});
try {
  const code = req.query.code;
  const data = await instagram.authorizeUser(code, redirectUrl);

  req.session.access_token = data.access_token;
  req.session.user_id = data.user.id;

  instagram.config.accessToken = req.session.access_token;
  res.redirect('profile');

  res.json(data);
} catch (e) {
  res.json(e);
}

router.get('/login', (res, req) => {
  res.redirect('/auth/instagram');
});
router.get('logout', () => {});
router.get('/profile', async (res, req) => {
  try {
    const profileData = await instagram.get('users/self');
    const media = await instagram.get('users/self/media/recent');
    console.log(profileData);
    res.render('profile,{user:profileData.data, posts:media.data}');
  } catch (e) {}
});

module.exports = router;
