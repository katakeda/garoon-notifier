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
            const today = new Date();
            const start = today.toISOString();
            const rangeStart = start.slice(0, start.lastIndexOf(".")) + "Z";
            const data = {
                url: "https://bglen.cybozu.com/g/api/v1/schedule/events",
                headers: {"X-Cybozu-Authorization": auth},
                params: {rangeStart: rangeStart},
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