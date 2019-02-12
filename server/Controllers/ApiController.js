const axios = require('axios');

class ApiController
{
    constructor() {}

    async getGaroonEvents(request, response)
    {
        try {
            const user = request.body.user;
            const password = request.body.password;
            const auth = Buffer.from(`${user}:${password}`).toString("base64");
            const data = {
                url: "https://bglen.cybozu.com/g/api/v1/schedule/events",
                headers: {"X-Cybozu-Authorization": auth},
            };
            const results = await axios.request(data);
            const events = results.data.events;
            response.json({success: true, events: events});
        } catch (error) {
            response.json(error.response.data);
        }
    }
}

module.exports = new ApiController();