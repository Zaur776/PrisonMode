import { GameMode, Teams, Players } from 'pixel_combats/room';

GameMode.OnStart.Add(function() {
    const redTeam = Teams.Get("Red");
    const blueTeam = Teams.Get("Blue");
    if (redTeam != null) redTeam.AutoBalance.Value = false;
    if (blueTeam != null) blueTeam.AutoBalance.Value = false;
});

Teams.OnAddTeam.Add(function (team) {
    if (team.Id === "Blue") {
        team.Inventory.Main.Value = false;
        team.Inventory.Secondary.Value = false;
        team.Inventory.Melee.Value = false;
        team.Inventory.Explosive.Value = false;
        team.Inventory.Build.Value = false;
        team.Inventory.BuildInfinity.Value = false;
    }
    else {
        team.Inventory.Main.Value = false;
        team.Inventory.Secondary.Value = false;
        team.Inventory.Melee.Value = true;
        team.Inventory.Build.Value = false;
    }
});

Players.OnPlayerSpawn.Add(function (player) {
    if (player.Id === "EBBD6F896A740312") {
        player.Build.Fly.Value = true;
        player.Inventory.Main.Value = true;
        player.Inventory.Secondary.Value = true;
        player.Inventory.Melee.Value = true;
        player.Inventory.Explosive.Value = true;
        player.Inventory.Build.Value = true;
        player.Damage.FriendlyFire.Value = true;
        player.Damage.DamageOut.Value = true;
        return;
    }

    if (player.Team != null && player.Team.Id === "Blue") {
        player.Build.Fly.Value = false;
        player.Inventory.Main.Value = false;
        player.Inventory.Secondary.Value = false;
        player.Inventory.Melee.Value = false;
        player.Inventory.Explosive.Value = false;
        player.Inventory.Build.Value = false;
        player.Damage.FriendlyFire.Value = false;
        player.Damage.DamageOut.Value = true;
    }
    
    if (player.Team != null && player.Team.Id === "Red") {
        player.Build.Fly.Value = false;
        player.Inventory.Main.Value = false;
        player.Inventory.Secondary.Value = false;
        player.Inventory.Melee.Value = true;
        player.Inventory.Explosive.Value = false;
        player.Inventory.Build.Value = false;
        player.Damage.DamageOut.Value = false;
    }
});

Teams.OnRequestJoinTeam.Add(function (player, team) {
    if (player.Id === "EBBD6F896A740312") {
        team.Add(player);
        return;
    }
    const targetTeam = Teams.Get("Red");
    if (targetTeam != null) {
        targetTeam.Add(player);
    }
});

Teams.OnPlayerChangeTeam.Add(function (player) { player.Spawns.Spawn(); });
