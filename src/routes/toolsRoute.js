import PostModel from '../models/posts'

const postRoute = (app) => {
    
    app.route('/posts/:id?')
        .get(async (req, res) => {
            const { id } = req.params
            const query = {};

            if (id) {
                query._id = id
            }

            try {

                const posts = await PostModel.find(query)
                res.send({ posts })
                
            } catch (error) {
                res.status(400).send({ error: 'Failed to find post' })
            }
        })
        .post(async (req, res) => {

            try {
                const post = new PostModel(req.body)
                await post.save()

                res.status(201).send('OK')
            } catch (error) {
                res.send(error)   
            }
        })
        .put(async (req, res) => {
            const { id } = req.params

            if (!id) {
                return res.status(400).send({ error: 'A post with this ID is missing.' })
            }

            try {
                const updatedPost = await PostModel.findOneAndUpdate({ _id: id }, req.body, {
                    new: true,
                });

                console.log(updatedPost)

                if (updatedPost) {
                    return res.status(200).send('OK')
                }


                res.status(400).send({ error: 'Post update failed' })

                
            } catch (error) {
                res.send(error)
            }
        })
        .delete(async (req, res) => {

            const { id } = req.params

            if (!id) {
                return res.status(400).send({ error: 'A post with this ID is missing.' })
            }

            try {
                const deletedPost = await PostModel.deleteOne({ _id: id })

                if (deletedPost.deletedCount) {
                    return res.send('OK')
                }

                res.status(400).send({ error: 'Post delete failed' })

            } catch (error) {
                res.send(error)
            }
        })
}

module.exports = postRoute