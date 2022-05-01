import ToolModel from '../models/tools'

const toolRoute = (app) => {
    
    app.route('/tools/:id?')
        .get(async (req, res) => {
            const { id } = req.params
            const query = {};

            if (id) {
                query._id = id
            }

            try {

                const tools = await ToolModel.find(query)
                res.send({ tools })
                
            } catch (error) {
                res.status(400).send({ error: 'Failed to find tool' })
            }
        })
        .post(async (req, res) => {

            try {
                const tool = new ToolModel(req.body)
                await tool.save()

                res.status(201).send('OK')
            } catch (error) {
                res.send(error)   
            }
        })
        .put(async (req, res) => {
            const { id } = req.params

            if (!id) {
                return res.status(400).send({ error: 'A tool with this ID is missing.' })
            }

            try {
                const updatedTool = await ToolModel.findOneAndUpdate({ _id: id }, req.body, {
                    new: true,
                });

                console.log(updatedTool)

                if (updatedTool) {
                    return res.status(200).send('OK')
                }


                res.status(400).send({ error: 'Tool update failed' })

                
            } catch (error) {
                res.send(error)
            }
        })
        .delete(async (req, res) => {

            const { id } = req.params

            if (!id) {
                return res.status(400).send({ error: 'A tool with this ID is missing.' })
            }

            try {
                const deletedTool = await ToolModel.deleteOne({ _id: id })

                if (deletedTool.deletedCount) {
                    return res.send('OK')
                }

                res.status(400).send({ error: 'Tool delete failed' })

            } catch (error) {
                res.send(error)
            }
        })
}

module.exports = toolRoute