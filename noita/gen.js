const LC_1 = document.getElementById("lc_1");
const LC_2 = document.getElementById("lc_2");
const LC_3 = document.getElementById("lc_3");
const AP_1 = document.getElementById("ap_1");
const AP_2 = document.getElementById("ap_2");
const AP_3 = document.getElementById("ap_3");
const SEND_BUTTON = document.getElementById("send-button");
const INPUT = document.getElementById("input");

const PREFIX = "https://noita.zatherz.eu:4921/noita?";

const MATERIAL_NAMES = {
	water: "Water",
	water_ice: "Chilly Water",
	water_swamp: "Swamp",
	oil: "Oil",
	alcohol: "Whiskey",
	swamp: "Swamp",
	mud: "Mud",
	blood: "Blood",
	blood_fungi: "Fungus (mat_blood_fungi)",
	blood_worm: "Worm Blood",
	radioactive_liquid: "Toxic Sludge",
	cement: "Cement",
	acid: "Acid",
	lava: "Lava",
	urine: "Urine",
	poison: "Glowing Liquid",
	magic_liquid_teleportation: "Teleportatium",
	magic_liquid_polymorph: "Polymorphine",
	magic_liquid_random_polymorph: "Chaotic Polymorphine",
	magic_liquid_berserk: "Berserkium",
	magic_liquid_charm: "Pheromone",
	magic_liquid_invisibility: "Invisiblium",
	sand: "Sand",
	bone: "Bone",
	soil: "Soil",
	honey: "Honey",
	slime: "Slime (mat_slime_pink)",
	snow: "Snow",
	rotten_meat: "Rotten Meat",
	wax: "Wax",
	gold: "Gold",
	silver: "Silver",
	copper: "Copper",
	brass: "Brass",
	diamond: "Diamond",
	coal: "Coal",
	gunpowder: "Gunpowder",
	gunpowder_explosive: "Gunpowder (mat_gunpowder_explosive)",
	grass: "Grass",
	fungi: "Fungus"
}

function name(mat) {
	let name_base = MATERIAL_NAMES[mat];
	if (!name_base.includes("(")) name_base += " (mat_" + mat + ")";
	return name_base;
}

SEND_BUTTON.addEventListener("click", function() {
	console.log("SEED: " + INPUT.value);
	let seed = INPUT.value;
	if (seed == null) seed = INPUT.value = "0";

	let req = new XMLHttpRequest();
	req.addEventListener("load", function() {
		console.log(this.responseText);

		if (this.responseText.includes("Forbidden")) alert("Please stop");

		var split = this.responseText.split(";");

		var lc = split[0].split(",");
		var ap = split[1].split(",");

		LC_1.innerText = name(lc[1]);
		LC_2.innerText = name(lc[2]);
		LC_3.innerText = name(lc[3]);

		AP_1.innerText = name(ap[1]);
		AP_2.innerText = name(ap[2]);
		AP_3.innerText = name(ap[3]);
	});
	req.open("GET", PREFIX + seed + "&hey_you_reading_this_you_will_find_literally_nothing_and_just_waste_your_time");
	req.send();
})
