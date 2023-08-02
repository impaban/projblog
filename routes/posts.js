const router = require('express').Router();
const users = require('../models/user');
const post = require('../models/post');
const bcrypt = require('bcrypt');

/*/ create post
router.post('/:id', async (req, res) => {
    const newPost=new post(req.body);
    try{
     const savepost = await newPost.save();
     res.sendStatus(200).json(savepost);
    }catch(err){
        res.status(500).json(err);
    }
});

// update post
router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
    
});
//delete post 
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await post.delete();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

//get post
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
*/
// create post (protected route - requires JWT authentication)
router.post('/:id', validateToken, async (req, res) => {
  const newPost = new post(req.body);
  try {
      const savepost = await newPost.save();
      res.sendStatus(200).json(savepost);
  } catch (err) {
      res.status(500).json(err);
  }
});

// update post (protected route - requires JWT authentication)
router.put("/:id", validateToken, async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.user.username) {
          try {
              const updatedPost = await Post.findByIdAndUpdate(
                  req.params.id,
                  {
                      $set: req.body,
                  },
                  { new: true }
              );
              res.status(200).json(updatedPost);
          } catch (err) {
              res.status(500).json(err);
          }
      } else {
          res.status(401).json("You can update only your post!");
      }
  } catch (err) {
      res.status(500).json(err);
  }
});

// delete post (protected route - requires JWT authentication)
router.delete("/:id", validateToken, async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.user.username) {
          try {
              await post.delete();
              res.status(200).json("Post has been deleted...");
          } catch (err) {
              res.status(500).json(err);
          }
      } else {
          res.status(401).json("You can delete only your post!");
      }
  } catch (err) {
      res.status(500).json(err);
  }
});

// get post (protected route - requires JWT authentication)
router.get("/:id", validateToken, async (req, res) => {
  try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
  } catch (err) {
      res.status(500).json(err);
  }
});

