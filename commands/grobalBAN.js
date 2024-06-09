const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('grobalban')
        .setDescription('指定されたユーザーを参加しているサーバーからBANします。')
        .addUserOption(option => option.setName('target').setDescription('BANするユーザーを選択してください。').setRequired(true)),
    async execute(interaction) {
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return interaction.reply({ content: 'あなたはコマンドを実行する権限がありません。', ephemeral: true });
      }
        await interaction.deferReply({ ephemeral: true });  

        const target = interaction.options.getMember('target'); 
        const guildsBannedFrom = [];
   　   const failedGuilds = [];

      try {
        const banPromises = interaction.client.guilds.cache.map(async (guild) => {
            try {
                await guild.members.ban(target); 
                guildsBannedFrom.push(guild.name);
            } catch (error) {
                console.error(`${guild.name}でBANに失敗`);
                failedGuilds.push(guild.name);
            }
        });

            await Promise.all(banPromises);

            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('GrobalBan 実行結果')
                .setDescription(`${target.toString()} が以下のサーバーからBANされました`)
                .addFields({ name:'BANされたサーバー', value: guildsBannedFrom.join('\n') || 'なし'},
                          { name: 'BANに失敗したサーバー', value: failedGuilds.join('\n')|| 'なし' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Error during execution:', error);
            await interaction.editReply('コマンドの実行中にエラーが発生しました。');
        }
    },
};
