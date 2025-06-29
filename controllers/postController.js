const connection = require(`../data/db`);

const index = (req, res) => {

    const sql = `SELECT * FROM posts`;

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: `Database query failed` });
        res.json(results);
    });

    // const filterTag = req.query.tags;

    // let filteredPosts = posts;

    // if (filterTag) {
    //     filteredPosts = filteredPosts.filter(post => post.tags.includes(filterTag));
    // }

    // res.json(filteredPosts);

};

const show = (req, res) => {

    const postId = req.params.id;
    const sql = 
        `
            SELECT 
                posts.id AS post_id,
                posts.title,
                posts.content, 
                posts.image,
                tags.id AS tag_id,
                tags.label 
            FROM posts 

            INNER JOIN post_tag
            ON posts.id = post_tag.post_id

            INNER JOIN tags
            ON post_tag.tag_id = tags.id
            
            WHERE posts.id = ?
        `;

    connection.query(sql, [postId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: `Database query Failed` })
        };
        if(results.length === 0) return res.status(404).json({ error: `Pizza not found` });
        
        const row = results[0];
        const tags = [];

        results.forEach(r => {
            if (r.tag_id && r.label) {
                tags.push(r.label);
            }
        })

        const post = {
            post_id: row.post_id,
            title: row.title,
            content: row.content,
            image: row.image,
            tags: tags.join(`, `)
        };

        res.json(post);
    });


    // const id = parseInt(req.params.id);
    // const post = posts.find(p => p.id === id);
    // if(!post) {
    //     const error = new Error(`Post Not Found`);
    //     error.statusCode = 404;
    //     throw error;
    // }
};

const store = (req, res) => {
    // const { title, content, image, tags } = req.body;

    // let malformedElements = [];

    // if(!title || typeof title !== `string` || title.length < 3) {
    //     malformedElements.push(`title`);
    // }
    // if(!content || typeof content !== `string` || content.length < 3) {
    //     malformedElements.push(`content`);
    // }
    // if(!image || typeof image !== `string` || image.length < 3) {
    //     malformedElements.push(`image`);
    // }
    // if(!Array.isArray(tags)) {
    //     malformedElements.push(`tags`);
    // }

    // if(malformedElements.length) {
    //     const error = new Error(`Request is malformed`);
    //     error.statusCode = 400;
    //     error.data = { malformedElements };
    //     throw error;
    // };

    // let maxId = 0;

    // for (const post of posts) {
    //     if(post.id > maxId) maxId = post.id;
    // }
    // const postId = maxId + 1;

    // const newPost = { 
    //     id: postId, 
    //     title, 
    //     content, 
    //     image, 
    //     tags
    // };

    // console.log(newPost);

    // posts.push(newPost);
    // res.status(201).json(newPost);
};

const update = (req, res) => {
    // const id = parseInt(req.params.id);
    // const originalPost = posts.find(originalPost => originalPost.id === id);

    // if(!originalPost) {
    //     const error = new Error(`Post Not Found`);
    //     error.statusCode = 404;
    //     throw error;
    // }

    // const updatedPost = { title, content, image, tags } = req.body;

    // let malformedElements = [];

    // if(!title || typeof title !== `string` || title.length < 3) {
    //     malformedElements.push(`title`);
    // }
    // if(!content || typeof content !== `string` || content.length < 3) {
    //     malformedElements.push(`content`);
    // }
    // if(!image || typeof image !== `string` || image.length < 3) {
    //     malformedElements.push(`image`);
    // }
    // if(!Array.isArray(tags)) {
    //     malformedElements.push(`tags`);
    // }

    // if(malformedElements.length) {
    //     const error = new Error(`Request is malformed`);
    //     error.statusCode = 400;
    //     error.data = { malformedElements };
    //     throw error;
    // };

    // if(title) originalPost.title = title;
    // if(content) originalPost.content = content;
    // if(image) originalPost.image = image;
    // if(tags) originalPost.tags = tags;

    // const postIndex = posts.indexOf(originalPost);
    // posts.splice(postIndex, 1, updatedPost);

    // res.json(updatedPost);
};

const modify = (req, res) => {
    // const id = parseInt(req.params.id);
    // const post = posts.find(p => p.id === id);

    // if(!post) {
    //     const error = new Error(`Post Not Found`);
    //     error.statusCode = 404;
    //     throw error;
    // }

    // const { title, content, image, tags } = req.body;

    // post.title = title ?? post.title;
    // post.content = content ?? post.content;
    // post.image = image ?? post.image;
    // post.tags = tags ?? post.tags;

    // res.json(post);
}

const destroy = (req, res) => {

    const postId = req.params.id;

    connection.query(`DELETE FROM posts WHERE id = ?`, [postId], (err, results) => {
        if(err) return res.status(500).json({ error: `Failed to delete post` });
        res.sendStatus(204);
    })




    // const id = parseInt(req.params.id);

    // const post = posts.find(p => p.id === id);

    // if(!post) {
    //     const error = new Error(`Post Not Found`);
    //     error.statusCode = 404;
    //     throw error;
    // }

    // const index = posts.indexOf(post);
    // posts.splice(index, 1);

    // res.sendStatus(204);
};

module.exports = { index, show, store, update, modify, destroy };