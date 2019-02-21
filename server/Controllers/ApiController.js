const axios = require('axios');

class ApiController
{
    constructor() {}

    async getGaroonEvents(request, response)
    {
        try {
            const user = request.body.user;
            const password = request.body.password;
            const company = request.body.company;
            const auth = Buffer.from(`${user}:${password}`).toString("base64");
            const today = new Date();
            const tomorrow = new Date(Date.now() + (24*60*60*1000));
            const start = today.toISOString();
            const end = tomorrow.toISOString();
            const rangeStart = start.slice(0, start.lastIndexOf(".")) + "Z";
            const rangeEnd = end.slice(0, end.lastIndexOf(".")) + "Z";
            const data = {
                url: `https://${company}.cybozu.com/g/api/v1/schedule/events`,
                headers: {"X-Cybozu-Authorization": auth},
                params: {rangeStart: rangeStart, rangeEnd: rangeEnd},
            };
            const results = await axios.request(data);
            const events = results.data.events;
            console.log(events);
            response.json({success: true, events: events});
        } catch (error) {
            const status = error.response.status;
            const statusText = error.response.statusText;
            response.json({success: false, status: status, statusText: statusText});
        }
    }
}

module.exports = new ApiController();