var room = require('pixel_combats/room');

function set_inventory() {
    var context = room.Inventory.GetContext();
    context.Main.Value = false;
    context.Secondary.Value = false;
    context.Melee.Value = false;
    context.Explosive.Value = false;
    context.Build.Value = false;
}

function set_build_settings() {
    var context = room.Build.GetContext();
    context.Pipette.Value = true;
    context.BalkLenChange.Value = true;
    context.SetSkyEnable.Value = true;
    context.GenMapEnable.Value = true;
    context.ChangeCameraPointsEnable.Value = true;
    context.QuadChangeEnable.Value = true;
    context.BuildModeEnable.Value = true;
    context.CollapseChangeEnable.Value = true;
    context.RenameMapEnable.Value = true;
    context.ChangeMapAuthorsEnable.Value = true;
    context.LoadMapEnable.Value = true;
    context.ChangeSpawnsEnable.Value = true;
    context.BlocksSet.Value = room.BuildBlocksSet.AllClear;
}

function apply_room_options() {
    var gameModeParameters = room.GameMode.Parameters;
    var buildContext = room.Build.GetContext();
    buildContext.FloodFill.Value = gameModeParameters.GetBool("FloodFill");
    buildContext.FillQuad.Value = gameModeParameters.GetBool("FillQuad");
    buildContext.RemoveQuad.Value = gameModeParameters.GetBool("RemoveQuad");
    buildContext.FlyEnable.Value = gameModeParameters.GetBool("Fly");
    room.Damage.GetContext().DamageOut.Value = gameModeParameters.GetBool("Damage");
    room.BreackGraph.OnlyPlayerBlocksDmg = gameModeParameters.GetBool("PartialDesruction");
    room.BreackGraph.WeakBlocks = gameModeParameters.GetBool("LoosenBlocks");
}

room.GameMode.OnStart.Add(function() {
    room.Properties.GetContext().GameModeName.Value = "GameModes/Peace";
    room.Ui.GetContext().Hint.Value = "Hint/BuildBase";
    room.Ui.GetContext().QuadsCount.Value = true;
    room.BreackGraph.BreackAll = true;
    room.Spawns.GetContext().RespawnTime.Value = 0;
    
    set_build_settings();
    set_inventory();
    apply_room_options();

    var redTeam = room.Teams.Get("Red");
    var blueTeam = room.Teams.Get("Blue");
    if (redTeam != null) redTeam.AutoBalance.Value = false;
    if (blueTeam != null) blueTeam.AutoBalance.Value = false;
});

room.Teams.OnAddTeam.Add(function (team) {
    if (team.id === "Blue") {
        team.Inventory.Main.Value = false;
        team.Inventory.Secondary.Value = false;
        team.Inventory.Melee.Value = false;
        team.Inventory.Explosive.Value = false;
        team.Inventory.Build.Value = false;
        team.Inventory.BuildInfinity.Value = false;
    }
    else {
        team.Inventory.Melee.Value = true;
        team.Inventory.Build.Value = true;
        team.Inventory.BuildInfinity.Value = true;
    }
});

room.Players.OnPlayerSpawn.Add(function (player) {
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

    if (player.Team != null && player.Team.id === "Blue") {
        player.Build.Fly.Value = false;
        player.Inventory.Main.Value = false;
        player.Inventory.Secondary.Value = false;
        player.Inventory.Melee.Value = false;
        player.Inventory.Explosive.Value = false;
        player.Inventory.Build.Value = false;
        player.Damage.FriendlyFire.Value = false;
    }
    
    if (player.Team != null && player.Team.id === "Red") {
        player.Damage.DamageOut.Value = false;
    }
});

room.Teams.OnRequestJoinTeam.Add(function (player, team) {
    if (player.Id === "EBBD6F896A740312") {
        team.Add(player);
        return;
    }
    var targetTeam = room.Teams.Get("Red");
    if (targetTeam != null) {
        targetTeam.Add(player);
    }
});

room.Teams.OnPlayerChangeTeam.Add(function (player) { player.Spawns.Spawn(); });
