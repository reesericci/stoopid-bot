const Discord = require('discord.js');
const client = new Discord.Client();
const timer = ms => new Promise( res => setTimeout(res, ms));


client.on('ready', () => {
  console.log('Bot is Running');
  client.user.setActivity('stoopid.xyz - /help', ({type: "PLAYING"}))
  // Define slash commands
  client.api.applications(client.user.id).commands.post({data: {
      "options": [
        {
          "type": 6,
          "name": "user",
          "description": "Do you want to DM spam a user?",
          "default": false,
          "required": false
        },
        {
          "type": 7,
          "name": "channel",
          "description": "Channel to DM Spam",
          "default": false,
          "required": false
        }
      ],
      "name": "spam",
      "description": "dog water lmao"
  }})
  client.api.applications(client.user.id).commands.post({data: {
    "name": "help",
    "description": "Learn the ins and outs of Stoopid Bot"
  }})
});

client.on('message', message => {
  // only reply to messages from a server
  if (!message.guild) return;
});

// Recieve interactions
client.ws.on('INTERACTION_CREATE', async interaction => {
    if (interaction.data.name == "spam") {
      if (Array.isArray(interaction.data.options) && interaction.data.options.length === 2) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: "Too many options",
              flags: 64
            },
          }
        })
        return;
      }
	    if (!interaction.data.options) {
        console.log(interaction.data.options)
        client.api.interactions(interaction.id, interaction.token).callback.post({
          type: 1,
          data: {
            type: 4,
            data: {
              content: "@everyone dog water lmao"
            },
          }
        })
        let i = 0;
        while (i < 14) {
          new Discord.WebhookClient(client.user.id, interaction.token).send('@everyone dog water lmao')
          i++;
          timer(300).then();	
        }
      }
      else {
        if(interaction.data.options[0].name == "user") {
        client.api.interactions(interaction.id, interaction.token).callback.post(
          {
            data: {
              type: 5
            },
          })
	      const user = await client.users.fetch(interaction.data.options[0].value)
	      let i = 0;
        while (i < 15) {
          user.send(user.toString() + ' dog water lmao')
	        i++;
	        timer(300).then();
        }
        client.api.webhooks(client.user.id, interaction.token).messages("@original").patch({
          data: {
            content: "successfully DM spammed " + user.toString(),
          }
        })
       } else if (interaction.data.options[0].name == "channel") {
          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 5,
              data: {
                flags: 64
              }
            }
          })
          const channel = await client.channels.fetch(interaction.data.options[0].value)
          let i = 0;
          while (i < 15) {
            channel.send('@everyone dog water lmao')
            i++;
            timer(300).then();
          }
          client.api.webhooks(client.user.id, interaction.token).messages("@original").patch({
            data: {
              content: "successfully spammed in " + channel.toString(),
            }
          })
        }
      }
    }

   if (interaction.data.name == "help") {
     client.api.interactions(interaction.id, interaction.token).callback.post({
	      type: 1,
        data: {
          type: 4,
          data: {
            embeds: [
              {
                title: "Help",
                color: "16711680",
                type: "rich",
                description: "Watch the video to see how Stoopid Bot works!\nhttps://youtu.be/S02BHmWPZNs",
                footer: {
                    text: "Engaged via slash command"
                },
              }
            ],	
          },
        }
      })
    }
})
client.login(process.env.BOT_TOKEN);
