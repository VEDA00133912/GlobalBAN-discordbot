const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ungrobalban')
        .setDescription('指定されたユーザーを参加しているサーバーからBAN解除します。')
        .addUserOption(option => option.setName('target').setDescription('BAN解除するユーザーを選択してください。').setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id === interaction.options.getMember('target').id) {
            return interaction.reply({ content: '自分のBANを解除することはできません。', ephemeral: true });
        }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: 'あなたはコマンドを実行する権限がありません。', ephemeral: true });
        }
        await interaction.deferReply({ ephemeral: true });  

        const target = interaction.options.getMember('target'); 
        const guildsUnbannedFrom = [];
   　   const failedGuilds = [];

      try {
        const unbanPromises = interaction.client.guilds.cache.map(async (guild) => {
            try {
                await guild.members.unban(target); 
                guildsUnbannedFrom.push(guild.name);
            } catch (error) {
                console.error(`${guild.name}でBAN解除に失敗`);
                failedGuilds.push(guild.name);
            }
        });

            await Promise.all(unbanPromises);

            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('UngrobalBan 実行結果')
                .setDescription(`${target.toString()} が以下のサーバーからBAN解除されました`)
                .addFields({ name:'BAN解除されたサーバー', value: guildsUnbannedFrom.join('\n') || 'なし'},
                          { name: 'BAN解除に失敗したサーバー', value: failedGuilds.join('\n')|| 'なし' });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Error during execution:', error);
            await interaction.editReply('コマンドの実行中にエラーが発生しました。');
        }
    },
};
