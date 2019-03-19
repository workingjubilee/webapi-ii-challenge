const express = require("express");

const Posts = require('../data/db.js');

const router = express.Router();

// ```js
// {
//   title: "The post title", // String, required
//   contents: "The post contents", // String, required
//   created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
// }

// | POST   | /api/posts     | Creates a post using the information sent inside the `request body`.                                                                                                        |
// | GET    | /api/posts     | Returns an array of all the post objects contained in the database.                                                                                                         |
// | GET    | /api/posts/:id | Returns the post object with the specified id.                                                                                                                              |
// | DELETE | /api/posts/:id | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement. |
// | PUT    | /api/posts/:id | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.      

// Crud
router.post('/', async (req, res) => {
  const { title, contents } = req.body;
  
  if (title && contents) {

    try {
      const post = await Posts.insert({ title, contents });
      res.status(201).json(post);
    } catch(error) {
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      });
    }

  } else {
    res.status(400).json({
     errorMessage: "Please provide title and contents for the post."
   })
  }
});


// cRud
router.get('/', async (req, res) => {

  try {
    const posts = await Posts.find();

    res.status(200).json(posts);

  } catch(error) {
    res.status(500).json({ 
      error: "The posts could not be retrieved."
    });
  }
});

// cRud
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const post = await Posts.findById(id);

    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        error: "The post could not be found."
      });
    }

  } catch(error) {
    res.status(500).json({
      error: "Error retrieving post."
    });
  }
});


// crUd
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  
  if (title && contents) {

    try {
      const post = await Posts.update(id, { title, contents });

      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }

    } catch(error) {
      res.status(500).json({
        error: "The post information could not be modified."
      })
    }

  } else {
    res.status(400).json({
     errorMessage: "Please provide title and contents for the post."
   })
  }
});

// cruD
router.delete('/');

module.exports = router;