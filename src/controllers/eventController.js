require("dotenv").config(); 
const axios = require("axios");

const Event = require('../models/event');
const Team = require('../models/team');
const Player = require('../models/player');

// Get NFL schedule with odds
// Call getWeeklyEventsNFL every hour or some periods: We call every hour.
const fetchEventMapping = async () => {
    return axios.get(`${process.env.ODDS_API_BASEURL}/${process.env.LOCALE}/sport_events/mappings.json?api_key=${process.env.API_KEY}`)
        .then(response => {

            const mappings = response.data.mappings;       
            return mappings;
        })
        .catch(error => {
            console.log('Error retrieving Event Mapping:' + error);
        });
}

const fetchWeeklyEventsNFL = async () => {
    return axios.get(`${process.env.ODDS_API_BASEURL}/${process.env.LOCALE}/competitions/${NFL_COMPETITION_ID}/schedules.json?api_key=${process.env.ODD_API_KEY}`)
        .then(response => {
            const events = response.data.schedules;

            return events;
        })
        .catch(error => {
            console.log('Error retrieving NFL Events:' + error);
        });
}

const fetchEventPlayerProps = async (sport_event_id) => {
    return axios.get(`${process.env.ODDS_API_BASEURL}/${process.env.LOCALE}/sport_events/${sport_event_id}/players_props.json?api_key=${process.env.ODD_API_KEY}`)
        .then(response => {
            const events = response.data.sport_event_players_props.players_props;

            return events;
        })
        .catch(error => {
            console.log('Error retrieving Sports event player props:' + error);
        });
}

const getWeeklyEventsNFL = async () => {
    try {
        const mappings = await fetchEventMapping();
        if (!mappings || !Array.isArray(mappings)) {
            console.log("no mappings");
            return;
        }
        let events = await fetchWeeklyEventsNFL();

        let now = new Date();
        events = events.filter(item => new Date(item.sport_event.start_time) > now);
        console.log("NFL events count =" + events.length);
        for (const event of events) {

            let myEvent = new Event({
                id: event.sport_event.id,
                startTime: event.sport_event.start_time,
            });
            let alias = [];
            for (const competitor of event.sport_event.competitors) {
                const team = await Team.findOne({
                    srId: competitor.id
                });
                competitor.teamId = team._id;
                myEvent.competitors.push(competitor);
                alias.push(team.alias);
            }
            myEvent.name = alias[0] + " vs " + alias[1];

            const mapping = mappings.find(item => item.id == event.sport_event.id);
            if (mapping)
                myEvent.matchId = mapping.external_id;


            const playerProps = await fetchEventPlayerProps(event.sport_event.id);
            if (!playerProps)
                continue;
            const existingEvent = await Event.findOne({id: event.sport_event.id });
            if (existingEvent) {
                myEvent = existingEvent;
                existingEvent.startTime = myEvent.startTime;
                await existingEvent.save();
            } else {
                await myEvent.save();
                console.log('NFL New event inserted! _id=' + myEvent.id);
            }
            if ('markets' in playerProps)
                continue;
            for (const playerProp of playerProps) {
                if (!playerProp.player.id)
                    continue;
                const player = await Player.findOne({
                    srId: playerProp.player.id,
                });
                if (!player)
                    continue;
                for (const market of playerProp.markets) {
                    const prop = await Prop.findOne({
                        srId: market.id,
                    });
                    if (!player || !prop) continue;
                    const index = player.odds.findIndex((odd) => String(odd.id) == String(prop._id));
                    let minOdds = 100, minIndex = -1, total = -1;
                    // There are several bookmarkers and our client wants only FanDuel odds.
                    let book = market.books.find(item => item.name == "FanDuel");
                    if (book) {
                        let outcomes = book.outcomes;
                        let odd1 = Math.abs(parseInt(outcomes[0].odds_american));
                        let odd2 = Math.abs(parseInt(outcomes[1].odds_american));
                        minOdds = Math.abs(odd1 - odd2);
                        total = outcomes[0].total;
                        console.log(odd1);
                        console.log(odd2);
                    }
                  
                    if (minOdds <= 30) {
                        console.log(playerProp.player.name);
                        if (index !== -1) {
                            player.odds[index].value = total;
                            player.odds[index].event = myEvent._id;
                        } else {
                            player.odds.push({
                                id: prop._id,
                                value: total,
                                event: myEvent._id
                            });
                        }
                    } else if (index != -1) {
                        player.odds.splice(index, 1);
                    }
                }
                await player.save();
            }


        }
        console.log("Get NFL Events and update finished at " + new Date().toString());
    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    fetchWeeklyEventsNFL,
    getWeeklyEventsNFL
}