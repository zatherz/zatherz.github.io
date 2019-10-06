const LC_1 = document.getElementById("lc_1");
const LC_2 = document.getElementById("lc_2");
const LC_3 = document.getElementById("lc_3");
const LC_PROB  = document.getElementById("lc_prob");
const AP_1 = document.getElementById("ap_1");
const AP_2 = document.getElementById("ap_2");
const AP_3 = document.getElementById("ap_3");
const AP_PROB  = document.getElementById("ap_prob");
const SEND_BUTTON = document.getElementById("send-button");
const INPUT = document.getElementById("input");
const HTTPS_WARN = document.getElementById("https-warn")
const CACHE_WARN = document.getElementById("cache-warn")
const PERMALINK = document.getElementById("permalink")
const COPY_BUTTON = document.getElementById("copy")
const PREFIX = "http://94.172.33.134:4921/noita?";

const URL_PARAMS = new URLSearchParams(window.location.search);
const SEED_PARAM = URL_PARAMS.get('seed');

CACHE_WARN.style.display = "none";

let cur_seed = SEED_PARAM;

INPUT.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) SEND_BUTTON.click();
});

if (window.location.href.startsWith("https:")) {
	HTTPS_WARN.style.display = "block";
}

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
	reqSeed(seed);
})

function reqSeed(seed) {
	cur_seed = seed;
	setPermalink(seed);
	let req = new XMLHttpRequest();
	req.addEventListener("load", function() {
		console.log(this.responseText);

		if (this.responseText.includes("Forbidden")) alert("Please stop");

		var split = this.responseText.split(";");

		var lc = split[0].split(",");
		var ap = split[1].split(",");

		LC_PROB.innerText = lc[1];
		LC_1.innerText = name(lc[2]);
		LC_2.innerText = name(lc[3]);
		LC_3.innerText = name(lc[4]);

		AP_PROB.innerText = ap[1];
		AP_1.innerText = name(ap[2]);
		AP_2.innerText = name(ap[3]);
		AP_3.innerText = name(ap[4]);
	});
	req.open("GET", PREFIX + seed + "&hey_you_reading_this_you_will_find_literally_nothing_and_just_waste_your_time");
	req.send();
}

function setPermalink(seed) {
	PERMALINK.href = "/noita/?seed=" + seed;
}

if (SEED_PARAM != null) {
	reqSeed(SEED_PARAM);
	INPUT.value = SEED_PARAM;
}

function makeShort() {
	let s = "Seed: " + cur_seed + "\n";
	s += "LC: " + LC_1.innerText + ", " + LC_2.innerText + ", " + LC_3.innerText + " (probability " + LC_PROB.innerText + ")";
	s += "\n";
	s += "AP: " + AP_1.innerText + ", " + AP_2.innerText + ", " + AP_3.innerText + " (probability " + AP_PROB.innerText + ")";
	return s;
}

COPY_BUTTON.addEventListener("click", function() {
	let shortRecipes = makeShort();
	console.log(shortRecipes);
	let textArea = document.createElement("textarea");
	textArea.value = shortRecipes;
	//textArea.style.display = "none";
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	console.log(document.execCommand("copy"));
	document.body.removeChild(textArea);
});
